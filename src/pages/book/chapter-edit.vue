<template>
    <div class="defaultForm">
        <el-form :model="dataForm" :rules="rules" ref="dataForm" size="small"
            label-width="135px" >
            <el-form-item label="BookID" prop="BookID">
                {{dataForm.bookId}}
            </el-form-item>
            <el-form-item label="章节名称" prop="name">
                <el-input v-model="dataForm.name"></el-input>
            </el-form-item>
            <el-form-item label="章序" prop="sortNumber">
                <el-input v-model.number="dataForm.sortNumber" prefix-icon="fa fa-sort-numeric-asc"></el-input>
            </el-form-item>
            <el-form-item label="章节内容" prop="content">
                <el-input type="textarea" :rows="12" v-model="dataForm.content"></el-input>
            </el-form-item>
            <el-form-item label="锁章状态" prop="lockStatus">
                <el-switch
                    v-model="dataForm.lockStatus"
                    active-color="#ff4949"
                    inactive-color="#13ce66">
                    </el-switch>
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
            bookId:'',
            name: '',
            sortNumber: '',
            content:'',
            lockStatus:false
        },
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' }
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
            this.putRequest('/book-chapter/update', this.dataForm).then(resp => {
                if (resp && resp.code==200) {
                    this.$router.push('/book/chapter-list/'+this.dataForm.bookId);
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
          this.getRequest('/book-chapter/details', {id:id}).then(resp => {
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