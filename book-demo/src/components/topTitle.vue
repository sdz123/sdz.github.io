<template>
    <div class="topTitle">
        <div class="backButton" @click="switchPage">
            <
        </div>
        <div class="bookName">
            <div class="nameContent">
                <div class="nameLoop">
                    <p>{{ bookName }}</p>
                    <p>{{ bookName }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"topTitle",
        props:{
            bookName:String
        },
        methods:{
            switchPage(){
                this.$emit('switchPage')
            }
        }
    }

</script>
<style scoped lang="scss">
    @keyframes loopName {
        0%  {margin-left:0rem}
        70% {margin-left: -1.88rem}
        80% {margin-left: -1.88rem}
        90% {margin-left: -1.88rem}
        100% {margin-left: -1.88rem}

    }
    .topTitle{
        height: 0.4rem;
        font-size: .16rem;
        box-shadow: 0 .005rem .005rem #888888;
        position: fixed;
        top: 0;
        width: 100%;
        background: rgb(239,239,239);
        .backButton{
            float: left;
            height: 100%;
            width: .3rem;
            line-height: .4rem;
        }
        .nameContent{
            width: 55%;
            height: .4rem;
            margin: auto;
            /*background: red;*/
            line-height: .4rem;
            overflow: hidden;
            .nameLoop{
                width: 200%;
                animation: loopName 8s 2s infinite linear;
            }
            p{
                float: left;
            }
            p:first-child{
                margin-left: 0.16rem;
            }
        }


    }

</style>
