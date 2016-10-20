function isProd () {
  if (location.href.includes('.com')) {
    return true
  } else {
    return false
  }
}

function ageMap (value, option) {
  let age = []

  if(value.length == option.length || value.length == 0){
    age.push('0')
  }else{
    value.map(function(item){
      switch (item){
        case '0-3岁':
          age.push('225')
          break;
        case '3-5岁':
          age.push('226')
          break;
        case '7-9岁':
          age.push('227')
          break;
        case '9-12岁':
          age.push('229')
          break;
        case '12岁以上':
          age.push('228')
          break;
      }
    })
  }
  return age.join(',')
}

export {
  isProd,
  ageMap
}
