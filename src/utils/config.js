/** 公共配置 */

// API接口前缀
export const baseApi = "/api";

/** 图片路径处理 */
export function handleImgUri(imgUrl){
    return this.baseApi + "/" + imgUrl;
}
