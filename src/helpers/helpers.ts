export function handleValue(val:any){
    if(val==null){
        return false;
    } else return val;
}

export function handleRes(r:any){
    var result = Object.assign({}, r)
    return result;
}