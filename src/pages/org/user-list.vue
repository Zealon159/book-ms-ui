<template>
    <div>
        <!--工具栏-->
        <el-form :inline="true" :model="formInline" size="mini" class="toolbar">
            <el-form-item label="用户名" >
                <el-input v-model="formInline.name" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
                <el-select v-model="formInline.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
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
            <el-table-column prop="name" label="名称"  >
            </el-table-column>
            <el-table-column prop="linkMan" label="联系人" width="140">
            </el-table-column>
            <el-table-column prop="linkTel" label="联系电话" width="140">
            </el-table-column>
            <el-table-column prop="projectCount" label="项目数" width="100">
            </el-table-column>
            <el-table-column align="center" label="操作" width="180">
            <template slot-scope="scope" >
                <el-button size="mini" type="primary" plain 
                @click="handleEdit(scope.row.id)">编辑</el-button>
                <el-button size="mini" type="danger"  plain 
                @click="handleDelete(scope.row.id)">删除</el-button>
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
        tableData: [],
        limit: 10,
        total: 0,
        currentPage: 1,
        formInline: {
          name: '',
          region: ''
        }
      }
    },
    created(){
        this.getListData();
    },
    methods:{
        handleEdit(id) {
            this.$router.push('/user-edit/'+id);
        },
        handleDelete(id) {
            this.$confirm('确定要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteRequest('/enterprise/delete',{id:id}).then(resp => {
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
            this.getRequest('/enterprise/get-list', {page:this.currentPage,limit:this.limit,name:this.formInline.name}).then(resp => {
                if (resp.code == 200) {
                    this.tableData = resp.data;
                    this.total = resp.total;
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
            this.$router.push("/user-add");
        }
    }
  };
</script>

<style scoped>
    .toolbar{
        height: 40px;
    }
</style>