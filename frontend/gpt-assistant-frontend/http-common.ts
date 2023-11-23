import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus"; // 登录失效弹窗

const http = axios.create({
    baseURL: '/api',
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",    
      "Access-Control-Allow-Headers": "access-control-allow-origin, access-control-allow-credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization"
    }
});
export default http