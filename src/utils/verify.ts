const regList = {
    //账号 6位以上
    name: /[a-zA-Z0-9]{6,}/,
    //密码 6位以上密码
    password: /\S{6,}/,
    //手机号 11位 以1开头 第二位3-9
    phone: /^1[3-9]\d{9}$/,
    //邮箱
    email: /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/
}

//验证 账号
export const verifyName = (arg: string) => {
    return regList.name.test(arg)
}

//验证 密码
export const verifyPassword = (arg: string) => {
    return regList.password.test(arg)
}

//验证手机号
export const verifyPhone = (arg: string) => {
    return regList.phone.test(arg)
}

//验证邮箱
export const verifyEmail = (arg: string) => {
    return regList.email.test(arg)
}
