import axios from "axios";

const sendEmail = (data) =>axios.post('/api/send', data);


export default{
    sendEmail
}