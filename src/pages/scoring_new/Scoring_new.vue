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
      :scroll="{ x: 'calc(800px + 50%)' }"
    >
      <template v-for="col in cols" :slot="col" slot-scope="text, record">
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
            <a @click="() => cancel(record.key)">取消</a>
          </span>
          <span v-else>
            <a :disabled="editingKey !== ''" @click="() => edit(record.key)"
              >计分</a
            >
            <a-divider type="vertical" />
            <a :disabled="editingKey !== ''">预览</a>
            <a-divider type="vertical" />
            <a :disabled="editingKey !== ''">下载</a>
          </span>
        </div>
      </template>
    </a-table>
  </a-card>
</template>
<script>
import Select from "../../components/select/Select";
import {
  getTree,
  getExcel,
  getTable,
  getScoringList,
  getStrArray,
  editFormula
} from "@/services/hospital";
import {excelSheet} from "./excelSheet"
import { tableToExcel } from "@/utils/excel";
import * as XLSX from "xlsx";
const columns = [];
const data = [];
export default {
  name: "Scoring_new",
  components: { Select },

  data() {
    return {
      data,
      columns,
      
      cols: [],
      datas: [],
      excels: [],
      hideTableId: "sheet",
      Treedata: [],
      year: "2020",
      editingKey: "",
      weekdata: {},
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
    saveExcel() {
      getStrArray(this.datas).then((res) => {
        if (res.status == "200") {
          console.log(res);
        }
      });
    },
    //解析Excel
    readExcel(file) {
      return new Promise(function (resolve, reject) {
        // 返回Promise对象
        const reader = new FileReader();
        reader.onload = (e) => {
          // 异步执行
          try {
            // 以二进制流方式读取得到整份excel表格对象
            let data = e.target.result,
              workbook = XLSX.read(data, { type: "binary" });
            let weekdata = {};
            weekdata.formula = excelSheet;
              const SheetName = workbook.SheetNames[0]; // 取第一张表
              let sheetInfos = workbook.Sheets[SheetName];
                let arr = XLSX.utils.sheet_to_json(sheetInfos, {
                  header: 1,
                  defval: "",
                });
                let batteryArr = [];
                for (var k = 5; k < arr.length; k++) {
                  batteryArr.push(arr[k]);
                }
                weekdata.values = batteryArr;
              
              console.log(weekdata);
            
            // getStrArray(weekdata).then((res) => {
            //   if (res.status == "200") {
            //     console.log(res);
            //   }
            // });
            resolve();
            // this.saveExcel(this.weekdata)
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
    getTables() {
      getTable().then((res) => {
        if (res.status == "200") {
          this.cols = res.data;
        }
      });
    },
    getList() {
      getScoringList(this.year).then((res) => {
        if (res.data.code == 200) {
          const datas = []
          const data = res.data.obj;
          const formulaValues = data[0];
          const targetHospitals = data[1];
          formulaValues.forEach((item) => {
            targetHospitals.forEach((item2) => {
              if(item.employeeNo==item2.employeeNo){
                const value = Object.assign(item,item2)
                datas.push(value)
              }
          });
         
          });
          datas.map((item) => {
            item.key = item.id.toString()
            return item;
          });
          this.data = [...datas]
          this.cacheData = this.data.map((item) => ({ ...item }));
        }
      });
    },
    getTree() {
      getTree().then((res) => {
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
                          item.ellipsis = true;
                          delete item.children;
                          item.scopedSlots = { customRender: item.dataIndex };
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
            (item.ellipsis = true), delete item.children;

            if (item.dataIndex == "operation") {
              item.scopedSlots = { customRender: "operation" };
            }
          }
        });

        this.columns = [...res.data];
      });
    },
    editFormulaValue(data) {
      editFormula(data).then((response) => {
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
    },
    getExcelTree() {
      getTree().then((res) => {
        let trdata = [...res.data];
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
                          item.ellipsis = true;
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
            (item.ellipsis = true), delete item.children;
            if (item.dataIndex == "operation") {
              item.scopedSlots = { customRender: "operation" };
            }
          }
        });
        if (trdata[trdata.length - 1].dataIndex == "operation") {
          trdata.pop(); //删除操作
          trdata.map((item) => {
            item.fixed = null;
          });
          this.Treedata = trdata;
          console.log(trdata,1111);
        }
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
        this.editFormulaValue(target)
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
    this.getTables();
    this.getTree();
    this.getExcelTree();
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


