import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

import { FaCheck } from 'react-icons/fa';

import DraftIcon from '../assets/images/draft.png';
import CashIcon from '../assets/images/cash.png';
import CardIcon from '../assets/images/card.png';

const PaymentSummary = () => {
    const navigate = useNavigate();

    const {
        selectedProducts,
        receivedAmount,
        setReceivedAmount,
    } = useAppContext();

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [billNo, setBillNo] = useState('');
    const [paymentMode, setPaymentMode] = useState('CASH');
    const [collectedAmount, setCollectedAmount] = useState(0);
    const [balance, setBalance] = useState(0);

    const subTotal = selectedProducts.reduce(
        (sum, item) => sum + item.rate * item.quantity,
        0
    );

    const tax = selectedProducts.reduce(
        (sum, item) => sum + item.tax * item.quantity,
        0
    );

    const roundOff = 0;
    const total = subTotal + tax + roundOff;

    useEffect(() => {
        const now = new Date();
        setDate(now.toLocaleDateString());
        setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        setBillNo(`78${Math.floor(Math.random() * 1000)}`);
        setCollectedAmount(subTotal);
    }, [subTotal]);

    useEffect(() => {
        const received = parseFloat(receivedAmount) || 0;
        const balanceAmt = received - total;
        setBalance(balanceAmt.toFixed(2));
    }, [receivedAmount, total]);

    // Auto-fill received amount if empty or 0
    useEffect(() => {
        if (!receivedAmount || parseFloat(receivedAmount) === 0) {
            setReceivedAmount(total.toFixed(2));
        }
    }, [total]);

    return (
        <div className="payment-summary-container">
            <div className="top-row">
                <div className="left-details">
                    <p><strong>DATE:</strong> {date}</p>
                    <p><strong>TIME:</strong> {time}</p>
                    <p><strong>BILL NO:</strong> {billNo}</p>
                </div>
                <div className="right-draft">
                    <button className="draft-button">
                        <img src={DraftIcon} alt="Draft" className="icon" />
                        Draft
                    </button>
                </div>
            </div>

            <div className="amount-boxes">
                <div className="collected-box">
                    <p>Collected Amount</p>
                    <h4>{collectedAmount.toFixed(2)}</h4>
                </div>
                <div className="balance-box">
                    <p>Balance</p>
                    <h4>{balance}</h4>
                </div>
            </div>

            <div className="payment-section">
                <div className="payment-buttons">
                    <div className="payment-option">
                        <div className="circle-icon">
                            <img src={CashIcon} alt="Cash" />
                        </div>
                        <button
                            className={`payment-mode-button ${paymentMode === 'CASH' ? 'active' : ''}`}
                            onClick={() => setPaymentMode('CASH')}
                        >
                            <div className="button-content">
                                CASH
                                {paymentMode === 'CASH' && (
                                    <FaCheck color="red" style={{ marginLeft: '6px' }} />
                                )}
                            </div>
                        </button>
                    </div>

                    <div className="payment-option">
                        <div className="circle-icon">
                            <img src={CardIcon} alt="Card" />
                        </div>
                        <button
                            className={`payment-mode-button ${paymentMode === 'CARD' ? 'active' : ''}`}
                            onClick={() => setPaymentMode('CARD')}
                        >
                            <div className="button-content">
                                CARD
                                {paymentMode === 'CARD' && (
                                    <FaCheck color="red" style={{ marginLeft: '6px' }} />
                                )}
                            </div>
                        </button>
                    </div>
                </div>

                <div className="received-input">
                    <label>Received Amount</label>
                    <input
                        type="text"
                        inputMode="decimal"
                        value={receivedAmount !== '' ? receivedAmount : '0.00'}
                        onChange={(e) => setReceivedAmount(e.target.value)}
                        placeholder="0.00"
                    />
                </div>
            </div>

            <div className="summary-details">
                <hr />
                <div className="summary-row">
                    <span className="label">Sub Total:</span>
                    <span className="value">{subTotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                    <span className="label">Tax:</span>
                    <span className="value">{tax.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                    <span className="label">Round Off:</span>
                    <span className="value">{roundOff.toFixed(2)}</span>
                </div>
                <hr />
                <div className="summary-row total">
                    <span className="label">Total:</span>
                    <span className="value">{total.toFixed(2)}</span>
                </div>
            </div>

            <div className="action-buttons">
                <button className="save-button">Save</button>
                <button
                    className="payment-button"
                    onClick={() => navigate('/order-success', { state: { billNo } })}
                >
                    Payment
                </button>
            </div>
        </div>
    );
};

export default PaymentSummary;
