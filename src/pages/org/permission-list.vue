<template>
    <div>
        <!--工具栏-->
        <el-form :inline="true" size="mini" class="toolbar">
            <el-form-item>
                <el-button type="primary" @click="gotoAdd" >新增</el-button>
            </el-form-item>
        </el-form>
        <!--表格区-->
        <el-table :data="tableData" border style="width: 100%;" 
            row-key="id"
            lazy
            :load="loadSubListData"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            size="small">
            <template slot="empty">
                还没有数据呢~ (⊙︿⊙)
            </template>
            <el-table-column prop="name" label="名称"  >
                <template slot-scope="scope" >
                    {{scope.row.name}}
                    <i :class="scope.row.icon"></i>
                </template>
            </el-table-column>
            <el-table-column prop="resourceUrl" label="URL" width="180">
            </el-table-column>
            <el-table-column prop="sortNumber" label="排序" width="90">
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
    </div>
</template>

<script>
  export default {
    data() {
        return {
            tableData: []
        }
    },
    created(){
        this.getListData();
    },
    methods:{
        handleEdit(id) {
            this.$router.push('/org/permission-edit/'+id);
        },
        handleDelete(id) {
            this.$confirm('确定要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteRequest('/system/org/permission/delete',{id:id}).then(resp => {
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
            this.getRequest('/system/org/permission/get-list', {parentId:0}).then(resp => {
                if (resp.code == 200) {
                    this.tableData = resp.data;
                }
            })
        },
        // 加载子节点
        loadSubListData(tree, treeNode, resolve){
            this.getRequest('/system/org/permission/get-list', {parentId:tree.id}).then(resp => {
                if (resp.code == 200) {
                    resolve(resp.data);
                }
            })
        },
        gotoAdd(){
            this.$router.push("/org/permission-add");
        }
    }
  };
</script>

<style scoped>
    .toolbar{
        height: 40px;
    }
</style>