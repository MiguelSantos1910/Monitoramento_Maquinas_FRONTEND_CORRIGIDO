import axios from "axios";
const api = axios.create({
    baseURL:['https://monitoramento-maquinas-backend-corrigido.onrender.com/api', 'http://localhost:3000'];
});

export default api;



