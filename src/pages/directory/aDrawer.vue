<template>
  <a-drawer
    :title="title"
    :width="720"
    :visible="visible"
    :body-style="{ paddingBottom: '80px' }"
    @close="onClose"
  >
    <a-form-model ref="ruleForm" :model="form" :rules="rules" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-model-item label="信息资源代码" prop="resNameCode">
            <a-input
              v-model="form.resNameCode"
              placeholder="请输入信息资源代码"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="信息资源提供方" prop="provider">
            <a-input
              v-model="form.provider"
              placeholder="请输入信息资源提供方"
            ></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-model-item label="信息资源提供方代码" prop="providerCode">
            <a-input
              v-model="form.providerCode"
              placeholder="请输入信息资源提供方代码"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="12"> </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-model-item label="信息资源摘要" prop="resAbstract">
            <a-input
              v-model="form.resAbstract"
              type="textarea"
              placeholder="请输入摘要内容"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-model-item label="信息资源格式" prop="formatSand">
            <a-checkbox-group v-model="form.formatSand" :options="sands">
            </a-checkbox-group>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-model-item label="信息项名称" prop="formatName">
            <a-input
              v-model="form.formatName"
              placeholder="请输入信息项名称"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="数据类型" prop="dataType">
            <a-select v-model="form.dataType" placeholder="请选择数据类型">
              <a-select-option v-for="datatp in dataTypes" :key="datatp">
                {{ datatp }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-model-item label="共享类型" prop="shareType">
            <a-select
              v-model="form.shareType"
              @change="getSharing"
              placeholder="请选择共享类型"
            >
              <a-select-option value="无条件共享"> 无条件共享 </a-select-option>
              <a-select-option value="有条件共享"> 有条件共享 </a-select-option>
              <a-select-option value="不予共享"> 不予共享 </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="共享条件" prop="shareUri" v-if="show">
            <a-input v-model="form.shareUri" placeholder="请输入共享条件" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-model-item label="共享方式" prop="shareCheck">
            <a-checkbox-group v-model="form.shareCheck" :options="shares">
            </a-checkbox-group>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-model-item label="是否向社会开放" prop="opening">
            <a-switch v-model="form.opening" @change="getOpening" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item
            label="开放条件"
            prop="openCondition"
            v-if="openshow"
          >
            <a-input
              v-model="form.openCondition"
              placeholder="请输入共享条件"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-model-item label="更新周期" prop="cycleItem">
            <a-select v-model="form.cycleItem" placeholder="请选择更新周期">
              <a-select-option v-for="item in cycles" :key="item"
                >{{ item }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="发布日期" prop="releaseDate" required>
            <a-date-picker
              :format="dateFormat"
              v-model="form.releaseDate"
              type="date"
              placeholder="选择日期"
              style="width: 100%"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
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
      <a-button style="margin-left: 10px" @click="resetForm"> 重置 </a-button>
    </div>
  </a-drawer>
</template>
<script>
export default {
  name: "AddForm",
  props: ["title","visible"],
  data() {
    return {
      dateFormat: "YYYY-MM-DD",
      show: false, //判断共享条件弹窗是否可见
      openshow: false, //判断开放条件弹窗是否可见
      cycles: ["实时", "每日", "每周", "每月", "每季度", "每年"],
      dataTypes: [
        "字符型 C",
        "数值型 N",
        "货币型 Y",
        "日期型 D",
        "日期时间型 T",
        "通用型 G",
        "双精度型 B",
        "整型 I",
        "浮点型 F",
      ],
      shares: ["共享平台", "邮件", "拷盘", "电子文档", "纸质报表"],
      sands: ["Oracle", "MySql", "MongoDB", "xml", "docx", "pdf", "xlsx"],
      form: {
        id: null,
        resNameCode: "",
        provider: "",
        providerCode: "",
        resAbstract: "",
        formatSand: [],
        formatName: "",
        dataType: undefined,
        shareType: undefined,
        shareUri: "",
        shareCheck: [],
        opening: false,
        openCondition: "",
        cycleItem: undefined,
        releaseDate: null,
        sourceRange: "",
      },
      rules: {
        //表单验证
        resNameCode: [
          { required: true, message: "请输入信息资源代码", trigger: "blur" },
        ],
        provider: [
          { required: true, message: "请输入信息资源提供方", trigger: "blur" },
        ],
        providerCode: [
          {
            required: true,
            message: "请输入信息资源提供方代码",
            trigger: "blur",
          },
        ],
        resAbstract: [
          { required: true, message: "请输入信息资源摘要", trigger: "blur" },
        ],
        formatSand: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个信息资源格式",
            trigger: "change",
          },
        ],
        formatName: [
          { required: true, message: "请输入信息项名称", trigger: "blur" },
        ],
        dataType: [
          { required: true, message: "请选择数据类型", trigger: "blur" },
        ],
        shareType: [
          { required: true, message: "请选择共享类型", trigger: "blur" },
        ],
        shareUri: [
          { required: true, message: "请填写共享条件", trigger: "blur" },
        ],
        shareCheck: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个共享方式",
            trigger: "change",
          },
        ],
        opening: [
          { required: true, message: "请选择是否向社会开放", trigger: "blur" },
        ],
        openCondition: [
          { required: true, message: "请选择开放条件", trigger: "blur" },
        ],
        cycleItem: [
          { required: true, message: "请选择更新周期", trigger: "blur" },
        ],
        releaseDate: [
          { required: true, message: "请选择发布日期", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    //判断是弹出条件弹窗
    getSharing(value) {
      if (value == "有条件共享") {
        this.show = !this.show;
      } else {
        this.show = false;
      }
    },
    getOpening(value) {
      if (value == true) {
        this.openshow = !this.openshow;
      } else {
        this.openshow = false;
      }
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    onClose() {
      this.visible = false;
    },
  },
};
</script>
