/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,twig,css,scss,js,ts}"],
  theme: {
    extend: {
      // PRIMARY COLORS
      colors: {
        primary: {
          red: "#ED0226",
          blue: "#001A41",
          white: "#FFFFFF",
          black: "#000000",
        },
        // SECONDARY COLORS
        secondary: {
          red: "#FF0025",
          blue: "#0050AE",
          green: "#008E53",
          yellow: "#FDA22B",
        },
        "dark-red": "#B90024",
        "active-red": "#D50222",
        // NEUTRAL COLORS
        gray: {
          10: "#FAFAFB",
          20: "#EDECF0",
          40: "#CCCFD3",
          60: "#99A0A7",
          80: "#66707A",
          100: "#4E5764",
        },
        "midnight-black": "#0F2236",
        // BACKGROUND COLORS
        bg: {
          card: "#F6F3F3",
          "light-red": "#FCF4F4",
          "light-blue": "#EDF5FC",
          "soft-blue": "#CDD6E7",
          footer: "#E5E5E5",
          "light-gray": "#f4f4f4",
        },
        // ACCENT COLORS
        accent: {
          gold: "#F8EEDD",
          platinum: "#F0F2F3",
          diamond: "#F4F9FF",
          ocean: "#CCE1EF",
        },
        // UTILITY COLORS
        "border-light": "#C4C4C4",
        "overlay-dark": "#00000050",
        // LEGACY SUPPORT COLORS
        legacy: {
          red: "#E5131D",
          green: "#209444",
          yellow: "#DF9A14",
          blue: "#005CAA",
          violet: "#8E0D64",
          steel: "#9CA4AC",
          smoke: "#C5C5C5",
          light: "#F1F1F1",
        },
        // SOCIAL MEDIA COLORS
        social: {
          facebook: "#3b5998",
          twitter: "#00b6f1",
          instagram: "#c32aa3",
          linkedin: "#007bb6",
          whatsapp: "#25d366",
          youtube: "#ff0000",
          telegram: "#0088cc",
        },
      },
      // GRADIENTS
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(76.33deg, #ED0226 52.23%, #FDA22B 72.94%)",
        "gradient-secondary":
          "linear-gradient(77.76deg, #ED0226 61.77%, #FDA22B 108.35%)",
        "gradient-light": "linear-gradient(180deg, #FFF4F5 0%, #FFFFFF 100%)",
        "gradient-soft":
          "linear-gradient(180deg, #FCF4F4 41.09%, #FFFFFF 100%)",
        "gradient-accent":
          "linear-gradient(79.31deg, #CD0A45 62.91%, #FD2B77 101.75%)",
        "gradient-red-dark":
          "linear-gradient(76.81deg, #B90024 15.71%, #FF0025 68.97%, #FD195E 94.61%)",
        "gradient-blue-dark":
          "linear-gradient(75.07deg, #001A41 17.5%, #0E336C 105.9%)",
        "gradient-blue-light":
          "linear-gradient(67.06deg, #F7FCFF 65%, #DAEFFB 111.41%)",
      },
      // FONT FAMILIES
      fontFamily: {
        thin: ["Poppins-Thin", "sans-serif"],
        light: ["Poppins-Light", "sans-serif"],
        regular: ["Poppins-Regular", "sans-serif"],
        medium: ["Poppins-Medium", "sans-serif"],
        bold: ["Poppins-Bold", "sans-serif"],
        "extra-bold": ["Poppins-ExtraBold", "sans-serif"],
        "batik-regular": ["TelkomselBatikSans-Regular", "sans-serif"],
        "batik-bold": ["TelkomselBatikSans-Bold", "sans-serif"],
        icons: ["telkomsel-ico", "sans-serif"],
      },
      // BREAKPOINTS
      screens: {
        xs: { max: "359px" },
        sm: { max: "767px" },
        md: { min: "768px", max: "991px" },
        lg: { min: "992px" },
        xl: { min: "1200px" },
        xxl: { min: "1450px" },
        tablet: { max: "1024px" },
        desktop: { min: "1025px" },
        laptop: { min: "1366px" },
      },
    },
  },
  plugins: [],
};
