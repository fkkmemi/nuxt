<template>
  <v-card>
    <v-card-title>
      Auth test
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
    <v-card-text>
      {{ msg }}
    </v-card-text>
    <v-card-actions>
      <v-btn @click="signUp">
        signUp
      </v-btn>
      <v-btn @click="getUser">
        getUser
      </v-btn>
      <v-btn @click="setUser">
        setUser
      </v-btn>
      <v-btn @click="signIn">
        signIn
      </v-btn>
      <v-btn @click="signOut">
        signOut
      </v-btn>
      <v-btn @click="getToken">
        getToken
      </v-btn>
      <v-btn @click="reqNormal">
        reqNormal
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
      },
      msg: ''
    }
  },
  mounted() {},
  methods: {
    async signUp() {
      try {
        const r = await this.$auth().createUserWithEmailAndPassword(
          this.form.email,
          this.form.password
        )
        console.log(r)
      } catch (e) {
        console.error(e.message)
      }
    },
    getUser() {
      const u = this.$auth().currentUser
      this.msg = JSON.stringify(u)
      // console.log(u.claims)
      // this.$store.commit('setUser', u)
      // this.$store.commit('increment')
    },
    async setUser() {
      const u = this.$auth().currentUser
      try {
        await u.updateProfile({
          displayName: this.form.email
        })
        console.log('update ok')
      } catch (e) {
        console.error(e.message)
      }
    },
    async signIn() {
      try {
        const r = await this.$auth().signInWithEmailAndPassword(
          this.form.email,
          this.form.password
        )
        console.log(r)
      } catch (e) {
        console.error(e.message)
      }
    },
    async signOut() {
      try {
        await this.$auth().signOut()
      } catch (e) {
        console.error(e.message)
      }
    },
    async getToken() {
      const tk = await this.$auth().currentUser.getIdToken(
        /* forceRefresh */ true
      )
      console.log(tk)
      this.msg = tk
    },
    async reqNormal() {
      const tk = await this.$auth().currentUser.getIdToken(
        /* forceRefresh */ true
      )
      // console.log(tk)
      // this.msg = tk
      this.$axios.setToken('Bearer ' + tk)
      const data = await this.$axios.get(
        'http://localhost:5000/memi-nuxt/us-central1/widgets'
      )
      console.log(data)
    }
  }
}
</script>
