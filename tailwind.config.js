/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray-disabled': '#B5B6B6',
        'gray-1': '#E5E6E6',
        'gray-2': '#F5F6F6',
        'gray-3': '#898993',
        'gray-4': '#E1E4E9',
        'gray-5': '#cccccc',
        'blue-1': '#007AFF',
        'green-1': '#00AA13',
        'green-2': '#36B577',
        'orange-1': '#DE8813',
        'orange-2': '#DE88131F',
        'red-1': '#ED1B2F',
        'red-2': '#FF0C2B',
        'black-1': '#3B3B41',
        'purple-1': '#9B51E0'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
