<template>
  <div class="dealer">
    <div>
      <el-button type="success" id="add-btn" @click.native="addBtnClick()" size="mini">添 加</el-button>
    </div>
    <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%">
            <el-table-column
                prop="dealer_no"
                label="经销商编号"
                width="180">
            </el-table-column>
            <el-table-column
                prop="dealer_name"
                label="经销商名"
                >
            </el-table-column>
            <el-table-column
                prop="total"
                label="供应药品总金额"
                >
            </el-table-column>

            <el-table-column
                v-if="this.identity == 2 || this.identity == 0"
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="delConfirm(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>

            <el-table-column
                v-if="!isAdmin"
                fixed="right"
                label="操作2"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">-</el-button>
                    <el-button   el-button type="text" size="small">+</el-button>
                </template>
            </el-table-column>
    </el-table>

    <!-- Form对话框(编辑) -->
    <el-dialog title="编辑经销商信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="经销商编号" :label-width="formLabelWidth">
          <el-input v-model="activeRow.dealer_no" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="经销商名" :label-width="formLabelWidth">
          <el-input v-model="activeRow.dealer_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editConfirm()">确 定</el-button>
      </div>
    </el-dialog>

        <!-- Form对话框(添加) -->
    <el-dialog title="添加经销商" :visible.sync="dialogFormVisible2">
      <el-form :model="form">
        <el-form-item label="经销商编号" :label-width="formLabelWidth">
          <el-input v-model="activeRow2.dealer_no" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="经销商名" :label-width="formLabelWidth">
          <el-input v-model="activeRow2.dealer_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="addConfirm()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from 'qs'
import {request} from '@/network/request.js'
export default {
    name: 'Dealer',
     data() {
      return {
        identity: this.$store.state.userInfo.identity,
        tableData: [{
          DealerId: '2016-05-02',
          DealerName: '王小d虎',
          Total: 453,
        }],
        isAdmin: true,
        dialogFormVisible: false,
        dialogFormVisible2: false,
        formLabelWidth: '120px',
        form: {
          name: '',
          region: ''
        },
        activeRow: {//选中的当前行的信息
          dealer_no: '',
          dealer_name: '',
          dealer_no_before:'',
          token: window.localStorage.getItem('token')
        },
        activeRow2: {//要添加的药品的信息
          dealer_no: '',
          dealer_name: '',
          token: window.localStorage.getItem('token')
        },
        token: {
          token: window.localStorage.getItem('token')
        }
      }
    },
    methods: {
      edit(row) {
        for(let key in row) {
          this.activeRow[key] = row[key]
        }
        this.activeRow.dealer_no_before = this.activeRow.dealer_no
        this.dialogFormVisible = true
        console.log(this.activeRow)
      },
      editConfirm() {
        request({
          url: '/EditDealerServlet',
          method: 'post',
          data: qs.stringify(this.activeRow)
        }, res => {
          
          console.log(res.data.success)
          if(res.data.success == 1) {
            this.dialogFormVisible = false
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.requestAllDealer()
          } else if(res.data.success == 0) {
            this.$message.error('修改失败,请检查数据是否符合要求');
          }
        }, err => {
          console.log("出错啦")
        })
      },
      delConfirm(row) {
        this.$confirm('是否要删除该经销商？由该经销商提供的药品也会被删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let deleteData = {}
          for(let key in row) {
            deleteData[key] = row[key]
          }
          deleteData.token = window.localStorage.getItem('token')
          console.log(deleteData)
          request({
            url: '/DeleteDealerServlet',
            method: 'post',
            data: qs.stringify(deleteData)
          }, res => {
            console.log(res)
            this.requestAllDealer()
          }, err => {
            console.log(err)
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      confirm() {
        this.dialogFormVisible = false
      },
      addBtnClick() {
        this.dialogFormVisible2 = true
      },
      addConfirm() {
        request({
          url: '/AddDealerServlet',
          method: 'post',
          data: qs.stringify(this.activeRow2)
        }, res => {
          console.log(res.data.success)
          if(res.data.success == 1) {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.dialogFormVisible2 = false
            this.requestAllDealer()
          } else if(res.data.success == 0) {
            this.$message.error('添加失败,请检查数据是否符合要求');
          }
        }, err => {
          console.log(err)
          window.alert("出错啦")
        })
      },
      requestAllDealer() {
        request({
          url: '/FindAllDealerServlet',
          method: 'post',
          data: qs.stringify(this.token)
        }, res => {
          console.log(res.data)
          this.tableData = res.data
        }, err => {
          console.log(err)
        })
      }
    },
    created() {
      this.requestAllDealer()
    }
}
</script>

<style scoped>
#add-btn {
  margin-bottom: 10px;
}
</style>