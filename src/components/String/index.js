function getLenth (str) {
  if (str == null) return 0
  if (typeof str != "string") {
    str += ""
  }
  return str.replace(/[^\x00-\xff]/g, "01").length
}

function setSubString (str,n) {
  var strReg=/[^\x00-\xff]/g;
  var _str=str.replace(strReg,"**");
  var _len=_str.length;
  if(_len>n){
    var _newLen=Math.floor(n/2);
    var _strLen=str.length;
    for(var i=_newLen;i<_strLen;i++){
      var _newStr=str.substr(0,i).replace(strReg,"**");
      if(_newStr.length>=n){
        return str.substr(0,i)
        break
      }
    }
  }else{
    return str;
  }
}

export {
  getLenth,
  setSubString
}
