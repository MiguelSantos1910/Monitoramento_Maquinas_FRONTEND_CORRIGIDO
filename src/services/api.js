import axios from "axios";
const api = axios.create({
    baseURL:['https://monitoramento-maquinas-backend-corrigido.onrender.com/api'];
});

export default api;




