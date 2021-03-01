export default(value: string) => {
    if ((value || '').length == 0) {
        return 'number required!'
    }
    else if( !/^[0-9]+$/.test(value || '') ){
        return 'a numeric value is required'
    }
    else{
        return true
    }
}