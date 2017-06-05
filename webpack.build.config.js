/**
 * Created by boli on 2017/4/1.
 */
var webpack = require('webpack');
var path = require('path');
var htmlWebpackPluign = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin=require('clean-webpack-plugin');
var CopyWebpackPlugin=require('copy-webpack-plugin');

module.exports = {
    context: path.join(__dirname),
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
    entry: {
        app:["./APP/index.js"]

    },
    output: {
        path: path.join(__dirname,'./dist/'),
        filename: "js/[name].js",
        publicPath:'/',
        chunkFilename:'js/[name][chunkhash:5].chunk.js'
    },
    plugins: [
        new CleanWebpackPlugin('dist'),
        new webpack.optimize.UglifyJsPlugin({
            output:{
                comments:false
            },
            compress:{
                warnings:false
            }
        }),//压缩JS
        new htmlWebpackPluign({
            filename: 'index.html',
            template: 'index_build.html',
            inject: 'body'
        }),
        new webpack.LoaderOptionsPlugin({//加载postcss
            options: {
                postcss: function(){
                    return [
                        require("autoprefixer")
                    ]
                }
            }
        }),
        new ExtractTextPlugin('css/style-[contenthash].css'),
        new CopyWebpackPlugin([{
            from: __dirname + '/static',
            to:__dirname+'/dist/static'
        }]),
        new CopyWebpackPlugin([{
            from: __dirname + '/wx',
            to:__dirname+'/dist/wx'
        }]),
        new CopyWebpackPlugin([{
            from: __dirname + '/common',
            to:__dirname+'/dist/js'
        }]),
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        })

    ],
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', "stage-1", "react","stage-0"]
                },
                exclude: /node_modules/,
                include: /APP/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(['css-loader'])
            },
            {
                test:/\.less$/,
                /* loader: ExtractTextPlugin.extract({
                 fallback: 'style-loader',
                 //resolve-url-loader may be chained before sass-loader if necessary
                 use: [ 'css-loader','postcss-loader','less-loader']
                 },*/
                loader: ExtractTextPlugin.extract([ 'css-loader', 'postcss-loader','less-loader'])

            },
            {
                test: /\.(png|jpeg|gif)$/,
                loader: 'file-loader?name=static/img/[name].[ext]'
            },
        ]

    }

};

