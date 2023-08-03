export const setToken = (userToken) => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
};

export const destroyToken = () => {
    sessionStorage.removeItem('token');
};

export const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString)
    return userToken
};