// vue.config.js
module.exports = {
    // 选项...
    devServer: {
        port: 9001,
        proxy: {
            //跨域设置
            "/api": {
                target: 'http://localhost:8002',    //请求源地址
                changeOrigin: true,  //是否跨域
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}