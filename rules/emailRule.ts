export default (value: string) => {
  if ((value || '').length == 0) {
    return 'Email required!'
  } 
  else if ((!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value || ''))) {
    return 'invalid email'
  } else {
    return true
  }
}
