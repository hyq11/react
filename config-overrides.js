const { override, fixBabelImports, addLessLoader } = require('customize-cra');
module.exports = override(
    // 使用针对antd实现安修打包，根据import来打包（babel-plugin-import）
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es', 
        style: true,
    }),
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#ee1782' },
    }),
);