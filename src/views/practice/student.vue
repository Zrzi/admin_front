<template>
  <el-scrollbar max-height=750px >
  <div
      class="content">
    <div
        style="padding: 10px"
        class="app-container">
      <div v-if="showTable == 1">
        <div v-if="showQuery == 1" style="margin-bottom: 5px">
          <div
              v-for="(item, index) in querList"
              :key="index"
              style="display: inline-block"
          >
            {{ item.label }}
            <el-input
                v-if="item.type == 'input'"
                v-model="item.value"
                style="width: 60%"
            />
            <el-select
                v-if="item.type == 'select'"
                v-model="item.value"
                placeholder="请选择"
                style="width: 60%"
            >
              <el-option
                  v-for="items in item.option"
                  :key="items.value"
                  :label="items.label"
                  :value="items.value"
              >
              </el-option>
            </el-select>
          </div>

          <el-button type="primary" size="mini"  @click="queryTable()" round
          ><i class="el-icon-search"></i>查询</el-button
          >
          <el-button type="primary" size="mini" @click="addItem()" round
          ><i class="el-icon-plus"></i>添加</el-button
          >
        </div>

        <el-table
            class="table-content"
            style="width: 100%"
            size="mini"
            :data="
          tableList.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
            border
        >
          <el-table-column
              label="序号"
              fixed="left"
              width="50"
              align="center"
              color="black"
          >
            <template v-slot="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
              v-for="col in colsList"
              :key="col.prop"
              :label="col.label"
              :prop="col.prop"
              align="center"
              color="black"
          >
            <template v-slot="scope" v-if="col.type != undefined">
              <div v-if="col.type === 'text'">
               {{scope.row[col.prop]}}
              </div>
              <div v-if="col.type === 'link'">
                <el-button
                    type="text"
                    @click="navigate(scope.row.id, scope.$index, col.prop)"
                    style="margin-right: 5px"
                    size="mini"
                >{{ scope.row[col.prop] }}</el-button
                >
              </div>
              <div v-if="col.type === 'opers'">
                <div
                    v-for="c in col.opers"
                    :key="c"
                    style="display: inline-block"
                >
                  <el-button
                      type="primary"
                      v-if="c.name == 'edit'"
                      @click="editRow(scope.row.id)"
                      style="margin-right: 5px"
                      size="mini"
                  ><i class="el-icon-edit"></i>编辑</el-button
                  >
                  <el-popconfirm
                      size="mini"
                      v-if="c.name == 'choose'"
                      confirm-button-text="确定"
                      @confirm="chooseRow()"
                      cancel-button-text="不，谢谢"
                      @ancel=1
                      :icon="InfoFilled"
                      icon-color="red"
                      title="确定要与他组队吗？"
                  >
                    <template #reference>
                  <el-button
                      type="primary"
                      v-if="c.name == 'choose'"
                      style="margin-right: 5px"
                      size="mini"
                      :disabled="isdisabled"
                  ><i class="el-icon-edit"></i>组队</el-button
                  ></template>
                  </el-popconfirm>
                  <el-button
                      type="success"
                      v-if="c.name == 'detail'"
                      @click="detailRow(scope.row.id)"
                      style="margin-right: 5px"
                      size="mini"
                  ><i class="el-icon-document"></i>详情</el-button
                  >
                  <el-popconfirm
                      size="mini"
                      v-if="c.name == 'delete'"
                      confirm-button-text="确定"
                      @confirm="deleteRow(scope.row.id)"
                      cancel-button-text="不，谢谢"
                      @ancel=1
                      :icon="InfoFilled"
                      icon-color="red"
                      title="确定要删除该项及相关信息吗？"
                  >
                    <template #reference>
                      <el-button

                          type="danger"
                          style="margin-right: 5px"
                          size="mini"

                      > <i class="el-icon-delete"></i>删除</el-button>
                    </template>
                  </el-popconfirm>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <div
            style="margin: 0 auto; width: 800px"
            v-show="tableList.length > 0 && showPagination == 1"
        >
          <el-pagination

              v-model:currentPage="currentPage"
              v-model:page-size="pageSize"
              :page-sizes="[5, 10, 20]"
              background layout="total, sizes, prev, pager, next, jumper"
              :total="tableList.length"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
          />
        </div>

      </div>

      <div v-if="showForm == 1">
   
        <div class="table_center">
          <table class="contents">
            <tr>
              <td
                  colspan="6"
                  style="font-size: 24px; font-weight: bold; color: #304156"
              >
                {{ formName }}
              </td>
            </tr>
            <tr
                v-for="(item, index) in formList"
                :key="index"
                style="height: 40px"
            >
              <td colspan="1" width="200">{{ item.label }}</td>
              <td colspan="5" v-if="item.type == 'text'" style="font-size: 14px">
                {{ item.value }}
              </td>
              <td colspan="5" v-if="item.type == 'input'">
                <el-input
                    v-model="item.value"
                    placeholder="请输入"
                    style="width: 90%"
                />
              </td>
              <td colspan="5" v-if="item.type == 'select'">
                <el-select
                    v-model="item.value"
                    placeholder="请选择"
                    style="width: 90%"
                >
                  <el-option
                      v-for="items in item.option"
                      :key="items.value"
                      :label="items.label"
                      :value="items.value"
                  >
                  </el-option>
                </el-select>
              </td>
              <td colspan="5" v-if="item.type == 'date'">
                <el-date-picker
                    style="width: 90%"
                    v-model="item.value"
                    type="date"
                    format="YYYY/MM/DD"
                    value-format="YYYY-MM-DD"
                    placeholder="选择日期时间"
                >
                </el-date-picker>
              </td>

            </tr>
            <tr>
              <td colspan="1">
                该生其他
              </td>
              <td colspan="5">

                <el-button

                    @click="course(score)"
                    style="margin-right: 5px"
                    size="mini"
                    class="course"
                >我的课程</el-button
                >

                <el-button
                    type="info"
                    @click="socialrelation(socialRelation)"
                    style="margin-right: 5px"
                    size="mini"
                >社会关系</el-button
                >

                <el-button
                    type="warning"

                    @click="family2(family)"
                    style="margin-right: 5px"
                    size="mini"
                >家庭关系</el-button
                >
                <el-button

                    @click="beforeadmissions(beforeadmission)"
                    style="margin-right: 5px"
                    size="mini"
                    class="pre"
                >入学以前</el-button
                >
              </td>

            </tr>
          </table>
        </div>
        <div  
        v-if="showSubmit == '1'"
        class="centerButton"

       >
          <el-button 
          size="mini" class="rowButton" @click="doSumit()"
          >提交</el-button
          >
        </div>
      <div v-if="showTable1 == 1">

        <el-table
            class="table-content"
            style="width: 100%"
            size="mini"
            :data="
          list.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
            border
        >
          <el-table-column
              label="序号"
              fixed="left"
              width="50"
              align="center"
              color="black"
          >
            <template v-slot="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
              v-for="col in colsList"
              :key="col.prop"
              :label="col.label"
              :prop="col.prop"
              align="center"
              color="black"
          >
            <template v-slot="scope" v-if="col.type != undefined">
              <div v-if="col.type === 'text'">
               {{scope.row[col.prop]}}
              </div>
              <div v-if="col.type === 'link'">
                <el-button
                    type="text"
                    @click="navigate(scope.row.id, scope.$index, col.prop)"
                    style="margin-right: 5px"
                    size="mini"
                >{{ scope.row[col.prop] }}</el-button
                >
              </div>
              <div v-if="col.type === 'opers'">
                <div
                    v-for="c in col.opers"
                    :key="c"
                    style="display: inline-block"
                >
                  <el-button
                      type="primary"
                      v-if="c.name == 'edit'"
                      @click="editRows(scope.row.id)"
                      style="margin-right: 5px"
                      size="mini"
                  ><i class="el-icon-edit"></i>编辑</el-button
                  >

                  <el-popconfirm
                      size="mini"
                      v-if="c.name == 'delete'"
                      confirm-button-text="确定"
                      @confirm="deleteRow(scope.row.id)"
                      cancel-button-text="不，谢谢"
                      @ancel=1
                      :icon="InfoFilled"
                      icon-color="red"
                      title="确定要删除该项及相关信息吗？"
                  >
                  
                    <template #reference>
                      <el-button

                          type="danger"
                          style="margin-right: 5px"
                          size="mini"

                      > <i class="el-icon-delete"></i>删除</el-button>
                    </template>
                  </el-popconfirm>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
                <el-button type="primary" size="mini" @click="addItem1()" round
          >添加</el-button  
          >


      </div>




      </div>

     <div v-if="showForm1 == 1">


        <div class="table_center">
          <table class="contents">
            <tr>
              <td
                  colspan="6"
                  style="font-size: 24px; font-weight: bold; color: #304156"
              >
                {{ formName }}
              </td>
            </tr>
            <tr
                v-for="(item, index) in formList"
                :key="index"
                style="height: 40px"
            >
              <td colspan="1" width="200">{{ item.label }}</td>
              <td colspan="5" v-if="item.type == 'text'" style="font-size: 14px">
                {{ item.value }}
              </td>
              <td colspan="5" v-if="item.type == 'input'">
                <el-input
                    v-model="item.value"
                    placeholder="请输入"
                    style="width: 90%"
                />
              </td>
              <td colspan="5" v-if="item.type == 'select'">
                <el-select
                    v-model="item.value"
                    placeholder="请选择"
                    style="width: 90%"
                >
                  <el-option
                      v-for="items in item.option"
                      :key="items.value"
                      :label="items.label"
                      :value="items.value"
                  >
                  </el-option>
                </el-select>
              </td>
              <td colspan="5" v-if="item.type == 'date'">
                <el-date-picker
                    style="width: 90%"
                    v-model="item.value"
                    type="date"
                    format="YYYY/MM/DD"
                    value-format="YYYY-MM-DD"
                    placeholder="选择日期时间"
                >
                </el-date-picker>
              </td>

            </tr>

          </table>
        </div>
        <div  
    
        class="centerButton"

       >
          <el-button 
          size="mini" class="rowButton" @click="doSumit()"
          >提交</el-button
          >
        </div>











      </div>

 



    </div>
  </div>
    </el-scrollbar>
