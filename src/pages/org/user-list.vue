<template>
    <div>
        <!--工具栏-->
        <el-form :inline="true" :model="formInline" size="mini" class="toolbar">
            <el-form-item label="关键字" >
                <el-input v-model="formInline.keyword" placeholder="用户名/ID"></el-input>
            </el-form-item>
            <el-form-item label="所属组织">
                <el-select v-model="formInline.deptId" placeholder="所属组织">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="(item,index) in deptSelectData" :key="index" :label="item.text" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="gotoAdd" >新增</el-button>
            </el-form-item>
        </el-form>
        <!--表格区-->
        <el-table :data="tableData" border style="width: 100%; " size="small">
            <template slot="empty">
                还没有数据呢~ (⊙︿⊙)
            </template>
            <el-table-column prop="sortNumber" label="序" width="50" align="center">
            </el-table-column>
            <el-table-column prop="userId" label="用户名"  >
            </el-table-column>
            <el-table-column prop="userName" label="中文名" width="140">
            </el-table-column>
            <el-table-column prop="deptName" label="组织" width="140">
            </el-table-column>
            <el-table-column prop="phoneNumber" label="联系电话" width="140" align="center">
            </el-table-column>
            <el-table-column prop="freezeStatus" width="100" align="center">
                <template slot="header">
                    冻结
                    <el-tooltip class="item" effect="dark" content="冻结状态的用户将无法登录系统哦！" placement="top">
                         <i class="el-icon-question"></i>
                    </el-tooltip>
                </template>
                <template slot-scope="scope" >
                    <el-switch
                        @change="handleFreezeStatus(scope.row)" 
                        v-model="scope.row.freezeStatus"
                        active-color="#ff4949"
                        inactive-color="#cccccc">
                    </el-switch>
                </template>
            </el-table-column>

            <el-table-column align="center" label="重置" width="80" >
                <template slot-scope="scope" >
                    <el-button size="mini" type="warning" @click="handleResetPwd(scope.row.userId)" plain circle>
                        <i class="el-icon-refresh-left"></i>
                    </el-button>
                </template>
            </el-table-column>
            
            <el-table-column align="center" label="操作" width="180" >
                <template slot-scope="scope" >
                    <el-button size="mini" type="primary" plain 
                    @click="handleEdit(scope.row.userId)">编辑</el-button>
                    <el-button size="mini" type="danger"  plain 
                    @click="handleDelete(scope.row.userId)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页区-->
        <div class="Pagination" style="text-align: left;margin-top: 10px;">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="limit"
                layout="total, prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
        return {
            deptSelectData: [],
            tableData: [],
            limit: 10,
            total: 0,
            currentPage: 1,
            formInline: {
                keyword: '',
                deptId: ''
            }
        }
    },
    created(){
        this.getListData();
        this.getDeptData();
    },
    methods:{
        // 编辑
        handleEdit(userId) {
            this.$router.push('/org/user-edit/'+userId);
        },
        // 冻结操作
        handleFreezeStatus(row){
            // 初始状态
            let originalStatus = false;
            let msg = '确定要冻结该用户吗？';
            if(row.freezeStatus == false){
                originalStatus = true;
                msg = '确定要取消冻结该用户吗？';
            }
            this.$confirm(msg, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.putRequest('/system/org/user/update',{userId:row.userId,freezeStatus:row.freezeStatus});
            }).catch(() => {
                // 取消操作，还原状态
                row.freezeStatus = originalStatus;
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });
            });
        },
        // 重置密码
        handleResetPwd(userId){
            this.$confirm('确定要重置该用户的密码为 123456 吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.putRequest('/system/org/user/update-pwd',{userId:userId,userPwd:'123456'});
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });
            });
        },
        // 删除
        handleDelete(userId) {
            this.$confirm('确定要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteRequest('/system/org/user/delete',{userId:userId}).then(resp => {
                    if (resp.code == 200) {
                        this.getListData();
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });
            });
        },
        getListData(){
            // 用户列表
            this.getRequest('/system/org/user/get-list', 
                {page:this.currentPage,limit:this.limit,keyword:this.formInline.keyword,deptId:this.formInline.deptId}
                ).then(resp => {
                if (resp.code == 200) {
                    this.tableData = resp.data;
                    this.total = resp.total;
                }
            })
        },
        getDeptData(){
            // 部门下拉
            this.getRequest('/system/org/dept/get-select-data', {}).then(resp => {
                if (resp.code == 200) {
                    this.deptSelectData = resp.data;
                }
            })
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getListData();
        },
        onSearch(){
            this.getListData();
        },
        gotoAdd(){
            this.$router.push("/org/user-add");
        }
    }
  };
</script>

<style scoped>
    .toolbar{
        height: 40px;
    }
</style>