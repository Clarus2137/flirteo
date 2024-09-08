/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/App.vue',
        './src/**/*.{vue,js,ts,jsx,tsx}',
        './src-cordova/*.{html,vue,js,ts,jsx,tsx}',
        './src-cordova/**/*.{html,vue,js,ts,jsx,tsx}',
        './src-cordova/www/**/*.{html,vue,js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                'primary': {
                    '100': '#cce0ff',
                    '200': '#99c2ff',
                    '300': '#66a3ff',
                    '400': '#0057fc',
                    '500': '#004de6',
                    '600': '#0043cc',
                    '700': '#0038b3',
                    '800': '#002e99',
                    '900': '#002480',
                    DEFAULT: '#0057fc',
                },
                'seconadry': '#989394',
                'inactive': '#eae9ea',
                'alarm': '#f00'
            }
        }
    },
    plugins: [],
}

