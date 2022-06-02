<template>
  <div>
    <a-card>
      <div style="height: 685px">
        <a-space class="operator">
          <a-form-model
            layout="inline"
            :model="form"
            @submit="handleSubmit"
            @submit.native.prevent
          >
            <a-form-model-item label="员工姓名">
              <a-input
                v-model="Selectform.employeeName"
                placeholder="请输入姓名"
              >
              </a-input>
            </a-form-model-item>
            <a-form-model-item label="身份证号">
              <a-input v-model="Selectform.idNum" placeholder="请输入身份证号">
              </a-input>
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary" html-type="submit"> 查询 </a-button>
            </a-form-model-item>
            <a-form-model-item>
              <a-button @click="addNew" type="primary">新建</a-button>
            </a-form-model-item>
          </a-form-model>
          <!-- <div style="margin-bottom: 16px">
          <a-col :md="2">
              <a-button
                type="primary"
                :disabled="!hasSelected"
                :loading="loading"
                @click="start"
              >
                Reload
              </a-button>
              <span style="margin-left: 8px">
                <template v-if="hasSelected">
                  {{ `Selected ${selectedRowKeys.length} items` }}
                </template>
              </span>
            </a-col>
        </div> -->
        </a-space>
        <a-table
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange,
          }"
          :columns="columns"
          :data-source="data"
          :pagination="paginationOpt"
        >
          <div slot="action" slot-scope="text, record">
            <a slot="action" @click="onEdit(record)">编辑</a>
            <a-divider type="vertical" />
            <a slot="action" @click="onDel(record.id)">删除</a>
          </div>
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
            <a-form-model-item label="员工姓名" prop="employeeName">
              <a-input
                v-model="form.employeeName"
                placeholder="请输入员工姓名"
              />
            </a-form-model-item>
            <a-form-model-item label="手机号" prop="telNum">
              <a-input
                v-model="form.telNum"
                placeholder="请输入手机号"
              /> </a-form-model-item
            ><a-form-model-item label="身份证号" prop="idNum">
              <a-input
                v-model="form.idNum"
                placeholder="请输入身份证号"
              /> </a-form-model-item
            ><a-form-model-item
              ref="vaccineNum"
              label="疫苗数"
              prop="vaccineNum"
            >
              <a-input
                v-model="form.vaccineNum"
                placeholder="请输入接种疫苗数"
              />
            </a-form-model-item>
            <a-form-model-item label="居家日期" required prop="homeDates">
              <a-date-picker
                v-model="form.homeDates"
                type="date"
                placeholder="Pick a date"
                style="width: 100%"
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
    title: "员工姓名",
    dataIndex: "employeeName",
  },
  {
    title: "手机号",
    dataIndex: "telNum",
  },
  {
    title: "身份证号",
    dataIndex: "idNum",
  },
  {
    title: "疫苗数",
    dataIndex: "vaccineNum",
  },
  {
    title: "居家日期",
    dataIndex: "homeDates",
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" },
  },
];

const data = [];
import {
  getAll,
  updateYq,
  deleteYq,
  addYq,
  selectPage,
} from "@/services/employee";

export default {
  name: "EmployeeTable",
  data() {
    return {
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
        employeeName: "",
        telNum: "",
        idNum: "",
        vaccineNum: "",
        homeDates: undefined,
      },
      form: {
        employeeName: "",
        telNum: "",
        idNum: "",
        vaccineNum: "",
        homeDates: undefined,
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
        employeeName: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur",
          },
          {
            min: 2,
            max: 5,
            message: "Length should be 3 to 5",
            trigger: "blur",
          },
        ],
        telNum: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur",
          },
          {
            message: "Length should be 3 to 5",
            trigger: "blur",
          },
        ],
        idNum: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur",
          },
          {
            message: "Length should be 3 to 5",
            trigger: "blur",
          },
        ],
        vaccineNum: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur",
          },
          {
            min: 1,
            max: 5,
            message: "Length should be 3 to 5",
            trigger: "blur",
          },
        ],
        homeDates: [
          { required: true, message: "Please pick a date", trigger: "change" },
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
  },
  watch: {},

  methods: {
    onShowSizeChange(current, pageSize) {
      this.pageSize = pageSize;
      this.getData();
    },

    // 查询按钮
    handleSubmit() {
      this.data = [];
      this.getPageData();
    },
    // 初始化表格
    getData() {
      const { defaultCurrent, defaultPageSize } = this.paginationOpt;
      getAll(defaultCurrent, defaultPageSize).then((res) => {
        if (res.data.code == 200) {
          this.paginationOpt.total = res.data.obj.total;
          let arr1 = res.data.obj.records;
          arr1.forEach((item) => {
            item.key = item.id;
          });
          this.data = arr1;
        }
      });
    },
    // 分页查询方法
    getPageData() {
      const { defaultCurrent, defaultPageSize } = this.paginationOpt;
      const page = { current: defaultCurrent, pageSize: defaultPageSize };
      const PageForm = Object.assign(this.Selectform, page);
      selectPage(PageForm).then((res) => {
        if (res.data.code == 200) {
          this.paginationOpt.total = res.data.obj.total;
          let arr = res.data.obj.records;
          arr.forEach((item) => {
            item.key = item.id;
          });
          this.data = arr;
          this.$message.success({
            content: res.data.message,
          });
        } else {
          this.$message.error({
            content: res.data.message,
          });
        }
      });
    },
    start() {
      this.loading = true;
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false;
        this.selectedRowKeys = [];
      }, 1000);
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    //添加弹窗
    addNew() {
      this.form = {};
      this.title = "新增";
      this.visible = true;
    },
    // 编辑弹窗
    onEdit(res) {
      this.title = "编辑";
      this.visible = true;
      this.form = res;
    },
    // 删除操作
    delData(id) {
      deleteYq(id).then((res) => {
        if (res.data.code == 200) {
          this.$message.success({
            content: res.data.message,
          });
          this.getData();
        } else {
          this.$message.error({
            content: res.data.message,
          });
        }
      });
    },
    onDel(id) {
      let self = this;
      this.$confirm({
        title: "提示",
        content: "确定删除该条信息？",
        okText: "确认",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          self.delData(id);
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
            addYq(data).then((res) => {
              if (res.data.code == 200) {
                this.$message.success({
                  content: res.data.message,
                });
                this.visible = false;
                this.getData();
              } else {
                this.$message.error({
                  content: res.data.message,
                });
              }
            });
          } else {
            const data = this.form;
            updateYq(data).then((res) => {
              if (res.data.code == 200) {
                this.$message.success({
                  content: res.data.message,
                });
                this.visible = false;
                this.getData();
              } else {
                this.$message.error({
                  content: res.data.message,
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



