<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-row :gutter="16">
      <a-col :span="12">
        <el-form-item label="信息资源目" prop="cid">
          <el-input v-model="inputType" :disabled="true"></el-input>
        </el-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-model-item label="信息资源提供方">
          <a-input
            v-decorator="[
              'provider',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please enter user name',
                  },
                ],
              },
            ]"
            placeholder="Please enter user name"
          />
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="12">
        <a-form-model-item label="信息资源提供方代码">
          <a-input
            v-decorator="[
              'providerCode',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please enter user name',
                  },
                ],
              },
            ]"
            placeholder="Please enter user name"
          />
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="24">
        <a-form-model-item label="信息资源摘要">
          <a-textarea
            v-decorator="[
              'resAbstract',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please enter url description',
                  },
                ],
              },
            ]"
            size="small"
            :rows="2"
            placeholder="please enter url description"
          />
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="24">
        <a-form-model-item label="信息资源格式">
          <a-checkbox-group
            v-decorator="['formatSand', { initialValue: ['A', 'B'] }]"
            style="width: 100%"
            :options="sands"
          >
          </a-checkbox-group>
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="12">
        <a-form-model-item label="信息项名称">
          <a-input
            v-decorator="[
              'formatName',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please enter user name',
                  },
                ],
              },
            ]"
            placeholder="Please enter user name"
          />
        </a-form-model-item>
      </a-col>
      <a-col :span="12">
        <a-form-model-item label="数据类型">
          <a-select
            v-decorator="[
              'dataType',
              {
                rules: [
                  {
                    required: true,
                    message: '请选择数据类型',
                  },
                ],
              },
            ]"
            placeholder="请选择数据类型"
          >
            <a-select-option v-for="type in dataTypes" :key="type">
              {{ type }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="12">
        <a-form-model-item label="共享类型">
          <a-select
            v-decorator="[
              'shareType',
              {
                rules: [
                  {
                    required: true,
                    message: '请选择共享类型',
                  },
                ],
              },
            ]"
            placeholder="请选择共享类型"
          >
            <a-select-option value="无条件共享"> 无条件共享 </a-select-option>
            <a-select-option value="有条件共享"> 有条件共享 </a-select-option>
            <a-select-option value="不予共享"> 不予共享 </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-col>
      <a-col :span="12">
        <a-form-model-item label="Type">
          <a-select
            v-decorator="[
              'type',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please choose the type',
                  },
                ],
              },
            ]"
            placeholder="Please choose the type"
          >
            <a-select-option value="private"> Private </a-select-option>
            <a-select-option value="public"> Public </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="24">
        <a-form-model-item label="共享方式">
          <a-checkbox-group
            v-decorator="['shareCheck']"
            style="width: 100%"
            :options="shares"
          >
          </a-checkbox-group>
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="12">
        <a-form-model-item label="是否向社会开放">
          <a-radio-group v-decorator="['opening']">
            <a-radio value="a"> item 1 </a-radio>
            <a-radio value="b"> item 2 </a-radio>
            <a-radio value="c"> item 3 </a-radio>
          </a-radio-group>
        </a-form-model-item>
      </a-col>
      <a-col :span="12">
        <a-form-model-item label="Type">
          <a-select
            v-decorator="[
              'type',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please choose the type',
                  },
                ],
              },
            ]"
            placeholder="Please choose the type"
          >
            <a-select-option value="private"> Private </a-select-option>
            <a-select-option value="public"> Public </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="12">
        <a-form-model-item label="更新周期">
          <a-select
            v-decorator="[
              'cycleItem',
              {
                rules: [
                  {
                    required: true,
                    message: '请选择更新周期',
                  },
                ],
              },
            ]"
            placeholder="请选择更新周期"
          >
            <a-select-option v-for="item in cycles" :key="item"
              >{{ item }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-col>
      <a-col :span="12">
        <a-form-model-item label="发布日期">
          <a-date-picker
            v-decorator="[
              'releaseDate',
              {
                rules: [
                  {
                    required: true,
                    message: '选择日期',
                  },
                ],
              },
            ]"
            style="width: 100%"
            :get-popup-container="(trigger) => trigger.parentNode"
          />
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit"> Create </a-button>
      <a-button style="margin-left: 10px" @click="resetForm"> Reset </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: "",
      inputType: "",
      addData: {
        id: null,
        resNameCode: "",
        provider: "",
        providerCode: "",
        resAbstract: "",
        formatSand: [],
        formatName: "",
        dataType: "",
        shareType: "",
        shareUri: "",
        shareCheck: [],
        opening: "",
        openCondition: "",
        cycleItem: "",
        releaseDate: "",
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
  },
};
</script>
