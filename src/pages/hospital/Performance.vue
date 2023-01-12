<template>
  <div>
    <a-card class="card" title="填报信息">
      <a-form :form="form1" class="form" v-bind="formItemLayout">
        <a-row>
          <a-col :xl="{ span: 6 }" :lg="{ span: 6 }" :md="{ span: 8 }" :sm="24">
            <a-form-item :label="'单位名称'">
              <a-input v-decorator="['name']" />
            </a-form-item>
          </a-col>
          <a-col
            :xl="{ span: 6, offset: 3 }"
            :lg="{ span: 8 }"
            :md="{ span: 12 }"
            :sm="24"
          >
            <a-form-item :label="'填报人'">
              <a-input
                v-decorator="[
                  'note',
                  {
                    initialValue: 'Mis Zhang',
                    rules: [
                      { required: true, message: 'Please input your note!' },
                    ],
                  },
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col
            :xl="{ span: 6, offset: 3 }"
            :lg="{ span: 8 }"
            :md="{ span: 12 }"
            :sm="24"
          >
            <a-form-item :label="'填报人联系方式'">
              <a-input
                v-decorator="[
                  'num',
                  {
                    initialValue: 17320201219,
                    rules: [
                      { required: true, message: 'Please input your note!' },
                    ],
                  },
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <a-card class="card2" title="绩效指标填报">
      <Select slot="extra" @getData="handleChange"></Select>
      <a-collapse v-model="activeKey" expandIconPosition="right">
        <a-collapse-panel key="1" header="社会评价">
          <a-form :form="form2">
            <a-steps>
              <a-row
                type="flex"
                justify="space-between"
                style="width: 100%"
                :gutter="32"
              >
                <div v-for="(item, index) in ruleForm.inputList1" :key="index">
                  <a-col :span="8">
                    <a-form-item :label="item.label">
                      <a-input
                        v-decorator="[
                          item.prop,
                          {
                            rules: [
                              {
                                required: true,
                                message: item.rules,
                                whitespace: true,
                              },
                            ],
                          },
                        ]"
                        :placeholder="item.placeholder"
                        allow-clear
                        :addon-after="item.unit"
                      >
                      </a-input>
                    </a-form-item>
                  </a-col>
                </div>
              </a-row>
            </a-steps>
          </a-form>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="内部管理">
          <a-form :form="form3" class="form_task">
            <a-steps>
              <a-row type="flex" style="width: 100%" :gutter="32">
                <div v-for="(item, index) in ruleForm.inputList2" :key="index">
                  <a-col :span="8">
                    <a-form-item :label="item.label">
                      <a-input
                        v-decorator="[
                          item.prop,
                          {
                            rules: [
                              {
                                required: true,
                                message: item.rules,
                                whitespace: true,
                              },
                            ],
                          },
                        ]"
                        :placeholder="item.placeholder"
                        allow-clear
                        :addon-after="item.unit"
                      >
                      </a-input>
                    </a-form-item>
                  </a-col>
                </div>
              </a-row>
            </a-steps>
          </a-form>
        </a-collapse-panel>
      </a-collapse>
    </a-card>
    <a-card class="card3">
      <a-button
        type="primary"
        style="margin-right: 8px"
        @click="onSubmit"
        :loading="loading"
      >
        暂存
      </a-button>
      <a-button type="primary" @click="validate" :loading="loading">
        提交
      </a-button>
    </a-card>
  </div>
</template>

<script>
import Select from "../../components/select/Select.vue";
import { getInput, getData, uptarget } from "@/services/hospital";
export default {
  name: "Performance",
  components: { Select },
  props: ["showSubmit"],

  data() {
    return {
      activeKey: ["1", "2"],
      year: "2020",
      ruleForm: {
        inputList1: [],
        inputList2: [],
      },

      current: 0,
      save: true, //暂存
      formItemLayout: {
        labelCol: { span: 10 },
        wrapperCol: { span: 14 },
      },
      loading: false,
    };
  },
  beforeCreate() {
    (this.form1 = this.$form.createForm(this, { name: "form1" })),
      (this.form2 = this.$form.createForm(this, { name: "form2" })),
      (this.form3 = this.$form.createForm(this, { name: "form3" }));
  },
  methods: {
    handleChange(value) {
      this.year = value;
      this.getInputValue();
    },
    getInput() {
      getInput().then((res) => {
        if (res.data.code == 200) {
          let rest1 = res.data.obj.filter(function (item) {
            return item.type === "0" && item.disabled === "0";
          });
          let rest2 = res.data.obj.filter(function (item) {
            return item.type === "1" && item.disabled === "0";
          });
          this.ruleForm.inputList1 = rest1;
          this.ruleForm.inputList2 = rest2;
        }
      });
    },
    getInputValue() {
      this.form2.resetFields();
      this.form3.resetFields();
      getData("00001", this.year).then((res) => {
        if (res.data.code == 200) {
          let data = res.data.obj[0];
          this.form1.setFieldsValue({
            name: data.hospitalName,
          });
          this.form2.setFieldsValue({
            medicalConciliation: data.medicalConciliation,
            medicalIdentify: data.medicalIdentify,
          });
          this.ruleForm.inputList2.map((item) => {
            if (data[item.prop] !== null) {
              this.form3.setFieldsValue({
                [item.prop]: data[item.prop],
              });
            }
          });
        } else {
          this.$message.error({
            content: res.data.message,
          });
        }
      });
    },
    onSubmit() {
      this.save = true;
      this.getInput();
      this.saveData();
    },
    saveData() {
      let formData = {
        employeeNo: "00001",
        years: this.year,
      };
      const target = Object.assign(
        this.form1.getFieldsValue(),
        this.form2.getFieldsValue(),
        this.form3.getFieldsValue(),
        formData
      );
   
      uptarget(target).then((res) => {
        if (res.data.code == 200) {
          if (this.save != true) {
            this.$message.success({
              content: res.data.message,
            });
          } else {
            this.$message.success({
              content: "暂存成功",
            });
          }
        } else {
          this.$message.error({
            content: res.data.message,
          });
        }
      });
    },
    validate() {
      this.save = false;
      this.form1.validateFields((err) => {
        if (err) {
          return;
        }
      });
      this.form2.validateFieldsAndScroll((err) => {
        if (err) {
          return;
        }
      });
      this.form3.validateFieldsAndScroll((err) => {
        if (err) {
          return;
        } else {
          this.saveData();
        }
      });
    },
  },
  created() {
    this.getInput();
  },
  mounted() {
    this.getInputValue();
  },
  computed: {},
};
</script>


<style >

.form {
  padding: 0px 80px;
}

.form_task::-webkit-scrollbar {
  width: 4px;
  /* height: 4px;*/
}

.form_task::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
  background: rgba(0, 0, 0, 0);
}

.form_task::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
  border-radius: 0;
  background: rgba(0, 0, 0, 0);
}

.form_task {
  overflow-y: auto;
  max-height: 300px;
  /*margin: 20px  auto;*/

}

.card {
  height: 145px;
  margin-bottom: 18px;
}

.card2 {
  height: 677px;

}

.card3 {
  text-align: center;
}
</style>