import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
        './resources/js/**/*.ts',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Work Sans', ...defaultTheme.fontFamily.sans],
                kanit: ['Kanit', 'sans-serif'],
            },
            zIndex: {
                '100': '100',
                '101': '101',
            },
            spacing: {
                '13': '3.25rem',
                '15': '3.75rem',
                '17': '4.25rem',
                '18': '4.5rem',
                '38': '9.5rem',
                '45': '11.25rem',
                '55': '13.75rem',
                '87': '21.75rem',
                '100': '25rem',
                '144': '36rem',
                '154': '38.5rem',
                '175': '43.75rem',
                '200': '50rem',
                '218': '54.5rem',
                '278': '69.5rem',
                '300': '75rem',
                '350': '87.5rem',
            },
            maxWidth: {
                '87': '21.75rem',
                '200': '50rem',
                '218': '54.5rem',
                '278': '69.5rem',
                '300': '75rem',
                '350': '87.5rem',
            },
            minHeight: {
                '45': '11.25rem',
                '175': '43.75rem',
            },
            aspectRatio: {
                '2.5/1': '2.5 / 1',
            },
        },
    },

    plugins: [forms],
};
