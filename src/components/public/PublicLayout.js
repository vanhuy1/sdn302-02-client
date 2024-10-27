import { Outlet } from 'react-router-dom';
import PublicHeader from './PublicHeader';
import PublicFooter from './PublicFooter';

const PublicLayout = () => {
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <header style={{ flexShrink: 0 }}>
                    <PublicHeader />
                </header>

                <Outlet />

                <footer style={{ flexShrink: 0 }}>
                    <PublicFooter />
                </footer>
            </div>
        </>
    );
};

export default PublicLayout;
