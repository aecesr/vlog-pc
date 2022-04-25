<template>
  <div class="bg">
    <v-form v-model="valid" lazy-validation ref="form" class="form">
        <!-- 手机和密码 -->
         <h2 style="color:red">注册</h2>
      <v-text-field color="#90CAF9" v-model="phone" required label="Phone" :rules="phoneRules"></v-text-field>
      <v-text-field color="#90CAF9" v-model="email" required label="Email" ></v-text-field>
      <v-text-field color="#90CAF9" v-model="password" required label="Password" :rules="passwordRules"></v-text-field>

        <!-- 验证码 -->
      <v-row>
        <v-col cols="12" md="8">
          <v-text-field v-model="verifyCode" label="verifyCode" required></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <img class="verify" @click.prevent="getVerifyCode" ref="codeImg" :src="url" />
        </v-col>
      </v-row>

        <!-- 协议复选按钮 -->
      <v-checkbox color="#90CAF9" v-model="checkbox" label="同意协议？" required :rules="checkboxRules"></v-checkbox>

      <div class="btn">
        <v-btn color="success" class="mr-3" @click="submit" :disabled="!valid">注册</v-btn>
      </div>
    </v-form>

    <v-overlay absolute z-index="5" class="mask"></v-overlay>
  </div>
</template>

<script>
export default {
  name: 'Regist',
  data() {
    return {
      valid: true,
      password: '',
      phone: '15505151009',
      email:'2444359191@qq.com',
      url:"",
      verifyCode:"",
      checkbox: true,
      phoneRules: [(v) => !!v || '手机号不能为空', (v) => (v && v.length === 11) || '手机号必须为11位'],
      passwordRules: [
        (v) => !!v || '密码不能为空',
        (v) => (v && v.length >= 6 && v.length <= 12) || '密码长度必须在6-12位之间',
      ],
      checkboxRules: [(v) => !!v || '请同意协议'],
    //   EmailRules:[(v)=>( ^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$)]
    }
  },
  created() {
      if(this.phoneRules){
          this.getVerifyCode()
      }
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    getVerifyCode(){
        //点击验证码图片，重新请求验证码
        this.axios.get('/captcha?phone='+this.phone,{responseType:'blob'}).then((res)=>{
            // let img=this.$refs.codeImg
            // let url=window.URL.createObjectURL
            this.url=window.URL.createObjectURL(res.data)

        })
    },
    submit() {
      this.validate()
      this.axios({
        method: 'post',
        url: '/user/regist',
        data: {
          email: this.email,
          password: this.password,
          phone: this.phone,
        },
      }).then((res) => {
        console.log(res.data)
        if (res.data.code === 1) {

          alert('注册成功，请去邮箱验证')
          this.$store.commit('login', res.data.data)
          this.$router.push('/')
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.bg {
  background-image: url(https://chl-bucket.oss-cn-hangzhou.aliyuncs.com/md/202204151255984.png);
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.form {
  width: 30vw;
  border: 2px solid #6dd5fa;
  box-shadow: 0px 0px #6dd5fa, 1px 1px rgba(187, 222, 251, 0.98), 2px 2px rgba(144, 202, 249, 0.96),
    3px 3px rgba(100, 181, 246, 0.94), 4px 4px rgba(142, 203, 246, 0.92), 5px 5px rgba(98, 170, 230, 0.9),
    6px 6px rgba(140, 204, 243, 0.88), 7px 7px rgba(96, 160, 220, 0.86);
  // height: 50vh;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.8);
  // opacity: 0.9;
  position: absolute;
  z-index: 100;
}

.btn {
  display: flex;
  justify-content: space-evenly;
  margin-top: 30px;
}
.mask {
  opacity: 0.4;
  background-image: linear-gradient(to right,rgba(140, 204, 243, 0.88),#6dd5fa);
}
</style>