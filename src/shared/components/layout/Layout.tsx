import { Footer } from '../footer/Footer';
import { Header } from '../header/Header';
import './Layout.css';

type LayoutProps = {
    children: React.ReactNode;
    userId?: number;
};

export function Layout({ children, userId }: LayoutProps) {
    return (
        <div className='layout-container' data-testid='layout-test-id'>
            <Header userId={userId} />
            <div className='main-page-container'>{children}</div>
            <Footer />
        </div>
    );
}
