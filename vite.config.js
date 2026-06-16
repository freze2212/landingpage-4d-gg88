import { defineConfig, loadEnv } from "vite";
import { fileURLToPath } from "url";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig(({ mode }) => {
    var env = loadEnv(mode, root, "");

    return {
        root,
        publicDir: "public",
        server: {
            port: Number(env.VITE_DEV_PORT) || 5173
        },
        preview: {
            port: Number(env.VITE_PREVIEW_PORT) || 4173
        },
        build: {
            outDir: "dist",
            emptyOutDir: true
        }
    };
});
