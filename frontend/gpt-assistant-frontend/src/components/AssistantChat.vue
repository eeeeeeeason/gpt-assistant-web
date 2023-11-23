<template>
    <div class="assistantContainer">
        <div class="assistantHeader">
            <div class="assistantId"></div>
        </div>
        <div class="assistantMsg">
            <div class="msgList">
                <p class="msgItem">
                    <span class="msgText">Hello</span>
                </p>
            </div>
            <div class="inputArea">
                <input type="text">
                <div class="msgBtn"></div>
            </div>
        </div>
        <button class="uploadFile">上传文件</button>
        <div class="fileList">
            <div class="fileItem"></div>
        </div>
    </div>
</template>
<script>
import { onMounted, ref, reactive, provide, watch, nextTick, inject } from 'vue'
import GPTServer from '../service/api'
export default {
    setup() {
        onMounted(() => {
            console.log('Component is mounted!')
            getGPTAssistant("asst_62jLpzNk17ABl3QExtBbbi8T")
        })
        const getGPTAssistant = (id) => {
            console.log(GPTServer.getAssistantInfo);
            GPTServer.getAssistantInfo(id).then(res => {
                console.log(res)
            })
        }
        return {
            msg: 'Welcome to Your Vue.js + TypeScript App'
        }
    }
    
}
</script>