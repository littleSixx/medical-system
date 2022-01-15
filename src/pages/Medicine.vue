<template>
  <div class="medicine">
    <div>
      <el-button type="success" id="add-btn" @click.native="addBtnClick()" size="mini">添 加</el-button>
    </div>
    <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%">
            <el-table-column
                prop="medicine_no"
                label="药品编码"
                width="180">
            </el-table-column>
            <el-table-column
                prop="medicine_name"
                label="药名"
                >
            </el-table-column>
            <el-table-column
                prop="medicine_mode"
                label="服用方法"
                >
            </el-table-column>
            <el-table-column
                prop="medicine_efficacy"
                label="功效"
                >
            </el-table-column>
            <el-table-column
                prop="medicine_reserve"
                label="库存"
                >
            </el-table-column>
            <el-table-column
                prop="medicine_dealer_no"
                label="经销商编号"
                >
            </el-table-column>
            <el-table-column
                prop="medicine_purchase_price"
                label="采购价格"
                >
            </el-table-column>
            <el-table-column
                prop="medicine_selling_price"
                label="销售价格"
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

    <!-- Form对话框(修改) -->
    <el-dialog title="编辑药品信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="药品编码" :label-width="formLabelWidth">
          <el-input v-model="activeRow.medicine_no" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="药名" :label-width="formLabelWidth">
          <el-input v-model="activeRow.medicine_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="服用方法" :label-width="formLabelWidth">
          <el-select v-model="activeRow.medicine_mode" placeholder="请选择">
            <el-option label="内服" value="内服"></el-option>
            <el-option label="外用" value="外用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="功效" :label-width="formLabelWidth">
          <el-input v-model="activeRow.medicine_efficacy" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="库存" :label-width="formLabelWidth">
          <el-input v-model="activeRow.medicine_reserve" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="经销商" :label-width="formLabelWidth">
          <el-select v-model="activeRow.medicine_dealer_no" placeholder="请选择">
            <el-option v-for="(item,index) in dealerList" v-bind:key="index" :label="item.dealer_name" :value="item.dealer_no"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="采购价格" :label-width="formLabelWidth">
          <el-input v-model="activeRow.medicine_purchase_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="销售价格" :label-width="formLabelWidth">
          <el-input v-model="activeRow.medicine_selling_price" autocomplete="off"></el-input>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editConfirm()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- Form对话框(添加) -->
    <el-dialog title="添加药品信息" :visible.sync="dialogFormVisible2">
      <el-form :model="form">
        <el-form-item label="药品编码" :label-width="formLabelWidth">
          <el-input v-model="activeRow2.medicine_no" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="药名" :label-width="formLabelWidth">
          <el-input v-model="activeRow2.medicine_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="服用方法" :label-width="formLabelWidth">
          <el-select v-model="activeRow2.medicine_mode" placeholder="请选择">
            <el-option label="内服" value="内服"></el-option>
            <el-option label="外用" value="外用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="功效" :label-width="formLabelWidth">
          <el-input v-model="activeRow2.medicine_efficacy" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="库存" :label-width="formLabelWidth">
          <el-input v-model="activeRow2.medicine_reserve" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="经销商" :label-width="formLabelWidth">
          <el-select v-model="activeRow2.medicine_dealer_no" placeholder="请选择">
            <el-option v-for="(item,index) in dealerList" v-bind:key="index" :label="item.dealer_name" :value="item.dealer_no"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="采购价格" :label-width="formLabelWidth">
          <el-input v-model="activeRow2.medicine_purchase_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="销售价格" :label-width="formLabelWidth">
          <el-input v-model="activeRow2.medicine_selling_price" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="addConfirm()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- <div style="width:100px;height:100px;background-color:red;" v-for="(item) in test" v-bind:key="item" :label="index" :value="item">{{item}}</div> -->
  </div>
</template>

<script>
import qs from 'qs'
import {request} from "@/network/request.js"
export default {
    name: 'Medicine',
     data() {
      return {
        identity: this.$store.state.userInfo.identity,
        tableData: [{
          MedicineCode: '2016-05-01',
          MedicineName: '王小虎',
          MedicineMode: '外用',
          MedicineEfficacy: '非常好！',
          MedicineReserve: 666,
          MedicineDealer: "one"
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
          medicine_no: '',
          medicine_name: '',
          medicine_mode: '',
          medicine_efficacy: '',
          medicine_reserve: 0,
          medicine_dealer_no: '',
          medicine_purchase_price: 0,
          medicine_selling_price: 0,
          medicine_no_before: '',
          token: window.localStorage.getItem('token')
        },
        activeRow2: {//要添加的药品的信息
          medicine_no: '',
          medicine_name: '',
          medicine_mode: '',
          medicine_efficacy: '',
          medicine_reserve: '',
          medicine_dealer_no: '',
          medicine_purchase_price: '',
          medicine_selling_price: '',
          token: window.localStorage.getItem('token')
        },
        dealerList: [],
        token: {
          token: window.localStorage.getItem('token')
        }
        // test: ["one","two","three","four"]
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
        this.activeRow.medicine_no_before = this.activeRow.medicine_no
        this.dialogFormVisible = true
      },
      editConfirm() {
        request({
          url: '/EditMedicineServlet',
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
            this.requestAllMedicine()
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
            url: '/DeleteMedicineServlet',
            method: 'post',
            data: qs.stringify(deleteData)
          }, res => {
            console.log(res)
            this.requestAllMedicine()
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
          url: '/AddMedicineServlet',
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
            this.requestAllMedicine()
          } else if(res.data.success == 0) {
            this.$message.error('添加失败,请检查数据是否符合要求');
          } else if(res.data.success == -1) {
            window.alert("登陆失效，请重新登录")
          }
        }, err => {
          console.log(err)
          window.alert("出错啦")
        })
      },
      requestAllMedicine() {
        console.log(qs.stringify(this.token))
        request({
          url: '/FindAllMedicineServlet',
          method: 'post',
          data: qs.stringify(this.token)
        }, res => {
          console.log(res.data)
          this.tableData = res.data
          if(res.data.success == -1) {
            window.alert("登陆失效，请重新登录")
          }
        }, err => {
          console.log(err)
        })
      },
      requestAllDealer() {
        request({
          url: '/FindAllDealerServlet',
          method: 'post',
          data: qs.stringify(this.token)
        }, res => {
          this.dealerList = res.data
          console.log(this.dealerList)
          if(res.data.success == -1) {
            window.alert("登陆失效，请重新登录")
          }
        })
      }
      
    },
    created() {
      this.requestAllMedicine()
      this.requestAllDealer()
    }
}
</script>

<style scoped>
#add-btn {
  margin-bottom: 10px;
}

</style>