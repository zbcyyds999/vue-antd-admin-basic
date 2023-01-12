import * as XLSX from "xlsx";
import * as XLSX2 from "xlsx-style";
// import * as xlsx_style from "xlsx-style-medalsoft"
//导出为Excel方法
// function sheet_from_array_of_arrays(data, opts, fontStyle) {
//   console.log(data)
//   var ws = {};
//   var range = {s: {c: 10000000, r: 10000000}, e: {c: 0, r: 0}};
//   let _opts = []
//   if (opts) {
//       _opts = opts
//   }
//   for (var R = 0; R != data.length; ++R) {
//       for (var C = 0; C != data[R].length; ++C) {
//           if (range.s.r > R) range.s.r = R;
//           if (range.s.c > C) range.s.c = C;
//           if (range.e.r < R) range.e.r = R;
//           if (range.e.c < C) range.e.c = C;
//           var cell = {v: data[R][C]};
//           //设置表头样式
//           if (_opts) {
//               if (R === _opts[0]) {
//                   cell = {
//                       v: data[R][C],
//                       s: {
//                           font: {
//                               name: '宋体',
//                               sz: 13,
//                               color: {rgb: '000000'},
//                               bold: true
//                           },
//                           fill: {
//                               fgColor: {rgb: 'c0c0c0'}
//                           },
//                           alignment: {
//                               horizontal: 'center',
//                               vertical: 'center',
//                               indent: 0
//                           },
//                           border: {
//                               bottom: {
//                                   style: 'thin',
//                                   color: {rgb: '000000'}
//                               },
//                               left: {
//                                   style: 'thin',
//                                   color: {rgb: '000000'}
//                               },
//                               right: {
//                                   style: 'thin',
//                                   color: {rgb: '000000'}
//                               }
//                           }
//                       }
//                   }
//               }
//           }
//           //设置默认样式
//           if (_opts) {
//               if (R !== _opts[0]) {
//                   cell = {
//                       v: data[R][C],
//                       s: {
//                           border: {
//                               top: {
//                                   style: "thin"
//                               },
//                               bottom: {
//                                   style: "thin"
//                               },
//                               left: {
//                                   style: "thin"
//                               },
//                               right: {
//                                   style: "thin"
//                               }
//                           },
//                           font: {
//                               name: '宋体',
//                               sz: 11,
//                               color: {rgb: '000000'}
//                           },
//                           alignment: {//对齐方式
//                               horizontal: 'left', //水平居中
//                               vertical: 'center' //竖直居中
//                           }
//                       },

//                   }
//               }
//           }


//           if (cell.v == null) continue;
//           var cell_ref = XLSX.utils.encode_cell({c: C, r: R});

//           if (typeof cell.v === 'number') cell.t = 'n';
//           else if (typeof cell.v === 'boolean') cell.t = 'b';
//           else if (cell.v instanceof Date) {
//               cell.t = 'n';
//               cell.z = XLSX.SSF._table[14];
//               cell.v = datenum(cell.v);
//           } else cell.t = 's';

//           ws[cell_ref] = cell;
//       }
//   }
//   if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
//   return ws;
// }
// 计算excel的列名
function createCellPos(n) {
  var ordA = 'A'.charCodeAt(0); //字母转unicode
  var ordZ = 'Z'.charCodeAt(0);
  var len = ordZ - ordA + 1; // 计算字母长度
  var s = "";
  while (n >= 0) {
    s = String.fromCharCode(n % len + ordA) + s; // 将输入数字转换成字母
    n = Math.floor(n / len) - 1; // 每次进行完需要重新floor向下取整，  -1是因为 A的unicode是0
  }

  return s;

}
// 计算每一列的宽度
export function getCellWidth(value) {
  console.log("value===",value)
  console.log("length===",value == null?0:value.toString().length)
  if (value == null || value == '') {
    return 10
  } else if (value.toString().charCodeAt(0) > 255) {
    // 判断是否包含中文
    let length = value.toString().length * 2
    // if (length > 60) {
      // length = length - 40
      //这里的宽度可以自己设定，在前面设置wrapText: 1可以在单元格内换行
    // }
    return length
  } else {
    return value.toString().length * 1.2
  }
}


