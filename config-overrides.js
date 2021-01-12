const { override, fixBabelImports, addLessLoader,addBabelPlugin,addWebpackPlugin } = require('customize-cra');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        // style: 'css'
        style: true,  //自定义主题
    }),
    addBabelPlugin('@babel/plugin-transform-async-to-generator'),
    
    //自定义主题
    addLessLoader({
        javascriptEnabled: true,
        // modifyVars: { '@primary-color': '#1890FF' },
    }),

    // 分析打包
    // addWebpackPlugin(new BundleAnalyzerPlugin({
    //     analyzerMode: 'server',
    //     generateStatsFile: true,
    //     statsOptions: { source: false }
    // }))
);