</template>
<script>

import { generalRequest } from "/src/service/genServ.js";
import { getUimsConfig } from "/src/service/genServ.js";
import bus from "vue3-eventbus";
import {getCurrentInstance} from "vue";
import {store} from "../store/createStore";
import request from "@/utils/request";


export default {
  name: "BaseTable",

  data() {
    return {

      list1:[],
      head:[],
      id: "",
      showTable: "",
       showTable1: "",
       showTableform: "0",
      showForm: "",
      showSubmit: "",
      index: 0,
      currentPage: 1,
      pageSize: 20,
      showQuery: "",
      showAdd: "",
      tableList: [],
      colsList: [],
      querList: [],
      tableListform: [],
      colsListform: [],
      querListform: [],
      list:[],
      courselist:[],
      familylist:[],
      socialrelationlist:[]      ,
     beforeadmissionlist:[],
      rootUrl: "teach",
      showPagination: "",
      name: "",
      formName: "",
      modelName: "",
      objectPush: {},
      form: "",
      courseform:"",
      socialrelationform:"",
      familyform:"",
      beforeadmissionform:"",
      page: [],
      formList: [],
      pageTotal:10,
      tagsList: [],
      collapse: false,
      studentNum:"",
      studentnum1:"",
      count1:"0",
      count2:"0",
      count3:"0",
      count4:"0",
      count:"0",
      score:"成绩管理",
      family:"家庭关系",
      socialRelation:"社会关系",
      beforeadmission:"入学前信息",
      form1:{
        customerName:"",
        password:"123456",//所有学生的密码一开始都是123456
        customerId:"",
        loginCount:"",
        lastLoginTime:"",
        customerTypeId:"2",//学生的身份默认为2,这里不能修改
        email:"",
        isdisabled:false,
      }
    };
  },
  setup(){
    const student1 = getCurrentInstance()?.appContext.config.globalProperties.$student1
    console.log(student1)
    bus.on('student1', test => {
      this.student1 = test;
      console.log(`传来的数据是：${test}`)
    });
    bus.emit('student1',this.student1)
  },
  created() {
    bus.on('student', test => {
      this.student=test ;
      console.log(`传来的数据是：${test}`)
      console.log(this.student)
    });
    this.studentNum=store.state.studentNum
    var title = this.$store.state.routerName;
    let _self = this;
    getUimsConfig().then((res) => {
      var jsonObj = res.data.data;
      if (jsonObj.uims.rootUrl !== undefined && jsonObj.uims.rootUrl !== "") {
        _self.rootUrl = jsonObj.uims.rootUrl;
      }

      _self.page = jsonObj.uims.page;
      var data = {};

      for (var i = 0; i < _self.page.length; i++) {
        if (title === _self.page[i].title) {
          if (_self.page[i].type == "table") {
            _self.showTable = "1";
            _self.showForm = "0";
            _self.name = _self.page[i].name;
            _self.colsList = _self.page[i].item;
      
            if (_self.page[i].query != undefined) {
              if (Array.isArray(_self.page[i].query)) {
                _self.querList = _self.page[i].query;
              } else {
                let arr = [];
                arr.push(_self.page[i].query);
                _self.querList = arr;
              }

              _self.showQuery = "1";
            } else {
              _self.showQuery = "";
            }

            _self.showAdd = _self.page[i].showAdd;
            _self.showPagination = _self.page[i].showPagination;
            var url = "/api/" + _self.rootUrl + "/" + _self.name + "Init";
            generalRequest(url, data).then((res) => {
              _self.tableList = res.data.data;
            });
          }
          if (_self.page[i].type == "form") {
            _self.showForm = "1";
            _self.showTable = "0";
            _self.name = _self.page[i].name;
            _self.formName = _self.page[i].title;
            _self.formList = _self.page[i].item;
            _self.id = "";
            var urlF = "/api/" + _self.rootUrl + "/" + _self.name + "Init";
            generalRequest(urlF, data).then((res) => {
              _self.form = res.data.data;
              for (var pro in _self.form) {
                for (var i = 0; i < _self.formList.length; i++) {
                  if (pro == _self.formList[i].prop) {
                    _self.formList[i].value = _self.form[pro];
                  }
                }
              }
            });
          }
        }
      }
    });
  },
  methods: {

    getT(title) {
      this.getXml(title);
  
    },

    navigate(id, index, prop) {
      this.id = id;
      var query = this.tableList[index][prop + "Paras"];
      var vars = query.split("&");
      this.objectPush = {};
      this.modeName = "";
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (i == 0) {
          this.modeName = pair[1];
        } else {
          var key = pair[0];
          var value = pair[1];
          var obj = {};
          obj[key] = value;

          Object.assign(this.objectPush, obj);
        }
      }

      if (this.modeName == "introduce") {
        this.$router.push({
          path: "studentIntroduce",
          query: this.objectPush,
        });
      } else {
        let _self = this;

        getUimsConfig().then((res) => {
          var jsonObj = res.data.data;
          _self.page = jsonObj.uims.page;
          var data = {};
          for (var i = 0; i < _self.page.length; i++) {
            if (this.modeName === _self.page[i].name) {
              if (_self.page[i].type == "table") {
                _self.showTable = "1";
                _self.showForm = "0";
                _self.showSubmit = "1";
                _self.name = _self.page[i].name;
                _self.colsList = _self.page[i].item;
                if (_self.page[i].query != undefined) {
                  if (Array.isArray(_self.page[i].query)) {
                    _self.querList = _self.page[i].query;
                  } else {
                    let arr = [];
                    arr.push(_self.page[i].query);
                    _self.querList = arr;
                  }

                  _self.showQuery = "1";
                } else {
                  _self.showQuery = "";
                }
                _self.showAdd = _self.page[i].showAdd;
                _self.showPagination = _self.page[i].showPagination;
                var url = "/api/" + _self.rootUrl + "/" + _self.name + "Init";
                Object.assign(data, this.objectPush);
                generalRequest(url, data).then((res) => {
                  _self.tableList = res.data.data;
                });
              }
              if (_self.page[i].type == "form") {
                _self.showForm = "1";
                _self.showTable = "0";
                _self.name = _self.page[i].name;
                _self.formName = _self.page[i].title;
                _self.formList = _self.page[i].item;
                _self.id = "";
                var urlF = "/api/" + _self.rootUrl + "/" + _self.name + "Init";
                Object.assign(data, this.objectPush);
                generalRequest(urlF, data).then((res) => {
                  _self.form = res.data.data;
                  for (var pro in _self.form) {
                    for (var i = 0; i < _self.formList.length; i++) {
                      if (pro == _self.formList[i].prop) {
                        _self.formList[i].value = _self.form[pro];
                        if (_self.formList[i].type == "select") {
                          if (
                              _self.form[pro + "List"] != undefined &&
                              _self.form[pro + "List"] != ""
                          ) {
                            _self.formList[i].option = _self.form[pro + "List"];
                          }
                        }
                      }
                    }
                  }
                });
              }
            }
          }
        });
      }
    },
    pushRow(id, index, prop) {
      this.id = id;
      var query = this.tableList[index][prop + "Paras"];
      var vars = query.split("&");
      this.objectPush = {};
      this.modeName = "";
      this.urlName = "";
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (i == 0) {
          if (pair[0] == "model") {
            this.modeName = pair[1];
          }
          if (pair[0] == "url") {
            this.urlName = pair[1];
          }
        } else {
          var key = pair[0];
          var value = pair[1];
          var obj = {};
          obj[key] = value;

          Object.assign(this.objectPush, obj);
        }
      }

      if (this.urlName != "") {
        var urlF = "/api/" + this.rootUrl + "/" + this.urlName;
        var data = {};
        Object.assign(data, this.objectPush);
        generalRequest(urlF, data).then((res) => {
          if (res.code == 0) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
          } else {
            this.$message.error(res.data.msg);
          }
        });
      } else {
        let _self = this;

        getUimsConfig().then((res) => {
          var jsonObj = res.data.data;
          _self.page = jsonObj.uims.page;
          var data = {};
          for (var i = 0; i < _self.page.length; i++) {
            if (this.modeName === _self.page[i].name) {
              if (_self.page[i].type == "table") {
                _self.showTable = "1";
                _self.showForm = "0";
                _self.name = _self.page[i].name;
                _self.colsList = _self.page[i].item;
                if (_self.page[i].query != undefined) {
                  if (Array.isArray(_self.page[i].query)) {
                    _self.querList = _self.page[i].query;
                  } else {
                    let arr = [];
                    arr.push(_self.page[i].query);
                    _self.querList = arr;
                  }

                  _self.showQuery = "1";
                } else {
                  _self.showQuery = "";
                }
                _self.showAdd = _self.page[i].showAdd;
                _self.showPagination = _self.page[i].showPagination;
                var url = "/api/" + _self.rootUrl + "/" + _self.name + "Init";
                Object.assign(data, this.objectPush);
                generalRequest(url, data).then((res) => {
                  _self.tableList = res.data.data;
                });
              }
              if (_self.page[i].type == "form") {
                _self.showForm = "1";
                _self.showTable = "0";
                _self.showSubmit = "1";
                _self.name = _self.page[i].name;
                _self.formName = _self.page[i].title;
                _self.formList = _self.page[i].item;
                _self.id = "";
                var urlF = "/api/" + _self.rootUrl + "/" + _self.name + "Init";
                Object.assign(data, this.objectPush);
                generalRequest(urlF, data).then((res) => {
                  _self.form = res.data.data;
                  for (var pro in _self.form) {
                    for (var i = 0; i < _self.formList.length; i++) {
                      if (pro == _self.formList[i].prop) {
                        _self.formList[i].value = _self.form[pro];
                        if (_self.formList[i].type == "select") {
                          if (
                              _self.form[pro + "List"] != undefined &&
                              _self.form[pro + "List"] != ""
                          ) {
                            _self.formList[i].option = _self.form[pro + "List"];
                          }
                        }
                      }
                    }
                  }
                });
              }
            }
          }
        });
      }
    },

    editRow(id) {
      //这里先注释掉了,因为根本不知道什么东西是什么........
      //修改方法这里出了点问题,因为customer和student多少是不太一样的
      //建议更改为学生可以修改自己的昵称,而且初始昵称是教师赠与的
      //只能保证id在两个表里面是匹配的

      //这个方法确实是用来修改的....
      //下面这些主要是在数据库里面修改
      // request.post("http://localhost:9090/customer/update",this.form1).then(res =>{
      //   if(res.code===200){
      //     this.$message({
      //       type:"success",
      //       message:"用户信息同步成功"
      //     });
      //   }else{
      //     this.$message({
      //       type:"error",
      //       message: "用户信息同步失败"
      //     })
      //   }
      //  })
     //修改的仍然是customer里面,下面正常的添加方法仍然不影响
      this.showForm = "1";
      this.showTable = "0";
      this.id = id;
      var data = { id: id };
      this.showSubmit = "1";
      var namePage = this.name + "Edit";
      let _self = this;
      getUimsConfig().then((res) => {
        var jsonObj = res.data.data;
        if (jsonObj.uims.rootUrl !== undefined && jsonObj.uims.rootUrl !== "") {
          _self.rootUrl = jsonObj.uims.rootUrl;
        }
        _self.page = jsonObj.uims.page;
        for (var i = 0; i < _self.page.length; i++) {
          if (namePage === _self.page[i].name) {
            _self.name = _self.page[i].name;
            _self.formName = _self.page[i].title;
            _self.formList = _self.page[i].item;
            var urlF = "/api/" + _self.rootUrl + "/" + namePage + "Init";
            generalRequest(urlF, data).then((res) => {
              _self.form = res.data.data;
              for (var pro in _self.form) {
                for (var i = 0; i < _self.formList.length; i++) {
                  if (pro == _self.formList[i].prop) {
                    _self.formList[i].value = _self.form[pro];
                    if (_self.formList[i].type == "select") {
                      if (
                          _self.form[pro + "List"] != undefined &&
                          _self.form[pro + "List"] != ""
                      ) {
                        _self.formList[i].option = _self.form[pro + "List"];
                      }
                    }
                  }
                }
              }
            });
          }
        }
      });
    },
    detailRow(id) {
      this.showForm = "1";
      this.showTable = "0";
      var data = { id: id };
      this.id = id;
      this.showSubmit = "0";
      var namePage = this.name + "Edit";
      let _self = this;
      getUimsConfig().then((res) => {
        var jsonObj = res.data.data;
        if (jsonObj.uims.rootUrl !== undefined && jsonObj.uims.rootUrl !== "") {
          _self.rootUrl = jsonObj.uims.rootUrl;
        }
        _self.page = jsonObj.uims.page;
        for (var i = 0; i < _self.page.length; i++) {
          if (namePage === _self.page[i].name) {
            _self.name = _self.page[i].name;
            _self.formName = _self.page[i].title;
            _self.formList = _self.page[i].item;
            var urlF = "/api/" + _self.rootUrl + "/" + namePage + "Init";
            generalRequest(urlF, data).then((res) => {
              _self.form = res.data.data;
              for (var pro in _self.form) {
                for (var i = 0; i < _self.formList.length; i++) {
                  if (pro == _self.formList[i].prop) {
                    _self.formList[i].value = _self.form[pro];
                    if(i==0){
                      _self.studentnum1 = _self.formList[i].value;
                      console.log(_self.studentnum1);}
                    if (_self.formList[i].type == "select") {
                      if (
                          _self.form[pro + "List"] != undefined &&
                          _self.form[pro + "List"] != ""
                      ) {
                        _self.formList[i].option = _self.form[pro + "List"];
                      }
                    }
                  }
                }
              }
            });
          }
        }
      });
    },
    deleteRowCustomer(id){
      request.delete("http://localhost:9090/customer/"+id).then(res => {
         if(res.code===200){
           this.$message({
             type:"success",
             message:"删除成功"
           })
         }else{
           this.$message({
             type:"error",
             message: "删除失败"
           })
         }
       });
    },
    deleteRow(id) {
      var url = "/api/" + this.rootUrl + "/" + this.name + "Delete";
      for (var i = 0; i < this.tableList.length; i++) {
        if (this.tableList[i].id == id) {
          this.index = i;
        }
      }
      var data = { id: id };
      this.tableList.splice(this.index, 1);
      generalRequest(url, data).then((res) => {
        if (res.code == 0) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.deleteRowCustomer(data.id);
            store.commit('studentNumminus')
        } else {
          this.$message.error("删除失败");
        }
      });
      //这里能获得id的话就能删除,但是sqlite的id没法自增,所以customer里面
      //手动清理一下被删除的用户吧
    },
    chooseRow() {
          this.$message({
            message: "发送成功",
            type: "success",
           
          });
          return{
            isdisabled: true,
          }
          
    },
    queryTable() {
      var url = "/api/" + this.rootUrl + "/" + this.name + "Query";
      var data = {};
      for (var i = 0; i < this.querList.length; i++) {
        var obj = {};
        var key = this.querList[i].prop;
        var value = this.querList[i].value;
        obj[key] = value;
        Object.assign(data, obj);
      }
      generalRequest(url, data).then((res) => {
        this.tableList = res.data.data;
      });
    },


    //这里单独的一个方法,是用来添加数据库的
    doSumitCustomer(a){
        //添加方法在这个里面
      //核心原则,往student里面添加的方法已经写好了,这里只负责添加coustomer里面的东西
      //另外,哪个数据库里只存在名字和密码两个东西,邮箱后序添加吧就
      this.form1.customerName=a;
      request.post("http://localhost:9090/customer/register",this.form1).then(res =>{
        if(res.code===200){
          this.$message({
            type:"success",
            message:"用户信息同步成功"
          });
        }else{
          this.$message({
            type:"error",
            message: "用户信息同步失败"
          })
        }
       });
    },
    doSumit() {
      var data = { id: this.id };
      for (var i = 0; i < this.formList.length; i++) {
        var obj = {};
        var key = this.formList[i].prop;
        var value = this.formList[i].value;
        obj[key] = value;
        Object.assign(data, obj);
      }
      var url = "/api/" + this.rootUrl + "/" + this.name + "Submit";
      generalRequest(url, { form: data, ...this.objectPush }).then((res) => {
        if (res.code == 0) {
          this.id = res.data.data;
          this.form1.customerId=res.data.data;//保证id是统一的
          alert(this.form1.customerId);
          this.doSumitCustomer(data.studentName);
          this.$message({
            message: "提交成功",
            type: "success",

          },
          store.commit('studentNumplus'),
          );

        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    addItem() {
      this.student1++;
      bus.emit('student',this.student)
      this.id = "";
      this.showForm = "1";
      this.showTable = "0";
      this.showForm1 = "1";
      var data = {};

      this.showSubmit = "1";
      var namePage = this.name + "Edit";
      let _self = this;
      getUimsConfig().then((res) => {
        var jsonObj = res.data.data;
        if (jsonObj.uims.rootUrl !== undefined && jsonObj.uims.rootUrl !== "") {
          _self.rootUrl = jsonObj.uims.rootUrl;
        }
        _self.page = jsonObj.uims.page;
        for (var i = 0; i < _self.page.length; i++) {
          if (namePage === _self.page[i].name) {
            _self.name = _self.page[i].name;
            _self.formName = _self.page[i].title;
            _self.formList = _self.page[i].item;
            var urlF = "/api/" + _self.rootUrl + "/" + namePage + "Init";
            generalRequest(urlF, data).then((res) => {
              _self.form = res.data.data;
              for (var pro in _self.form) {
                for (var i = 0; i < _self.formList.length; i++) {
                  if (pro == _self.formList[i].prop) {
                    _self.formList[i].value = _self.form[pro];
                    if (_self.formList[i].type == "select") {
                      if (
                          _self.form[pro + "List"] != undefined &&
                          _self.form[pro + "List"] != ""
                      ) {
                        _self.formList[i].option = _self.form[pro + "List"];
                      }
                    }
                  }
                }
              }
            });
          }
        }
      });
    },
   addItem1() {
      this.student1++;
      bus.emit('student',this.student)
  this.showForm--;
      this.id = "";
      console.log(this.showForm)
      this.showForm = "0";
       console.log(this.showForm)
      this.showTable = "0";
      this.showForm1 = "1";
      var data = {};

      this.showSubmit = "1";
      var namePage = this.name + "Edit";
      console.log(this.name)
      console.log(namePage)
      let _self = this;
      getUimsConfig().then((res) => {
        var jsonObj = res.data.data;
        if (jsonObj.uims.rootUrl !== undefined && jsonObj.uims.rootUrl !== "") {
          _self.rootUrl = jsonObj.uims.rootUrl;
        }
        _self.page = jsonObj.uims.page;
        console.log(_self.page)
        for (var i = 0; i < _self.page.length; i++) {
          if (namePage === _self.page[i].name) {
            
            _self.name = _self.page[i].name;
            _self.formName = _self.page[i].title;
            _self.formList = _self.page[i].item;
            var urlF = "/api/" + _self.rootUrl + "/" + namePage + "Init";
            console.log(urlF)
            generalRequest(urlF, data).then((res) => {
              _self.form = res.data.data;
              for (var pro in _self.form) {
                for (var i = 0; i < _self.formList.length; i++) {
                  if (pro == _self.formList[i].prop) {
                    _self.formList[i].value = _self.form[pro];
                    if (_self.formList[i].type == "select") {
                      if (
                          _self.form[pro + "List"] != undefined &&
                          _self.form[pro + "List"] != ""
                      ) {
                        _self.formList[i].option = _self.form[pro + "List"];
                      }
                    }
                  }
                }
              }
            });
          }
        }
      });
    },
     getXml(title) {
      let _self = this;
          console.log(title)
      getUimsConfig().then((res) => {
        var jsonObj = res.data.data;
        if (jsonObj.uims.rootUrl !== undefined && jsonObj.uims.rootUrl !== "") {
          _self.rootUrl = jsonObj.uims.rootUrl;
        }
        _self.page = jsonObj.uims.page;
        var data = {};
        for (var i = 0; i < _self.page.length; i++) {
          if (title === _self.page[i].title) {
                  console.log(this.title)
                   console.log(_self.page[i].title)
            if (_self.page[i].type == "table") {
              _self.showTable = "1";
              _self.showForm = "0";
              _self.name = _self.page[i].name;
              _self.colsList = _self.page[i].item;
              if (_self.page[i].query != undefined) {
                if (Array.isArray(_self.page[i].query)) {
                  _self.querList = _self.page[i].query;
                } else {
                  let arr = [];
                  arr.push(_self.page[i].query);
                  _self.querList = arr;
                }

                _self.showQuery = "1";
              } else {
                _self.showQuery = "";
              }
              _self.showAdd = _self.page[i].showAdd;
              _self.showPagination = _self.page[i].showPagination;
              var url = "/api/" + _self.rootUrl + "/" + _self.name + "Init";
              generalRequest(url, data).then((res) => {
                _self.tableList = res.data.data;
              



              });
            }
            if (_self.page[i].type == "form") {
              _self.showForm = "1";
              _self.showTable = "0";
              _self.name = _self.page[i].name;
              _self.formName = _self.page[i].title;
              _self.formList = _self.page[i].item;
              _self.id = "";
              var urlF = "/api/" + _self.rootUrl + "/" + _self.name + "Init";
              generalRequest(urlF, data).then((res) => {
                _self.form = res.data.data;
                for (var pro in _self.form) {
                  for (var i = 0; i < _self.formList.length; i++) {
                    if (pro == _self.formList[i].prop) {
                      _self.formList[i].value = _self.form[pro];
                      if (_self.formList[i].type == "select") {
                        if (
                            _self.form[pro + "List"] != undefined &&
                            _self.form[pro + "List"] != ""
                        ) {
                          _self.formList[i].option = _self.form[pro + "List"];
                        }
                      }
                    }
                  }
                }
              });
            }
          }
        }
      });
    },
    course1(title){
      let _self = this;
  
      getUimsConfig().then((res) => {
        var jsonObj = res.data.data;
     
        if (jsonObj.uims.rootUrl !== undefined && jsonObj.uims.rootUrl !== "") {
          _self.rootUrl = jsonObj.uims.rootUrl;
        }
        _self.page = jsonObj.uims.page;
        var data = {};
        for (var i = 0; i < _self.page.length; i++) {

          if (title === _self.page[i].title) {
            console.log(_self.page[i].title)
            if (_self.page[i].type == "table") {
              _self.showTable1 = "1";
              _self.showForm = "1";
              _self.name = _self.page[i].name;
              _self.colsList = _self.page[i].item;
              _self.showAdd = _self.page[i].showAdd;
              _self.showPagination = _self.page[i].showPagination;
              _self.count4=_self.count
            var urlF =  "/api/" + 'teach' + "/" + "scoreInit";
              generalRequest(urlF, data).then((res) => {
                _self.tableList = res.data.data;
                var a=_self.tableList
                      console.log(_self.studentnum1)
                        for (const [key, value] of a.entries()) {
          if(value["studentNum"] == _self.studentnum1){
        console.log(key)

                console.log(_self.count4)
            _self.courselist[_self.count4]=value;
                      console.log(value);
                      _self.count4++
                        console.log(_self.courselist);
          }

        }
              });
            }

          }
        }
      });
    
      _self.list=_self.courselist
      _self.list1=_self.courseList1
    },

        course(title){
      this.$store.commit("setRouterName", title);
      this.$emit("title", title);
      this.course1(title);
    },
        socialrelation1(title){
      let _self = this;
      getUimsConfig().then((res) => {
        var jsonObj = res.data.data;
     
        if (jsonObj.uims.rootUrl !== undefined && jsonObj.uims.rootUrl !== "") {
          _self.rootUrl = jsonObj.uims.rootUrl;
        }
        _self.page = jsonObj.uims.page;
        var data = {};
        for (var i = 0; i < _self.page.length; i++) {

          if (title === _self.page[i].title) {
            console.log(_self.page[i].title)
            if (_self.page[i].type == "table") {
              _self.showTable1 = "1";
              _self.showForm = "1";
              _self.name = _self.page[i].name;
              _self.colsList = _self.page[i].item;
              _self.showAdd = _self.page[i].showAdd;
              _self.showPagination = _self.page[i].showPagination;
              _self.count3=_self.count
              _self.name='socialRelation'
     var url = "/api/" + 'teach' + "/" + "socialRelationInit";
              generalRequest(url, data).then((res) => {
                _self.tableList = res.data.data;
                var a=_self.tableList
                      console.log(_self.studentnum1)
                        for (const [key, value] of a.entries()) {
          if(value["studentNum"] == _self.studentnum1){
        console.log(key)

            _self.socialrelationlist[_self.count3]=value;
                     
                      _self.count3++
                     
          }

        }
              });
            }

          }

        }
      });
      _self.list=_self.socialrelationlist
  
   console.log(_self.socialrelationlist);
    },
      socialrelation(title){
      this.$store.commit("setRouterName", title);
      this.$emit("title", title);
      this.socialrelation1(title);
    },
        family1(title){
      let _self = this;
      getUimsConfig().then((res) => {
        var jsonObj = res.data.data;
     
        if (jsonObj.uims.rootUrl !== undefined && jsonObj.uims.rootUrl !== "") {
          _self.rootUrl = jsonObj.uims.rootUrl;
        }
        _self.page = jsonObj.uims.page;
        var data = {};
        for (var i = 0; i < _self.page.length; i++) {

          if (title === _self.page[i].title) {

            if (_self.page[i].type == "table") {
              _self.showTable1 = "1";
              _self.showForm = "1";
              _self.name = _self.page[i].name;
              _self.colsList = _self.page[i].item;
              _self.showAdd = _self.page[i].showAdd;
              _self.showPagination = _self.page[i].showPagination;
              _self.count2=_self.count
      var urlF = "/api/" + 'teach' + "/" + "familyInit";
              generalRequest(urlF, data).then((res) => {
                _self.tableList = res.data.data;
                var a=_self.tableList
                      console.log(_self.studentnum1)
                        for (const [key, value] of a.entries()) {
          if(value["studentNum"] == _self.studentnum1){
        console.log(key)

            _self.familylist[_self.count2]=value;
                      console.log(value);
                      _self.count2++
                        console.log(_self.familylist);
          }

        }
              });
            }

          }
        }
      });
    
      _self.list=_self.familylist

    },
    family2(title){
      this.$store.commit("setRouterName", title);
      this.$emit("title", title);
      this.family1(title);
    },
        beforeadmissions1(title){
       let _self = this;
  
      getUimsConfig().then((res) => {
        var jsonObj = res.data.data;
     
        if (jsonObj.uims.rootUrl !== undefined && jsonObj.uims.rootUrl !== "") {
          _self.rootUrl = jsonObj.uims.rootUrl;
        }
        _self.page = jsonObj.uims.page;
        var data = {};
        for (var i = 0; i < _self.page.length; i++) {

          if (title === _self.page[i].title) {
            console.log(_self.page[i].title)
            if (_self.page[i].type == "table") {
              _self.showTable1 = "1";
              _self.showForm = "1";
              _self.name = _self.page[i].name;
              _self.colsList = _self.page[i].item;
              _self.showAdd = _self.page[i].showAdd;
              _self.showPagination = _self.page[i].showPagination;
              _self.count1=_self.count
                            _self.name='beforeAdmission'
        var urlF = "/api/" + 'teach' + "/" + "beforeAdmissionInit";
              generalRequest(urlF, data).then((res) => {
                _self.tableList = res.data.data;
                var a=_self.tableList
                      console.log(_self.studentnum1)
                        for (const [key, value] of a.entries()) {
          if(value["studentNum"] == _self.studentnum1){
        console.log(key)
                console.log('tset')
                console.log(_self.count1)
            _self.beforeadmissionlist[_self.count1]=value;
                      console.log(value);
                      _self.count1++
                        console.log(_self.beforeadmissionlist);
          }

        }
              });
            }

          }
        }
      });
    
      _self.list=_self.beforeadmissionlist
      _self.list1=_self.beforeadmissionList1
    },
    beforeadmissions(title){
      this.$store.commit("setRouterName", title);
      this.$emit("title", title);
      this.beforeadmissions1(title);
    },
    editRows(id) {
      this.showForm = "0";
      this.showTable = "0";
            this.showForm1 = "1";
      this.id = id;
      var data = { id: id };
      this.showSubmit = "1";
      var namePage = this.name + "Edit";
      let _self = this;
      getUimsConfig().then((res) => {
        var jsonObj = res.data.data;
        if (jsonObj.uims.rootUrl !== undefined && jsonObj.uims.rootUrl !== "") {
          _self.rootUrl = jsonObj.uims.rootUrl;
        }
        _self.page = jsonObj.uims.page;
        for (var i = 0; i < _self.page.length; i++) {
          if (namePage === _self.page[i].name) {
            _self.name = _self.page[i].name;
            _self.formName = _self.page[i].title;
            _self.formList = _self.page[i].item;
            var urlF = "/api/" + _self.rootUrl + "/" + namePage + "Init";
            generalRequest(urlF, data).then((res) => {
              _self.form = res.data.data;
              for (var pro in _self.form) {
                for (var i = 0; i < _self.formList.length; i++) {
                  if (pro == _self.formList[i].prop) {
                    _self.formList[i].value = _self.form[pro];
                    if (_self.formList[i].type == "select") {
                      if (
                          _self.form[pro + "List"] != undefined &&
                          _self.form[pro + "List"] != ""
                      ) {
                        _self.formList[i].option = _self.form[pro + "List"];
                      }
                    }
                  }
                }
              }
            });
          }
        }
      });
    },
  }
};
</script>

<style scoped>
.pre{
  color: #fff;
  background-color: rgb(0,191,255);
}
.studentIntroduce{
  color: #fff;
  background-color: rgb(0,206,209);
}
.course{
  color: #fff;
  background-color: rgb(255,140,0);
}
/* .familyRelation{
 color: #fff;
  background-color: rgb(255,255,0);
} */

</style>
