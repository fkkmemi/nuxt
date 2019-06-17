<template>
  <v-card>
    <v-card-title primary-title>
      로그인
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field v-model="form.email" label="email"></v-text-field>
        <v-text-field
          v-model="form.password"
          label="password"
          type="password"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="signIn">
        signIn
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  async mounted() {
    await this.$recaptcha.init()
  },
  methods: {
    async signIn() {
      try {
        if (process.env.NODE_ENV === 'production') {
          const cr = await this.checkRecaptcha()
          if (!cr.success) throw Error('로봇 검증 실패')
        }

        const r = await this.$auth().signInWithEmailAndPassword(
          this.form.email,
          this.form.password
        )
        this.$router.push('/')
        console.log(r)
      } catch (e) {
        console.error(e.message)
      }
    },
    async checkRecaptcha() {
      const token = await this.$recaptcha.execute('login')
      console.log('ReCaptcha token:', token)
      if (!token) return false
      const r = await this.$axios.post('/auth/recaptcha', { token })
      return r.data
    }
  }
}
</script>
