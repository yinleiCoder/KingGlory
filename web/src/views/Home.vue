<template>
    <div>
      <swiper :options="swiperOption">
        <swiper-slide>
            <img class="w-100" src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg"/>
        </swiper-slide>
        <swiper-slide>
            <img class="w-100" src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg"/>
        </swiper-slide>
        <swiper-slide>
            <img class="w-100" src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg"/>
        </swiper-slide>
        <div class="swiper-pagination pagination-home px-3  pb-2 text-right" slot="pagination"></div>
      </swiper>
      <!-- end of swiper-->
      <div class="nav-icons bg-white mt-3  text-center pt-3 text-dark-1">
        <div class="d-flex flex-wrap">
          <div class="nav-item mb-3" v-for="n in 10" :key="n">
            <i class="sprite sprite-news"></i>
            <div class="py-2">爆料站</div>
          </div>
        </div>
        <div class="bg-light py-2 fs-sm">
          <i class="sprite sprite-arrow mr-1"></i>
          <span>收起</span>
        </div>
      </div>

      <!-- end of nav icons-->
      <m-list-card icon="menu-1" title="新闻资讯" :categories="newsCats">
      <!-- 这里的#items是2.6新语法，可以拿到具名插slot里动态绑定的变量-->
        <template #items="{category}">
          <router-link
          tag="div"
          :to="`/articles/${news._id}`"
          class="py-2 fs-lg d-flex" v-for="(news,i) in category.newsList" :key="i">
                  <span class="text-info">[{{news.categoryName}}]</span>
                  <span class="px-2">|</span>
                  <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
                  <span class="text-grey-1 fs-sm">{{news.createdAt | date}}</span>
          </router-link>
        </template>
      </m-list-card>

      <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
      <!-- 这里的#items是2.6新语法，可以拿到具名插slot里动态绑定的变量-->
        <template #items="{category}">
          <div class="d-flex flex-wrap " style="margin: 0 -0.5rem;"
          >
            <router-link tag="div" class="p-2 text-center" 
            style="width: 20%;"
            v-for="(hero,i) in category.heroList" :key="i"
            :to="`heroes/${hero._id}`">
                  <img class="w-100" :src="hero.avatar">
                  <div>{{hero.name}}</div>
            </router-link>
          </div>
        </template>
      </m-list-card>
      
    </div>
</template>
<script>
import dayjs from 'dayjs'
export default {
    filters: {//使用dayjs
      date(val){
        return dayjs(val).format('MM/DD')
      }
    },
    data(){
      return {
        swiperOption: {
          pagination: {
            el: '.pagination-home'
          }
        },
        newsCats: [],
        heroCats: [],
        // newsCats: [
        //   {
        //     name: "热门",
        //     // eslint-disable-next-line no-unused-vars
        //     newsList: new Array(5).fill(1).map(v =>({
        //       categoryName: '公告',
        //       title: '3月3日全服不停机更新公告',
        //       date: '03/06'
        //     }))
        //   },
        //   {
        //     name: "新闻",
        //     // eslint-disable-next-line no-unused-vars
        //     newsList: new Array(5).fill(1).map(v =>({
        //       categoryName: '新闻',
        //       title: '体验服爆料丨全新玩法万镜觉醒，爽快翻5倍！',
        //       date: '03/06'
        //     }))
        //   },
        //   {
        //     name: "新闻",
        //     // eslint-disable-next-line no-unused-vars
        //     newsList: new Array(5).fill(1).map(v =>({
        //       categoryName: '新闻',
        //       title: '体验服爆料丨全新玩法万镜觉醒，爽快翻5倍！',
        //       date: '03/06'
        //     }))
        //   },
        //   {
        //     name: "新闻",
        //     // eslint-disable-next-line no-unused-vars
        //     newsList: new Array(5).fill(1).map(v =>({
        //       categoryName: '新闻',
        //       title: '体验服爆料丨全新玩法万镜觉醒，爽快翻5倍！',
        //       date: '03/06'
        //     }))
        //   },
        //   {
        //     name: "新闻",
        //     // eslint-disable-next-line no-unused-vars
        //     newsList: new Array(5).fill(1).map(v =>({
        //       categoryName: '新闻',
        //       title: '体验服爆料丨全新玩法万镜觉醒，爽快翻5倍！',
        //       date: '03/06'
        //     }))
        //   },
        // ]
      }
    },
    methods: {
      async fetchNewsCats(){
          const res = await this.$http.get('news/list')
          this.newsCats = res.data
      },
      async fetchHeroCats(){
          const res = await this.$http.get('heroes/list')
          this.heroCats = res.data
      }
    },
    created() {
      this.fetchNewsCats()
      this.fetchHeroCats()
    },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';
.pagination-home{
  .swiper-pagination-bullet{
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors,"white");
    &.swiper-pagination-bullet-active{
      background: map-get($colors,"info");
    }
  }
}

.nav-icons {

  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n){
      border-right: none;
    }
  }
}
</style>