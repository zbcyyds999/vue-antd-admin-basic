import * as XLSX from "xlsx";
import * as XLSX2 from "xlsx-style";
//导出为Excel方法
function tableToExcel(tableID, fileName, headLength, colsLength, headColsLength) {
  // return
  console.time("导出总耗时");
  //先添加表格样式，再下载
  var sheet = XLSX.utils.table_to_sheet(document.querySelector(`#${tableID}`)); //将一个table对象转换成一个sheet对象
  var arr = [] //获取所有列的名称集合
  for (let i = 0; i < headLength; i++) {
    if (i < 26) {
      arr.push(String.fromCharCode((65 + i)).toUpperCase())
    } else {
      // console.log(i, String.fromCharCode((65 + (i - 26))).toUpperCase());
      arr.push('A' + (String.fromCharCode((65 + (i - 26))).toUpperCase()))
    }

  }
  //第一层循环，循环列
  for (let i = 0; i < arr.length; i++) {
    //判断是否多级表头，多级表头的，计算各列单元格长度
    if (headColsLength > 1) {
      //循环多级表头
      for (let j = 0; j < headColsLength; j++) {
        //只循环存在的表头
        if (j < headColsLength && sheet[arr[i] + j]) {
          //判断是多级表头的单元格，计算单元格长度
          if (!sheet[arr[i] + (j + 1)] || !sheet[arr[i] + (j - 1)] || (!sheet[arr[i] + (j - 1)] && !sheet[arr[i] + (j + 1)])) {
            sheet['!cols'].push({
              wch: (sheet[arr[i] + j].v.length) * 2 + 3
            })
          }
        }
      }
    } else {
      //不是多级表头直接计算单元格长度
      sheet['!cols'].push({
        wch: (sheet[arr[i] + '1'].v.length) * 2 + 3
        
      })
    }
    //第二层循环，循环各列的每行数据，添加文字垂直居中
    for (let k = 0; k <= 5; k++) {
      if (sheet[arr[i] + k]) {
        sheet[arr[i] + k].s = {
          alignment: {
            horizontal: "center", // 水平对齐-居中
            vertical: "center",// 垂直对齐-居中
            wrap_text: true
          }
        }
      }

    }
    for (let k = 6; k <=colsLength; k++) {
      if (sheet[arr[i] + k]) {
        sheet[arr[i] + k].s = {
          alignment: {
            horizontal: "left", // 水平对齐 居左
            vertical: "center",// 垂直对齐-居中
            wrap_text: true
          }
        }
      }

    }

  }

  console.timeEnd("导出总耗时");
  downloadExcel(sheet2blob(sheet), `${fileName}.xlsx`); //下载
  // document.getElementById('app').removeChild(document.getElementById(tableID)) //每次下载完，删除下载生成的表格

  function sheet2blob(sheet, sheetName) {
    sheetName = sheetName || 'sheet1';
    var workbook = {
      SheetNames: [sheetName],
      Sheets: {}
    };
    workbook.Sheets[sheetName] = sheet; // 生成excel的配置项

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
