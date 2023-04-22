import axios from "axios";
import { serverIp } from "config";
axios.defaults.baseURL = serverIp;
export default axios;
