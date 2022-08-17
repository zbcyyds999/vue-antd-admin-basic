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
        v-for="col in ['name', 'age', 'address']"
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

// const columns = [
//   {
//     title: "医院名称",
//     dataIndex: "name",
//     key: "name",
//     width: 260,
//     fixed: "left",
//   },
//   {
//     title: "社会评价",
//     children: [
//       {
//         title: "患者满意",
//         children: [
//           {
//             title: "患者满意度",
//             children: [
//               {
//                 title:
//                   "住院患者满意度：1）患者对住院医院的总体满意度；2）患者对住院期间流程及各个环节医院服务的评价；3）投诉和争议的管理和物理环境的评价。",
//                 children: [
//                   {
//                     title: "指标计算",
//                     dataIndex: "Patient_satisfaction_formula",
//                     key: "Patient_satisfaction_formula",
//                     width: 100,
//                     ellipsis: true,
//                   },
//                   {
//                     title: "指标数值",
//                     dataIndex: "Patient_satisfaction_value",
//                     key: "Patient_satisfaction_value",
//                     width: 100,
//                     ellipsis: true,
//                   },
//                   {
//                     title: "指标分值",
//                     dataIndex: "Patient_satisfaction_score",
//                     key: "street",
//                     width: 100,
//                     ellipsis: true,
//                     scopedSlots: { customRender: "Patient_satisfaction_score" },
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             title: "预约就诊率",
//             children: [
//               {
//                 title: "预约人次/门诊人数*100%",
//                 children: [
//                   {
//                     title: "预约人次",

//                     width: 100,
//                   },
//                   {
//                     title: "门诊人数",
//                     width: 100,
//                   },
//                   {
//                     title: "指标计算",
//                     ellipsis: true,
//                     dataIndex: "Appointment_rate_formula",
//                     key: "Appointment_rate_formula",
//                     width: 180,
//                   },
//                   {
//                     title: "指标数值",
//                     dataIndex: "Appointment_rate_value",
//                     key: "Appointment_rate_value",
//                     width: 100,
//                   },
//                   {
//                     title: "指标分值",
//                     dataIndex: "Appointment_rate_score",
//                     key: "Appointment_rate_score",
//                     width: 100,
//                     scopedSlots: { customRender: "Appointment_rate_score" },
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             title: "医疗纠纷投诉率",
//             children: [
//               {
//                 title:
//                   "医疗纠纷投诉总量/总诊疗人次（含出院）*100%【总量是医学会医鉴办、医调委、法院等途径受理的件数】",
//                 children: [
//                   {
//                     title: "医鉴办件数",

//                     width: 100,
//                   },
//                   {
//                     title: "医调委件数",
//                     width: 100,
//                   },
//                   {
//                     title: "法院受理案件",

//                     width: 100,
//                   },
//                   {
//                     title: "总诊疗人次",
//                     width: 100,
//                   },
//                   {
//                     title: "指标计算",
//                     dataIndex: "complaint_rate_formula",
//                     key: "complaint_rate_formula",
//                     width: 180,
//                   },
//                   {
//                     title: "指标数值",
//                     dataIndex: "complaint_rate_value",
//                     key: "complaint_rate_value",
//                     width: 100,
//                   },
//                   {
//                     title: "指标分值",
//                     dataIndex: "complaint_rate_score",
//                     key: "complaint_rate_score",
//                     width: 100,
//                     scopedSlots: { customRender: "complaint_rate_score" },
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     title: "内部管理",
//     children: [
//       {
//         title: "费用适宜",
//         children: [
//           {
//             title: "人次(例）均费用控制率",
//             children: [
//               {
//                 title:
//                   "(门诊患者或住院患者平均每例或每次的费用- 去年的平均费用)/去年的平均费用*100%",
//                 children: [
//                   {
//                     title: "门诊收入",

//                     width: 100,
//                   },
//                   {
//                     title: "门诊人次",
//                     width: 100,
//                   },
//                   {
//                     title: "住院收入",

