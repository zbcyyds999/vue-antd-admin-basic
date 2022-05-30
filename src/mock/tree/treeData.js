const TreeData1 = [
    {
        "key": "1",
        "parentId": "0",
        "title": "卫健委数据",
        "isLeaf": false,
        "resCode": null,
        "provider": null,
        "providerCode": null,
        "scopedSlots": { title: "title" },
        "children": [
            {
                "key": "2",
                "parentId": "1",
                "title": "信息统计类",
                "isLeaf": false,
                "resCode": null,
                "provider": null,
                "providerCode": null,
                "scopedSlots": { title: "title" },

                "children": [
                    {
                        "key": "5",
                        "parentId": "2",
                        "title": "卫统数据",
                        "isLeaf": false,
                        "resCode": null,
                        "provider": null,
                        "providerCode": null,
                        "scopedSlots": { title: "title" },

                        "children": [
                            {
                                "key": "6",
                                "parentId": "5",
                                "title": "医院",
                                "isLeaf": false,
                                "resCode": null,
                                "provider": null,
                                "providerCode": null,
                                "children": [
                                    {
                                        "key": "12",
                                        "parentId": "6",
                                        "title": "年报",
                                        "isLeaf": false,
                                        "resCode": "北京",
                                        "provider": "004",
                                        "providerCode": "00005",
                                        "scopedSlots": { title: "title" },

                                        "children": [
                                            {
                                                "key": "17",
                                                "parentId": "12",
                                                "title": "基本信息",
                                                "isLeaf": true,
                                                "resCode": "123456",
                                                "provider": "北京西城",
                                                "providerCode": "0005",
                                                "scopedSlots": { title: "title" },

                                            },
                                            {
                                                "key": "18",
                                                "parentId": "12",
                                                "title": "经营状况",
                                                "isLeaf": true,
                                                "resCode": "123456",
                                                "provider": "北京西城",
                                                "providerCode": "0222",
                                                "scopedSlots": { title: "title" },
                                            },
                                            {
                                                "key": "19",
                                                "parentId": "12",
                                                "title": "绩效",
                                                "isLeaf": true,
                                                "resCode": "123456",
                                                "provider": "北京西城",
                                                "providerCode": "0222",
                                            }
                                        ]
                                    },
                                    {
                                        "key": "13",
                                        "parentId": "6",
                                        "title": "月报",
                                        "isLeaf": false,
                                        "resCode": "00001",
                                        "provider": "111",
                                        "providerCode": "111",
                                        "children": [
                                            {
                                                "key": "54",
                                                "parentId": "13",
                                                "title": "基本信息",
                                                "isLeaf": true,
                                                "resCode": "00001",
                                                "provider": "111",
                                                "providerCode": "111",
                                                "children": []
                                            },
                                            {
                                                "key": "55",
                                                "parentId": "13",
                                                "title": "经营状况",
                                                "isLeaf": true,
                                                "resCode": "00001",
                                                "provider": "111",
                                                "providerCode": "111",
                                                "children": []
                                            },
                                            {
                                                "key": "56",
                                                "parentId": "13",
                                                "title": "绩效",
                                                "isLeaf": true,
                                                "resCode": "00001",
                                                "provider": "111",
                                                "providerCode": "111",
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "key": "7",
                                "parentId": "5",
                                "title": "社区",
                                "isLeaf": false,
                                "resCode": null,
                                "provider": null,
                                "providerCode": null,
                                "children": [
                                    {
                                        "key": "57",
                                        "parentId": "7",
                                        "title": "年报",
                                        "isLeaf": false,
                                        "resCode": "00001",
                                        "provider": "00002",
                                        "providerCode": "0000",
                                        "children": []
                                    },
                                    {
                                        "key": "58",
                                        "parentId": "7",
                                        "title": "月报",
                                        "isLeaf": false,
                                        "resCode": "00002",
                                        "provider": "0002",
                                        "providerCode": "0003",
                                        "children": []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "key": "3",
                "parentId": "1",
                "title": "业务建设类",
                "isLeaf": false,
                "resCode": null,
                "provider": null,
                "providerCode": null,
                "children": [
                    {
                        "key": "8",
                        "parentId": "3",
                        "title": "健康档案",
                        "isLeaf": false,
                        "resCode": null,
                        "provider": null,
                        "providerCode": null,
                        "children": [
                            {
                                "key": "27",
                                "parentId": "8",
                                "title": "健康档案月报",
                                "isLeaf": false,
                                "resCode": null,
                                "provider": "北京西城",
                                "providerCode": "111",
                                "children": []
                            }
                        ]
                    }
                ]
            }
        ]
    }
]
const gData = [
    {
        title: '卫健委',
        key: '0-0',
        scopedSlots: { title: "title" },
        children: [
            {
                title: '0-0-0',
                key: '0-0-0',
                scopedSlots: { title: "title" },
                children: [
                    {
                        title: '0-0-0-0', key: '0-0-0-0', scopedSlots: { title: "title" }, children: [
                            {
                                title: '0-0-0-0-0', key: '0-0-0-0-0', scopedSlots: { title: "title" }, children: [
                                    { title: '0-0-0-0-0-0', key: '0-0-0-0-0-0', scopedSlots: { title: "title" } },
                                    { title: '0-0-0-0-0-1', key: '0-0-0-0-0-1', scopedSlots: { title: "title" } }
                                ]
                            },
                            {
                                title: '0-0-0-0-1', key: '0-0-0-0-1', scopedSlots: { title: "title" }, children: [
                                    { title: '0-0-0-0-1-0', key: '0-0-0-0-1-0', scopedSlots: { title: "title" } },
                                    { title: '0-0-0-0-1-1', key: '0-0-0-0-1-1', scopedSlots: { title: "title" } }
                                ]
                            },
                            { title: '0-0-0-0-2', key: '0-0-0-0-2', scopedSlots: { title: "title" } },
                        ]
                    },
                    { title: '0-0-0-1', key: '0-0-0-1', scopedSlots: { title: "title" } },
                    { title: '0-0-0-2', key: '0-0-0-2', scopedSlots: { title: "title" } },
                ],
            },
            {
                title: '0-0-1',
                key: '0-0-1',
                scopedSlots: { title: "title" },
                children: [
                    { title: '0-0-1-0', key: '0-0-1-0', scopedSlots: { title: "title" } },
                    { title: '0-0-1-1', key: '0-0-1-1', scopedSlots: { title: "title" } },
                    { title: '0-0-1-2', key: '0-0-1-2', scopedSlots: { title: "title" } },
                ],
            },
            {
                title: '0-0-2',
                key: '0-0-2',
                scopedSlots: { title: "title" }
            },
        ],
    },
    {
        title: '0-1',
        scopedSlots: { title: "title" },
        key: '0-1',
        children: [
            { title: '0-1-0-0', key: '0-1-0-0', scopedSlots: { title: "title" } },
            { title: '0-1-0-1', key: '0-1-0-1', scopedSlots: { title: "title" } },
            { title: '0-1-0-2', key: '0-1-0-2', scopedSlots: { title: "title" } },
        ],
    },
    {
        title: '0-2',
        key: '0-2',
        scopedSlots: { title: "title" }
    },
];
const treeData = [
    {
        name: '卫健委数据',
        key: '0-0',
        children: [
            {
                name: '0-0-0',
                key: '0-0-0',
                scopedSlots: { title: "title" },
                children: [
                    {
                        name: '0-0-0-0', key: '0-0-0-0', scopedSlots: { title: "title" }, children: [
                            {
                                name: '0-0-0-0-0', key: '0-0-0-0-0', scopedSlots: { title: "title" }, children: [
                                    { name: '0-0-0-0-0-0', key: '0-0-0-0-0-0', scopedSlots: { title: "title" },"isLeaf": true, },
                                    { name: '0-0-0-0-0-1', key: '0-0-0-0-0-1', scopedSlots: { title: "title" },"isLeaf": true }
                                ]
                            },
                            {
                                name: '0-0-0-0-1', key: '0-0-0-0-1', scopedSlots: { title: "title" }, children: [
                                    { name: '0-0-0-0-1-0', key: '0-0-0-0-1-0', scopedSlots: { title: "title" },"isLeaf": true },
                                    { name: '0-0-0-0-1-1', key: '0-0-0-0-1-1', scopedSlots: { title: "title" },"isLeaf": true }
                                ]
                            },
                            { name: '0-0-0-0-2', key: '0-0-0-0-2', scopedSlots: { title: "title" } },
                        ]
                    },
                    { name: '0-0-0-1', key: '0-0-0-1', scopedSlots: { title: "title" } },
                    { name: '0-0-0-2', key: '0-0-0-2', scopedSlots: { title: "title" } },
                ],
            },
            {
                name: '0-0-1',
                key: '0-0-1',
                scopedSlots: { title: "title" },
                children: [
                    { name: '0-0-1-0', key: '0-0-1-0', scopedSlots: { title: "title" } },
                    { name: '0-0-1-1', key: '0-0-1-1', scopedSlots: { title: "title" } },
                    { name: '0-0-1-2', key: '0-0-1-2', scopedSlots: { title: "title" } },
                ],
            },
            {
                name: '0-0-2',
                key: '0-0-2',
                scopedSlots: { title: "title" }
            },
        ],
    },
    {
        name: '0-1',
        scopedSlots: { title: "title" },
        key: '0-1',
        children: [
            { name: '0-1-0-0', key: '0-1-0-0', scopedSlots: { title: "title" } },
            { name: '0-1-0-1', key: '0-1-0-1', scopedSlots: { title: "title" } },
            { name: '0-1-0-2', key: '0-1-0-2', scopedSlots: { title: "title" } },
        ],
    },
    {
        name: '0-2',
        key: '0-2',
        scopedSlots: { title: "title" }
    },
];
export { TreeData1, gData, treeData }