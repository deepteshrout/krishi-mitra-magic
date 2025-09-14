import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        primary: ['var(--font-primary)'],
        secondary: ['var(--font-secondary)'],
      },
      colors: {
        // Nature-Inspired Palette
        soil: {
          dark: "hsl(var(--soil-dark))",
          rich: "hsl(var(--soil-rich))",
        },
        earth: {
          warm: "hsl(var(--earth-warm))",
        },
        grass: {
          fresh: "hsl(var(--grass-fresh))",
          deep: "hsl(var(--grass-deep))",
        },
        leaf: {
          bright: "hsl(var(--leaf-bright))",
        },
        sky: {
          dawn: "hsl(var(--sky-dawn))",
          day: "hsl(var(--sky-day))",
          dusk: "hsl(var(--sky-dusk))",
        },
        harvest: {
          gold: "hsl(var(--harvest-gold))",
        },
        sunrise: {
          orange: "hsl(var(--sunrise-orange))",
        },
        flower: {
          pink: "hsl(var(--flower-pink))",
        },
        
        // Semantic Design Tokens
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: {
          DEFAULT: "hsl(var(--background))",
          soft: "hsl(var(--background-soft))",
        },
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          organic: "hsl(var(--card-organic))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        organic: "var(--radius-organic)",
        leaf: "var(--radius-leaf)",
        seed: "var(--radius-seed)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        float: "var(--shadow-float)",
        glow: "var(--shadow-glow)",
        harvest: "var(--shadow-harvest)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(var(--breathe-scale))" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(calc(-1 * var(--float-distance)))" },
        },
        "grow-from-seed": {
          "0%": { transform: "scale(0) rotate(-180deg)", opacity: "0" },
          "50%": { transform: "scale(0.5) rotate(-90deg)", opacity: "0.5" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
        "voice-ripple": {
          "0%": { transform: "scale(0)", opacity: "1" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
        "leaf-sway": {
          "0%, 100%": { transform: "rotate(-2deg) translateX(0)" },
          "50%": { transform: "rotate(2deg) translateX(2px)" },
        },
        "harvest-glow": {
          "0%, 100%": { boxShadow: "var(--shadow-soft)" },
          "50%": { boxShadow: "var(--shadow-harvest)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-gentle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        breathe: "breathe 4s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        "grow-from-seed": "grow-from-seed 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "voice-ripple": "voice-ripple 2s ease-out infinite",
        "leaf-sway": "leaf-sway 4s ease-in-out infinite",
        "harvest-glow": "harvest-glow 3s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        shimmer: "shimmer 2s infinite",
        "pulse-gentle": "pulse-gentle 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
