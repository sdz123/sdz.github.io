<template>
  <div id="app">
      <topTitle v-bind:bookName='bookName' v-on:switchPage="swichPage"/>
      <firstCataPage v-show= "pageIsShow" v-on:gotoSecond="gotoSecond" v-bind:firstPageData='firstPageData'/>
      <secondCataPage v-show= "!pageIsShow" v-bind:secondPageData='secondPageData'/>
  </div>
</template>

<script>
import topTitle from './components/topTitle.vue';
import firstCataPage from './components/firstCataPage.vue';
import secondCataPage from './components/secondCataPage.vue';
import axios from 'axios';
import handle from './handleData';
document.documentElement.style.fontSize = window.innerWidth/360*100 + "px";
export default {
  name: 'app',
    data(){
      return {
          pageIsShow:true,
          bookName: "",
          firstPageData:null,
          secondPageData:null
      }
    },
  components: {
      topTitle,
      firstCataPage,
      secondCataPage
  },
    mounted(){
      this.getData();
    },
    methods:{
        getData(){
            let that = this;
            axios.get('data/fakeBookCatalogData.json').then(function(response){
                let bookInstance = handle(response.data);
                that.bookName = bookInstance.getName();
                that.firstPageData = bookInstance.getChildren().filter(chapter => {return (chapter.getName() !== "纠音" && chapter.getName() !== '诊断测试')})
            });
        },
        gotoSecond(index){
            this.secondPageData = this.firstPageData[index];
            this.pageIsShow = !this.pageIsShow;
        },
        swichPage(){
          this.pageIsShow?alert('确认退出吗？') :this.pageIsShow = !this.pageIsShow;
        }
    }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: rgb(239,239,239);
  padding-bottom: .12rem;
  overflow: hidden;
}
</style>
