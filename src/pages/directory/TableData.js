const columns = [
  {
    title: "编号",
    customRender: (text, record, index) => `${index + 1}`,
    width: 62,
    fixed: 'left',
  },
  {
    title: "信息资源方代码",
    dataIndex: "resNameCode",
    fixed: 'left',
    width: 100
  },
  {
    title: "信息资源提供方",
    dataIndex: "provider",
    width: 100,
    fixed: 'left',
  },
  {
    title: "信息资源提供方代码",
    dataIndex: "providerCode",
    width: 105,
  },
  {
    title: "信息资源摘要",
    dataIndex: "resAbstract",
    width: 120,
    ellipsis: true,

  },
  {
    title: "信息资源格式",
    dataIndex: "formatSand",
    width: 120,
    scopedSlots: { customRender: 'formatSand' },
  },
  {
    title: "信息项信息",
    children: [
      {
        title: "信息项名称",
        width: 150,
        ellipsis: true,
        dataIndex: "formatName",
      },
      {
        title: "数据类型",
        width: 90,
        dataIndex: "dataType",
      },
    ],
  },
  {
    title: "共享属性",
    children: [
      {
        title: "共享类型",
        width: 120,
        ellipsis: true,
        dataIndex: "shareType",
      },
      {
        title: "共享条件",
        width: 90,
        ellipsis: true,
        dataIndex: "shareUri",
      },
      {
        title: "共享方式",
        width: 90,
        ellipsis: true,
        dataIndex: "shareCheck",
      },
    ],
  },
  {
    title: "开放属性",
    children: [
      {
        title: "是否向社会开放",
        width: 100,
        ellipsis: true,
        dataIndex: "opening",
      },
      {
        title: "开放条件",
        width: 90,
        ellipsis: true,
        dataIndex: "openCondition",
      },
    ],
  },
  {
    title: "更新周期",
    width: 90,
    ellipsis: true,
    dataIndex: "cycleItem",
  },
  {
    title: "发布日期",
    dataIndex: "releaseDate",
    width: 110,
    sorter: true,
  },
  {
    title: "关联资源代码",
    dataIndex: "sourceRange",
  },

  {
    title: "操作",
    scopedSlots: { customRender: "action" },
    width: 80,
    fixed: 'right',
  },
];

export { columns }