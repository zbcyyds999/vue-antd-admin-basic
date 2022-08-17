<template>
  <a-card class="card" title="附件上传" :bordered="false" style="height: 100%">
    <Select slot="extra" @getData="handleChange"></Select>
    <div class="upForm">
      <a-form
        id="components-form-demo-validate-other"
        :form="form"
        v-bind="formItemLayout"
        @submit="handleSubmit"
      >
        <a-row>
          <a-col :span="10" :offset="1">
            <a-form-item
              label="医学期刊发表论文数SCI"
              extra="每篇仅上传封皮、目录、摘要三张"
            >
              <a-input-group compact>
                <a-input-number
                  v-decorator="['periodicalThesisSci', { initialValue: 0 }]"
                  :min="0"
                  :max="10"
                  @change="(value) => onChange(value, 'periodicalThesisSci')"
                />
              </a-input-group>
            </a-form-item>
            <a-form-item label="上传" v-if="0 < value['periodicalThesisSci']">
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
                :beforeUpload="beforeUpload"
                @preview="handlePreview"
                :customRequest="(file) => customRequest(file, 'SciFiles')"
              >
                <div
                  v-if="
                    fileList.SciFiles.length < value['periodicalThesisSci'] * 3
                  "
                >
                  <a-icon type="plus" />
                  <div class="ant-upload-text">点击上传</div>
                </div>
              </a-upload>
              <a-modal
                :visible="previewVisible"
                :footer="null"
                @cancel="handleCancel"
              >
                <img
                  alt="example"
                  style="width: 100%; height: 100%"
                  :src="previewImage"
                />
              </a-modal>
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item
              label="医学期刊发表论文数核心期刊"
              extra="每篇仅上传封皮、目录、摘要三张"
            >
              <a-input-group compact>
                <a-input-number
                  v-decorator="['periodicalThesisCore', { initialValue: 0 }]"
                  :min="0"
                  :max="10"
                  @change="(value) => onChange(value, 'periodicalThesisCore')"
                />
              </a-input-group>
            </a-form-item>
            <a-form-item label="上传" v-if="0 < value['periodicalThesisCore']">
              <a-upload
                v-decorator="[
                  'CoreFiles',
                  {
                    initialValue: fileList.CoreFiles,
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
                :customRequest="(file) => customRequest(file, 'CoreFiles')"
              >
                <div
                  v-if="
                    fileList.CoreFiles.length <
                    value['periodicalThesisCore'] * 3
                  "
                >
                  <a-icon type="plus" />
                  <div class="ant-upload-text">Upload</div>
                </div>
              </a-upload>
              <a-modal
                :visible="previewVisible"
                :footer="null"
                @cancel="handleCancel"
              >
                <img
                  alt="example"
                  style="width: 100%; height: 100%"
                  :src="previewImage"
                />
              </a-modal>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="10" :offset="1">
            <a-form-item
              label="医学期刊发表论文数其他正式期刊"
              extra="每篇仅上传封皮、目录、摘要三张"
            >
              <a-input-group compact>
                <a-input-number
                  v-decorator="['periodicalThesisFormal', { initialValue: 0 }]"
                  :min="0"
                  :max="10"
                  @change="(value) => onChange(value, 'periodicalThesisFormal')"
                />
              </a-input-group>
            </a-form-item>
            <a-form-item
              label="上传"
              v-if="0 < value['periodicalThesisFormal']"
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
                :beforeUpload="beforeUpload"
                @preview="handlePreview"
                :customRequest="(file) => customRequest(file, 'FormalFiles')"
              >
                <div
                  v-if="
                    fileList.FormalFiles.length <
                    value['periodicalThesisFormal'] * 3
                  "
                >
                  <a-icon type="plus" />
                  <div class="ant-upload-text">Upload</div>
                </div>
              </a-upload>
              <a-modal
                :visible="previewVisible"
                :footer="null"
                @cancel="handleCancel"
                width="40%"
              >
                <img alt="example" style="width: 100%" :src="previewImage" />
              </a-modal>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <div v-for="(item, index) in upList" :key="index">
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
              <a-form-item label="上传" v-if="0 < value[item.prop]">
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
                  :customRequest="
                    (file) => customRequest(file, [item.prop] + 'Files')
                  "
                >
                  <div v-if="0 < value[item.prop]">
                    <a-icon type="plus" />
                    <div class="ant-upload-text">Upload</div>
                  </div>
                </a-upload>
                <a-modal
                  :visible="previewVisible"
                  :footer="null"
                  @cancel="handleCancel"
                  style="width: 123%"
                >
                  <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
              </a-form-item>
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
        <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
          <a-button type="primary" html-type="submit"> 提交 </a-button>
        </a-form-item>
      </a-form>
    </div>
  </a-card>
</template>

<script>
import Select from "../../components/select/Select";
import { getInput, getData } from "@/services/hospital";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default {
  name: "upload",
  components: { Select },
  data() {
    return {
      year: "2020",
      previewVisible: false,
      previewImage: "",
      value: {},
      formData: [],
      fileList: {
        SciFiles: [],
        CoreFiles: [],
        FormalFiles: [],
      },
      upList: [],
      upList2: [],
      formItemLayout: {
        labelCol: { span: 11 },
        wrapperCol: { span: 12 },
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "validate_other" });
  },
  methods: {
    //调用年份选择下拉框
    handleChange(value) {
      this.year = value;
      //重新请求文本框的值
      this.form.resetFields();
      this.getInputValue();
    },
    //上传图片的回调
    customRequest(file, fileKey) {
      console.log(fileKey);

      // 后端需要接受的参数是 formData数据，
      const form = new FormData();
      form.append("file", file.file);
      form.append("employeeNo", "00001");
      form.append("type", fileKey);
      console.log(111, form);
      this.axios({
        url: "api/file/fileUpload",
        method: "post",
        headers: { "Content-Type": "multipart/file" },
        data: form,
      }).then((res) => {
        if (res.data.code == 200) {
          // 调用组件内方法, 设置为成功状态
          this.getGameInfo();
          file.onSuccess(res, file.file);
          file.status = "done";
        } else {
          file.onError();
          file.status = "error";
        }
      });
    },

    onChange(value, info) {
      this.value[info] = value;
    },
    getInput() {
      console.log(this.fileList["Sci" + "Files"]);
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
      getData("00001", this.year).then((response) => {
        console.log(response.data.obj);
        if (response.data.code == 200) {
          let res = response.data.obj[0];
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
        this.deleteImg(e.file.uid);
        let deleteUid = e.file.uid;
        this.fileList[info] = this.fileList[info].filter(function (item) {
          return item.uid != deleteUid;
        });
        if (e.fileList.length == 0) {
          return {} && [];
        }
      }
      if (e.file.status === "done") {
        // this.fileList[info] = e;
        this.fileList[info].push(e.file.response);
      }
      return e && e.fileList;
    },
    deleteImg(id) {
      this.axios({
        url: "api/file/fileId",
        method: "delete",
        params: {
          id: id,
        },
      }).then((res) => {
        if (res.data.code == 200) {
          this.$message.success({
            content: res.data.message,
          });
        }
      });
    },
    getGameInfo() {
      this.axios({
        url: "api/file/fileList",
        method: "get",
        params: {
          employeeNo: "00001",
        },
      }).then((res) => {
        if (res.data.code == 200) {
          this.fileList = {
            SciFiles: [],
            CoreFiles: [],
            FormalFiles: [],
          };
          const photo = res.data.obj.map((item) => {
            let index = item.filepath.lastIndexOf("\\");
            return {
              uid: item.id,
              status: "done",
              name: item.filename,
              url:
                "http://localhost:8080/img/" +
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
          console.log(this.fileList);
        }
      });
    },

    //上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。
    beforeUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png";
      //判断上传文件格式
      if (!isJPG) {
        this.$message.error("图片格式不正确");
      }
      const isLt2M = file.size / 1024 / 1024 < 5; //计算上传文件的大小
      if (!isLt2M) {
        this.$message.error("图片大小不得大于5M");
      }
      return isJPG && isLt2M;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          values.years = this.year;
          values.employeeNo = "00001";
          console.log(values);
          this.axios({
            url: "/api/target-hospital/editTarget",
            method: "put",
            data: values,
          }).then((response) => {
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
  },
  mounted() {
    // 从后台获取所有奖项的lable值
    this.getInput();
    // 从后台获取所有奖项的数量值
    this.getInputValue();
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
