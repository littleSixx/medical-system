<template>
  <div class="salesman">
    <!-- <div>
      <el-button type="success" id="add-btn" @click.native="addBtnClick()" size="mini">添 加</el-button>
    </div> -->
    <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%">
            <el-table-column
                prop="salesman_account"
                label="销售人员工号"
                width="180">
            </el-table-column>
            <el-table-column
                prop="salesman_name"
                label="销售人员姓名"
                >
            </el-table-column>
            <el-table-column
                prop="salesman_gender"
                label="性别"
                >
            </el-table-column>

            <el-table-column
                v-if="isAdmin"
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

    <!-- Form对话框（编辑） -->
    <el-dialog title="编辑销售人员信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="销售人员账号" :label-width="formLabelWidth">
          <el-input v-model="activeRow.salesman_account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="销售人员姓名" :label-width="formLabelWidth">
          <el-input v-model="activeRow.salesman_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="activeRow.salesman_gender" placeholder="请选择">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editConfirm()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- Form对话框(添加) -->
    <el-dialog title="添加销售人员" :visible.sync="dialogFormVisible2">
      <el-form :model="form">
        <el-form-item label="销售人员账号" :label-width="formLabelWidth">
          <el-input v-model="activeRow2.purchaser_account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="销售人员姓名" :label-width="formLabelWidth">
          <el-input v-model="activeRow2.purchaser_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="activeRow2.purchaser_gender" placeholder="请选择">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
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
    name: 'Salesman',
    data() {
      return {
        tableData: [{
          SalesmanId: '2016-05-02',
          SalesmanName: '王小虎',
          Gender: '内服',
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
          salesman_account: '',
          salesman_name: '',
          salesman_password: '',
          salesman_gender: '',
          identity: 1,
          salesman_account_before:'',
          token: window.localStorage.getItem('token')
        },
        activeRow2: {//要添加的药品的信息
          salesman_account: '',
          salesman_name: '',
          salesman_password: '',
          salesman_gender: '',
          identity: '',
          token: window.localStorage.getItem('token')
        },
        token: {
          token: window.localStorage.getItem('token')
        }
      }
    },
    methods: {
      handleClick(row) {
        console.log(row);
      },
      edit(row) {
        for(let key in row) {
          this.activeRow[key] = row[key]
        }
        this.activeRow.salesman_account_before = this.activeRow.salesman_account
        this.dialogFormVisible = true
      },
      editConfirm() {
        request({
          url: '/EditStaffServlet',
          method: 'post',
          data: qs.stringify(this.activeRow)
        }, res => {
          // console.log(this.activeRow)
          console.log(res.data.success)
          if(res.data.success == 1) {
            this.dialogFormVisible = false
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.requestAllStaff()
          } else if(res.data.success == 0) {
            this.$message.error('修改失败');
          }
        }, err => {
          console.log(err)
        })
      },
      delConfirm(row) {
        this.$confirm('是否要删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let deleteData = {}
          for(let key in row) {
            deleteData[key] = row[key]
          }
          deleteData.identity = 1
          deleteData.token = window.localStorage.getItem('token')
          console.log(deleteData)
          request({
            url: '/DeleteStaffServlet',
            method: 'post',
            data: qs.stringify(deleteData)
          }, res => {
            console.log(res)
            this.requestAllStaff()
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
          url: '/AddPurchaserServlet',
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
            this.requestAllStaff()
          } else if(res.data.success == 0) {
            this.$message.error('添加失败,请检查数据是否符合要求');
          }
        }, err => {
          console.log(err)
          window.alert("出错啦")
        })
      },
      requestAllStaff() {
        request({
          url: '/FindAllSalesmanServlet',
          method: 'post',
          data: qs.stringify(this.token)
        }, res => {
          console.log(res.data)
          this.tableData = res.data
        }, err => {
          console.log(err)
        })
      },
    },
    created() {
      this.requestAllStaff()
    },
}
</script>

<style scoped>
#add-btn {
  margin-bottom: 10px;
}
</style>