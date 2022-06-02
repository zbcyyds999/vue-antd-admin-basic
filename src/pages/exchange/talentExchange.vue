<template>
  <div>
    <a-card>
      <a-space class="operator">
        <a-form-model
          layout="inline"
          :model="form"
          @submit="handleSubmit"
          @submit.native.prevent
        >
          <a-form-model-item label="人员姓名">
            <a-select
              show-search
              placeholder="Select a person"
              option-filter-prop="children"
              style="width: 200px"
              allowClear
              :filter-option="filterOption"
              @change="handleChange"
            >
              <a-select-option
                v-for="item in peopleInfo"
                :key="item.sfz"
                :value="item.peoplename"
                >{{ item.peoplename }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item>
            <a-form-model-item label="身份证号">
              <a-input v-model="Selectform.sfz" placeholder="请输入身份证号">
              </a-input>
            </a-form-model-item>
            <a-form-model-item label="出诊医院">
              <a-input
                v-model="Selectform.visitsHospital"
                placeholder="请输入出诊医院"
              >
              </a-input>
            </a-form-model-item>
            <a-form-model-item label="派出原因">
              <a-input
                v-model="Selectform.outReason"
                placeholder="请输入派出原因"
              >
              </a-input>
            </a-form-model-item>
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" html-type="submit"> 查询 </a-button>
          </a-form-model-item>
          <a-form-model-item>
            <a-button @click="addNew" type="primary">新建</a-button>
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary">导出</a-button>
          </a-form-model-item>
        </a-form-model>
      </a-space>
    </a-card>
    <a-card>
      <div>
        <a-table
          :columns="columns"
          :data-source="data"
          :pagination="paginationOpt"
          bordered
        >
          <template slot="action" slot-scope="text, record">
            <a slot="action" @click="onEdit(record)">编辑</a>
            <a-divider type="vertical" />
            <a slot="action" @click="onDel(record)">删除</a>
          </template>
        </a-table>
        <a-drawer
          :title="title"
          :width="720"
          :visible="visible"
          :body-style="{ paddingBottom: '80px' }"
          @close="onClose"
        >
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <!-- <div>
              <a-select
                :default-value="provinceData[0]"
                style="width: 120px"
                @change="handleProvinceChange"
              >
                <a-select-option
                  v-for="province in provinceData"
                  :key="province"
                >
                  {{ province }}
                </a-select-option>
              </a-select>
              <a-input v-model="secondCity" placeholder="请输入手机号" />
            </div> -->
            <a-form-model-item label="人员姓名" prop="peopleName">
              <a-select
                v-model="form.peopleName"
                @change="handleProvinceChange"
                placeholder="请选择人员姓名"
              >
                <a-select-option v-for="item in peopleInfo" :key="item.sfz"
                  >{{ item.peoplename }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="专业" prop="specialty">
              <a-input
                v-model="form.specialty"
                placeholder="请输入专业"
                disabled
              />
            </a-form-model-item>
            <a-form-model-item label="派出医院" prop="dispatchHospital">
              <a-input
                v-model="form.dispatchHospital"
                placeholder="请输入派出医院"
                disabled
              />
            </a-form-model-item>
            <a-form-model-item label="出诊医院" prop="visitsHospital">
              <a-select
                v-model="form.visitsHospital"
                placeholder="请选择出诊医院"
              >
                <a-select-option v-for="item in Hospitals" :key="item.orgname">
                  {{ item.orgname }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="转出时间" reqired prop="outDate">
              <a-date-picker
                v-model="form.outDate"
                placeholder="Pick a date"
                style="width: 100%"
              />
            </a-form-model-item>
            <a-form-model-item label="转归时间" required prop="inDate">
              <a-date-picker
                v-model="form.inDate"
                type="date"
                placeholder="Pick a date"
                style="width: 100%"
              />
            </a-form-model-item>
            <a-form-model-item label="派出原因" prop="outReason">
              <a-input
                v-model="form.outReason"
                type="textarea"
                placeholder="请输入派出原因"
              />
            </a-form-model-item>
          </a-form-model>
          <div
            :style="{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
              zIndex: 1,
            }"
          >
            <a-button type="primary" @click="onSubmit"> 提交 </a-button>
            <a-button style="margin-left: 10px" @click="resetForm">
              重置
            </a-button>
          </div>
        </a-drawer>
      </div>
    </a-card>
  </div>
</template>
<script>
const columns = [
  {
    title: "人员姓名",
    dataIndex: "peopleName",
  },
  {
    title: "专业",
    dataIndex: "specialty",
  },
  {
    title: "派出医院",
    dataIndex: "dispatchHospital",
  },
  {
    title: "出诊医院",
    dataIndex: "visitsHospital",
  },
  {
    title: "转出时间",
    dataIndex: "outDate",
  },
  {
    title: "转归时间",
    dataIndex: "inDate",
  },
  {
    title: "派出原因",
    dataIndex: "outReason",
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" },
  },
];
const data = [];
const Hospitals = [
  {
    orderNumber: 1,
    orgname: "北京市西城区什刹海社区卫生服务中",
  },
  {
    orderNumber: 2,
    orgname: "北京市西城区什刹海社区卫生服务中心",
  },
];
const peopleInfo = [
  {
    peoplename: "蔡雅玲",
    specialty: "预防医学",
    orgname: "西城社管中心",
    sfz: "350600198602251528",
  },
  {
    peoplename: "常新",
    specialty: "临床医学",
    orgname: "西城社管中心",
    sfz: "220104196804171331",
  },
  {
    peoplename: "陈淑红",
    specialty: "护理",
    orgname: "西城社管中心",
    sfz: "110106196812163021",
  },
];
import {
  getAll,
  getSqList,
  getOrgList,
  addTe,
  updateTe,
} from "@/services/exchange";

export default {
  name: "talentExchange",
  data() {
    return {
      peopleInfo,
      Hospitals,
      title: "",
      visible: false,
      advanced: true,
      data,
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: "",
      Selectform: {
        name: "",
        sfz: "",
        visitsHospital: "",
        outReason: "",
      },
      form: {
        dispatchHospital: "",
        visitsHospital: "",
        outDate: undefined,
        inDate: undefined,
        outReason: "",
        orgpeopleId: "",
        peopleName: "",
        specialty: "",
      },
      paginationOpt: {
        defaultCurrent: 1, // 默认当前页数
        defaultPageSize: 10, // 默认当前页显示数据的大小
        total: 0, // 总数，必须先有
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["5", "10", "15", "20"],
        showTotal: (total) => `共 ${total} 条`, // 显示总数
        onShowSizeChange: (current, pageSize) => {
          this.paginationOpt.defaultCurrent = 1;
          this.paginationOpt.defaultPageSize = pageSize;
          this.getPageData(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.paginationOpt.defaultCurrent = current;
          this.paginationOpt.defaultPageSize = size;
          this.getPageData();
        },
      },
      rules: {
        peopleName: [
          {
            required: true,
            message: "请选择人员姓名",
            trigger: "change",
          },
        ],
        visitsHospital: [
          {
            required: true,
            message: "请选择出诊医院",
            trigger: "change",
          },
        ],
        outReason: [
          {
            required: true,
            message: "请输入派出原因",
            trigger: "blur",
          },
          {
            min: 3,
            message: "长度在3个字以上",
            trigger: "blur",
          },
        ],
        outDate: [
          { required: true, message: "请填写转出时间", trigger: "change" },
        ],
        inDate: [
          { required: true, message: "请填写转归时间", trigger: "change" },
        ],
      },
    };
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    },
  },
  created() {
    this.getData();
    this.getSqData();
    // this.getPeopleInfo();
  },
  watch: {},

  methods: {
    handleProvinceChange(value) {
      this.peopleInfo.map((item) => {
        if (item.sfz == value) {
          this.form.orgpeopleId = item.sfz;
          this.form.dispatchHospital = item.orgname;
          this.form.specialty = item.specialty;
        }
        return item;
      });
    },
    handleChange(value) {
      this.Selectform.name = value;
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },

    // 查询按钮
    handleSubmit() {
      this.data = [];
      this.getData();
    },
    // 初始化医院下拉框
    getSqData() {
      getSqList().then((res) => {
        if (res.data.code == 200) {
          this.Hospitals = res.data.data;
        }
      });
    },
    getPeopleInfo() {
      const token = this.$route.query.token;
      getOrgList(token).then((res) => {
        if (res.data.code == 200) {
          console.log(res.data.data);
          this.peopleInfo = res.data.data;
        }
      });
    },
    // 初始化表格
    getData() {
      const { defaultCurrent, defaultPageSize } = this.paginationOpt;
      const { name, sfz, visitsHospital, outReason } = this.Selectform;
      const token = this.$route.query.token;
      getAll(
        defaultCurrent,
        defaultPageSize,
        name,
        sfz,
        visitsHospital,
        outReason,
        token
      ).then((res) => {
        if (res.data.code == 200) {
          this.paginationOpt.total = res.data.total;
          let arr = res.data.data;
          arr.forEach((item) => {
            item.key = item.id;
          });
          this.data = arr;
        }
      });
    },
    //添加弹窗
    addNew() {
      this.form = {};
      this.title = "新增";
      this.visible = true;
    },
    // 编辑弹窗
    onEdit(res) {
      console.log(res);
      this.title = "编辑";
      this.visible = true;
      console.log(res);
      delete res.key;
      this.form = { ...res };
      this.form.outDate = this.$moment(res.outDate, "YYYY-MM-DD");
      this.form.inDate = this.$moment(res.inDate, "YYYY-MM-DD");
    },
    // 删除操作
    delData(data) {
      data.state = "1";
      console.log(data);
      updateTe(data).then((res) => {
        if (res.data.code == 200) {
          this.$message.success({
            content: res.data.msg,
          });
          this.getData();
        } else {
          this.$message.error({
            content: res.data.msg,
          });
        }
      });
    },
    onDel(data) {
      let self = this;
      this.$confirm({
        title: "提示",
        content: "确定删除该条信息？",
        okText: "确认",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          self.delData(data);
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    },
    onClose() {
      this.visible = false;
    },
    // 抽屉提交按钮
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.title == "新增") {
            const data = this.form;
            addTe(data).then((res) => {
              if (res.data.code == 200) {
                this.$message.success({
                  content: res.data.msg,
                });
                this.visible = false;
                this.getData();
              } else {
                this.$message.error({
                  content: res.data.msg,
                });
              }
            });
          } else {
            const data = this.form;
            console.log(data);
            updateTe(data).then((res) => {
              if (res.data.code == 200) {
                this.$message.success({
                  content: res.data.msg,
                });
                this.visible = false;
                this.getData();
              } else {
                this.$message.error({
                  content: res.data.msg,
                });
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 抽屉重置按钮
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>
<style scoped lang="less">
@import "index.less";
</style>



