const VALUE_DELIMITER = ',';
const ROW_DELIMITER = '\n';

const getRow = (keys, item) => keys.map(k => removeNewLines(item[k])).join(VALUE_DELIMITER);

const removeNewLines = (value) => (typeof value === 'string')
  ? value.replace(/\n/g, ' ')
  : value;

export const convertToCsv = (data) => {
  if (!data || typeof data !== 'object') return '';
  const hasRows = Array.isArray(data);
  const keys = hasRows ? Object.keys(data[0]) : Object.keys(data);
  const rows = hasRows
    ? data.map(item => getRow(keys, item)).join(ROW_DELIMITER)
    : getRow(keys, data);
  return [keys.join(VALUE_DELIMITER), rows].join(ROW_DELIMITER);
}

class ConvertToCSV {

  objectToCSVRow = (dataObject) => {
    try {
      let dataArray = [];
      for (let o in dataObject) {
        let innerValue = typeof dataObject[o] == 'undefined' ? '' : dataObject[o].toString();
        let result = innerValue.replace(/"/g, '""');
        result = '"' + result + '"';
        dataArray.push(result);
      }
      return dataArray.join(',') + '\r\n';
    } catch (e) {
      console.log("objectToCSVRow: ", e)
    }

  }

  findByString = (o, s) => {
    try {
      s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
      s = s.replace(/^\./, ''); // strip a leading dot
      let a = s.split('.');
      for (let i = 0, n = a.length; i < n; ++i) {
        let k = a[i];
        if (o) {
          if (k in o) {
            o = o[k];
          } else {
            return;
          }
        } else {
          return;
        }
      }
      return o;
    } catch (e) {
      console.log("findByString: ", e)
    }

  }

  pushUnique = (arr, item) => {
    if (item != "" && !arr.includes(item))
      arr.push(item);
  }

  getLabels = (name, item, labels) => {
    try {
      if (typeof item == 'object') {
        for (let index in item) {
          let thisname = ""
          if (name != "") thisname = name + ".";
          thisname += index;
          this.getLabels(thisname, item[index], labels);
        }
      } else {
        this.pushUnique(labels, name);
      }
    } catch (e) {
      console.log("getLabels: ", e)
    }

  }

  convert = (objArray) => {
    try {
      let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
      let str = '';
      let labels = [];
      for (let i = 0; i < array.length; i++) {
        this.getLabels("", array[i], labels);
      }
      str += this.objectToCSVRow(labels);
      for (let i = 0; i < array.length; i++) {
        let line = [];
        for (let label in labels) {
          line.push(this.findByString(array[i], labels[label]));
        }
        str += this.objectToCSVRow(line);
      }
      return str;
    } catch (e) {
      console.log("convert: ", e)
    }

  }

}

export const convertToCSV = new ConvertToCSV()