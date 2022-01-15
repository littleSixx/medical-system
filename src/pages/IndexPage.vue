<template>
  <div class="index-page">
      <p class="faster-use">快捷方式</p>
    
      <div class="column">
          <Shortcut @click.native="checkoutShortcut()" v-if="this.identity == 2 || this.identity == 1"><p slot="insert-font" class="insert-font">结账</p></Shortcut>
          <!-- <Shortcut @click.native=""><p slot="insert-font" class="insert-font">添加采购人员</p></Shortcut> -->
          <Shortcut @click.native="dialogFormVisible=true" v-if="this.identity == 2 || this.identity == 1"><p slot="insert-font" class="insert-font">添加顾客</p></Shortcut>
          <!-- <Shortcut><p slot="insert-font" class="insert-font">添加销售人员</p></Shortcut> -->
          <Shortcut @click.native="dialogFormVisible3=true" v-if="this.identity == 2 || this.identity == 0"><p slot="insert-font" class="insert-font">添加药品经销商</p></Shortcut>
          <Shortcut @click.native="dialogFormVisible2=true" v-if="this.identity == 2 || this.identity == 0"><p slot="insert-font" class="insert-font">添加药品</p></Shortcut>
      </div>
          <!-- Form对话框(添加) -->
    <el-dialog title="添加顾客" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="顾客编号" :label-width="formLabelWidth">
          <el-input v-model="client.client_no" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="顾客姓名" :label-width="formLabelWidth">
          <el-input v-model="client.client_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="顾客性别" :label-width="formLabelWidth">
          <el-select v-model="client.client_gender" placeholder="请选择">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="顾客年龄" :label-width="formLabelWidth">
          <el-input v-model="client.client_age" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addClient()">确 定</el-button>
      </div>
    </el-dialog>

          <!-- Form对话框(药品) -->
    <el-dialog title="添加药品信息" :visible.sync="dialogFormVisible2">
      <el-form :model="form">
        <el-form-item label="药品编码" :label-width="formLabelWidth">
          <el-input v-model="medicine.medicine_no" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="药名" :label-width="formLabelWidth">
          <el-input v-model="medicine.medicine_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="服用方法" :label-width="formLabelWidth">
          <el-select v-model="medicine.medicine_mode" placeholder="请选择">
            <el-option label="内服" value="内服"></el-option>
            <el-option label="外用" value="外用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="功效" :label-width="formLabelWidth">
          <el-input v-model="medicine.medicine_efficacy" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="库存" :label-width="formLabelWidth">
          <el-input v-model="medicine.medicine_reserve" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="经销商" :label-width="formLabelWidth">
          <el-select v-model="medicine.medicine_dealer_no" placeholder="请选择">
            <el-option v-for="(item,index) in dealerList" v-bind:key="index" :label="item.dealer_name" :value="item.dealer_no"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="采购价格" :label-width="formLabelWidth">
          <el-input v-model="medicine.medicine_purchase_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="销售价格" :label-width="formLabelWidth">
          <el-input v-model="medicine.medicine_selling_price" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="addMedicine()">确 定</el-button>
      </div>
    </el-dialog>

        <!-- Form对话框(经销商) -->
    <el-dialog title="添加经销商" :visible.sync="dialogFormVisible3">
      <el-form :model="form">
        <el-form-item label="经销商编号" :label-width="formLabelWidth">
          <el-input v-model="dealer.dealer_no" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="经销商名" :label-width="formLabelWidth">
          <el-input v-model="dealer.dealer_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="addDealer()">确 定</el-button>
      </div>
    </el-dialog>

        <!-- Form对话框(结账) -->
    <el-dialog title="结账" :visible.sync="dialogFormVisible4">
      <el-form :model="form">
        <el-form-item label="顾客姓名" :label-width="formLabelWidth">
          <el-select v-model="chosenClient.client_name" placeholder="请选择">
            <el-option @click.native="chooseClient(item,index)" v-for="(item,index) in clients" :label="item.client_name" :value="item.client_no" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="顾客编号" :label-width="formLabelWidth">
          <el-input v-model="chosenClient.client_no" autocomplete="off" disabled></el-input>
        </el-form-item>
        <!-- <el-form-item label="顾客性别" :label-width="formLabelWidth">
          <el-select v-model="client.client_gender" placeholder="请选择"  disabled>
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="顾客年龄" :label-width="formLabelWidth">
          <el-input v-model="chosenClient.client_age" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="购买药物" :label-width="formLabelWidth">
          <el-select v-model="chosenMedicine.medicine_name" placeholder="请选择">
            <el-option @click.native="chooseMedicine(item,index)" v-for="(item,index) in medicines" :label="item.medicine_name" :value="item.medicine_no" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库存" :label-width="formLabelWidth">
          <el-input v-model="chosenMedicine.medicine_reserve" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="购买数量" :label-width="formLabelWidth">
          <el-input v-model="chosenMedicine.medicine_amount" autocomplete="off"></el-input>
        </el-form-item>
        <div v-show="chosenClient.client_is_first">
          <el-divider content-position="center" class="divider" style="color:#41b883;">首次结账需要完善相关信息</el-divider>
          <el-form-item label="顾客住址" :label-width="formLabelWidth">
            <el-input v-model="chosenClient.client_address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="顾客电话" :label-width="formLabelWidth">
            <el-input v-model="chosenClient.client_phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="顾客症状" :label-width="formLabelWidth">
            <el-input v-model="chosenClient.client_symptom" autocomplete="off"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible4 = false">取 消</el-button>
        <el-button type="primary" @click="checkout()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from 'qs'
