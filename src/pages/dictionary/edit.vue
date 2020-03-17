<template>
    <div class="defaultForm">
        <el-form :model="dataForm" :rules="rules" ref="dataForm" size="small"
            label-width="135px" >
            <el-form-item label="字典类型" prop="dicType">
                <span>{{dataForm.dicType}}</span>
            </el-form-item>
            <el-form-item label="编码" prop="code">
                <span>{{dataForm.code}}</span>
            </el-form-item>
            <el-form-item label="名称" prop="name">
                <el-input v-model="dataForm.name"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="sortNumber">
                <el-input v-model.number="dataForm.sortNumber" prefix-icon="fa fa-sort-numeric-asc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('dataForm')">保存</el-button>
                <el-button @click="$router.back(-1)">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dataForm: {
                    dicType: '',
                    code:'',
                    name: '',
                    sortNumber: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入名称', trigger: 'blur' }
                    ],
                    sortNumber: [
                        { required: true, message: '请输入排序' , trigger: 'blur'},
                        { type: 'number', message: '必须为数字！' }
                    ]
                }
            };
        },
        created(){
            this.initData();
        },
        methods: {
            submitForm(dataForm) {
                this.$refs[dataForm].validate((valid) => {
                if (valid) {
                    this.putRequest('/data-dictionary/update', this.dataForm).then(resp => {
                        if (resp && resp.code==200) {
                            this.$router.push('/dictionary/list');
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            initData(){
                // 详情
                let id = this.$route.params.id;
                this.getRequest('/data-dictionary/details', {id:id}).then(resp => {
                    if (resp.code == 200) {
                        this.dataForm = resp.data;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .defaultForm {
        margin-top: 20px;
        width: 85%
    }
</style>