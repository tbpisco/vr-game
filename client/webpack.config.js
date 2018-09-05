
const path = require('path');
const babiliPlugin = require('babili-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const HtmlWepackPlugin = require('html-webpack-plugin');
const HtmlPluginRemove = require('html-webpack-plugin-remove');
//const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

var isCoverage = process.env.NODE_ENV === 'coverage';

let plugins = [];

plugins.push(new HtmlWepackPlugin({

    hash: true,
    minify: {
        html5: true, 
        collapseWhitespace: true, 
        removeComments: true
    },
    inject:'body',
    filename: 'index.html',
    template: __dirname + '/src/main.html'

}));

plugins.push(new HtmlPluginRemove(/<script type="text\/javascript" src="js\/scss\.js.*?<\/script>/));
plugins.push(new HtmlPluginRemove(/<script type="text\/javascript" src="js\/inlinescss\.js.*?<\/script>/));
plugins.push(new extractTextPlugin('css/inline_style.css'));
//plugins.push(new StyleExtHtmlWebpackPlugin({minify: true, file:'css/inline_style.css'}));
//plugins.push(new StyleExtHtmlWebpackPlugin({minify: true, file:'css/style.css'}));
plugins.push(new ScriptExtHtmlWebpackPlugin({inline:['js/inline.js'], defaultAttribute:'async'}))

plugins.push(new CopyWebpackPlugin([{
    from: 'src/images/', to: 'images/'
}]));

plugins.push(new CopyWebpackPlugin([{
    from: 'src/fonts/', to: 'fonts/'
}]));

plugins.push(new webpack.ProvidePlugin({qrcode:"qrcode", 
                                        THREE:"three", 
                                        Ammo:"ammo.js"
                                    }));


plugins.push(new CopyWebpackPlugin([{
    from: 'icons/*.png', to: __dirname + '/build/'
},
{
    from: 'icons/*.json', to: __dirname + '/build/'
},
{
    from: 'icons/*.ico', to: __dirname + '/build/'
}]));


plugins.push(new HtmlWebpackInlineSVGPlugin());

let SERVICE_URL = JSON.stringify('localhost:3000');

if(process.env.NODE_ENV == 'production') {

    SERVICE_URL = JSON.stringify('com');

    plugins.push(new CleanWebpackPlugin([
        './build/**/*.*'
      ]));

    plugins.push(new webpack.optimize.ModuleConcatenationPlugin());

    plugins.push(new babiliPlugin());

    plugins.push(new optimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
            discardComments: {
                removeAll: true
            }
        },
        canPrint: true
    }));

    //plugins.push(new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i , svgo:{removeViewBox: false}}));
        
}

plugins.push(new CleanWebpackPlugin([
    './build/js/inlinescss.js',
    './build/js/scss.js'
  ]));

plugins.push(new webpack.DefinePlugin({ SERVICE_URL }));

module.exports = {
    resolve:{
        alias:{
            qrcode:"qrcode-generator/qrcode.js",
            THREE: "three/build/three.min.js",
            Ammo: "ammo.js/ammo.js"
        }
    },
    entry: {
        app: './src/app.js',
      //  inline: './src/app/inline.js',
        scss: './src/scss/style.scss',
      //  inlinescss: './src/scss/inline_style.scss'//,
       vendor: ['babel-polyfill', 'qrcode-generator' , 'classlist-polyfill', 'three' , 'ammo.js'/*, './src/app/libs/physi.js'*/]
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules:[].concat(
            isCoverage ? {
                test: /\.(js|ts)/,
                include: path.resolve('src'), 
                loader: 'istanbul-instrumenter-loader'
            }: [],
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use : { 
                    loader: 'babel-loader'
                }
            },
            /*{
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader', 
                    use: 'css-loader'
                })

            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", 
                    "css-loader", 
                    "sass-loader"
                ]
            },*/
            {
                test: /\.worker\.js$/,
                use: { loader: 'worker-loader' }
              },
        
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].css',
                            outputPath: 'css/'
                        }
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
            ,{ 
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'file-loader?limit=100000&mimetype=application/font-woff&name=/fonts/[name].[ext]' 
            },
            { 
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'file-loader?limit=1000000&mimetype=application/octet-stream&name=/fonts/[name].[ext]'
            },
            { 
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'file-loader?limit=1000000&outputPath=/fonts/' 
            },
            { 
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'file-loader?limit=1000000&mimetype=image/svg+xml&name=/fonts/[name].[ext]' 
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                loader: 'file-loader?limit=1000000&name=/images/[name].[ext]' 
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'html-loader' 
            }/*,
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                  'file-loader',
                  {
                    loader: 'image-webpack-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: '../images/',
                      mozjpeg: {
                        progressive: true,
                        quality: 65
                      },
                      // optipng.enabled: false will disable optipng
                      optipng: {
                        enabled: false,
                      },
                      pngquant: {
                        quality: '65-90',
                        speed: 4
                      },
                      gifsicle: {
                        interlaced: false,
                      },
                      // the webp option will enable WEBP
                      webp: {
                        quality: 75
                      }
                    }
                  },
                ],
            } */          
        )
    }, 
    plugins
}