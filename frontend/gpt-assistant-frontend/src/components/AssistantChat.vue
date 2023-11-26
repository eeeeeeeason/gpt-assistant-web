<template>
    <div class="assistantContainer">
        <div class="sideBar">
          <div class="assistantHeader">
            <div class="assistantName">Name:{{assistantData.name}}</div>
            <div class="assistantId">id:{{assistantData.id}}</div>
          </div>
          <div class="assistantInstructions mt20">
            <div class="title">Instructions:</div>
            <div class="assistantInstructionsContent dataContent">{{assistantData.instructions}}</div>
          </div>
          <div class="assistantModel mt20">
            <div class="title">Model:</div>
            <div class="assistantModelContent dataContent">{{assistantData.model}}</div>
          </div>
          <div class="title mt20">文件列表:</div>
          <div class="fileList dataContent">
              <div class="fileItem" v-for="item in assistantData.files" :key="item.id">
                  <div class="fileName"><label>filename:</label>{{item.filename}}</div>
                  <!-- <div class="fileSize"><label>fileid:</label>{{item.id}}</div> -->
              </div>
          </div>
          <button class="uploadFile">上传文件</button>
        </div>
        <div class="msgContent">
            <div class="title">THREAD {{assistantData.threadId}}</div>
            <div class="msgList">
                <div class="msgItem" v-for="msgItem in threadMsgs.list" :key="msgItem.id">
                    <span class="msgItemName">{{msgItem.role}}:</span>
                    <div class="msgItemWrapper" v-if="msgItem">
                        <p class="msgItemContent" v-for="(textItem,ind) in msgItem.content"  :key="ind">
                            <span>{{textItem.text.value}}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="inputArea">
                <textarea placeholder="请输入..." @keydown.enter="submitMsg" v-model="inputVal"></textarea>
            </div>
        </div>
    </div>
</template>
<script>
import { onMounted, ref, reactive, provide, watch, nextTick, inject } from 'vue'
import GPTServer from '../service/api'
export default {
    setup() {
        const assistantData = reactive({
            id: "asst_62jLpzNk17ABl3QExtBbbi8T",
            name: "",
            instructions:"",
            file_ids:[],
            model:"",
            tool:"",// TODO:
            threadId: "thread_BWBdev24kJnItJ2f16evnFSb"
        })
        const inputVal = ref("")
        const threadMsgs = reactive({list:[]})
        onMounted(() => {
            console.log('Component is mounted!')
            getGPTAssistant("asst_62jLpzNk17ABl3QExtBbbi8T")
            getThreadData("thread_BWBdev24kJnItJ2f16evnFSb")
        })
        
        const getGPTAssistant = (id) => {
            console.log(GPTServer.getAssistantInfo);
            GPTServer.getAssistantInfo(id).then(res => {
                console.log(res)
                Object.assign(assistantData, res);
                getAssistantFiles(id)
            })
        }

        const getAssistantFiles = (id) => {
            GPTServer.getAssistantFiles(id).then(res => {
                console.log(res)
                assistantData.files = res.data
                Object.assign(assistantData, {});
                // Object.assign(assistantData, res);
            })
        }

        const getThreadData = (id) => {
            GPTServer.getThreadData(id).then(res => {
                console.log(res)
                threadMsgs.list = res.reverse()
                Object.assign(threadMsgs, {});
            })
        }

        const submitMsg = () => {
            console.log(inputVal.value)
            GPTServer.submitMsg(inputVal.value, assistantData.threadId).then(res => {
                console.log(res)
                // getThreadData("thread_BWBdev24kJnItJ2f16evnFSb")
                threadMsgs.list.push({
                  role:"user",
                  content: [{text: {value: inputVal.value}}]
                })
                runThread()
                inputVal.value = ""
            })
        }

        const runThread = () => {
            GPTServer.runThread(assistantData.id,assistantData.threadId).then(res => {
                console.log(res)
                console.log("获取runid");
                threadMsgs.list.push({
                  role:"assistant",
                  content: [{text: {value: "准备运行，请稍后..."}}]
                })
                setTimeout(() => {
                  getRunStatus(res.id)
                }, 3000);
            })
        }
        const getRunStatus = (runid) => {
            GPTServer.getRunStatus(assistantData.threadId,runid).then(res => {
                console.log(res)
                if (res.status !== 'completed') {
                    timer = setTimeout(() => {
                      getRunStatus(runid)
                    }, 3000);
                } else {
                    getThreadData(assistantData.threadId)
                }
            })
        }

        return {
            assistantData,
            msg: 'Welcome to Your Vue.js + TypeScript App',
            threadMsgs,
            inputVal,
            submitMsg
        }
    }
    
}
</script>
<style lang="less">
.assistantContainer{
  display: flex;
  justify-content: space-between;

  .sideBar{
    padding: 0 10px;
    height: 100vh;
    width: 300px;
    border-right: 1px solid #ccc;
    text-align: left;
    .assistantHeader{
      padding: 10px 0px;
      border-bottom: 1px solid #ccc;
      font-weight: bold;
      height: 70px;
      box-sizing: border-box;
    }
    .title{
      font-weight: bold;
    }
    .dataContent{
      width: 100%;
      
      margin-top: 10px;
      .fileItem{
        padding: 4px;
        border: 1px solid #ccc;
        border-radius: 3px;
        box-sizing: border-box;
        label{
          width: 90px;
          display: inline-block;
        }
      }
    }
    .mt20{
      margin-top: 20px;
    }
  }
  .msgContent{
    padding:0 10px;
    position: relative;
    width: 100%;
    box-sizing: border-box;
    .title{
      font-weight: bold;
      padding:0 10px;
      height: 70px;
      line-height: 70px;
      border-bottom: 1px solid #ccc;
      text-align: left;
    }
    .msgList{
      padding: 10px;
      height: calc(100vh - 70px - 200px);
      overflow-y: scroll;
      .msgItem{
        padding: 10px 10px;
        text-align: left;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-bottom: 10px;
        .msgItemName{
        }
      }
    }
    .inputArea{
      height: 140px;
      position: absolute;
      bottom: 10px;
      width: 90%;
      left: 50%;
      transform: translateX(-50%);
      box-shadow: 0 8px 24px hsla(210,8%,62%,.2);
      textarea{
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        border-radius: 12px;
        padding: 10px;
        box-sizing: border-box;
        resize: none;
      }
    }
  }

}
</style>