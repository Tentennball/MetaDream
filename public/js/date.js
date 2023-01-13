let now = new Date();
let year = now.getFullYear();
let month = now.getMonth() + 1;	
let date = now.getDate();
let todayToString = (year*10000+month*100+date).toString();

let today = todayToString.slice(0,4) + '.' + todayToString.slice(4, 6) + '.' + todayToString.slice(6,8);

exports.today = today;