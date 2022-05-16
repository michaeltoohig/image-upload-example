export const getLocalUser = () => localStorage.getItem('user');

export const saveLocalUser = (user) => localStorage.setItem('user', JSON.stringify(user));

export const removeLocalUser = () => localStorage.removeItem('user');
