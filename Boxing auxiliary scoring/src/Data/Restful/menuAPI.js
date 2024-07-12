/* eslint-disable no-unused-vars */
import utility from "./../../Util/utility";

const BASE_URL = `${import.meta.env.BASE_URL}/api`;
const myFetch = utility.myFetch;

// 5 APIs
const menuAPI = {
    // 取得所有菜單
    getAllMenu: async () => {
        const url = `${BASE_URL}/menu`;
        const result = await myFetch("GET", url, {});
        return result;
    },
    // 透過 ID 取得菜單
    getMenuById: async (jwtToken, id) => {
        const url = `${BASE_URL}/menu/${id}`;
        const result = await myFetch("GET", url, {}, jwtToken);
        return result;
    },
    // 新增菜單項目
    addMenuItem: async (jwtToken, name, price) => {
        const url = `${BASE_URL}/menu`;
        const body = { name, price };
        const result = await myFetch("POST", url, body, jwtToken);
        return result;
    },
    // 更新菜單項目
    updateMenuItem: async (jwtToken, id, name, price) => {
        const url = `${BASE_URL}/menu/${id}`;
        const body = { name, price };
        const result = await myFetch("PUT", url, body, jwtToken);
        return result;
    },
    // 刪除菜單項目
    deleteMenuItem: async (jwtToken, id) => {
        const url = `${BASE_URL}/menu/${id}`;
        const result = await myFetch("DELETE", url, {}, jwtToken);
        return result;
    },
};

export default menuAPI;
