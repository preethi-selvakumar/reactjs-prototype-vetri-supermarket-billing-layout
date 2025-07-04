import { FaBars } from 'react-icons/fa';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAppContext } from '../context/AppContext';

const MainLayout = () => {
    const { isSidebarOpen, toggleSidebar } = useAppContext();
    const location = useLocation();

    return (
        <div className="app-container">
            {!isSidebarOpen && (
                <div className="hamburger-icon" onClick={toggleSidebar}>
                    <FaBars />
                </div>
            )}

            {isSidebarOpen && <div className="overlay active" onClick={toggleSidebar}></div>}

            <Sidebar currentPath={location.pathname} />

            <Outlet />
        </div>
    );
};

export default MainLayout;
