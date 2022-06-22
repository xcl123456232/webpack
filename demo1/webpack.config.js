const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const loader = require('sass-loader')
const VueLoaderPlugin = require('vue-loader/lib/plugin')


const htmlPlugin = new HtmlWebpackPlugin({
    // 创建插件的实例对象
    template: './src/index.html', //指定要用到模板文件
    filename: 'index.html' //指定生成的文件名称，该文件存在内存中，在目录中不显示
})

module.exports = {
    //编译模式
    mode: 'production', //mode用来指定构建模式 production/development
    entry: path.join(__dirname, './src/index.js'),
    output: {
        path: path.join(__dirname, './dist'), //输出文件的存放路径
        filename: 'bundle.js' //输出文件的名称
    },
    devServer: {
        static: {
            directory: path.join(__dirname, './'),
            watch: true
        }
    },
    plugins: [htmlPlugin, new VueLoaderPlugin()], //plugins数组是webpack打包期间会用到的一些插件列表
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            // { test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/, use: 'url-loader?limit=6510' }
            // exclude为排除项， 表示babel - loader不需要处理node_modules中的文件 
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.vue$/, loader: 'vue-loader' }
        ]
    },
    performance: {
        hints: 'warning', // 枚举 false关闭
        maxEntrypointSize: 100000000, // 最大入口文件大小
        maxAssetSize: 100000000, // 最大资源文件大小
        assetFilter: function(assetFilename) { //只给出js文件的性能提示
            return assetFilename.endsWith('.js');
        }
    }
    // performance: {
    //     hints: false
    // }
}