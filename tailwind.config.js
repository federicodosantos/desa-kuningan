import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
              'primary-orange': '#de5828',
              'primary-white': '#FFFFFF',
              'secondary-orange': '#FF964A',
              'text-black': '#000000',
              'text-white': '#F9F6EE',
              'text-dark-gray': '#878787',
              'outline-gray': '#F0F0F0',
            },
            fontFamily: {
              'poppins': ['Poppins', 'sans-serif'],
            },
          },
    },

    plugins: [forms,require('@tailwindcss/typography'),],
};
