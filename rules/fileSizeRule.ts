export default (min = 0, max = Infinity) => {
    const rule = (value: File) => {
      if (!value){
          return 'file is required'
      }
      if (value.size < min){
          return `file must be larger than ${min/1000000}mb`
      }
      if (value.size > max){
          return `file must be smaller than ${max/1000000}mb`
      }
      return true
    }
    return rule
}