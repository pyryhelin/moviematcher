const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
module.exports = {
    mode: 'development',
    //mode: 'production',
    entry: {
        index: './src/index.js',
        print: './src/print.js',
        swipe: './src/swipe.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },

    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({
            title: 'Development'
        }),
        new WorkboxPlugin.GenerateSW({
            // these options encourage the ServiceWorkers to get in there fast
            // and not allow any straggling "old" SWs to hang around
            clientsClaim: true,
            skipWaiting: true,
        }),
        /* new WebpackPwaManifest({
             filename: "manifest.json",
             inject: false,
             fingerprints: false,
             short_name: "Test",
             name: "Test",
             icons: [{
                 src: path.resolve("src/icon/icon.png"),
                 size: "192x192"
             }],
             start_url: "/",
             background_color: "#3367D6",
             display: "standalone",
             scope: "/",
             theme_color: "#3367D6",
             description: "Testing",
             //includeDirectory: true,
             destination: "auto"
         })*/
    ],


    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    module: {
        rules: [{
            test: /\.json$/i,
            type: 'json',
        }],
    },

};