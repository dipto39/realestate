
import Footer from "../../../components/theme2/footer";
import { Header } from "../../../components/theme2/header";


const Layout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};

export default Layout;