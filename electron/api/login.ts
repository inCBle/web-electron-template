import { LoginRequestParams } from "typings/login";

export const login = (data: LoginRequestParams) => {
  console.log(`请求参数：${JSON.stringify(data)}`);
  return { code: 200, data: { ...data, token: "123" }, msg: "登录成功" };
};
