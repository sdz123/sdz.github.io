<template>
    <div :class="{secondPage,isMicroSkill,isSpcialTrain}">
        <div class="twoLevel">
            <div :class="{active:index == active}" class="twoLevelItem" @touchstart = "switchTab(index)" v-for="(item,index) in titleData">{{ item.getName() }}</div>
        </div>
        <div class="thirdLeveContent">
            <thirdCataPage :secondPageDataContent="item" v-for="item in secondPageDataContent"/>
        </div>
    </div>
</template>
<script>
    import thirdCataPage from './thirdCataPage.vue'
    export default {
        name:'secondCataPage',
        props:{
            secondPageData:Object
        },
        components:{
            thirdCataPage
        },
        data(){
            return {
                titleData:null,
                secondPageDataContent:null,
                active:0,
                isMicroSkill:false,
                isSpcialTrain:false,
                secondPage:true
            }
        },
        methods:{
            switchTab(inx){
                this.active = inx;
                this.secondPageDataContent = this.titleData[inx].getChildren();

            }
        },
        watch:{
            secondPageData(newValue){
                this.titleData = newValue.getChildren();
                this.isMicroSkill = newValue.name === '微技能';
                this.isSpcialTrain = newValue.name === '专项训练';
                this.secondPage = !this.isMicroSkill;
                this.secondPageDataContent = this.titleData[0].getChildren();
            }
        }

    }
</script>
<style lang="scss" scoped>
    .secondPage{
        overflow: hidden;
        margin-top: .4rem;
        .twoLevel{
            display: flex;
            background: #ffffff;
            font-size: .16rem;
            padding: .1rem .1rem .07rem;
            border-bottom: .01rem solid #e9e9e9;
            border-top: .01rem solid #e7e7e7;
            position: fixed;
            width: 100%;
        }
        .twoLevelItem{
            flex-grow: 1;
            text-align: center;
        }
        .active{
            color: #11a4ff;
        }
        .active:after{
            width: 0.35rem;
            height: 0.02rem;
            background: #11a4ff;
            display: block;
            content: "";
            margin: .04rem auto 0;
        }
        .twoLevelContent{
            font-size: .16rem;
        }
        .thirdLeveContent{
            overflow: hidden;
            padding: 0 .15rem;
            margin-top: .45rem;
        }
    }
    .isMicroSkill{
        overflow: hidden;
        margin-top: .4rem;
        .twoLevel{
            height: .9rem;
            position: fixed;
            background: #ffffff;
        }
        .twoLevelItem{
            float: left;
            text-align: center;
            font-size: .14rem;
            height: .3rem;
            border-radius: .14rem;
            line-height: .3rem;
            color: #333;
            background-color: #f2f2f2;
            margin-left: .1rem;
            margin-top: .1rem;
            padding-left: .1rem;
            padding-right: .1rem;
        }
        .active{
            background: #11a4ff;
            color: #ffffff;
        }
        .active:after{
            display: none;
        }
        .thirdLeveContent{
            overflow: hidden;
            padding: 0 .15rem;
            margin-top: .9rem;
        }
    }
</style>
