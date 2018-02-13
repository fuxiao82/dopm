import axios from 'axios'

const host = 'http://192.168.31.65:8081'
const defaultParam = {}
const SUCCESS_CODE = 200
const ALERT_CODE = 501


export function restAjax(options) {
  const handleUrl = host + options.url;
  const handleParam = Object.assign({}, defaultParam, options.data)


  return new Promise(resolve => {
    axios.post(handleUrl, _handleParams(handleParam)).then(res => {
      if (res.data.code === SUCCESS_CODE) {
        resolve(res.data.data)
      } else if(res.data.code === ALERT_CODE){
        alert(res.data.msg)
      }
    }).catch(error => {
      console.log(handleUrl + ':' + error)
    })
  })
}

/* 处理参数为 key=value&key=value */
function _handleParams(param) {
  let params = new URLSearchParams()
  for (var key in param) {
    params.append(key, param[key])
  }
  return params
}
