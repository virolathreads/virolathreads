// tailwind.config.js

const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
  	extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
  		colors: {
        foreground: 'colors.white', 
  			transparent: 'transparent',
  			current: 'currentColor',
  			black: 'colors.black',
  			white: 'colors.white',
  			rose: 'colors.rose',
  			pink: 'colors.pink',
  			fuchsia: 'colors.fuchsia',
  			purple: 'colors.purple',
  			violet: 'colors.violet',
  			indigo: 'colors.indigo',
  			blue: 'colors.blue',
  			lightBlue: 'colors.lightBlue',
  			sky: 'colors.sky',
  			cyan: 'colors.cyan',
  			teal: 'colors.teal',
  			emerald: 'colors.emerald',
  			green: 'colors.green',
  			lime: 'colors.lime',
  			yellow: 'colors.yellow',
  			amber: 'colors.amber',
  			orange: 'colors.orange',
  			red: 'colors.red',
  			slate: 'colors.slate',
  			zinc: 'colors.zinc',
  			gray: 'colors.gray',
  			neutral: 'colors.blueGray',
  			stone: 'colors.stone',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"), require("flowbite/plugin")],
};
