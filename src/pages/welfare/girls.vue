<template>
    <div class="defaultForm">
        <el-carousel  style="height:700px; background:#000000" >
            <el-carousel-item v-for="girl in girls" :key="girl" style="height:700px">
                <el-image
                style="width: 100%; "
                :src="girl" ></el-image>
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
                let prefix = "./img/girls/"
                let g = new Array()
                for(let i=0;i<=6;i++){
                    g[i] = prefix + "00-"+i+".jpg"
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