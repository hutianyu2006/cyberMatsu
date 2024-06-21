import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    plugins: [],
    build: {
        rollupOptions: {
            input: {
                index: path.resolve(__dirname, "index.html"),
                result: path.resolve(__dirname, "result.html")
            },
            output: {
                chunkFileNames: "assets/[name]-[hash].js",
                entryFileNames: "assets/[name]-[hash].js",
                assetFileNames: "assets/[name]-[hash][extname]",
                manualChunks: {
                    "box2d": ["box2d.js"],
                    "two": ["two.js"]
                }
            }
        }
    }
})