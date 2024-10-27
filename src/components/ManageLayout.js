import { Outlet } from 'react-router-dom';
import Navtab from './management/Navtab';

const ManageLayout = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <nav style={{ flexShrink: 0 }}>
                <Navtab />
            </nav>
            <main style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default ManageLayout;
