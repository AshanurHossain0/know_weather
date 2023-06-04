import axios from "axios";
const urlStr="https://api.openweathermap.org/data/2.5/weather?"
const appId="f0ab79c947c667efe46f7cf0d4d9bb2e"
export async function getData(town){
    const res = await axios.get(`${urlStr}q=${town}&appid=${appId}`);
    return res;
}