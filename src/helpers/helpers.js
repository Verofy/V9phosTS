export function handleValue(val){
    if(val==null){
        return false;
    } else return val;
}

export function handleRes(r){
    var result = Object.assign({}, r)
    return result;
}