const path = require('path');
const webpack = require('webpack');
//导入在内存中生成html的插件
const htmlWebpackPlugin = require('html-webpack-plugin');
//导入每次打包时删除文件夹的插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//压缩js代码插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
//打包css文件插件
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//压缩css插件
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
    mode: "production",
    //entry: './src/index.js',
    entry: {
        app: path.join(__dirname, './src/index.jsx'),
        //vendors: ['react', 'redux'] //要把抽离的第三方包的名称，放到这个数组中
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[contenthash].js',
        //chunkFilename: 'js/chunkFile-[id]-[chunkhash].js', //打包发布时，被抽离的第三方包会被打包进这个文件中
    },
    resolve: {
        extensions: ['.jsx', '.js']
    },
    //抽离第三方包的配置
    optimization: {
        //给固定的hash值，使webpack不打包未修改的文件，只打包已经修改的文件
        moduleIds: 'hashed',
        //为所有第三方包单独创建一个运行包，吧所有第三方包分开
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/](echarts|antd|antd-mobile|react|react-dom|react-router|redux|react-redux)[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
        //压缩js代码
        minimizer: [new UglifyJsPlugin({
            parallel: true, //并行
            cache: true,
            uglifyOptions: {
                output: {
                    comments: false, //注释不参与打包
                },
            },
        })],
    },
    plugins: [ //配置插件的节点
        new htmlWebpackPlugin({
            //创建一个在内存中生成html页面的插件
            template: path.join(__dirname, 'index.html'), //指定模板页面，将来会根据指定的页面路径，去生成内存中的页面
            filename: 'index.html', //指定在内存中生成的页面的名称
            minify: { //压缩html代码
                collapseWhitespace: true, //合并多余空格
                removeComments: true, //移除注释
                removeAttributeQuotes: true, //移除属性上的双引号
            },
        }),
        //创建删除文件插件，删除dist文件
        new CleanWebpackPlugin(),
        //创建打包css文件插件对象
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css',
        }),
        //压缩css文件对象
        new OptimizeCssAssetsPlugin()
    ],
    module: { //这个节点用于配置所有第三方模块的加载器
        rules: [ //匹配规则.
            {
                test: /\.css$/i, //配置处理css文件的第三方loader规则
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // 这里可以指定一个 publicPath
                            // 默认使用 webpackOptions.output中的publicPath
                            publicPath: '../'
                        },
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.less$/, //配置处理sass文件的第三方loader规则
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // 这里可以指定一个 publicPath
                            // 默认使用 webpackOptions.output中的publicPath
                            publicPath: '../'
                        },
                    },
                    'css-loader', 'less-loader'
                ],
            },
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: ['url-loader?limit=8192&name=img/[hash:8]-[name].[ext]'] },
            // {
            //     test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            //     loader: 'url-loader',
            //     options: {
            //         limit: false,
            //         name: "img/[hash:8]-[name].[ext]"
            //     }
            // },
            //处理图片路径的loader规则
            //limit给定的值，是限制图片转为base64编码，限制值单位是byte,如果我们引用的图片，大于或等于给定的limit值，则图片不会被转为
            //base64格式的字符串，如果图片小于给定的值，则会被转为base64的字符串
            { test: /\.(ttf|eot|svg|woff)$/, use: 'url-loader' }, //处理字体文件的loader
            //{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },//转换es6语法，include包含要处理的文件夹路径
            { test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ }
        ]
    }
};