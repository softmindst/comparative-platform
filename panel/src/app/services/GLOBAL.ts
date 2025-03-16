import { environment } from "src/environments/environment.prod";

let today = new Date();
let day :any = today.getDate();
let month :any = today.getMonth()+1;
let year = today.getFullYear();

if(day<=9){
    day = '0'+day;
}

if(month<=9){
    month = '0'+month;
}


let str_today = year + '-' + month + '-'+day;

export const GLOBAL = {
    url: environment.URL_BACKEND,
    str_today: str_today
}