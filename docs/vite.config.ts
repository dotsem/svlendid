import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    plugins: [
        sveltekit(),
        paraglideVitePlugin({
            project: "./project.inlang",
            outdir: "./src/lib/paraglide",
        }),
    ],
    resolve: {
        alias: [
            {
                find: "lib/docs-data",
                replacement: path.resolve(
                    __dirname,
                    "../lib/docs-data/components.json"
                ),
            },
            {
                find: "lib",
                replacement: path.resolve(__dirname, "../lib/src/lib"),
            },
            {
                find: "$package",
                replacement: path.resolve(__dirname, "../lib/src/lib"),
            },
        ],
    },
});
