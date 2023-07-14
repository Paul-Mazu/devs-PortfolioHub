export const setToken = (userToken) => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
};