function tableToExcel(tableID, fileName, headLength, colsLength, headColsLength) {
  // return
  console.log(tableID, fileName, headLength, colsLength, headColsLength);
  console.time("导出总耗时");

  //先添加表格样式，再下载
  var xlsxParam = {
    raw: true
  }; //转换成excel时，使用原始的格式，这样导出的时候数字过长不会变成科学计数法
  var sheet = XLSX.utils.table_to_sheet(document.querySelector(`#${tableID}`), xlsxParam);
  console.log(sheet);
  //将一个table对象转换成一个sheet对象
  // 表格的样式
  const borderAll = {
    top: { style: "thin" },
    bottom: { style: "thin" },
    left: { style: "thin" },
    right: { style: "thin" },
  };

  var arr = [] //获取所有列的名称集合

  for (let i = 0; i < headLength; i++) {
    arr.push(createCellPos(i))
  }
  const merges = sheet['!merges']

  let style = {
    s: {
      border: borderAll
    }
  }
  //给合并的单元格加边框
  merges.forEach(item => {
    let startRowNumber = Number(item.s.c),
      endRowNumber = Number(item.e.c);
    for (let i = startRowNumber; i <= endRowNumber; i++) {
      sheet[`${arr[i]}${Number(item.e.r) + 1}`] = sheet[`${arr[i]}${Number(item.e.r) + 1}`] || style
      // 处理合并列
      for (let k = item.s.r + 2; k <= item.e.r + 1; k++) {
        sheet[arr[i] + k] = sheet[arr[k] + item.e.r] || style
      }
    }
  })

  for (let i = 0; i < arr.length; i++) {
    //判断是否多级表头，多级表头的，计算各列单元格长度
    console.log("headColsLength===",headColsLength)
    if (headColsLength > 1) {
      //循环多级表头
      for (let j = 0; j < 18; j++) {
        //只循环存在的表头
        if (j < headColsLength && sheet[arr[i] + j]) {
          //判断是多级表头的单元格，计算单元格长度
          if (!sheet[arr[i] + (j + 1)] || !sheet[arr[i] + (j - 1)] || (!sheet[arr[i] + (j - 1)] && !sheet[arr[i] + (j + 1)])) {
            sheet['!cols'].push({
              wch: getCellWidth(sheet[arr[i] + j].v?sheet[arr[i] + j].v:null)
            })
            console.log(sheet[arr[i] + j].v,arr[i] + j);
          } 
        }
      }
    } else {
      console.log(getCellWidth(sheet[arr[i] + '1'].v),arr[i]);
      //不是多级表头直接计算单元格长度
      sheet['!cols'].push({
        wch: getCellWidth(sheet[arr[i] + '1'].v) 
      })
    }


    for (let k = 1; k <= colsLength; k++) {
      if (sheet[arr[i] + k]) {
        if (k <= 5) {
          sheet[arr[i] + k].s = {
            border: borderAll,
            fill: {
              fgColor: { rgb: 'c0c0c0' }
            },
            alignment: {
              horizontal: "center", // 水平对齐 居左
              vertical: "center",// 垂直对齐-居中
              wrap_text: true
            }
          }
        } else {
          sheet[arr[i] + k].s = {
            border: borderAll,
            alignment: {
              horizontal: "left", // 水平对齐 居左
              vertical: "center",// 垂直对齐-居中
              wrap_text: true
            }
          }
        }
      }
    }

  }
  // //第一层循环，循环列

  // for (let i = 0; i < arr.length; i++) {
  //   //判断是否多级表头，多级表头的，计算各列单元格长度

  //   //循环多级表头

  //   for (let j = 1; j <= colsLength; j++) {
  //     if (sheet[arr[i] + j]) {
  //       const lenth = Object.keys(sheet[arr[i] + j]).length
  //       if (lenth == 3) {
  //         if (!sheet[arr[i] + (j + 1)] || !sheet[arr[i] + (j - 1)] || (!sheet[arr[i] + (j - 1)] && !sheet[arr[i] + (j + 1)])) {
  //           sheet['!cols'].push({
  //             wch: getCellWidth(sheet[arr[i] + j].v)
  //           })

  //           console.log(sheet[arr[i] + j], arr[i] + j,);
  //         }
  //       }
  //       else {
  //         sheet['!cols'].push({
  //           wch: getCellWidth(null)
  //         })
  //       }
  //     }

  //     //只循环存在的表头
  //     // if (j < headColsLength && sheet[arr[i] + j]) {
  //     //   console.log(sheet[arr[i] + j].v);
  //     //   //判断是多级表头的单元格，计算单元格长度

  //     //   sheet['!cols'].push({
  //     //     wch: getCellWidth(sheet[arr[i] + j].v)
  //     //   })
  //     // console.log(sheet['!cols'], 1);
  //     // if (!sheet[arr[i] + (j + 1)] || !sheet[arr[i] + (j - 1)] || (!sheet[arr[i] + (j - 1)] && !sheet[arr[i] + (j + 1)])) {
  //     //   sheet['!cols'].push({
  //     //     wch: (sheet[arr[i] + j].v.length) * 2 + 3
  //     //   })
  //     //   console.log(sheet[arr[i] + j]);
  //     // }
  //     // }

  //   }


  //   //第二层循环，循环各列的每行数据，添加文字垂直居中
  //   // for (let k = 0; k <= 5; k++) {
  //   //   if (sheet[arr[i] + k]) {
  //   //     sheet[arr[i] + k].s = {


  //   // }
  //   // }

  //   // }



  // }

  downloadExcel(sheet2blob(sheet), `${fileName}.xlsx`); //下载
  // document.getElementById('app').removeChild(document.getElementById(tableID)) //每次下载完，删除下载生成的表格

  function sheet2blob(sheet, sheetName) {

    sheetName = sheetName || 'sheet1';
    var workbook = {
      SheetNames: [sheetName],
      Sheets: {}
    };
    workbook.Sheets[sheetName] = sheet; // 生成excel的配置项
    // sheet.columns.forEach(function (column) {
    //   var dataMax = 0;
    //   column.eachCell({ includeEmpty: true }, function (cell) { 
    //     dataMax = cell.value?cell.value.toString().length:0;
    //     if(dataMax <= (column.header.length+2) ){
    //         if(column.width > dataMax){
    //             //retain its default width
    //         } else {
    //             column.width = column.header.length+3;
    //         }
    //     } else {
    //         column.width = dataMax+3;
    //        column.header.length = dataMax+3;
    //     }
    //     dataMax = 0;
    //   })

    // });

    var wopts = {
      bookType: 'xlsx', // 要生成的文件类型
      bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
      type: 'binary'
    };
    var wbout = XLSX2.write(workbook, wopts);

    var blob = new Blob([s2ab(wbout)], {
      type: "application/octet-stream"
    }); // 字符串转ArrayBuffer
    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }
    return blob;
  }

  function downloadExcel(url, saveName) {
    if (typeof url == 'object' && url instanceof Blob) {
      url = URL.createObjectURL(url); // 创建blob地址
    }
    var aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    var event;
    if (window.MouseEvent) event = new MouseEvent('click');
    else {
      event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
  }
}
// function excelTable(tableID, fileName, headLength, colsLength, headColsLength) {
//   tableToExcel(tableID, fileName, headLength, (colsLength + 1), headColsLength);
// }



export { tableToExcel }
