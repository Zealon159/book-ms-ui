<template>
    <div class="defaultForm">
        <el-carousel  style="height:700px;">
            <el-carousel-item v-for="girl in girls" :key="girl" style="height:700px">
                <el-image
                style="width: 100%; "
                :src="girl"
                :fit="fit"></el-image>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                girls:[]
            };
        },
        created(){
            this.getGirls();
        },
        methods: {
            getGirls() {
                let domain = "https://zealon.cn/upload/github/img/"
                let g = new Array()
                g[0] = domain + "00-1.png"
                g[1] = domain + "00-2.png"
                for(let i=2;i<=12;i++){
                    g[i] = domain + "00-"+i+".jpg"
                }
                this.girls = g
            }
        }
    }
</script>

<style scoped>
    .defaultForm {
        width: 100%;
    }

</style>