import vituum from "vituum";
import tailwindcss from "@vituum/vite-plugin-tailwindcss";
import twig from "@vituum/vite-plugin-twig";

export default {
  plugins: [
    tailwindcss(),
    vituum({
      imports: {
        filenamePattern: {
          "+.css": [],
        },
      },
    }),
    twig({
      root: "./src",
    }),
  ],
};
