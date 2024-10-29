// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Poppins"', 'sans-serif'],
      },
      colors: {
        primary: '#4F46E5', // Indigo
        accent: '#9333EA',  // Purple
      },
    },
  },
  plugins: [],
};
