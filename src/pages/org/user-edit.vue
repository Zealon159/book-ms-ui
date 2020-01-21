<template>
    <div class="defaultForm">
        <el-form :model="userForm" :rules="rules" ref="userForm" size="small"
            label-width="135px" class="demo-userForm">
            <el-form-item label="名称" prop="name">
                <el-input v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item label="code" prop="code">
                <el-select v-model="userForm.code" placeholder="请选择code">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="法人" prop="legalPerson">
                <el-input v-model="userForm.legalPerson"></el-input>
            </el-form-item>
            <el-form-item label="法人身份证" prop="legalPersonId">
                <el-input v-model="userForm.legalPersonId"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="linkMan">
                <el-input v-model="userForm.linkMan"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="linkTel">
                <el-input v-model="userForm.linkTel"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="linkEmail">
                <el-input v-model="userForm.linkEmail"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('userForm')">确认</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import {Message} from 'element-ui';
  export default {
    data() {
      return {
        userForm: {
            id:0,
            name: '',
            code: '',
            legalPerson: '',
            legalPersonId: '',
            linkMan: '',
            linkTel: '',
            linkEmail: ''
        },
        rules: {
          name: [
            { required: true, message: '请名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    created(){
        this.initForm();
    },
    methods: {
        initForm(){
            let id = this.$route.params.id;
            this.getRequest('/enterprise/details',{id:id}).then(resp => {
                if (resp && resp.code==200) {
                    this.userForm = resp.obj;
                }
            })
        },
        submitForm(userForm) {
            this.$refs[userForm].validate((valid) => {
            if (valid) {
                this.putRequest('/enterprise/update', this.userForm).then(resp => {
                    if (resp && resp.code==200) {
                        Message.success({message: resp.obj});
                        this.$router.push('/user-list');
                    }
                })
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(userForm) {
            this.$refs[userForm].resetFields();
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