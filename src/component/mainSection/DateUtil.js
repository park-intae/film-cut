export const dateFormat = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return { year, month, day };
};

export const timeFormat = (date) => {
    const hour = String(date.getHours()).padStart(2, '0');
    const minu = String(date.getMinutes()).padStart(2, '0');
    const sec = String(date.getSeconds()).padStart(2, '0');
    
    return { hour, minu, sec };
};