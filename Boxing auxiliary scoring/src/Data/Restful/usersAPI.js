/* eslint-disable no-unused-vars */
import utility from "../../Util/utility";

const BASE_URL = `${import.meta.env.VITE_URL}/api`;
const myFetch = utility.myFetch;

// 5 APIs
const usersAPI = {
    // 透過 Email 取得使用者資料
    getUserByEmail: async (email) => {
        const url = `${BASE_URL}/users/getuser3`;
        const body = {email}
        const result = await myFetch("POST", url, body);
        return result;
    },
    // 寄送驗證信
    sendVerificationEmail: async (email) => {
        const url = `${BASE_URL}/users/verification`;
        const body = { email };
        const result = await myFetch("POST", url, body);
        return result;
    },
    // 登入
    login: async (email, password) => {
        const url = `${BASE_URL}/users/login`;
        const body = { email, password };
        const result = await myFetch("POST", url, body);
        return result;
    },
    login_admin: async (email, password) => {
        const url = `${BASE_URL}/users/login_admin`;
        const body = { email, password };
        const result = await myFetch("POST", url, body);
        return result;
    },
    login_shop: async (email, password) => {
        const url = `${BASE_URL}/users/login_shop`;
        const body = { email, password };
        const result = await myFetch("POST", url, body);
        return result;
    },
    // 註冊
    register: async (body) => {
        const url = `${BASE_URL}/users/register`;
        const result = await myFetch("POST", url, body);
        return result;
    },
    register1: async (body) => {
        const url = `${BASE_URL}/users/register1`;
        const result = await myFetch("POST", url, body);
        return result;
    },
    // 更新使用者資料
    updateUser: async (email, password, name, phone) => {
        const url = `${BASE_URL}/users/update`;
        const body = { email, password, name, phone };
        const result = await myFetch("PUT", url, body);
        return result;
    },
};

export default usersAPI;
