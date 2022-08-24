<template>
  <a-card class="card" title="绩效计分" :bordered="false">
    <Select slot="extra" @getData="handleChangeYear"></Select>
    <a-table
      :columns="columns"
      :data-source="data"
      bordered
      size="middle"
      :pagination="false"
      :scroll="{ x: 'calc(700px + 50%)' }"
    >
      <template
        v-for="col in ['Patient_satisfaction_score','Appointment_rate_score']"
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
              >编辑</a
            >
          </span>
        </div>
      </template>
    </a-table>
  </a-card>
</template>
<script>
import Select from "../../components/select/Select";
import { getTree } from "@/services/hospital";

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
      year: "2020",
      editingKey: "",
    };
  },
  methods: {
    getTree() {
      getTree().then((res) => {
        // this.columns = res.data
        // let data  = {...res.data};
        console.log(res.data, 1111);
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
                          if (item.children.length != "0") {
                            console.log(item);
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
                delete item.children;
              }
            });
          } else {
            delete item.children;
          }
        });
        this.columns = [...res.data];
        console.log(this.columns);
      });
    },
    //调用年份选择下拉框
    handleChangeYear(value) {
      this.year = value;
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
  },
  mounted() {},
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>


