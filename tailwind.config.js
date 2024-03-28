/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-light": {
          DEFAULT: "var(--color-zz-primary-light)",
          50: "var(--color-zz-primary-light-50)",
          100: "var(--color-zz-primary-light-100)",
          200: "var(--color-zz-primary-light-200)",
          300: "var(--color-zz-primary-light-300)",
          400: "var(--color-zz-primary-light-400)",
          500: "var(--color-zz-primary-light-500)",
          600: "var(--color-zz-primary-light-600)",
          700: "var(--color-zz-primary-light-700)",
          800: "var(--color-zz-primary-light-800)",
          900: "var(--color-zz-primary-light-900)",
        },
        primary: {
          DEFAULT: "var(--color-zz-primary)",
          50: "var(--color-zz-primary-50)",
          100: "var(--color-zz-primary-100)",
          200: "var(--color-zz-primary-200)",
          300: "var(--color-zz-primary-300)",
          400: "var(--color-zz-primary-400)",
          500: "var(--color-zz-primary-500)",
          600: "var(--color-zz-primary-600)",
          700: "var(--color-zz-primary-700)",
          800: "var(--color-zz-primary-800)",
          900: "var(--color-zz-primary-900)",
        },
        "primary-dark": {
          DEFAULT: "var(--color-zz-primary-dark)",
          50: "var(--color-zz-primary-dark-50)",
          100: "var(--color-zz-primary-dark-100)",
          200: "var(--color-zz-primary-dark-200)",
          300: "var(--color-zz-primary-dark-300)",
          400: "var(--color-zz-primary-dark-400)",
          500: "var(--color-zz-primary-dark-500)",
          600: "var(--color-zz-primary-dark-600)",
          700: "var(--color-zz-primary-dark-700)",
          800: "var(--color-zz-primary-dark-800)",
          900: "var(--color-zz-primary-dark-900)",
        },
        "secondary-light": {
          DEFAULT: "var(--color-zz-secondary-light)",
          50: "var(--color-zz-secondary-light-50)",
          100: "var(--color-zz-secondary-light-100)",
          200: "var(--color-zz-secondary-light-200)",
          300: "var(--color-zz-secondary-light-300)",
          400: "var(--color-zz-secondary-light-400)",
          500: "var(--color-zz-secondary-light-500)",
          600: "var(--color-zz-secondary-light-600)",
          700: "var(--color-zz-secondary-light-700)",
          800: "var(--color-zz-secondary-light-800)",
          900: "var(--color-zz-secondary-light-900)",
        },
        secondary: {
          DEFAULT: "var(--color-zz-secondary)",
          50: "var(--color-zz-secondary-50)",
          100: "var(--color-zz-secondary-100)",
          200: "var(--color-zz-secondary-200)",
          300: "var(--color-zz-secondary-300)",
          400: "var(--color-zz-secondary-400)",
          500: "var(--color-zz-secondary-500)",
          600: "var(--color-zz-secondary-600)",
          700: "var(--color-zz-secondary-700)",
          800: "var(--color-zz-secondary-800)",
          900: "var(--color-zz-secondary-900)",
        },
        "secondary-dark": {
          DEFAULT: "var(--color-zz-secondary-dark)",
          50: "var(--color-zz-secondary-dark-50)",
          100: "var(--color-zz-secondary-dark-100)",
          200: "var(--color-zz-secondary-dark-200)",
          300: "var(--color-zz-secondary-dark-300)",
          400: "var(--color-zz-secondary-dark-400)",
          500: "var(--color-zz-secondary-dark-500)",
          600: "var(--color-zz-secondary-dark-600)",
          700: "var(--color-zz-secondary-dark-700)",
          800: "var(--color-zz-secondary-dark-800)",
          900: "var(--color-zz-secondary-dark-900)",
        },
        danger: {
          DEFAULT: "var(--color-zz-danger)",
          50: "var(--color-zz-danger-50)",
          100: "var(--color-zz-danger-100)",
          200: "var(--color-zz-danger-200)",
          300: "var(--color-zz-danger-300)",
          400: "var(--color-zz-danger-400)",
          500: "var(--color-zz-danger-500)",
          600: "var(--color-zz-danger-600)",
          700: "var(--color-zz-danger-700)",
          800: "var(--color-zz-danger-800)",
          900: "var(--color-zz-danger-900)",
        },
        disabled: {
          DEFAULT: "var(--color-zz-disabled)",
          50: "var(--color-zz-disabled-50)",
          100: "var(--color-zz-disabled-100)",
          200: "var(--color-zz-disabled-200)",
          300: "var(--color-zz-disabled-300)",
          400: "var(--color-zz-disabled-400)",
          500: "var(--color-zz-disabled-500)",
          600: "var(--color-zz-disabled-600)",
          700: "var(--color-zz-disabled-700)",
          800: "var(--color-zz-disabled-800)",
          900: "var(--color-zz-disabled-900)",
        },
      },
      animation: {
        "spin-slow": "spin-slow 6s linear infinite",
      },
      keyframes: {
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "10%": { opacity: "0.5" },
          "20%": { opacity: "1" },
          "30%": { opacity: "0.5" },
          "40%": { opacity: "1" },
          "50%": { opacity: "0.5" },
          "60%": { opacity: "1" },
          "70%": { opacity: "0.5" },
          "80%": { opacity: "1" },
          "90%": { opacity: "0.5" },
          "100%": { transform: "rotate(-360deg)" },
        },
      },
    },
    clipPath: {
      cone: "polygon(50% 0%, 100% 38%, 100% 61%, 0 62%, 0% 38%)",
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
