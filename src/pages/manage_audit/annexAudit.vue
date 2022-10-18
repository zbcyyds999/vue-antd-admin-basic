<template>
  <div>
    <a-card
      class="card"
      title="附件上传"
      :bordered="false"
      style="height: 100%"
    >
      <Select slot="extra" @getData="(e) => handleChange(e, 'year')"></Select>
      <a-select
        slot="extra"
        style="width: 200px"
        default-value="广外医院"
        @change="(e) => handleChange(e, 'employeeNo')"
      >
        <a-select-option v-for="item in HospitalList" :key="item.label">
          {{ item.value }}
        </a-select-option>
      </a-select>
      <div class="upForm">
        <a-form
          id="components-form-demo-validate-other"
          :form="form"
          v-bind="formItemLayout"
        >
          <a-row>
            <a-col :span="11">
              <a-form-item label="医学期刊发表论文数SCI">
                <a-input-group compact>
                  <a-input-number
                    v-decorator="['periodicalThesisSci', { initialValue: 0 }]"
                    :min="0"
                    :max="10"
                    @change="(value) => onChange(value, 'periodicalThesisSci')"
                  />
                </a-input-group>
              </a-form-item>
              <a-form-item
                label="附件图片"
                v-if="0 < this.fileList.SciFiles.length"
              >
                <a-upload
                  v-decorator="[
                    'SciFiles',
                    {
                      initialValue: fileList.SciFiles,
                      valuePropName: 'fileList.SciFiles',
                      getValueFromEvent: (value) =>
                        normBatchFiles(value, 'SciFiles'),
                    },
                  ]"
                  list-type="picture-card"
                  :multiple="true"
                  :file-list="fileList.SciFiles"
                  class="avatar-uploader"
                  @change="handleCancel"
                  @preview="handlePreview"
                >
                </a-upload>
                <a-modal
                  :visible="previewVisible"
                  :footer="null"
                  @cancel="handleCancel"
                >
                  <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
              </a-form-item>
              <a-form-item
                label="审核"
                extra="默认是审核通过，如有误差点击修改"
                v-if="0 < this.fileList.SciFiles.length"
              >
                <a-button type="primary" disabled> 通过 </a-button>
                <a-button
                  type="primary"
                  @click="
                    showDrawer('periodicalThesisSci', '医学期刊发表论文数SCI')
                  "
                >
                  不通过
                </a-button>
              </a-form-item>
              <div v-for="(item, index) in steps" :key="index">
                <a-form-item
                  label="审核意见"
                  style="color: red; font-size: 24px"
                  v-if="item.type == 'periodicalThesisSci'"
                  >{{ item.view }}</a-form-item
                >
              </div>
            </a-col>
            <a-col :span="11">
              <a-form-item label="医学期刊发表论文数核心期刊">
                <a-input-group compact>
                  <a-input-number
                    v-decorator="['periodicalThesisCore', { initialValue: 0 }]"
                    :min="0"
                    :max="10"
                    @change="(value) => onChange(value, 'periodicalThesisCore')"
                  />
                </a-input-group>
              </a-form-item>
              <a-form-item
                label="附件图片"
                v-if="0 < this.fileList.CoreFiles.length"
              >
                <a-upload
                  v-decorator="[
                    'CoreFiles',
                    {
                      valuePropName: 'fileList.CoreFiles',
                      getValueFromEvent: (value) =>
                        normBatchFiles(value, 'CoreFiles'),
                    },
                  ]"
                  list-type="picture-card"
                  :file-list="fileList.CoreFiles"
                  :multiple="true"
                  class="avatar-uploader"
                  @preview="handlePreview"
                >
                </a-upload>
                <a-modal
                  :visible="previewVisible"
                  :footer="null"
                  @cancel="handleCancel"
                >
                  <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
              </a-form-item>
              <a-form-item
                label="审核"
                extra="默认是审核通过，如有误差点击修改"
                v-if="0 < this.fileList.CoreFiles.length"
              >
                <a-button type="primary" disabled> 通过 </a-button>
                <a-button
                  type="primary"
                  @click="
                    showDrawer(
                      'periodicalThesisCore',
                      '医学期刊发表论文数核心期刊'
                    )
                  "
                >
                  不通过
                </a-button>
              </a-form-item>
              <div v-for="(item, index) in steps" :key="index">
                <a-form-item
                  label="审核意见"
                  style="color: red; font-size: 24px"
                  v-if="item.type == 'periodicalThesisCore'"
                  >{{ item.view }}</a-form-item
                >
              </div>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="11">
              <a-form-item label="医学期刊发表论文数其他正式期刊">
                <a-input-group compact>
                  <a-input-number
                    v-decorator="[
                      'periodicalThesisFormal',
                      { initialValue: 0 },
                    ]"
                    :min="0"
                    :max="10"
                    @change="
                      (value) => onChange(value, 'periodicalThesisFormal')
                    "
                  />
                </a-input-group>
              </a-form-item>
              <a-form-item
                label="附件图片"
                v-if="0 < this.fileList.FormalFiles.length"
              >
                <a-upload
                  v-decorator="[
                    'FormalFiles',
                    {
                      initialValue: fileList.FormalFiles,
                      valuePropName: 'fileList.FormalFiles',
                      getValueFromEvent: (value) =>
                        normBatchFiles(value, 'FormalFiles'),
                    },
                  ]"
                  :file-list="fileList.FormalFiles"
                  list-type="picture-card"
                  :multiple="true"
                  class="avatar-uploader"
                  @preview="handlePreview"
                >
                </a-upload>
                <a-modal
                  :visible="previewVisible"
                  :footer="null"
                  @cancel="handleCancel"
                >
                  <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
              </a-form-item>
              <a-form-item
                label="审核"
                extra="默认是审核通过，如有误差点击修改"
                v-if="0 < this.fileList.FormalFiles.length"
              >
                <a-button type="primary" disabled> 通过 </a-button>
                <a-button
                  type="primary"
                  @click="
                    showDrawer(
                      'periodicalThesisFormal',
                      '医学期刊发表论文数其他正式期刊'
                    )
                  "
                >
                  不通过
                </a-button>
              </a-form-item>
              <div v-for="(item, index) in steps" :key="index">
                <a-form-item
                  label="审核意见"
                  style="color: red; font-size: 24px"
                  v-if="item.type == 'periodicalThesisFormal'"
                  >{{ item.view }}</a-form-item
                >
              </div>
            </a-col>
          </a-row>
          <a-row>
            <div v-for="(item, index) in upList" :key="index">
              <a-col :span="11">
                <a-form-item :label="item.label">
                  <a-input-group compact>
                    <a-input-number
                      v-decorator="[item.prop, { initialValue: 0 }]"
                      :min="0"
                      :max="10"
                      @change="(value) => onChange(value, item.prop)"
                    />
                  </a-input-group>
                </a-form-item>
                <a-form-item label="附件图片" v-if="0 < value[item.prop]">
                  <a-upload
                    v-decorator="[
                      item.prop + 'Files',
                      {
                        initialValue: fileList[item.prop] + 'Files',
                        valuePropName: fileList[item.prop] + 'Files',
                        getValueFromEvent: (value) =>
                          normBatchFiles(value, [item.prop] + 'Files'),
                      },
                    ]"
                    list-type="picture-card"
                    :file-list="fileList[item.prop + 'Files']"
                    :multiple="true"
                    class="avatar-uploader"
                    @preview="handlePreview"
                  >
                  </a-upload>
                  <a-modal
                    :visible="previewVisible"
                    :footer="null"
                    @cancel="handleCancel"
                  >
                    <img
                      alt="example"
                      style="width: 100%"
                      :src="previewImage"
                    />
                  </a-modal>
                </a-form-item>
                <a-form-item
                  label="审核"
                  extra="默认是审核通过，如有误差点击修改"
                  v-if="0 < value[item.prop]"
                >
                  <a-button type="primary" disabled> 通过 </a-button>
                  <a-button
                    type="primary"
                    @click="showDrawer(item.prop, item.label)"
                  >
                    不通过
                  </a-button>
                </a-form-item>
                <div v-for="(itm, index) in steps" :key="index">
                  <a-form-item
                    label="审核意见"
                    style="color: red; font-size: 24px"
                    v-if="itm.type == item.prop"
                    >{{ itm.view }}</a-form-item
                  >
                </div>
              </a-col>
            </div>
          </a-row>
          <a-row>
            <div v-for="(item, index) in upList2" :key="index">
              <a-col :span="10" :offset="1">
                <a-form-item :label="item.label">
                  <a-input-group compact>
                    <a-input-number
                      v-decorator="[item.prop, { initialValue: 0 }]"
                      :min="0"
                      :max="10"
                      @change="(value) => onChange(value, item.prop)"
                    />
                  </a-input-group>
                </a-form-item>
              </a-col>
            </div>
          </a-row>
        </a-form>
        <a-drawer
          title="审核意见填写"
          :width="720"
          :visible="visible"
          :body-style="{ paddingBottom: '80px' }"
          @close="onClose"
        >
          <a-form
            :form="viewform"
            v-bind="ItemLayout"
            @submit="handleViewSubmit"
          >
            <a-form-item label="年份">
              <a-input v-decorator="['years']" disabled />
            </a-form-item>
            <a-form-item label="医院名称">
              <a-input v-decorator="['hsname']" disabled />
            </a-form-item>
            <a-form-item label="医院账号" v-show="false">
              <a-input v-decorator="['employeeNo']" />
            </a-form-item>
            <a-form-item label="字段名" v-show="false">
              <a-input v-decorator="['type']" />
            </a-form-item>
            <a-form-item label="当前指标">
              <a-input v-decorator="['typename']" disabled />
            </a-form-item>
            <a-form-item label="未通过原因">
              <a-textarea
                v-decorator="[
                  'view',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请填写未通过原因',
                      },
                    ],
                  },
                ]"
                :rows="4"
                placeholder="请填写未通过原因"
              />
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 8 }">
              <a-button type="primary" html-type="submit"> 提交 </a-button>
            </a-form-item>
          </a-form>
        </a-drawer>
      </div>
    </a-card>
    <footer-tool-bar>
      <a-button type="primary" @click="handleSubmit"> 提交 </a-button>
    </footer-tool-bar>
  </div>