//                     width: 100,
//                   },
//                   {
//                     title: "出院人次",
//                     width: 100,
//                   },
//                   {
//                     title: "指标计算",
//                     dataIndex: "control_rate_formula",
//                     key: "control_rate_formula",
//                     width: 180,
//                   },
//                   {
//                     title: "指标数值",
//                     dataIndex: "control_rate_value",
//                     key: "control_rate_value",
//                     width: 100,
//                   },
//                   {
//                     title: "指标分值",
//                     dataIndex: "control_rate_score",
//                     key: "control_rate_score",
//                     width: 100,
//                     scopedSlots: { customRender: "control_rate_score" },
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             title: "药占比",
//             children: [
//               {
//                 title: "（门诊药品收入xx+住院药品收入xx）/医疗收入xx*100%",
//                 children: [
//                   {
//                     title: "门诊药品收入",
//                     width: 100,
//                   },
//                   {
//                     title: "住院药品收入",
//                     width: 100,
//                   },
//                   {
//                     title: "医疗收入",
//                     width: 100,
//                   },
//                   {
//                     title: "指标计算",
//                     dataIndex: "proportion_drugs_formula",
//                     key: "proportion_drugs_formula",
//                     width: 180,
//                   },
//                   {
//                     title: "指标数值",
//                     dataIndex: "proportion_drugs_value",
//                     key: "proportion_drugs_value",
//                     width: 100,
//                   },
//                   {
//                     title: "指标分值",
//                     dataIndex: "proportion_drugs_score",
//                     key: "proportion_drugs_score",
//                     width: 100,
//                     scopedSlots: { customRender: "proportion_drugs_score" },
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             title: "基本药物使用金额占比",
//             children: [
//               {
//                 title: "基本药物使用金额/药品收入（不含中草药）",
//                 children: [
//                   {
//                     title: "基本药物使用金额",
//                     width: 100,
//                   },
//                   {
//                     title: "药品收入",
//                     width: 100,
//                   },
//                   {
//                     title: "中药饮片收入",
//                     width: 100,
//                   },
//                   {
//                     title: "指标计算",
//                     dataIndex: "basic_drugs_formula",
//                     key: "basic_drugs_formula",
//                     width: 180,
//                   },
//                   {
//                     title: "指标数值",
//                     dataIndex: "basic_drugs_value",
//                     key: "basic_drugs_value",
//                     width: 100,
//                   },
//                   {
//                     title: "指标分值",
//                     dataIndex: "basic_drugs_score",
//                     key: "basic_drugs_score",
//                     width: 100,
//                     scopedSlots: { customRender: "basic_drugs_score" },
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//       {
//         title: "质量保证",
//         children: [
//           {
//             title: "院内感染发生率",
//             children: [
//               {
//                 title: "年度内发生院内感染例数/期内出院人数*100%",
//                 children: [
//                   {
//                     title: "医院感染例数",
//                     width: 100,
//                   },
//                   {
//                     title: "出院人数",
//                     width: 100,
//                   },
//                   {
//                     title: "指标计算",
//                     dataIndex: "infection_rate_formula",
//                     key: "infection_rate_formula",
//                     width: 180,
//                   },
//                   {
//                     title: "指标数值",
//                     dataIndex: "infection_rate_value",
//                     key: "infection_rate_value",
//                     width: 100,
//                   },
//                   {
//                     title: "指标分值",
//                     dataIndex: "infection_rate_score",
//                     key: "infection_rate_score",
//                     width: 100,
//                     scopedSlots: { customRender: "infection_rate_score" },
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             title: "抗菌药物使用率",
//             children: [
//               {
//                 title:
//                   "住院患者抗菌药物使用率不超过卫生部抗菌药物专项整治要求，门诊患者抗菌药物处方比例不超过卫生部抗菌药物专项整治要求；Ⅰ类切口预防使用抗菌药物比例不超过卫生部抗菌药物专项整治要求",
//                 children: [
//                   {
//                     title: "出院患者使用抗菌药物总例数",
//                     width: 100,
//                   },
//                   {
//                     title: "出院人数",
//                     width: 100,
//                   },
//                   {
//                     title: "使用抗菌药物的处方数",
//                     width: 100,
//                   },
//                   {
//                     title: "门诊处方总数",
//                     width: 100,
//                   },
//                   {
//                     title: "手术预防使用抗菌药物例数",
//                     width: 100,
//                   },
//                   {
//                     title: "Ⅰ类切口总例数",
//                     width: 100,
//                   },
//                   {
//                     title: "指标计算",
//                     dataIndex: "antibiotics_rate_formula",
//                     key: "antibiotics_rate_formula",
//                     width: 180,
//                   },
//                   {
//                     title: "指标数值",
//                     dataIndex: "antibiotics_rate_value",
//                     key: "antibiotics_rate_value",
//                     width: 100,
//                   },
//                   {
//                     title: "指标分值",
//                     dataIndex: "antibiotics_rate_score",
//                     key: "antibiotics_rate_score",
//                     width: 100,
//                     scopedSlots: { customRender: "antibiotics_rate_score" },
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             title: "抗菌药物使用强度",
//             children: [
//               {
//                 title: "医院直接提供",
//                 children: [
//                   {
//                     title: "抗菌药物使用强度",
//                     dataIndex: "Antimicrobial_intensity_formula",
//                     key: "Antimicrobial_intensity_formula",
//                     width: 180,
//                   },
//                   {
//                     title: "指标数值",
//                     dataIndex: "Antimicrobial_intensity_value",
//                     key: "Antimicrobial_intensity_value",
//                     width: 100,
//                   },
//                   {
//                     title: "指标分值",
//                     dataIndex: "Antimicrobial_intensity_score",
//                     key: "Antimicrobial_intensity_score",
//                     width: 100,
//                     scopedSlots: {
//                       customRender: "Antimicrobial_intensity_score",
//                     },
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             title: "低风险病组死亡率",
//             children: [
//               {
//                 title: "低风险病组死亡患者总例数/低风险病组出院总病例数*100%",
//                 children: [
//                   {
//                     title: "低风险病组死亡患者总例数",
//                     width: 180,
//                   },
//                   {
//                     title: "低风险病组出院总病例数",
//                     width: 180,
//                   },
//                   {
//                     title: "指标计算",
//                     dataIndex: "mortality_formula",
//                     key: "mortality_formula",
//                     width: 180,
//                   },
//                   {
//                     title: "指标计算",
//                     dataIndex: "mortality_formula",
//                     key: "mortality_formula",
//                     width: 180,
//                   },
//                   {
//                     title: "指标数值",
//                     dataIndex: "mortality_value",
//                     key: "mortality_value",
//                     width: 100,
//                   },
//                   {
//                     title: "指标分值",
//                     dataIndex: "mortality_score",
//                     key: "mortality_score",
//                     width: 100,
//                     scopedSlots: { customRender: "mortality_score" },
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             title: "30天再入院率",
//             children: [
//               {
//                 title: "患者同一主要诊断30天内再入同一医院人数/出院人数*100%",
//                 children: [
//                   {
//                     title: "患者同一主要诊断30天内再入同一医院人数",
//                     width: 180,
//                   },
//                   {
//                     title: "出院人数",
//                     width: 100,
//                   },
//                   {
//                     title: "指标计算",
//                     dataIndex: "admission_rate_formula",
//                     key: "admission_rate_formula",
//                     width: 180,
//                   },
//                   {
//                     title: "指标数值",
//                     dataIndex: "admission_rate_value",
//                     key: "admission_rate_value",
//                     width: 100,
//                   },
//                   {
//                     title: "指标分值",
//                     dataIndex: "admission_rate_score",
//                     key: "admission_rate_score",
//                     width: 100,
//                     scopedSlots: { customRender: "admission_rate_score" },
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             title: "医疗质量管理专项工作考核",
//             children: [
//               {
//                 title: "质控中心专项工作考核标准",
//                 children: [
//                   {
//                     title: "医疗质量管理专项工作考核",
//                     width: 180,
//                   },
//                   {
//                     title: "指标计算",
//                     dataIndex: "quality_assurance_formula",
//                     key: "quality_assurance_formula",
//                     width: 180,
//                   },
//                   {
//                     title: "指标数值",
//                     dataIndex: "quality_assurance_value",
//                     key: "quality_assurance_value",
//                     width: 100,
//                   },
//                   {
//                     title: "指标分值",
//                     dataIndex: "quality_assurance_score",
//                     key: "quality_assurance_score",
//                     width: 100,
//                     scopedSlots: { customRender: "quality_assurance_score" },
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//       {
//         title: "节能降耗",
//         children: [
//           {
//             title: "医疗运行成本控制效果",
//             children: [
//               {
//                 title:
//                   "（医疗收入增长率-医疗运行成本增长率）（除人员支出外的所有成本）",
//                 children: [
//                   {
//                     title: "医疗收入",
//                     width: 100,
//                   },
//                   {
//                     title: "业务活动费用＿其他资金",
//                     width: 100,
//                   },
//                   {
//                     title: "业务活动费用＿其他资金＿301工资福利支出",
//                     width: 180,
//                   },
//                   {
//                     title: "业务活动费用＿其他资金＿301工资福利支出",
//                     width: 180,
//                   },
//                   {
//                     title: "业务活动费用＿其他资金＿303对个人和家庭的补助",
//                     width: 180,
//                   },
//                   {
//                     title: "单位管理费用＿其他资金",
//                     width: 180,
//                   },
//                   {
//                     title: "指标计算",
//                     dataIndex: "operation_cost_formula",
//                     key: "operation_cost_formula",
//                     width: 180,
//                   },
//                   {
//                     title: "指标数值",
//                     dataIndex: "operation_cost_value",
//                     key: "operation_cost_value",
//                     width: 100,
//                   },
//                   {
//                     title: "指标分值",
//                     dataIndex: "operation_cost_score",
//                     key: "operation_cost_score",
//                     width: 100,
//                     scopedSlots: { customRender: "operation_cost_score" },
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             title: "百元医疗收入消耗的卫生材料费用",
//             children: [
//               {
//                 title: "直报结果",
//                 children: [
//                   {
//                     title: "指标计算",
//                     dataIndex: "medical_income_formula",
//                     key: "medical_income_formula",
//                     width: 180,
//                   },
//                   {
//                     title: "指标数值",
//                     dataIndex: "medical_income_value",
//                     key: "medical_income_value",
//                     width: 100,
//                   },
//                   {
//                     title: "指标分值",
//                     dataIndex: "medical_income_score",
//                     key: "medical_income_score",
//                     width: 100,
//                     scopedSlots: { customRender: "medical_income_score" },
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             title: "每百诊疗人次能耗",
//             children: [
//               {
//                 title:
//                   "总能耗量/综合服务量。综合服务量=实际占用总床日数*3+门急诊人次",
//                 children: [
//                   {
//                     title: "总能耗量",
//                     width: 100,
//                   },
//                   {
//                     title: "实际占用总床日数",
//                     width: 100,
//                   },
//                   {
//                     title: "门诊人次",
//                     width: 100,
//                   },
//                   {
//                     title: "急诊人次",
//                     width: 100,
//                   },
//                   {
//                     title: "指标计算",
//                     dataIndex: "visits_formula",
//                     key: "visits_formula",
//                     width: 180,
//                   },
//                   {
//                     title: "指标数值",
//                     dataIndex: "visits_value",
//                     key: "visits_value",
//                     width: 100,
//                   },
//                   {
//                     title: "指标分值",
//                     dataIndex: "visits_score",
//                     key: "visits_score",
//                     width: 100,
//                     scopedSlots: { customRender: "visits_score" },
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             title: "万元医疗收入基本运行及卫生材料支出",
//             children: [
//               {
//                 title: "（医疗运行成本/医疗收入）*10000",
//                 children: [
//                   {
//                     title: "业务活动费用＿其他资金",
//                     width: 100,
//                   },
//                   {
//                     title: "业务活动费用＿其他资金＿301工资福利支出",
//                     width: 100,
//                   },
//                   {
//                     title: "业务活动费用＿其他资金＿303对个人和家庭的补助",
//                     width: 100,
//                   },
//                   {
//                     title: "单位管理费用＿其他资金",
//                     width: 100,
//                   },
//                   {
//                     title: "单位管理费用＿其他资金＿301工资福利支出",
//                     width: 100,
//                   },
//                   {
//                     title: "单位管理费用＿其他资金＿303对个人和家庭的补助",
//                     width: 100,
//                   },
//                   {
//                     title: "指标计算",
//                     dataIndex: "health_materials_formula",
//                     key: "health_materials_formula",
//                     width: 180,
//                   },
//                   {
//                     title: "指标数值",
//                     dataIndex: "health_materials_value",
//                     key: "health_materials_value",
//                     width: 100,
//                   },
//                   {
//                     title: "指标分值",
//                     dataIndex: "health_materials_score",
//                     key: "health_materials_score",
//                     width: 100,
//                     scopedSlots: { customRender: "health_materials_score" },
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     title: "运行效率",
//     children: [
//       {
//         title: "人员积极",
//         children: [
//           {
//             title: "17、每医生日均负担门急诊人次（2分）",
//             children: [
//               {
//                 title: "门急诊总人次xx/工作日xx/执业（助理）医师数*100%",
//                 children: [
//                   {
//                     title: "门诊人次",
//                     width: 100,
//                   },
//                   {
//                     title: "急诊人次",
//                     width: 100,
//                   },
//                   {
//                     title: "工作日",
//                     width: 100,
//                   },
//                   {
//                     title: " 执业医师",
//                     width: 100,
//                   },
//                   {
//                     title: " 执业助理医师",
//                     width: 100,
//                   },
//                   {
//                     title: "指标计算",
//                     dataIndex: "Patient_satisfaction_formula",
//                     key: "Patient_satisfaction_formula",
//                     width: 180,
//                   },
//                   {
//                     title: "指标数值",
//                     dataIndex: "Patient_satisfaction_value",
//                     key: "Patient_satisfaction_value",
//                     width: 100,
//                   },
//                   {
//                     title: "指标分值",
//                     dataIndex: "Patient_satisfaction_score",
//                     key: "street",
//                     width: 100,
//                     scopedSlots: { customRender: "Patient_satisfaction_score" },
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             title: "18、每职工日均负担住院患者占用的床日数（5分）★",
//             children: [
//               {
//                 title: "出院占床日数xx/工作日数xx/在岗职工数xx*100%",
//                 children: [
//                   {
//                     title: "出院者占用总床日数",
//                     width: 100,
//                   },
//                   {
//                     title: "工作日",
//                     width: 100,
//                   },
//                   {
//                     title: "在岗职工数",
//                     width: 100,
//                   },
//                   {
//                     title: "指标计算",
//                     dataIndex: "Patient_satisfaction_formula",
//                     key: "Patient_satisfaction_formula",
//                     width: 180,
//                   },
//                   {
//                     title: "指标数值",
//                     dataIndex: "Patient_satisfaction_value",
//                     key: "Patient_satisfaction_value",
//                     width: 100,
//                   },
//                   {
//                     title: "指标分值",
//                     dataIndex: "Patient_satisfaction_score",
//                     key: "street",
//                     width: 100,
//                     scopedSlots: { customRender: "Patient_satisfaction_score" },
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//       {
//         title: "床位有效",
//         children: [
//           {
//             title: "19、平均住院天数（9分）★",
//             children: [
//               {
//                 title: "出院占床日数xx/出院人数xx",
//                 children: [
//                   {
//                     title: "出院者占用总床日数",
//                     width: 100,
//                   },
//                   {
//                     title: "出院人数",
//                     width: 100,
//                   },
//                   {
//                     title: "指标计算",
//                     dataIndex: "Patient_satisfaction_formula",
//                     key: "Patient_satisfaction_formula",
//                     width: 180,
//                   },
//                   {
//                     title: "指标数值",
//                     dataIndex: "Patient_satisfaction_value",
//                     key: "Patient_satisfaction_value",
//                     width: 100,
//                   },
//                   {
//                     title: "指标分值",
//                     dataIndex: "Patient_satisfaction_score",
//                     key: "street",
//                     width: 100,
//                     scopedSlots: { customRender: "Patient_satisfaction_score" },
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             title: "20、床位使用率（5分）",
//             children: [
//               {
//                 title: "实际占用总床日数xx/实际开放总床日数xx*100%",
//                 children: [
//                   {
//                     title: "实际占用总床日数",
//                     width: 100,
//                   },
//                   {
//                     title: "实际开放总床日数",
//                     width: 100,
//                   },
//                   {
//                     title: "指标计算",
//                     dataIndex: "Patient_satisfaction_formula",
//                     key: "Patient_satisfaction_formula",
//                     width: 180,
//                   },
//                   {
//                     title: "指标数值",
//                     dataIndex: "Patient_satisfaction_value",
//                     key: "Patient_satisfaction_value",
//                     width: 100,
//                   },
//                   {
//                     title: "指标分值",
//                     dataIndex: "Patient_satisfaction_score",
//                     key: "street",
//                     width: 100,
//                     scopedSlots: { customRender: "Patient_satisfaction_score" },
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//       {
//         title: "资产高效",
//         children: [
//           {
//             title: "21、资产服务效率（3分）",
//             children: [
//               {
//                 title:
//                   "综合服务量（实际占用总床日数xx*3+门诊xx+急诊人次XX）/净资产xx",
//                 children: [
//                   {
//                     title: "实际占用总床日数",
//                     width: 100,
//                   },
//                   {
//                     title: "门诊人次",
//                     width: 100,
//                   },
//                   {
//                     title: "急诊人次",
//                     width: 100,
//                   },
//                   {
//                     title: " 净资产",
//                     width: 100,
//                   },
//                   {
//                     title: "指标计算",
//                     dataIndex: "Patient_satisfaction_formula",
//                     key: "Patient_satisfaction_formula",
//                     width: 180,
//                   },
//                   {
//                     title: "指标数值",
//                     dataIndex: "Patient_satisfaction_value",
//                     key: "Patient_satisfaction_value",
//                     width: 100,
//                   },
//                   {
//                     title: "指标分值",
//                     dataIndex: "Patient_satisfaction_score",
//                     key: "street",
//                     width: 100,
//                     scopedSlots: { customRender: "Patient_satisfaction_score" },
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     title: "发展实力",
//     children: [
//       {
//         title: "人才辈出",
//         children: [
//           {
//             title: "22、高层次人才占卫技人员比（2分）",
//             children: [
//               {
//                 title: "（XX*5+xx*3+xx*2+xx*1）/卫生技术人员数xx*100%",
//                 children: [
//                   {
//                     title: "高层次人才享受政府特殊津贴专家",
//                     width: 100,
//                   },
//                   {
//                     title: "高层次人才市级突出贡献专家",
//                     width: 100,
//                   },
//                   {
//                     title: "高层次人才北京市级以上学会主任委员",
//                     width: 100,
//                   },
//                   {
//                     title: " 高层次人才市级学会副主任委员",
//                     width: 100,
//                   },
//                   {
//                     title: " 高层次人才北京市级奖励或资助的人才",
//                     width: 100,
//                   },
//                   {
//                     title: "高层次人才区级优秀人才",
//                     width: 100,
//                   },
//                   {
//                     title: "指标计算",
//                     dataIndex: "Patient_satisfaction_formula",
//                     key: "Patient_satisfaction_formula",
//                     width: 180,
//                   },
//                   {
//                     title: "指标数值",
//                     dataIndex: "Patient_satisfaction_value",
//                     key: "Patient_satisfaction_value",
//                     width: 100,
//                   },
//                   {
//                     title: "指标分值",
//                     dataIndex: "Patient_satisfaction_score",
//                     key: "street",
//                     width: 100,
//                     scopedSlots: { customRender: "Patient_satisfaction_score" },
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//       {
//         title: "科技创新",
//         children: [
//           {
//             title: "23、每百名卫技人员科研项目经费（2分）",
//             children: [
//               {
//                 title: "出院占床日数xx/出院人数xx",
//                 children: [
//                   {
//                     title: "出院者占用总床日数",
//                     width: 100,
//                   },
//                   {
//                     title: "出院人数",
//                     width: 100,
//                   },
//                   {
//                     title: "指标计算",
//                     dataIndex: "Patient_satisfaction_formula",
//                     key: "Patient_satisfaction_formula",
//                     width: 180,
//                   },
//                   {
//                     title: "指标数值",
//                     dataIndex: "Patient_satisfaction_value",
//                     key: "Patient_satisfaction_value",
//                     width: 100,
//                   },
//                   {
//                     title: "指标分值",
//                     dataIndex: "Patient_satisfaction_score",
//                     key: "street",
//                     width: 100,
//                     scopedSlots: { customRender: "Patient_satisfaction_score" },
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             title: "24、每百名卫技人员获得科研奖励数（2分）",
//             children: [
//               {
//                 title:
//                   "(xx*10+xx*8+xx*7+xx*6+xx*5+xx*4+xx*3+xx*2+xx*1)/卫生技术人员数xx*100",
//                 children: [
//                   {
//                     title: "卫计人员获得科研奖励数国家最高科技奖",

