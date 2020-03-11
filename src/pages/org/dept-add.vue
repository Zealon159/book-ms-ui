<template>
    <div class="defaultForm">
        <el-form :model="dataForm" :rules="rules" ref="dataForm" size="small"
            label-width="135px" >
            <el-form-item label="组织名称" prop="name">
                <el-input v-model="dataForm.name"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="sortNumber">
                <el-input v-model.number="dataForm.sortNumber" prefix-icon="fa fa-sort-numeric-asc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('dataForm')">立即创建</el-button>
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
          name: '',
          sortNumber: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 2, max: 50, message: '名称长度在 1 到 20 个汉字内', trigger: 'blur' }
          ],
          sortNumber: [
            { required: true, message: '请输入排序' , trigger: 'blur'},
            { type: 'number', message: '必须为数字！' }
          ]
        }
      };
    },
    methods: {
      submitForm(dataForm) {
        this.$refs[dataForm].validate((valid) => {
          if (valid) {
            this.postRequest('/system/org/dept/create', this.dataForm).then(resp => {
                if (resp && resp.code==200) {
                    this.$router.push('/org/dept-list');
                }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(dataForm) {
        this.$refs[dataForm].resetFields();
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