<template>
  <div class="customer">
    <div>
      <el-button type="success" id="add-btn" @click.native="addBtnClick()" size="mini">添 加</el-button>
    </div>
    <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%">
            <el-table-column
                prop="client_no"
                label="顾客编号"
                >
            </el-table-column>
            <el-table-column
                prop="client_name"
                label="顾客姓名"
                >
            </el-table-column>
            <el-table-column
                prop="client_gender"
                label="顾客性别"
                >
            </el-table-column>
            <el-table-column
                prop="client_age"
                label="顾客年龄"
                >
            </el-table-column>
            <el-table-column
                prop="client_address"
                label="顾客住址"
                width="180">
            </el-table-column>
            <el-table-column
                prop="client_phone"
                label="顾客电话"
                width="180">
            </el-table-column>
            <el-table-column
                prop="client_symptom"
                label="症状"
                width="180">
            </el-table-column>
            <el-table-column
                prop="total"
                label="购药总金额"
                >
            </el-table-column>
            <el-table-column
                prop="client_is_first"
                label="是否首次购药"
                >
            </el-table-column>

            <el-table-column
                v-if="this.identity == 2 || this.identity == 1"
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
    <el-dialog title="编辑顾客信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="顾客编号" :label-width="formLabelWidth">
          <el-input v-model="activeRow.client_no" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="顾客姓名" :label-width="formLabelWidth">
          <el-input v-model="activeRow.client_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="顾客性别" :label-width="formLabelWidth">
          <el-input v-model="activeRow.client_gender" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="顾客年龄" :label-width="formLabelWidth">
          <el-input v-model="activeRow.client_age" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editConfirm()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- Form对话框(添加) -->
    <el-dialog title="添加顾客信息" :visible.sync="dialogFormVisible2">
      <el-form :model="form">
        <el-form-item label="顾客编号" :label-width="formLabelWidth">
          <el-input v-model="activeRow2.client_no" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="顾客姓名" :label-width="formLabelWidth">
          <el-input v-model="activeRow2.client_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="顾客性别" :label-width="formLabelWidth">
          <el-select v-model="activeRow2.client_gender" placeholder="请选择">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="顾客年龄" :label-width="formLabelWidth">
          <el-input v-model="activeRow2.client_age" autocomplete="off"></el-input>
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
    name: 'Customer',
    data() {
      return {
        identity: this.$store.state.userInfo.identity,
        tableData: [{
          CustomerId: '2016-05-02',
          CustomerName: '王小虎',
          Total: 4534,
          IsFirst: '好！',
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
          client_no: '',
          client_name: '',
          client_gender: '',
          client_age: '',
          client_address: '',
          client_phone: '',
          client_symptom: '',
          client_is_first: '',
          total: '',
          client_no_before: '',
          token: window.localStorage.getItem('token')
        },
        activeRow2: {//要添加的药品的信息
          client_no: '',
          client_name: '',
          client_gender: '',
          client_age: '',
          client_address: '',
          client_phone: '',
          client_symptom: '',
          client_is_first: '',
          total: '',
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
        this.activeRow.client_no_before = this.activeRow.client_no
        this.dialogFormVisible = true
      },
      editConfirm() {
        request({
          url: '/EditClientServlet',
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
            this.requestAllClient()
          } else if(res.data.success == 0) {
            this.$message.error('修改失败');
          }
        }, err => {
          console.log("出错啦")
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
          deleteData.token = window.localStorage.getItem('token')
          console.log(deleteData)
          request({
            url: '/DeleteClientServlet',
            method: 'post',
            data: qs.stringify(deleteData)
          }, res => {
            console.log(res)
            this.requestAllClient()
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
          url: '/AddClientServlet',
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
            this.requestAllClient()
          } else if(res.data.success == 0) {
            this.$message.error('添加失败,请检查数据是否符合要求');
          }
        }, err => {
          console.log(err)
          window.alert("出错啦")
        })
      },
      requestAllClient() {
        request({
          url: '/FindAllClientServlet',
          method: 'post',
          data: qs.stringify(this.token)
        }, res => {
          console.log(res.data)
          this.tableData = res.data
          for(let key in this.tableData) {
            for(let key2 in this.tableData[key]) {
              if(!this.tableData[key][key2]) {
                this.tableData[key][key2] = "暂无信息"
                console.log(key2)
                if(key2 == 'client_is_first') {
                  // console.log('进去啦')
                  // console.log(this.tableData[key][key2])
                  if(this.tableData[key][key2] == '暂无信息') {//当首次购药为0时，显示否
                    this.tableData[key][key2] = '否'
                  }
                }
              } else if(this.tableData[key][key2]) {//当首次购药为1时，显示是
                if(key2 == 'client_is_first') {
                  if(this.tableData[key][key2] == 1) {
                    this.tableData[key][key2] = '是'
                  }
                }
              }
            }
          }
        }, err => {
          console.log(err)
        })
      }
      
    },
    created() {
      this.requestAllClient()
    },
    // created() {
    //   request({
    //     url: '/FindAllClientServlet',
    //     method: 'get'
    //   }, res => {
    //     console.log(res.data)
    //     this.tableData = res.data
    //   }, err => {
    //     console.log(err)
    //   })
    // }
}
</script>

<style scoped>
#add-btn {
  margin-bottom: 10px;
}
</style>