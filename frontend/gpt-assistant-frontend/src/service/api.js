import http from "../../http-common";
class GPTService {
    getAssistantInfo(id) {
        return new Promise((resolve, reject) => {
            http.get(`/assistant/getDetail?id=${id}`).then(response => {
                console.log(response)
                resolve(response.data);
            }).catch(err =>{
                reject(err.data)   
            });
        });
    }
}
export default new GPTService();