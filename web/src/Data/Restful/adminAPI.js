/* eslint-disable no-unused-vars */
import utility from "./../../Util/utility";

const BASE_URL = `${import.meta.env.BASE_URL}/api`;
const myFetch = utility.myFetch;

// 9 APIs
const adminAPI = {
    // 取得所有使用者
    getAllUsers: async (jwtToken) => {
        const url = `${BASE_URL}/admin/users`;
        const result = await myFetch("GET", url, {}, jwtToken);
        return result;
    },
    // 透過 Email 取得使用者資料
    getUserByEmail: async (jwtToken, email) => {
        const url = `${BASE_URL}/admin/users?email=${email}`;
        const result = await myFetch("GET", url, {}, jwtToken);
        return result;
    },
    // 取得所有菜單
    getAllMenu: async (jwtToken) => {
        const url = `${BASE_URL}/admin/menu`;
        const result = await myFetch("GET", url, {}, jwtToken);
        return result;
    },
    // 取得所有訂單
    getAllOrder: async (jwtToken) => {
        const url = `${BASE_URL}/admin/orders`;
        const result = await myFetch("GET", url, {}, jwtToken);
        return result;
    },
    // 透過 ID 取得訂單
    getOrderItems: async (jwtToken, id) => {
        const url = `${BASE_URL}/admin/orders/${id}`;
        const result = await myFetch("GET", url, {}, jwtToken);
        return result;
    },
    // 透過時間區間取得訂單
    getOrderItemsByTimeBetween: async (jwtToken, startTime, endTime) => {
        const url = `${BASE_URL}/admin/orders?startTime=${startTime}&endTime=${endTime}`;
        const result = await myFetch("GET", url, {}, jwtToken);
        return result;
    },
    // 新增菜單項目
    addMenuItem: async (jwtToken, name, price) => {
        const url = `${BASE_URL}/admin/menu`;
        const body = { name, price };
        const result = await myFetch("POST", url, body, jwtToken);
        return result;
    },
    // 更新菜單項目
    updateMenuItem: async (jwtToken, id, name, price) => {
        const url = `${BASE_URL}/admin/menu/${id}`;
        const body = { name, price };
        const result = await myFetch("PUT", url, body, jwtToken);
        return result;
    },
    // 刪除菜單項目
    deleteMenuItem: async (jwtToken, id) => {
        const url = `${BASE_URL}/admin/menu/${id}`;
        const result = await myFetch("DELETE", url, {}, jwtToken);
        return result;
    },
};

export default adminAPI;
