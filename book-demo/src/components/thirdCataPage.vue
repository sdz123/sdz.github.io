<template>
    <div class="thirdPage">
        <p>{{ secondPageDataContent.name }}</p>
        <div v-if="thirdPageData.length">
            <span v-for="(item,index) in thirdPageData" :class = "{active:active === index}"  @touchstart="activeHandle(index)" @touchend="activeHandle(index)">{{ item.name }}</span>
        </div>
        <div v-else>
            <span :class="{active}"  @touchstart="activeHandle(1)"  @touchend="activeHandle(1)">进入</span>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .thirdPage{
        font-size: .16rem;
        width: 1.55rem;
        background: white;
        margin-top: .2rem;
        padding: 0 0 .2rem 0;
        text-align: center;
        border-radius: .03rem;
        height: 1.5rem;
        p{
            margin-top: 0.15rem;
        }
        span{
            display: inline-block;
            width: 1.2rem;
            height: .25rem;
            border: .01rem solid #50bcff;
            text-align: center;
            border-radius: .25rem;
            line-height: .25rem;
            margin-top: .1rem;

        }
        .active{
            background: #50bcff;
        }
    }
    .thirdPage:nth-child(odd){
        float: left;
    }
    .thirdPage:nth-child(even){
        float: right;
    }
    .isSpcialTrain>.thirdLeveContent{
        .thirdPage{
            position: relative;
            span{
                position: absolute;
                top:40%;
                left: 11%;
            }
        }

    }
</style>
<script>
    export default{
        name:"thirdCataPage",
        props:{
            secondPageDataContent:Object
        },
        data(){
            return{
                thirdPageData:this.secondPageDataContent.getChildren(),
                active:null
            }
        },
        methods:{
            activeHandle(inx){
                typeof  this.active === 'number' ? this.active = null : this.active = inx;
            }
        },
        watch:{
            secondPageDataContent(newval){
                this.thirdPageData = newval.getChildren();
            }
        }
    }
</script>
