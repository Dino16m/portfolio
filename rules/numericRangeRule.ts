export default (min = 0, max = Infinity) => {
    const rule = (value: string) => {
      value = (value || '').toString()
      const num: number = parseInt(value)
      if (num < min){
          return `input must be greater than ${min}`
      }
      if (num > max){
          return `input must be less than ${max}`
      }
      return true
    }
    return rule
}