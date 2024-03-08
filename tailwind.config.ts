import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        whitney: ['Whitney SSm A', 'Whitney SSm B', 'Helvetica', 'Arial'],
        archivo: ["Archivo Black", 'sans-serif'],
        protest: ["Protest Strike", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