</template>
  
  <script>
import Select from "../../components/select/Select";
import {
  getInput,
  getData,
  fileId,
  fileList,
  uptarget,
  getHospital,
  insertView,
  getView,
} from "@/services/hospital";
import FooterToolBar from "../../components/tool/FooterToolBar.vue";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default {
  name: "annexAudit",
  components: { FooterToolBar, Select },
  data() {
    return {
      year: "2020",
      employeeNo: "00001",
      previewVisible: false,
      previewImage: "",
      visible: false,
      hsname: "",
      value: {},
      steps: [],
      formData: [],
      fileList: {
        SciFiles: [],
        CoreFiles: [],
        FormalFiles: [],
      },

      HospitalList: [],

      upList: [],
      upList2: [],
      ItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
      formItemLayout: {
        labelCol: { span: 11 },
        wrapperCol: { span: 13 },
      },
    };
  },
  beforeCreate() {
    this.viewform = this.$form.createForm(this, { name: "viewform" });
    this.form = this.$form.createForm(this, { name: "validate_other" });
  },
  methods: {
    showDrawer(e, name) {
      this.viewform.resetFields();
      getView(this.employeeNo, this.year, e).then((res) => {
        if (
          res.data !== undefined &&
          res.data.length > 0 &&
          res.data[0].states == "1"
        ) {
          let data = res.data[0];
          setTimeout(() => {
            this.viewform.setFieldsValue({
              employeeNo: data.employeeNo,
              years: data.years,
              type: e,
              hsname: this.hsname,
              typename: name,
              view: data.view,
            });
          }, 100);
        } else {
          setTimeout(() => {
            this.viewform.setFieldsValue({
              employeeNo: this.employeeNo,
              years: this.year,
              type: e,
              hsname: this.hsname,
              typename: name,
            });
          }, 100);
        }
      });

      this.visible = true;
    },
    onClose() {
      this.visible = false;
      
    },
    handleViewSubmit(e) {
      e.preventDefault();
      this.viewform.validateFieldsAndScroll((err, values) => {
        if (!err) {
          insertView(values).then((res) => {
            if (res.data.code == 200) {
              this.$message.success({
                content: res.data.message,
              });
              this.visible = false;
              this.getViews();
            } else {
              this.$message.error({
                content: res.data.message,
              });
            }
          });
         
        }
      });
    },
    getViews() {
      getView(this.employeeNo, this.year).then((res) => {
        if (res.data > "0") {
          this.steps = res.data;
        }
      });
    },
    //调用年份选择下拉框
    handleChange(e, info) {
      
      (this.fileList = {
        SciFiles: [],
        CoreFiles: [],
        FormalFiles: [],
      }),
      this.value={};
        (this.steps = []);
      this[info] = e; //重新请求文本框的值
      this.form.resetFields();
      this.getViews();
      this.getInputValue();
      this.getGameInfo();
    },
    //上传图片的回调
    onChange(value, info) {
      this.value[info] = value;
    },
    getHospital() {
      getHospital(this.year).then((res) => {
        if (res.status == 200)
          this.HospitalList = res.data.map((item) => {
            return {
              // label :item.employeeNo,
              value: item.hospitalName,
              label: item.employeeNo,
            };
          });
      });
    },
    getInput() {
      getInput().then((response) => {
        let rest = response.data.obj.filter(function (item) {
          return item.type === "3" && item.disabled === "0";
        });
        this.upList = rest;
        // 只需要填写人数
        let rest2 = response.data.obj.filter(function (item) {
          return item.type === "5" && item.disabled === "0";
        });
        this.upList2 = rest2;
      });
    },
    getInputValue() {
      getData(this.employeeNo, this.year).then((response) => {
        console.log(response.data.obj);
        if (response.data.code == 200) {
          let res = response.data.obj[0];
          this.hsname = res.hospitalName;
          this.upList.map((item) => {
            if (res[item.prop] !== null) {
              this.form.setFieldsValue({
                [item.prop]: res[item.prop],
                periodicalThesisSci: res.periodicalThesisSci,
                periodicalThesisCore: res.periodicalThesisCore,
                periodicalThesisFormal: res.periodicalThesisFormal,
              });
            }
          });
          this.upList2.map((item) => {
            if (res[item.prop] !== null) {
              this.form.setFieldsValue({
                [item.prop]: res[item.prop],
              });
            }
          });

          this.value = this.form.getFieldsValue();
        } else {
          this.$message.error({
            content: response.data.message,
          });
        }
      });
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    normBatchFiles(e, info) {
      if (e.file.status === "removed") {
        this.deleteImg(e, info);
      }
      if (e.file.status === "done") {
        // this.fileList[info] = e;
        this.fileList[info].push(e.file.response);
      }
      return e && e.fileList;
    },
    deleteImg(e, info) {
      fileId(e.file.uid).then((res) => {
        if (res.data.code == 200) {
          this.fileList[info] = this.fileList[info].filter(function (item) {
            return item.uid != e.file.uid;
          });
          if (e.fileList.length == 0) {
            return {} && [];
          }
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
    getGameInfo() {
      fileList(this.employeeNo, this.year).then((res) => {
        if (res.data.code == 200) {
          this.fileList = {
            SciFiles: [],
            CoreFiles: [],
            FormalFiles: [],
          };
          const photo = res.data.obj.map((item) => {
            let index = item.filepath.lastIndexOf("\\");
            let url = location.protocol + '//' + location.host+'/img/'
            return {
              uid: item.id,
              status: "done",
              name: item.filename,
              url:
                url +
                item.filepath.substring(index + 1, item.filepath.length),
              type: item.type,
            };
          });
          //   const fileRow = [];
          //   const key = null;
          for (let i = 0; i < photo.length; i++) {
            let item = photo[i];
            if (this.fileList[item.type] !== undefined) {
              this.fileList[item.type].push(item);
            } else {
              let fileRow = [];
              fileRow.push(item);
              this.fileList[item.type] = fileRow;
            }
          }
        }
      });
    },

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          values.years = this.year;
          values.employeeNo = this.employeeNo;
          console.log(values);
          uptarget(values).then((response) => {
            if (response.data.code == 200) {
              this.$message.success({
                content: response.data.message,
              });
            } else {
              this.$message.error({
                content: response.data.message,
              });
            }
          });
          console.log("Received values of form: ", values);
        }
      });
    },
  },
  created() {
    // 从后台获取所有图片 并根据图片类型初始化fileList的数组值
    this.getGameInfo();
    this.getViews();
  },
  mounted() {
    // 从后台获取所有奖项的lable值
    this.getInput();
    // 从后台获取所有奖项的数量值
    this.getInputValue();
    this.getHospital();
  },
};
</script>
  
  <style>
.upForm::-webkit-scrollbar {
  width: 4px;
  /* height: 4px;*/
}

.upForm::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
  background: rgba(0, 0, 0, 0);
}

.upForm::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
  border-radius: 0;
  background: rgba(0, 0, 0, 0);
}

.upForm {
  overflow-y: auto;
  max-height: 820px;
  /*margin: 20px  auto;*/
}

.ant-upload-select-picture-card i {
  font-size: 18px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  font-size: 10px;
  color: #666;
}
</style>
  