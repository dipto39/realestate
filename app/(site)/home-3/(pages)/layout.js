import Header from "../../../../components/theme1/header";
import Footer from "../../../../components/theme2/footer";


const Layout = ({ children }) => {
    return (
        <>
            <Header theme3={true} />
            {children}
            <Footer />
        </>
    );
};

export default Layout;