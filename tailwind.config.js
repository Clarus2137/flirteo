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
                    '100': '#ffccdc',
                    '200': '#eca4ba',
                    '300': '#ef7da0',
                    '400': '#f24e80',
                    '500': '#e0336b',
                    '600': '#cf295c',
                    '700': '#b4224e',
                    '800': '#a5133f',
                    '900': '#8e0831',
                    DEFAULT: '#f24e80',
                },
                'seconadry': '#989394',
                'inactive': '#eae9ea',
                'alarm': '#f00'
            }
        }
    },
    plugins: [],
}

