const withOpacity = (variable) => ({ opacityValue }) => {
  if (opacityValue === undefined) {
    return `hsl(var(${variable}))`;
  }
  return `hsl(var(${variable}) / ${opacityValue})`;
};

export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Figtree', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        background: withOpacity('--background'),
        foreground: withOpacity('--foreground'),
        card: withOpacity('--card'),
        'card-foreground': withOpacity('--card-foreground'),
        popover: withOpacity('--popover'),
        'popover-foreground': withOpacity('--popover-foreground'),
        primary: withOpacity('--primary'),
        'primary-foreground': withOpacity('--primary-foreground'),
        secondary: withOpacity('--secondary'),
        'secondary-foreground': withOpacity('--secondary-foreground'),
        muted: withOpacity('--muted'),
        'muted-foreground': withOpacity('--muted-foreground'),
        accent: withOpacity('--accent'),
        'accent-foreground': withOpacity('--accent-foreground'),
        destructive: withOpacity('--destructive'),
        'destructive-foreground': withOpacity('--destructive-foreground'),
        border: withOpacity('--border'),
        input: withOpacity('--input'),
        ring: withOpacity('--ring'),
        violet: withOpacity('--violet'),
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'pulse-glow': 'pulse-glow 3s infinite ease-in-out',
      },
    },
  },
  plugins: [],
};

