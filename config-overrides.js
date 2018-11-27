// 不暴露光放脚手架的配置文件，安装'react-app-rewired'依赖，可直接重写配置
const { injectBabelPlugin } = require('react-app-rewired');
// 安装'react-app-rewire-less'依赖，引入less
const rewireLess = require('react-app-rewire-less');
//webpack中常用的node.js模块
const path = require('path')
// 终端输出进度条
const WebpackBar = require('webpackbar');
// 显示编译时间
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
module.exports = function override(config, env) {
    // 根据不同的env环境去设置不同的配置项
    if(env === 'production'){
        config = {
            ...config,
            resolve: {
                ...config.resolve,
                alias: {
                    //配置src目录的别名
                    //将绝对路劲根文件指向src
                    '@': path.resolve(__dirname, 'src')
                }
            },        
            performance:{
                ...config.performance,
                //关闭webpack对于单个文件过大的警告
                hints: false
            },
            plugins:[
                ...config.plugins,
                // 显示打包时间
                new ProgressBarPlugin({
                    format:
                        '  build [:bar] ' +
                        chalk.green.bold(':percent') +
                        ' (:elapsed seconds)'
                }),        
                // 进度条
                new WebpackBar({
                    name:'sunmnet'
                })
            ],
            // 提前自定义公共模块
            optimization: {            
                splitChunks: {
                    chunks: "all",
                    minSize: 20000,
                    //其他入口chunk引用的次数
                    minChunks: 1,
                    //默认使用name + hash生成文件名
                    name: true,
                    //使用自定义缓存组
                    cacheGroups: {
                        //公共模块
                        commons: {
                            name: 'common',
                            //缓存优先级设置
                            priority: 10,
                            //从入口chunk提取
                            chunks: 'initial'
                        },
                        //提取第三方库
                        vendors: {
                            //符合条件的放入当前缓存组
                            test: /[\\/]node_modules[\\/]/,
                            name: "vendors",
                            chunks: "all"
                        },
                    }
                }            
            }
        }
    }else{
        config = {
            ...config,
            resolve: {
                ...config.resolve,
                alias: {
                    //配置src目录的别名
                    //将绝对路劲根文件指向src
                    '@': path.resolve(__dirname, 'src')
                }
            },
            performance:{
                ...config.performance,
                hints: false
            },
            plugins:[
                ...config.plugins,
                // 显示打包时间
                new ProgressBarPlugin({
                    format:
                        '  build [:bar] ' +
                        chalk.green.bold(':percent') +
                        ' (:elapsed seconds)'
                }),        
                // 进度条
                new WebpackBar({
                    name:'sunmnet'
                })
            ],
            
        }
    }
    
    // 注入antd按需加载，页面中不再需要引入antd样式文件
    config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
    // 配置less-loader选项
    config = rewireLess.withLoaderOptions({
        //   此处覆盖antd变量（变更主题色）
        // modifyVars: { "@primary-color": "#9F35FF" },
        javascriptEnabled: true //处理less的报错
    })(config, env);
    return config;
};
