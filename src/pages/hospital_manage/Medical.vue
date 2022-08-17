<!-- <template>
    <a-card class="card" title="绩效填报" :bordered="false">
        <Select slot="extra" @getData="getYear"></Select>
        <a-table :columns="columns"
                 :data-source="data"
                 :rowKey="(record,index)=>{return index}"
                 :pagination="false"
                 bordered>
            <template
                    v-for="col in [ 'patientOutpatient',
                    'patientSatisfaction','patientServiceEvaluation','medicalQualityAssessment'
                    ]"
                    :slot="col"
                    slot-scope="text, record"
            >
                <span :key="col">
                    <a-input
                            v-if="record.editable"
                            style="margin: -5px 0"
                            :value="text"
                            @change="e => handleChange(e.target.value, record.key, col)"
                    />
                    <template v-else>
                        {{ text }}
                    </template>
                </span>
            </template>
            <template slot="operation" slot-scope="text, record">
                <div class="editable-row-operations">
        <span v-if="record.editable">
            <a @click="() => save(record.key)">保存</a>
            <a @click="() => cancel(record.key)">取消</a>
        </span>
                    <span v-else>
          <a :disabled="editingKey !== ''" @click="() => edit(record.key)">编辑</a>
        </span>
                </div>
            </template>
        </a-table>
    </a-card>
</template>
<script>
import Select from "../../components/select/Select";

const columns = [
    {
        title: '医院名称',
        width: '10%',
        dataIndex: 'hospitalName',
        scopedSlots: {customRender: 'hospitalName'},
    },
    {
        title: '门诊患者满意度',
        dataIndex: 'patientOutpatient',
        width: '10%',
        scopedSlots: {customRender: 'patientOutpatient'},
    },

    {
        title: '住院患者满意度',
        dataIndex: 'patientSatisfaction',
        width: '10%',
        scopedSlots: {customRender: 'patientSatisfaction'},
    },
    {
        title: '患者综合满意度',
        dataIndex: 'patientServiceEvaluation',
        width: '10%',
        scopedSlots: {customRender: 'patientServiceEvaluation'},
    },
    {
        title: '医疗质量管理专项工作考核',
        dataIndex: 'medicalQualityAssessment',
        width: '10%',
        scopedSlots: {customRender: 'medicalQualityAssessment'},
    },
    {
        title: '操作',
        dataIndex: 'operation',
        width: '5%',
        scopedSlots: {customRender: 'operation'},
    },
];
const data = [];

export default {
    name: "Medical",
    components: {Select},
    data() {
        this.cacheData = data.map(item => ({...item}));
        return {
            data,
            columns,
            editingKey: '',
            year: '2020'
        };
    },
    methods: {
        getYear(value) {
            this.year = value
            this.getData()
        },
        getData() {
            this.axios({
                url: 'api/target-hospital/getManageList',
                method: 'get',
                params: {
                    'years': this.year
                }
            }).then(response => {
                    if (response.data.code == 200) {
                        this.data = response.data.obj.map(item => {
                                item.key = item.id.toString()
                                return item;
                            }
                        );
                    } else {
                        this.data = []
                        this.$message.error({
                            content: response.data.message
                        })
                    }
                }
            )
        },
        editMed(data) {
            console.log(111,data)
            this.axios({
                url: '/api/target-hospital/editMan',
                method: 'put',
                data: data
            }).then(response => {
                if (response.data.code == 200) {
                    this.$message.success({
                        content: response.data.message
                    })
                } else {
                    this.$message.error({
                        content: response.data.message
                    })
                }

            })
        },
        handleChange(value, key, column) {
            const newData = [...this.data];
            const target = newData.find(item => key === item.key);
            if (target) {
                target[column] = value;
                this.data = newData;
            }
        },
        edit(key) {
            console.log(this.data)
            const newData = [...this.data];
            const target = newData.find(item => key === item.key);
            this.editingKey = key;
            if (target) {
                target.editable = true;
                this.data = newData;
            }
        },
        save(key) {
            const newData = [...this.data];
            const newCacheData = [...this.cacheData];
            const target = newData.find(item => key === item.key);
            const targetCache = newCacheData.find(item => key === item.key);
            if (target && targetCache) {
                delete target.editable;
                this.editMed(target)
                this.data = newData;
                Object.assign(targetCache, target);
                this.cacheData = newCacheData;
            }
            this.editingKey = '';
        },
        cancel(key) {
            const newData = [...this.data];
            const target = newData.find(item => key === item.key);
            this.editingKey = '';
            if (target) {
                Object.assign(target, this.cacheData.find(item => key === item.key));
                delete target.editable;
                this.data = newData;
            }
        },
    },
    created() {
        this.getData()
    },
    mounted() {
        // this.fetch();
    },
};
</script>
<style scoped>
    .card {
        margin-bottom: 24px;
    }

    .editable-row-operations a {
        margin-right: 8px;
    }

    .table-operations > button {
        margin-right: 8px;
        margin-bottom: 16px;
        float: right;
    }
</style>
 -->
