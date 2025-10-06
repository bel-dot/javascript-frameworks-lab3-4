import * as path from "path";

export default {
    entry: "./src/app.ts",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(
            path.dirname(new URL(import.meta.url).pathname),
            "dist",
        ),
    },
    mode: "development",
    devServer: {
        static: {
            directory: path.join(
                path.dirname(new URL(import.meta.url).pathname),
                "/",
            ),
        },
        compress: true,
        port: 9000,
    },
};
