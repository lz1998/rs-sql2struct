let typeMap: any = {
  'tinyint': 'i32',
  'smallint': 'i32',
  'int': 'Integer',
  'bool': 'bool',
  'boolean': 'bool',
  'mediumint': 'i64',
  'bigint': 'i64',
  'float': 'f32',
  'double': 'f64',
  'decimal': 'f64',
  'char': 'string',
  'varchar': 'String',
  'text': 'String',
  'mediumtext': 'String',
  'longtext': 'String',
  'time': 'Date',
  'date': 'Date',
  'datetime': 'Date',
  'timestamp': 'i64',
  'enum': 'string',
  'set': 'string',
  'blob': 'Vec<u8>'
}

export function sqlContent(val: string): string {
  if (!val) {
    return ''
  }
  // var res = val.match(/\`[\w_]+\`\s+[\w_\(\)]+(\s+|\,)/g)
  var res = val.match(/\`[\w_]+\`\s+[\w_\(\)]+(\n|([\s\S]*?)(\,|\n))/g)
  if (!res) {
    return 'invalid sql'
  }
  var types = typeMap
  var structResult = 'pub struct '
  for (var i = 0, len = res.length; i < len; i++) {
    var field = res[i].match(/\`(.+)\`\s+(tinyint|smallint|int|mediumint|bigint|float|double|decimal|varchar|char|text|mediumtext|longtext|datetime|time|date|enum|set|blob|bool|boolean)?/)
    if (i == 0) {   // 第一个字段为数据表名称
      if (field && field[1] != undefined && field[2] == undefined) {
        var tbName = titleCase(field[1])
        structResult += tbName + ' {'
        continue
      } else {
        return ''
      }
    } else {  // 数据表字段
      if (field && field[1] != undefined && field[2] != undefined) {
        if (typeMap[field[2]] != undefined) {
          var fieldName = titleCase(field[1])
          console.log(JSON.stringify(field))
          console.log(res[i])
          var fieldType = typeMap[field[2]]
          var fieldJsonName = field[1].toLowerCase()
          if (fieldName.toLowerCase() == 'id') {
            fieldName = 'ID'
          }
          let nullable = true;
          if (res[i].toLowerCase().indexOf("not null") >= 0) {
            nullable = false;
          }
          if (nullable) {
            fieldType=`Option<${fieldType}>`
          }
          structResult += '\n\tpub ' + fieldName + ': ' + fieldType + ', '
        } else {
          continue
        }
      } else {
        continue
      }
    }
  }
  structResult += '\n}'
  return structResult
}

// 首字母大写
function titleCase(str: string) {

  var array = str.toLowerCase().split("_");
  for (var i = 0; i < array.length; i++) {
    array[i] = array[i][0].toUpperCase() + array[i].substring(1, array[i].length);
  }
  var string = array.join("");

  return string;
}
