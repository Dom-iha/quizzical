import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        correct: 'hsl(133, 46%, 71%);',
        incorrect: 'hsl(360, 81%, 85%)',
        darkBlue: 'hsl(231, 42%, 28%)',
        lightBlue: 'hsl(230, 34%, 46%)',
        light: 'hsl(220, 43%, 97%)',
        selected: 'hsl(230, 61%, 90%)',
        border: 'hsl(231, 42%, 90%)',
        accent: 'hsl(264, 98%, 63%)',
      },
    },
  },
  plugins: [],
};
export default config;
