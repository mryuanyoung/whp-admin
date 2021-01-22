export const PAGELIMIT = 10;

const MENU = new Map();
MENU.set('/alarm', '1');
MENU.set('/entinfo', '2');
MENU.set('/entadmins', '3');
MENU.set('/chemicals', '4');
MENU.set('/entmembers', '5');
MENU.set('/transfer', '6');
MENU.set('/account', '7');

export {
    MENU
}

export const INVALID_LOGIN_MSG = '未登录或登录信息已过期';