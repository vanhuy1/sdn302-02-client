import { Outlet } from 'react-router-dom';
import Header from './landing-page/header';
import Footer from './landing-page/footer';
import SideBar from './Sidebar';

const DashLayout = () => {
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <header style={{ flexShrink: 0 }}>
                    <Header />
                </header>

                <div style={{ display: 'flex', flex: 1 }}>
                    <aside style={{ width: '250px', flexShrink: 0 }}>
                        <SideBar />
                    </aside>

                    <main style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                        <Outlet />
                    </main>
                </div>

                <footer style={{ flexShrink: 0 }}>
                    <Footer />
                </footer>
            </div>
        </>
    );
};

export default DashLayout;
