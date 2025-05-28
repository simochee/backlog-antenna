import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "wxt";

export default defineConfig({
  manifest: {
    default_locale: "ja",
    name: "__MSG_ext_name__",
    description: "__MSG_ext_description__",
  },
  modules: ["@wxt-dev/i18n/module", "@wxt-dev/auto-icons"],
  vite: () => ({
    plugins: [
      // not compatible with Vite 6 types
      tailwindcss() as any,
    ],
  }),
});
