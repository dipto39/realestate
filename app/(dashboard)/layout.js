import I18nProvider from "../providers/i18n"
import Providers from "../providers/userProvider"
import "./styles/app.scss"

export const metadata = {
    title: "HomeStick Real State",
    description: "Manage your HomeStick Real State with ease",
};

const RootLayout = ({ children }) => {
    return (
        <>
            <I18nProvider>
                <Providers>
                    {children}
                </Providers>
            </I18nProvider>
        </>
    )
}


export default RootLayout