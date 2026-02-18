// @ts-check
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

const { ALLOWED_HOSTS } = loadEnv(process.env.NODE_ENV ?? "", process.cwd(), "");
const allowedHosts = ALLOWED_HOSTS
  ? ALLOWED_HOSTS.split(",").map((h) => h.trim())
  : [];

// https://astro.build/config
export default defineConfig({
  site: "https://whatistrackingme.github.io",
  base: "/website",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ja"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [icon()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: allowedHosts,
    },
  },
});
