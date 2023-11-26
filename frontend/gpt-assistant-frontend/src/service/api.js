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

    getAssistantFiles(id) {
        return new Promise((resolve, reject) => {
            http.get(`/files/list?assistantid=${id}`).then(response => {
                console.log(response)
                resolve(response.data);
            }).catch(err =>{
                reject(err.data)   
            });
        });
    }

    getThreadData(threadid) {
        return new Promise((resolve, reject) => {
            http.get(`/threads/getMessageList?threadid=${threadid}`).then(response => {
                console.log(response)
                resolve(response.data);
            }).catch(err =>{
                reject(err.data)   
            });
        });
    }

    submitMsg(content,threadid) {
        return new Promise((resolve, reject) => {
            http.post(`/threads/submitMessage`,{threadid:threadid,content:content}).then(response => {
                console.log(response)
                resolve(response.data);
            }).catch(err =>{
                reject(err.data)   
            });
        });
    }

    runThread(assistantid,threadid) {
        return new Promise((resolve, reject) => {
            http.post(`/threads/runThread`,{assistantid:assistantid,threadid:threadid}).then(response => {
                console.log(response)
                resolve(response.data);
            }).catch(err =>{
                reject(err.data)   
            });
        });
    }

    getRunStatus(threadid,runid) {
        return new Promise((resolve, reject) => {
            http.get(`/threads/getRunStatus?threadid=${threadid}&runid=${runid}`).then(response => {
                console.log(response)
                resolve(response.data);
            }).catch(err =>{
                reject(err.data)   
            });
        });
    }
}
export default new GPTService();