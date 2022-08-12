// const log4js = require('log4js')

// log4js.configure({
//   appenders: { // 定义输出到哪
//     console: {
//       type: 'stdout'
//     },
//     runtime: {
//       type: 'DateFile',
//       pattern: '-yyyy-MM-dd.log',
//       daysToKeep: 5, // 删除5天前的日志
//       filename: './logs/runtime.log',
//       keepFileExt: false,
//       compress: true
//     },
//     access: {
//       type: 'DateFile',
//       pattern: '-yyyy-MM-dd.log',
//       daysToKeep: 5,
//       filename: './logs/access.log',
//       keepFileExt: false,
//       compress: true
//     }
//   },
//   categories: { // 定义两个分类，外部实例化的时候可以任选其一
//     access: { appenders: ['console', 'access'], level: 'debug' },
//     default: { appenders: ['console', 'runtime'], level: 'debug' }
//   }
// })

// module.exports = function getLogger(category) {
//   return log4js.getLogger(category)
// }
// 文件名：log4js.js
// var log4js = require('log4js');
// log4js.configure({
//     appenders: {
//         production: {
//             type: 'dateFile',		// 日志输出类型,dateFile表示输出到文件
//             filename: 'demo.log',   // 输出到文件的文件路径，注意，是路径而不是文件名！
//             alwaysIncludePattern: true,    // 日志文件是否展示预设的模式
//             keepFileExt: true,   // 日志文件是否始终保持后缀
//             daysToKeep: 30,    // 日志保存时间，默认值为0，表示一直保存
//         }
//     },
//     categories: {
//         default: { appenders: [ 'production' ], level: 'info' }
//     }
// });
// var logger = log4js.getLogger();
// // 下面这行代码是测试代码，我将这个js文件引入到了html文件中。如果一切正常，启动项目后你会看到项目根目录下生成了一个类似于名为“demo.2020-10-20.log”的日志文件，里面就有你这行输出的信息。
// logger.info('this is a info3');

/*
文件名：log_utils.js
对log4js的简单封装
实践：不同的模块使用不同的日志文件，配置在configure进行。
使用时，调用getLogger获取不同的appender，写入不同的日志文件。
将日志写入文件，然后使用tail -f xx.txt可实时查看，即使进行备份，也不影响
知识点：
每天备份：pattern为.yyyy-MM-dd.txt
每小时：pattern为.yyyy-MM-dd-mm.txt

*/
const log4js = require('log4js');

log4js.configure(
{
  appenders:
  {
    console:
    {
        type: 'console',
    },
    datelog:
    {
        type: 'dateFile',
        filename: 'logs/mylog',
        pattern: ".yyyy-MM-dd.txt",
        // alwaysIncludePattern: true,
        // maxLogSize: 10, // 无效
        // backups: 5, // 无效
        compress: true,
        daysToKeep: 2,
    },
    datelog2:
    {
        type: 'dateFile',
        filename: 'logs/youlog',
        pattern: ".yyyy-MM-dd.txt",
        compress: true,
        daysToKeep: 2,
    },
    // more...
  },
  categories:
  {
      default:
      {
          appenders: ['console'],
          level: 'debug',
      },
      datelog:
      {
          // 指定为上面定义的appender，如果不指定，无法写入
          appenders: ['console', 'datelog'],
          level: 'debug', // 指定等级
      },
      datelog2:
      {
          appenders: ['console', 'datelog2'],
          level: 'debug',
      },
      // more...
  },
  
  // for pm2...
  pm2: true,
  disableClustering: true, // not sure...
}
);


function getLogger(type)
{
    return log4js.getLogger(type);
}

module.exports = {
    getLogger,
}
