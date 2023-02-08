/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        onNeutralBg: 'var(--onNeutralBg)',
        neutralBg: 'var(--neutralBg)',
        onPrimaryBg: 'var(--onPrimaryBg)',
        primaryBg: 'var(--primaryBg)',
        primary: 'var(--primary)',
        neutralText: `var(--neutralText)`,
        hoverText: `var(--hoverText)`,
        neutralTitle: `var(--neutralTitle)`,
        colorBg:`var(--colorBg)`,
        colorElementBg:`var(--colorElementBg)`,
        colorElementBg2:`var(--colorElementBg2)`
      }
    },
  },
  plugins: [
    require('tailwindcss-font-inter'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@headlessui/tailwindcss'),
  ],
}
