<template>
  <div>
    <nav-bar></nav-bar>

    <v-card>
      <!-- 背景图 -->
      <v-app-bar clipped-left dark :src="article.cover" height="400">
        <template v-slot:img="{ props }">
          <v-img v-bind="props" gradient="to top right, rgba(40,44,52,.6), rgba(211,190,223,.4)"></v-img>
        </template>
        <!-- 文章标题 -->
        <v-row justify="center">
          <v-card-title>
            <h1>{{ article.title }}</h1>
          </v-card-title>
        </v-row>
      </v-app-bar>
    </v-card>

    <!-- 主题内容，左8上浮白色背景，右4正常灰色背景 -->
    <v-main class="main">
      <div class="container">
        <v-row>
          <v-col cols="12" md="9" class="left px-6">
            <!-- 两端对齐，左边标签，右边分类 -->
            <v-row justify="space-between" class="mt-3 px-6">
              <div>
                <v-btn
                  class="bg-color mr-3 white--text"
                  text
                  rounded
                  v-for="(tag, index) in article.tagList"
                  :key="index"
                >
                  <h3>{{ tag.tagName }}</h3>
                </v-btn>
              </div>

              <div>
                <v-icon color="#65B786" class="mr-1"> mdi-bookmark </v-icon>
                <span style="color: #65b786" class="text-md-h6 font-weight-medium">{{ article.category }}</span>
              </div>
            </v-row>

            <v-row class="pl-6 mt-10 grey--text">
              <!-- 发布日期 -->
              <v-icon class="mr-1"> mdi-calendar </v-icon>
              <span class="text-md-h6 font-weight-medium mr-3">发布日期：{{ article.createTime }}</span>
              <!-- 作者 -->
              <v-icon class="mr-1"> mdi-account </v-icon>
              <span class="text-md-h6 font-weight-medium mr-3">作者：{{ article.nickname }}</span>
              <!-- 文章字数 -->
              <v-icon class="mr-1"> mdi-file </v-icon>
              <span class="text-md-h6 font-weight-medium mr-3">文章字数：{{ article.totalWords }}</span>
              <!-- 阅读时长-->
              <v-icon class="mr-1"> mdi-clock </v-icon>
              <span class="text-md-h6 font-weight-medium mr-3">阅读时长：{{ article.duration }}分</span>
              <!-- 阅读次数-->
              <v-icon class="mr-1"> mdi-eye </v-icon>
              <span class="text-md-h6 font-weight-medium mr-3">阅读次数：{{ article.pageView }}</span>
            </v-row>

            <!-- 分割线 -->
            <v-divider class="mt-6"></v-divider>

            <!-- 文章内容 -->
            <div class="pa-6" v-html="article.content"></div>

            <v-divider class="mt-6"></v-divider>

            <!-- 文章评论 -->
            <v-card
              class="mx-auto my-2"
              color="primary lighten-5"
              dark
              hover
              v-for="(comment, index) in article.commentList"
              :key="index"
            >
              <v-card-title class="heading font-weight-bold grey--text">
                {{ comment.content }}
              </v-card-title>
              <v-card-actions>
                <v-list-item class="grow">
                  <v-list-item-avatar color="grey darken-3">
                    <v-img class="elevation-6" :src="comment.avatar"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content class="grey--text">
                    <v-list-item-title>{{ comment.nickname }}</v-list-item-title>
                  </v-list-item-content>

                  <v-row align="center" justify="end" class="grey--text">
                    <span class="subheading mr-2">{{ comment.createTime }}</span>
                  </v-row>
                </v-list-item>
              </v-card-actions>
            </v-card>

            <v-divider class="mt-6"></v-divider>

            <!-- 添加评论 -->
            <comment @onClick="submit"></comment>
          </v-col>

          <v-col cols="12" md="3" class="pa-12">
            <v-row align="end" class="ml-12">
              <v-icon class="mr-3 text-md-h4"> mdi-format-list-bulleted-square </v-icon>
              <span class="text-md-h4 font-weight-medium mr-3">目录</span>
            </v-row>
            <v-row v-for="(item, index) in contents" :key="index" class="ml-12 my-6">
              <v-btn to="#后记" class="btn-transparent text-md-h6">{{ item }}</v-btn>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-main>
    <my-footer></my-footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NavBar from '../components/NavBar'
import MyFooter from '../components/MyFooter'
import Comment from '../components/Comment'

export default {
  data: () => ({
    article: {},
    contents: []
  }),
  components: {
    NavBar,
    MyFooter,
    Comment
  },
  computed: {
    ...mapState({
      // loginStatus: (state) => state.loginStatus,
      user: (state) => state.user
    })
  },
  created() {
    let id = this.$route.params.id
    console.log(id)
    this.axios({
      method: 'GET',
      url: '/article/' + id
    }).then((res) => {
      console.log(res.data.data)
      this.article = res.data.data
      //利用正则表达式解析出文章内容中的所有h标签内容
      let reg = /<(h|H)[1-6].*?>.*?<\/(h|H)[1-6].*?>/g
      let result = JSON.stringify(this.article).match(reg)
      console.log(result)
      // console.log(typeof result)
      result.forEach((element) => {
        //提取到所有超链接
        const reg = /<a.*?>.*?<\/a.*?>/g
        let link = element.match(reg)
        let str = link[0]
        // console.log(str)
        const start = str.indexOf('#')
        const end = str.indexOf('class')
        const c = str.substring(start + 1, end - 3)
        // console.log(c)
        this.contents.push(c)
      })
    })
  },
  methods: {
    submit(content) {
      alert(content)
      let data = {
        articleId: this.article.id,
        userId: this.user.id,
        content: content
      }
      this.axios({
        method: 'POST',
        url: '/comment/add',
        data: data
      }).then((res) => {
        console.log(res.data.data)
        this.article.commentList = res.data.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-color: #efefef;
  .left {
    box-shadow: 0 10px 35px 2px rgba(0, 0, 0, 0.15), 0 5px 15px rgba(0, 0, 0, 0.07), 0 2px 5px -5px rgba(0, 0, 0, 0.1) !important;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    position: relative;
    top: -70px;
  }
}
.container {
  width: 80%;
  margin: 0 auto;
}
.btn-transparent {
  background-color: transparent !important;
  background-image: none;
  box-shadow: none;
}
</style>
