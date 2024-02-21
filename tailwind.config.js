/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./src/App.vue",
      "./src/**/*.{vue,js,ts,jsx,tsx}"
   ],
   theme: {
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
            DEFAULT: '#f24e80 !important',
         },
         'inactive': '#eae9ea'
      }
   },
   plugins: [],
}

