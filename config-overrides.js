// 不暴露光放脚手架的配置文件，安装'react-app-rewired'依赖，可直接重写配置
const { injectBabelPlugin } = require('react-app-rewired');
// 安装'react-app-rewire-less'依赖，引入less
const rewireLess = require('react-app-rewire-less');
//webpack中常用的node.js模块
const path = require('path')

module.exports = function override(config, env) {
    config = {
        ...config,
        resolve: {
            alias: {
            	 //配置src目录的别名
            	 //将绝对路劲根文件指向src
                '@': path.resolve(__dirname, 'src')
            }
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
