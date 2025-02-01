import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        customPink: '#DB2777',
        slateGray: '#566270',
        neutralGray: '#AFAFAF',
        lightPurple: '#A593E0',
        danger: '#B6000F',
        sucess: '#2BBE00',
      },
    },
  },
  plugins: [],
} satisfies Config;
