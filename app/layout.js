import '../styles/global.scss';
import I18nProvider from './providers/i18n';
import Providers from './providers/userProvider'

export const metadata = {
    title: 'Real State',
    description: 'Generated by Next.js',
};

export default function RootLayout({ children }) {
    return (
        <html lang='en' suppressHydrationWarning>
            <I18nProvider>
                <Providers>
                    <body>{children}</body>
                </Providers>
            </I18nProvider>

        </html>
    );
}