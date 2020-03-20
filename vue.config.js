// vue.config.js
module.exports = {
    build:{
        assetPublicPath: './'
    },
    devServer: {
        port: 9000,
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