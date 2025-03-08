<template>
    <div class="tomato">
        🍅 ✕ {{ count }}
        <div id="timer" v-loadings="isLoading">{{ time }}</div>
        <div id="element">
            <el-button circle :disabled="beginDisable" type="success" @click="pomo('begin')"><i class="el-icon-video-play"></i> </el-button>&nbsp;&nbsp;
            <el-button circle :disabled="pauseDisable" type="warning" @click="pomo('pause')"><i class="el-icon-video-pause"></i></el-button>&nbsp;&nbsp;
            <el-button circle :disabled="stopDisable" type="danger" @click="pomo('stop')"><i class="el-icon-refresh-right"></i></el-button>&nbsp;&nbsp;
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                show: "",
                timer: "",
                time: "25:00",
                timeLeft: 1500,
                beginDisable: false,
                pauseDisable: true,
                stopDisable: true,
                count: 0,
                isLoading: false,
            }
        },
        methods: {
            pomo(type) {
                switch (type) {
                    case "begin":
                        this.isLoading = true
                        setTimeout(() => (this.isLoading = false), 300)
                        this.pauseDisable = false
                        this.stopDisable = false
                        this.beginDisable = true
                        this.timer = setInterval(() => {
                            var minutes = Math.floor(this.timeLeft / 60)
                            var seconds = this.timeLeft - minutes * 60
                            var formattedTime = (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds
                            this.time = formattedTime
                            this.timeLeft--
                            if (this.timeLeft < 0) {
                                this.count++
                                window.localStorage.setItem("pomoStore", JSON.stringify({ count: this.count }))
                                clearInterval(this.timer)
                                this.timeLeft = 1500
                                this.time = "25:00"
                                this.beginDisable = false
                                this.pauseDisable = true
                                this.stopDisable = true
                            }
                        }, 1000)
                        break
                    case "pause":
                        this.beginDisable = false
                        this.pauseDisable = true
                        window.clearInterval(this.timer)
                        break
                    case "stop":
                        this.beginDisable = false
                        this.pauseDisable = true
                        this.stopDisable = true
                        window.clearInterval(this.timer)
                        this.timeLeft = 1500
                        this.time = "25:00"
                        break
                }
            },
        },
        created() {
            this.count = window.localStorage.getItem("pomoStore") ? JSON.parse(window.localStorage.getItem("pomoStore")).count : 0
            this.timeLeft = window.localStorage.getItem("pomoStore") ? JSON.parse(window.localStorage.getItem("pomoStore")).timeLeft : 1500
            this.time = window.localStorage.getItem("pomoStore") ? JSON.parse(window.localStorage.getItem("pomoStore")).time : "25:00"
        },
        beforeDestroy() {
            window.localStorage.setItem("pomoStore", JSON.stringify({ time: this.time, timeLeft: this.timeLeft, count: this.count }))
        },
    }
</script>
<style scoped>
    #timer {
        display: flex;
        height: 70vh;
        justify-content: center;
        align-items: center;
        font-size: 8rem;
    }
</style>
>
