import axios from "axios";
export async function getData(town){
    const res = await axios.get(`${process.env.REACT_APP_APPSTR}q=${town}&appid=${process.env.REACT_APP_APPID}`);
    return res;
}