<template>
  <v-app id="app">
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-btn class="mx-2" fab dark large elevation="12" color="red" fixed bottom right v-if="show" @click="backToTop">
      <v-icon dark> mdi-arrow-up </v-icon>
    </v-btn>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      show: false,
      scrollTop: '',
    }
  },
  created() {},
  mounted() {
    //页面产生滚动才触发监听
    this.$nextTick(() => {
      window.addEventListener('scroll', this.scrollToTop)
    })
  },
  methods: {
    //计算距离顶部的高度，当高度大于400则显示图标，否贼隐藏图标
    scrollToTop() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.scrollTop = scrollTop
      // console.log(this.scrollTop)
      this.show = scrollTop > 400
    },
    //回到顶部，定时器，平缓过度
    backToTop() {
      let time = setInterval(() => {
        let speed = Math.floor(-this.scrollTop / 5)
        document.documentElement.scrollTop = this.scrollTop + speed
        if(this.scrollTop===0){
          clearInterval(time)
        }
      }, 100)

    },
  },
}
</script>
<style lang="scss">
a{
  text-decoration: none;
}
.move {
  animation-duration: 0.6s;
  animation-delay: 0.2s;
}
.bg-color {
  opacity: 0.4;
  background-image: linear-gradient(to right, rgba(140, 204, 243, 0.88), #6dd5fa);
}
</style>
