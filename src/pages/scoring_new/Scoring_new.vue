<template>
  <a-card class="card" title="绩效计分" :bordered="false">
    <a-button
      icon="search"
      type="primary"
      style="margin-right: 10px"
      @click="exportData"
      >导出Excel
    </a-button>
    <a-upload
      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      :beforeUpload="beforeUpload"
      @change="handleFileChange"
    >
      <a-button type="primary">导入Excel</a-button>
    </a-upload>

    <Select slot="extra" @getData="handleChangeYear"></Select>

    <a-table
      v-show="false"
      :id="hideTableId"
      :columns="Treedata"
      :data-source="data"
      bordered
      size="middle"
      :pagination="false"
      :scroll="{ x: 'calc(700px + 50%)' }"
      :rowKey="
        (record, index) => {
          return index;
        }
      "
    ></a-table>
    <a-table
      :columns="columns"
      :data-source="data"
      bordered
      size="middle"
      :pagination="false"
      :scroll="{ x: 'calc(700px + 50%)' }"
      :rowKey="
        (record, index) => {
          return index;
        }
      "
    >
      <template
        v-for="col in ['Patient_satisfaction_score', 'Appointment_rate_score']"
        :slot="col"
        slot-scope="text, record"
      >
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="(e) => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.key)">保存</a>
            <a-popconfirm title="确定取消?" @confirm="() => cancel(record.key)">
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a :disabled="editingKey !== ''" @click="() => edit(record.key)"
              >计分</a
            >
            <a-divider type="vertical" />
            <a>预览</a>
            <a-divider type="vertical" />
            <a>下载</a>
          </span>
        </div>
      </template>
    </a-table>
  </a-card>
</template>
<script>
import Select from "../../components/select/Select";
import { getTree, getExcel, getScoringList,getStrArray } from "@/services/hospital";
import { tableToExcel } from "@/utils/excel";
import * as XLSX from "xlsx";

