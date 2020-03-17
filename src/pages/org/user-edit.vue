<template>
    <div class="defaultForm">
        <el-form :model="userForm" :rules="rules" ref="userForm" size="small"
            label-width="135px" class="demo-userForm">
            <el-form-item label="部门" prop="deptId">
                <el-select v-model="userForm.deptId" placeholder="请选择部门">
                  <el-option v-for="item in deptOptions" :key="item.id" :label="item.text" :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="登录名" prop="userId">
                <span>{{userForm.userId}}</span>
            </el-form-item>
            <el-form-item label="名称" prop="userName">
                <el-input v-model="userForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="roles">
              <el-checkbox-group v-model="userForm.roles">
                <el-checkbox v-for="(item,index) in roleOptions" :key="index" :label="item.id" name="roles">{{item.text}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="联系电话" prop="phoneNumber">
                <el-input v-model="userForm.phoneNumber"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="sortNumber">
                <el-input v-model.number="userForm.sortNumber" prefix-icon="fa fa-sort-numeric-asc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('userForm')">确认</el-button>
                <el-button @click="$router.back(-1)">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {     
                deptOptions: [],
                roleOptions:[],
                userForm: {
                    userName: '',
                    userId: '',
                    deptId: '',
                    phoneNumber: '',
                    sortNumber: '',
                    attachmentIds:[],
                    roles:[]
                },
                rules: {
                userName: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ],
                deptId: [
                    { required: true, message: '请选择部门' }
                ],
                sortNumber: [
                    { required: true, message: '请输入排序' },
                    { type: 'number', message: '必须为数字！' }
                ]
                }
            };
        },
        created(){
            this.initForm();
        },
        methods: {
            async initForm(){
                await this.getDeptOptions();
                await this.getRolesData();
                await this.getFormData();
            },
            submitForm(userForm) {
                this.$refs[userForm].validate((valid) => {
                if (valid) {
                    this.putRequest('/system/org/user/update', this.userForm).then(resp => {
                        if (resp && resp.code==200) {
                            this.$router.push('/org/user-list');
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            resetForm(userForm) {
                let userId = this.userForm.userId;
                this.$refs[userForm].resetFields();
                this.userForm.userId = userId;
            },
            async getDeptOptions(){
                // 部门下拉
                this.getRequest('/system/org/dept/get-select-data', {}).then(resp => {
                    if (resp.code == 200) {
                        this.deptOptions = resp.data;
                    }
                })
            },
            async getFormData(){
                let id = this.$route.params.id;
                this.getRequest('/system/org/user/edit-details',{userId:id}).then(resp => {
                    if (resp && resp.code==200) {
                        this.userForm = resp.data;
                    }
                })
            },
            async getRolesData(){
                // 角色
                this.getRequest('/system/org/role/get-options', {}).then(resp => {
                    if (resp.code == 200) {
                        this.roleOptions = resp.data;
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