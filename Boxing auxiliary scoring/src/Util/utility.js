const utility = {
    myFetch: async (
        method,
        url,
        body,
        jwtToken,
        contentType = "application/json"
    ) => {
        let options = {
            method: method,
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                "Content-Type": contentType,
            },
        };
        if (method !== "GET") {
            options = {
                ...options,
                body: JSON.stringify(body),
            };
        }
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
};

export default utility;
