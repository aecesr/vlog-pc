<template>
  <div class="footer-bg mt-6">
    <v-row justify="center" align="center">
      <v-col cols="12" md="12">
        [表情] 2019-2022 InfinityX7. 版权所有 站点总字数: 287.5k
      </v-col>
      <v-col cols="12" md="12">
        本站已运行 3 年 195 天 22 小时 21 分钟 56 秒
      </v-col>
      <v-col cols="12" md="12">
        本站总访问量 236895 人次, 访客数 283056 人
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'MyFooter'
}
</script>

<style scoped>
.footer-bg {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  background-color: #ee6e73;
  background-image: linear-gradient(to right, #fff 0%, #0f9d58 100%);
  opacity: 1;
  display: none;
  text-align: center;
  color: #fff;
}
</style>
