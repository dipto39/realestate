/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.tsx', 'components/**/*.tsx', "./app/**/*.js", 'components/**/*.js'],
    theme: {
        fontFamily: {
            libre_baskerville: 'Libre Baskerville',
        },
        extend: {
            colors: {
                primary: '#FF6400',
                primary_lite: '#FBCD9C',
                secondary: '#003049',
                tertiary: '#353638',
                dark_text: '#313234',
                light_text: '#EBEDF9',
                secondary_text: '#888AA0',
                tertiary_text: '#BDBDC6',
                hover_color: '#DD8E38',
                gray_text :'#EAEBEC',
                main_dark: '#222224'
            },
        },
    },
    plugins: [],
    darkMode: ["class", '[data-theme="dark"]'],
};
