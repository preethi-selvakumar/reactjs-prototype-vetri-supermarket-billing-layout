import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Invoice = () => {
    const { state } = useLocation();
    const { billNo, date, customerDetails, selectedProducts } = state || {};

    const componentRef = useRef();
    const navigate = useNavigate(); // Initialize navigate

    const handleDownload = () => {
        const input = componentRef.current;

        html2canvas(input, {
            scale: 3, 
            useCORS: true,
        }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const margin = 5;
            const imgWidth = pdfWidth - margin * 2;
            const imgProps = pdf.getImageProperties(imgData);
            const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

            let y = margin;

            if (imgHeight > pdf.internal.pageSize.getHeight() - margin * 2) {
                let position = 0;
                while (position < imgHeight) {
                    pdf.addImage(imgData, 'PNG', margin, y, imgWidth, imgHeight);
                    position += pdf.internal.pageSize.getHeight() - margin * 2;
                    if (position < imgHeight) {
                        pdf.addPage();
                    }
                }
            } else {
                pdf.addImage(imgData, 'PNG', margin, y, imgWidth, imgHeight);
            }

            pdf.save(`Invoice_${billNo}.pdf`);

            // Navigate to Thank You page after saving PDF
            navigate('/thankyou');
        });
    };

    const subTotal = selectedProducts?.reduce(
        (sum, item) => sum + item.rate * item.quantity,
        0
    ) || 0;

    return (
        <div className="invoice-wrapper">
            <div
                ref={componentRef}
                style={{
                    backgroundColor: '#fff',
                    padding: '30px',
                    width: '800px',
                    margin: '0 auto'
                }}
            >
                <div className="invoice-container">
                    <h2 className="invoice-title">Tax Invoice</h2>

                    <div className="invoice-header">
                        <div className="invoice-seller">
                            <p><strong>Sold By:</strong> <span className="orange-text">Vetri Market</span></p>
                            <p>
                                <strong>Ship - From Address:</strong><br />
                                Vetri market<br />
                                65, Old Market, Sivagurunathapuram, Surandai,<br />
                                Tamil Nadu 627-859
                            </p>
                        </div>
                        <div className="invoice-number-box">
                            Invoice Number: <strong>#{billNo || 'N/A'}</strong>
                        </div>
                    </div>

                    <div className="invoice-info">
                        <div>
                            <strong>Order ID:</strong> {billNo}<br />
                            <strong>Order Date:</strong> {date}
                        </div>
                        <div>
                            <strong>Billing Address:</strong><br />
                            {customerDetails?.name}<br />
                            {customerDetails?.address}<br />
                            Phone - {customerDetails?.contactNo}
                        </div>
                    </div>

                    <table className="invoice-table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedProducts?.length > 0 ? (
                                selectedProducts.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>₹ {item.rate}</td>
                                        <td>₹ {(item.rate * item.quantity).toFixed(2)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>No products found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <div className="invoice-total">
                        <strong>Total:</strong>
                        <span>₹ {subTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div className="invoice-download-btn">
                <button onClick={handleDownload}>Download Invoice</button>
            </div>
        </div>
    );
};

export default Invoice;
