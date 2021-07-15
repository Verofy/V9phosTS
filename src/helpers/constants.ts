export const method = {
  POST:"POST",
  GET:"GET"
};

export const end = {
  userCheck:'/auth/user-check',
  userLogin:'/auth/login',
  createToken(c:string){return '/customers/'+c+'/android-pay/token'}
}