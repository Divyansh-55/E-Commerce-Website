import axios from "axios";


const params = {
    headers: {
        Authorization:  process.env.REACT_APP_STRIPE_APP_KEY,
    },
};

export const fetchDataFromApi=async(url)=>{
try{
    const {data}=await axios.get(
        process.env.REACT_APP_DEV_URL+url , 
        params  
    ); 
    return data;
    // console.log(data);
} 
catch(err){ 
    console.log(err);
    return err; 
}
};

export const makePaymentRequest = axios.create({
    baseURL: process.env.REACT_APP_DEV_URL,
    headers: {
        Authorization: process.env.REACT_APP_STRIPE_APP_KEY,
    },
});
     