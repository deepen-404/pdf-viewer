/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
      extend: {
          colors: {
              primary: 'var(--bs-primary)',
              'primary-subtle': 'var(--bs-primary-muted)',
              secondary: '#6C757D',
              danger: '#F23547',
              emphasis: '#3a3540',
              neutral: '#f4f4f4',
              'neutral-subtle': '#FAFAFA',
              'color-green': '#16a34a',
              'color-red': '#F23547',
              'color-yellow': '#ca8a04',
              'color-blue': '#3c6fe0',
              'color-purple': '#7c71ff',
              'color-green-subtle': '#d0fade',
              'color-red-subtle': '#ffdadd',
              'color-yellow-subtle': '#faedd0',
              'color-blue-subtle': '#dae5ff',
              'color-purple-subtle': '#dddaff',
          },
        
      },
  },
  plugins: [],
};