//                     width: 100,
//                   },
//                   {
//                     title: "卫计人员获得科研奖励数国家科技进步奖一等奖",
//                     width: 100,
//                   },
//                   {
//                     title: "卫计人员获得科研奖励数国家科技进步奖二等奖",
//                     width: 100,
//                   },
//                   {
//                     title: "卫计人员获得科研奖励数国家技术发明奖一等奖",
//                     width: 100,
//                   },
//                   {
//                     title: "卫计人员获得科研奖励数国家技术发明奖二等奖",
//                     width: 100,
//                   },
//                   {
//                     title: "卫计人员获得科研奖励数国家自然科学奖一等奖",
//                     width: 100,
//                   },
//                   {
//                     title: "卫计人员获得科研奖励数国家自然科学奖二等奖",
//                     width: 100,
//                   },
//                   {
//                     title:
//                       "卫计人员获得科研奖励数省部级（中华医学科技奖类）一等奖",
//                     width: 100,
//                   },
//                   {
//                     title:
//                       "卫计人员获得科研奖励数省部级（中华医学科技奖类）二等奖",
//                     width: 100,
//                   },
//                   {
//                     title:
//                       "卫计人员获得科研奖励数省部级（中华医学科技奖类）三等奖",
//                     width: 100,
//                   },
//                   {
//                     title: "卫计人员获得科研奖励数区级一等奖",
//                     width: 100,
//                   },
//                   {
//                     title: "卫计人员获得科研奖励数区级二等奖",
//                     width: 100,
//                   },
//                   {
//                     title: "卫计人员获得科研奖励数区级三等奖",
//                     width: 100,
//                   },
//                   {
//                     title: "指标计算",
//                     dataIndex: "Patient_satisfaction_formula",
//                     key: "Patient_satisfaction_formula",
//                     width: 180,
//                   },
//                   {
//                     title: "指标数值",
//                     dataIndex: "Patient_satisfaction_value",
//                     key: "Patient_satisfaction_value",
//                     width: 100,
//                   },
//                   {
//                     title: "指标分值",
//                     dataIndex: "Patient_satisfaction_score",
//                     key: "street",
//                     width: 100,
//                     scopedSlots: { customRender: "Patient_satisfaction_score" },
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             title: "25、每百名卫技人员卫生科技期刊发表论文数（2分）",
//             children: [
//               {
//                 title:
//                   "xx/卫计人员总数xx*100*0.6+xx/卫计人员总数xx*100*0.3+xx/卫计人员总数xx*100*0.1",
//                 children: [
//                   {
//                     title: "卫生技术人员",
//                     width: 100,
//                   },
//                   {
//                     title: "医学期刊发表论文数SCI",
//                     width: 100,
//                   },
//                   {
//                     title: "医学期刊发表论文数核心期刊",
//                     width: 100,
//                   },
//                   {
//                     title: "医学期刊发表论文数其他正式期刊",
//                     width: 100,
//                   },
//                   {
//                     title: "指标计算",
//                     dataIndex: "Patient_satisfaction_formula",
//                     key: "Patient_satisfaction_formula",
//                     width: 180,
//                   },
//                   {
//                     title: "指标数值",
//                     dataIndex: "Patient_satisfaction_value",
//                     key: "Patient_satisfaction_value",
//                     width: 100,
//                   },
//                   {
//                     title: "指标分值",
//                     dataIndex: "Patient_satisfaction_score",
//                     key: "street",
//                     width: 100,
//                     scopedSlots: { customRender: "Patient_satisfaction_score" },
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//       {
//         title: "教育发展",
//         children: [
//           {
//             title: "26、继续教育学分达标率（2分）",
//             children: [
//               {
//                 title: "继续教育已完成人数xx/继续教育应完成人数xx*100%",
//                 children: [
//                   {
//                     title: "继续教育已达标人数",
//                     width: 100,
//                   },
//                   {
//                     title: "继续教育应完成人数",
//                     width: 100,
//                   },
//                   {
//                     title: "指标计算",
//                     dataIndex: "Patient_satisfaction_formula",
//                     key: "Patient_satisfaction_formula",
//                     width: 180,
//                   },
//                   {
//                     title: "指标数值",
//                     dataIndex: "Patient_satisfaction_value",
//                     key: "Patient_satisfaction_value",
//                     width: 100,
//                   },
//                   {
//                     title: "指标分值",
//                     dataIndex: "Patient_satisfaction_score",
//                     key: "street",
//                     width: 100,
//                     scopedSlots: { customRender: "Patient_satisfaction_score" },
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     title: "操作",
//     dataIndex: "operation",
//     key: "operation",
//     width: 160,
//     scopedSlots: { customRender: "operation" },
//     fixed: "right",
//   },
// ];
const columns = [
  {
    title: "医院名称",
    dataIndex: "name",
    key: "name",
    width: 260,
    fixed: "left",
  },
  {
    title: "医院名称",
    dataindex: "name",
    width: "260",
    fixed: "left",
  },
  {
    title: "社会评价",
    children: [
      {
        title: "患者满意",
        children: [
          {
            title: "患者满意度",
            children: [
              {
                title:
                  "住院患者满意度：1）患者对住院医院的总体满意度；2）患者对住院期间流程及各个环节医院服务的评价；3）投诉和争议的管理和物理环境的评价。",
                dataindex: null,
                width: null,
                fixed: null,
                children: [
                  {
                    id: "6",
                    superid: "5",
                    title: "指标数值",
                    dataindex: "Patient_satisfaction_value",
                    width: null,
                    fixed: null,
                  },
                  {
                    id: "7",
                    superid: "5",
                    title: "指标分值",
                    dataindex: "Patient_satisfaction_score",
                    width: null,
                    fixed: null,
                  },
                  {
                    id: "9",
                    superid: "5",
                    title: "指标计算",
                    dataindex: "Patient_satisfaction_formula",
                    width: null,
                    fixed: null,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
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
        let data = res.data;
        data.forEach((item) => {
          if (item.children.length != "0") {
            let data = item.children;
            data.forEach((item) => {
              if (item.children.length != "0") {
                let data = item.children;
                data.forEach((item) => {
                  if (item.children.length != "0") {
                    let data = item.children;
                    data.forEach((item) => {
                      if (item.children.length != "0") {
                        let data = item.children;
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
        console.log(data);
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


