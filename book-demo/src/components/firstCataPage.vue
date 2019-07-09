<template>
    <div class="firstPage">
        <div class="bookImg"></div>
        <div class="oneLevel">
            <div class="oneLevelList">
                <div class="oneChapterItem " :class="{active:active === index}" v-on:click="$emit('gotoSecond',index)" v-for="(chapter,index) in firstPageData" @touchstart = 'handleActive(index)' @touchend = 'handleActive(index)'>
                    <span class="oneName">{{chapter.getName()}}</span><br>
                    <span class="studyPath">上次学习到 <span class="studyPathContent">高级>模拟试题（一）</span></span>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .firstPage{
        font-size: .16rem;
        margin-top: .4rem;
        .oneLevel{
            padding: 0 .15rem;
            margin-top: .2rem;
        }
        .oneChapterItem{
            background: #ffffff;
            margin-bottom: .12rem;
            border-radius: .04rem;
            border: .01rem solid #eee;
            padding: .18rem .14rem;
        }
        .bookImg{
            width: 100%;
            height: 1.8rem;
            background: url("../assets/images/book-img.png") no-repeat center;
            background-size:100% 1.8rem;
        }
        .oneName{
            font-size: .18rem;
            color: #000;
        }
        .studyPath{
            font-size: .14rem;
            .studyPathContent{
                color: #11a4ff;
            }
        }
        .active{
            background: #333333;
        }
    }

</style>
<script>
    export default {
        name:"firstCataPage",
        props:{
            firstPageData:Array
        },
        data(){
          return {
              active:null
          }
        },
        methods:{
            handleActive(inx){
                typeof  this.active === 'number' ? this.active = null : this.active = inx;
            },
        },

    }
</script>
