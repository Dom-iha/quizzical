import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        correct: 'hsl(133, 46%, 71%);',
        incorrect: 'hsl(360, 81%, 85%)',
        dark: 'hsl(231, 42%, 28%)',
        light: 'hsl(220, 43%, 97%)',
        selected: 'hsl(230, 61%, 90%)',
        border: 'hsl(231, 42%, 90%)',
      },
    },
  },
  plugins: [],
};
export default config;