import {request} from '@/network/request.js'
import Shortcut from '@/components/Shortcut'

export default {
    name: 'IndexPage',
    components: {
        Shortcut,
    },
    data() {
        return {
            identity: this.$store.state.userInfo.identity,
            title:'title',
            activeRow: {},
            activeSelect: {},
            client: {
                client_no: '',
                client_name: '',
                client_gender: '',
                client_age: '',
                client_address: '',
                client_phone: '',
                client_symptom: '',
                token: window.localStorage.getItem('token')
            },
            medicines: [],
            clients: [],
            chosenClient: {
                client_no: '',
                client_name: '',
                client_gender: '',
                client_age: '',
                client_is_first:0,
                client_address: '',
                client_phone: '',
                client_symptom: '',
                token: window.localStorage.getItem('token')
            },
            chosenMedicine: {
                medicine_no: '',
                medicine_name: '',
                medicine_mode: '',
                medicine_efficacy: '',
                medicine_reserve: '',
                medicine_dealer_no: '',
                medicine_purchase_price: '',
                medicine_selling_price: '',
                medicine_amount:0,
                token: window.localStorage.getItem('token')
            },
            medicine: {//要添加的药品的信息
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
            dealer: {//要添加的药品的信息
                dealer_no: '',
                dealer_name: '',
                token: window.localStorage.getItem('token')
            },
            dialogFormVisible: false,
            dialogFormVisible2: false,
            dialogFormVisible3: false,
            dialogFormVisible4: false,
            formLabelWidth: '120px',
            form: {
                name: '',
                region: '',
            },
            dealerList: [],
            token: {
                token: window.localStorage.getItem('token')
            }
        }
    },
    methods: {
        checkoutShortcut() {
            this.requestAllMedicine()
            this.requestAllDealer()
            this.requestAllClient()
            this.dialogFormVisible4 = true
        },
        checkout() {
          console.log("提交数据：")
            let data = Object.assign(this.chosenClient,this.chosenMedicine)
            console.log(data)
            request({
              url: '/CheckoutServlet',
              method: 'post',
              data: qs.stringify(data)
            }, res => {
              console.log(res.data)
              if(res.data.success == 1) {
                this.$message({
                  message: '结账成功',
                  type: 'success'
                });
                this.dialogFormVisible4 = false
                // this.requestAllClient()
                this.chosenMedicine.medicine_reserve -= this.chosenMedicine.medicine_amount
              } else if(res.data.success == -1) {
                this.$message.error('结账失败,请检查数据是否符合要求');
              }
              
            }, err => {
              console.log(err)
              this.$message.error('出错啦');
            })
            
        },
        chooseClient(item,index) {
            for(let key in this.clients[index]) {
                this.chosenClient[key] = this.clients[index][key]
            }
            console.log("选中了顾客：")
            console.log(this.chosenClient)
        },
        chooseMedicine(item,index) {
            for(let key in this.medicines[index]) {
                this.chosenMedicine[key] = this.medicines[index][key]
            }
            console.log("选中了药品：")
            console.log(this.chosenMedicine)
        },
        addClient() {
            request({
                url: '/AddClientServlet',
                method: 'post',
                data: qs.stringify(this.client)
            }, res => {
            console.log(res.data)
            if(res.data.success == 1) {
                this.$message({
                message: '添加成功',
                type: 'success'
                });
                this.dialogFormVisible = false
                // this.requestAllClient()
            } else if(res.data.success == -1) {
                this.$message.error('添加失败,请检查数据是否符合要求');
            }
            }, err => {
                console.log(err)
                this.$message.error('出错啦');
            })

        },
        addMedicine() {
            request({
                url: '/AddMedicineServlet',
                method: 'post',
                data: qs.stringify(this.medicine)
            }, res => {
            console.log(res.data.success)
            if(res.data.success == 1) {
                this.$message({
                    message: '添加成功',
                    type: 'success'
                });
                this.dialogFormVisible2 = false
                // this.requestAllMedicine()
            } else if(res.data.success == 0) {
                this.$message.error('添加失败,请检查数据是否符合要求');
            } else if(res.data.success == -1) {
                window.alert("登陆失效，请重新登录")
            }
            }, err => {
                console.log(err)
                this.$message.error('出错啦');
            })
        },
        addDealer() {
            request({
                url: '/AddDealerServlet',
                method: 'post',
                data: qs.stringify(this.dealer)
            }, res => {
                console.log(res.data.success)
                if(res.data.success == 1) {
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.dialogFormVisible3 = false
                    // this.requestAllDealer()
                } else if(res.data.success == 0) {
                    this.$message.error('添加失败,请检查数据是否符合要求');
                }
            }, err => {
                console.log(err)
                this.$message.error('添加失败,请检查数据是否符合要求');
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
        },
        requestAllMedicine() {
            console.log(qs.stringify(this.token))
            request({
                url: '/FindAllMedicineServlet',
                method: 'post',
                data: qs.stringify(this.token)
            }, res => {
                console.log(res.data)
                this.medicines = res.data
                if(res.data.success == -1) {
                    window.alert("登陆失效，请重新登录")
                }
            }, err => {
                console.log(err)
            })
        },
        requestAllClient() {
            request({
                url: '/FindAllClientServlet',
                method: 'post',
                data: qs.stringify(this.token)
            }, res => {
                console.log(res.data)
                this.clients = res.data
                // for(let key in this.tableData) {
                //     for(let key2 in this.tableData[key]) {
                //         if(!this.tableData[key][key2]) {
                //             this.tableData[key][key2] = "暂无信息"
                //         }
                //     }
                // }
            }, err => {
                console.log(err)
            })
        }

    },
    created() {
      this.requestAllMedicine()
      this.requestAllDealer()
      this.requestAllClient()
    }
}
</script>

<style scoped>
.column {
    display: flex;
    justify-content: left;
    /* justify-content:space-between; */
    flex-wrap: wrap;
}
.faster-use {
    font-size: 24px;
    /* margin-bottom: 20px; */
}

.shortcut {
    margin-left: 50px;
    margin-top: 40px;
}

.divider .el-divider__text {
  color: #41b883;
}
</style>