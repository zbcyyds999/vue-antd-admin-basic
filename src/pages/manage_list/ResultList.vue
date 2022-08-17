<template>
    <a-card class="card" title="绩效上传与查询" :bordered="false">
        <a-select default-value="2021" style="width: 120px" slot="extra">
            <a-select-option v-for="item in yearList" :value="item.value" :key="item.value">
                {{ item.label }}
            </a-select-option>
        </a-select>
        <a-table :columns="columns" :data-source="data" bordered>
            <a slot="name" slot-scope="text">{{ text }}</a>
            <span slot="customTitle">医院名称</span>
            <span slot="action">
      <a class="ant-dropdown-link"> 上传 </a>
                <a-divider type="vertical"/>
                 <a @click="showModal">查看详情</a>
                <a-modal v-model="visible" title="详情" @ok="handleOk" width="65%">
                </a-modal>
    </span>
        </a-table>
    </a-card>
</template>
<script>
const columns = [
    {
        dataIndex: 'name',
        key: 'name',
        slots: {title: 'customTitle'},
        scopedSlots: {customRender: 'name'},
    },
    {title: '最后上传时间', dataIndex: 'createdAt'},
    {title: '操作', key: 'action', scopedSlots: {customRender: 'action'}},
];
const data = [
    {
        key: 1,
        name: `北京市宣武中医医院`,
        createdAt: '2021-12-24 23:12:00',
    },
    {
        key: 2,
        name: `北京市中医药大学护国寺中医医院`,
        createdAt: '2021-12-24 23:12:00',

    },
    {
        key: 3,
        name: `北京市西城区展览路医院`,
        createdAt: '2021-12-24 23:12:00',

    },
    {
        key: 4,
        name: `北京市第二医院`,
        createdAt: '2021-12-24 23:12:00',
    },
    {
        key: 5,
        name: `北京市回民医院`,
        createdAt: '2021-12-24 23:12:00',
    },
    {
        key: 6,
        name: `北京市丰盛中医骨伤专科医院`,
        createdAt: '2021-12-24 23:12:00',
    },
    {
        key: 7,
        name: `首都医科大学附属复兴医院`,
        createdAt: '2021-12-24 23:12:00',
    },
    {
        key: 8,
        name: `北京市西城区妇幼保健院`,
        createdAt: '2021-12-24 23:12:00',
    },
    {
        key: 9,
        name: `北京市西城区广外医院`,
        createdAt: '2021-12-24 23:12:00',
    },
    {
        key: 10,
        name: `北京市肛肠医院`,
        createdAt: '2021-12-24 23:12:00',
    },
    {
        key: 11,
        name: `北京市西城区平安医院`,
        createdAt: '2021-12-24 23:12:00',
    }
];
// import { getHsList, getInput } from "@/services/hospital";

export default {
    name: "ResultList",
    data() {
        return {
            visible: false,
            data,
            columns,
            yearList: [
                {
                    value: '1',
                    label: '2018'
                },
                {
                    value: '2',
                    label: '2019'
                },
                {
                    value: '3',
                    label: '2020'
                },
                {
                    value: '4',
                    label: '2021'

                }]
        };
    }
    ,
    methods: {
        showModal() {
            this.visible = true;
        }
        ,
        handleOk(e) {
            console.log(e);
            this.visible = false;
        }
        ,

    }
}
;
</script>


<style scoped>

</style>
