import Footer from '../../../../components/theme1/footer';
import Header from '../../../../components/theme1/header';

const Layout = ({ children }) => {
    
    return (
        <>
            <Header theme1={true} />
            {children}
            <Footer theme1={true} />
        </>
    );
};

export default Layout;