const columns = [];
const data = [
  {
    key: 1,
    name: `北京市宣武中医医院`,
    Patient_satisfaction_formula: "无",
    Patient_satisfaction_value: "无",
    Patient_satisfaction_score: "8",
    Appointment_rate_formula: "(150300/140000)*100%",
    Appointment_rate_value: "10.73%",
    Appointment_rate_score: "8",
    complaint_rate_formula: "(150300/140000)*100%",
    complaint_rate_value: "7%",
    complaint_rate_score: "7",
  },
  {
    key: 2,
    name: `北京市中医药大学护国寺中医医院`,
    Patient_satisfaction_formula: "无",
    Patient_satisfaction_value: "无",
    Patient_satisfaction_score: "7.6",
    Appointment_rate_formula: "(150300/140000)*100%",
    Appointment_rate_value: "11.4%",
    Appointment_rate_score: "8.3",
    complaint_rate_formula: "(150300/140000)*100%",
    complaint_rate_value: "7%",
    complaint_rate_score: "7",
  },
  {
    key: 3,
    name: `北京市西城区展览路医院`,
    Patient_satisfaction_formula: "无",
    Patient_satisfaction_value: "无",
    Patient_satisfaction_score: "9.1",
    Appointment_rate_formula: "(170300/140000)*100%",
    Appointment_rate_value: "17.73%",
    Appointment_rate_score: "9",
    complaint_rate_formula: "(150300/140000)*100%",
    complaint_rate_value: "8.4%",
    complaint_rate_score: "7",
  },
  {
    key: 4,
    name: `北京市第二医院`,
    Patient_satisfaction_formula: "无",
    Patient_satisfaction_value: "无",
    Patient_satisfaction_score: "9",
    Appointment_rate_formula: "(120300/140000)*100%",
    Appointment_rate_value: "8.68%",
    Appointment_rate_score: "7.9",
    complaint_rate_formula: "(150300/140000)*100%",
    complaint_rate_value: "7%",
    complaint_rate_score: "7",
  },
  {
    key: 5,
    name: `北京市回民医院`,
    Patient_satisfaction_formula: "无",
    Patient_satisfaction_value: "无",
    Patient_satisfaction_score: "8",
    Appointment_rate_formula: "(150300/140000)*100%",
    Appointment_rate_value: "11.63%",
    Appointment_rate_score: "8.2",
    complaint_rate_formula: "(150300/140000)*100%",
    complaint_rate_value: "7%",
    complaint_rate_score: "7",
  },
  {
    key: 6,
    name: `北京市丰盛中医骨伤专科医院`,
    Patient_satisfaction_formula: "无",
    Patient_satisfaction_value: "无",
    Patient_satisfaction_score: "8",
    Appointment_rate_formula: "(150300/140000)*100%",
    Appointment_rate_value: "10.73%",
    Appointment_rate_score: "8",
    complaint_rate_formula: "(150300/140000)*100%",
    complaint_rate_value: "7%",
    complaint_rate_score: "7",
  },
  {
    key: 7,
    name: `首都医科大学附属复兴医院`,
    street: "8",
    gender: "M",
  },
  {
    key: 8,
    name: `北京市西城区妇幼保健院`,
    street: "8",
    gender: "M",
  },
  {
    key: 9,
    name: `北京市西城区广外医院`,
    street: "8",
    gender: "M",
  },
  {
    key: 10,
    name: `北京市肛肠医院`,
    street: "7",
    gender: "M",
  },
  {
    key: 11,
    name: `北京市西城区平安医院`,
    street: "8",
    gender: "M",
  },
];
export default {
  name: "Scoring_new",
  components: { Select },

  data() {
    this.cacheData = data.map((item) => ({ ...item }));
    return {
      data,
      columns,
      datas: [],
      excels: [],
      hideTableId: "sheet",
      Treedata: [],
      year: "2020",
      editingKey: "",
    };
  },
  methods: {
    handleFileChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    beforeUpload(file) {
      let _this = this;
      return new Promise(function (resolve) {
        // readExcel方法也使用了Promise异步转同步，此处使用then对返回值进行处理
        _this.readExcel(file).then((result) => {
          // 此时标识校验成功，为resolve返回
          if (result) resolve(result);
        });
      });
    },
    saveExcel(data){
      getStrArray(data).then((res) => {
        if (res.status == "200") {
          console.log(res);
        }
      });
    },
    //解析Excel
    readExcel(file) {
      let that = this;
      return new Promise(function (resolve, reject) {
        // 返回Promise对象
        const reader = new FileReader();
        reader.onload = (e) => {
          // 异步执行
          try {
            // 以二进制流方式读取得到整份excel表格对象
            let data = e.target.result,
              workbook = XLSX.read(data, { type: "binary" });
            const SheetName = workbook.SheetNames[0]; // 取第一张表
            let sheetInfos = workbook.Sheets[SheetName];
            // const exl = XLSX.utils.sheet_to_json(sheetInfos);
            let arr = XLSX.utils.sheet_to_json(sheetInfos, {
              header: 1,
              defval: "",
            });
            console.log(that.excels, 11);
            let batteryArr = [];
            // let Arr = [];
            for (var j = 5; j < arr.length; j++) {            
              batteryArr.push(arr[j]);
            }
            console.log(batteryArr, "导入数组");
                
            resolve();
          } catch (e) {
            reject(e.message);
            return false;
          }
        };
        reader.readAsBinaryString(file);
      });
    },

    exportData() {
      var fileName = "绩效计分";
      const data = this.data;
      let headLength = 0; //获取表格有几列
      let colsLength = 0; //获取表格表头的行数，就是最多是几级表头
      //递归获得表头最大层数
      function fcHeadLength(header, headerRowLength) {
        headerRowLength++;
        header.forEach((item) => {
          if (item.children && item.children.length > 0) {
            fcHeadLength(item.children, headerRowLength);
          } else {
            if (item.title !== "操作") {
              headLength++;
              if (headerRowLength > colsLength) {
                colsLength = headerRowLength;
              }
            }
            return headLength;
          }
        });
      }
      fcHeadLength(this.Treedata, 0);
      tableToExcel(
        this.hideTableId,
        `${fileName}${this.$moment(Date.now()).format("YYYYMMDD")}`,
        headLength, //一共有几列
        data.length + colsLength, //一共有几行
        colsLength //表头有几行
      );
    },
    getExcels() {
      getExcel().then((res) => {
        if (res.status == "200") {
          res.data.pop();
          this.excels = [...res.data];
        }
      });
    },
    getList() {
      getScoringList(this.year).then((res) => {
        if (res.data.code == 200) {
          this.data = res.data.obj;
        }
      });
    },
    getTree() {
      getTree().then((res) => {
        const data = [...res.data];
        data.pop(); //删除操作表头
        data.forEach((item) => {
          item.fixed = null;
        });
        this.Treedata = [...data];
        res.data.forEach((item) => {
          if (item.children.length != "0") {
            let data = item.children;
            delete item.id;
            delete item.width;
            delete item.superId;
            delete item.fixed;
            delete item.dataIndex;
            data.forEach((item) => {
              if (item.children.length != "0") {
                let data = item.children;
                delete item.id;
                delete item.width;
                delete item.superId;
                delete item.fixed;
                delete item.dataIndex;
                data.forEach((item) => {
                  if (item.children.length != "0") {
                    let data = item.children;
                    delete item.id;
                    delete item.width;
                    delete item.superId;
                    delete item.fixed;
                    delete item.dataIndex;
                    data.forEach((item) => {
                      if (item.children.length != "0") {
                        let data = item.children;
                        delete item.id;
                        delete item.width;
                        delete item.superId;
                        delete item.fixed;
                        delete item.dataIndex;
                        data.forEach((item) => {
                            item.ellipsis = true
                            delete item.children;
                        });
                      } else {
                        delete item.children;
                      }
                    });
                  } else {
                    delete item.children;
                  }
                });
              } else {
                delete item.children;
              }
            });
          } else {
            item.ellipsis = true,
            delete item.children;
            if (item.id == "239") {
              item.scopedSlots = { customRender: "operation" };
            }
          }
        });
        this.columns = [...res.data];
        console.log(this.columns);
      });
    },
    //调用年份选择下拉框
    handleChangeYear(value) {
      this.year = value;
      this.getList();
    },
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.find((item) => key === item.key);
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.find((item) => key === item.key);
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key) {
      const newData = [...this.data];
      const newCacheData = [...this.cacheData];
      const target = newData.find((item) => key === item.key);
      const targetCache = newCacheData.find((item) => key === item.key);
      if (target && targetCache) {
        delete target.editable;
        this.data = newData;
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      this.editingKey = "";
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.find((item) => key === item.key);
      this.editingKey = "";
      if (target) {
        Object.assign(
          target,
          this.cacheData.find((item) => key === item.key)
        );
        delete target.editable;
        this.data = newData;
      }
    },
  },
  created() {
    this.getTree();
    this.getExcels();
    this.getList();
  },
  mounted() {},
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>


