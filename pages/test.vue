<template>
  <v-card>
    <v-card-title>
      hihihi
    </v-card-title>
    <v-card-text>
      <v-textarea v-model="text" />
    </v-card-text>
    <v-card-actions>
      <v-btn @click="test">
        test
      </v-btn>
      <v-btn @click="hello">
        hello
      </v-btn>
      <v-btn @click="moment">
        moment
      </v-btn>
      <v-btn @click="dialogOpen">
        dialog
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      text: 'wwww'
    }
  },
  methods: {
    async test() {
      this.text = 'fwefwij'
      const r = await this.$axios.get('/api')
      this.text = r.data
    },
    async hello() {
      this.text = 'gwegwg'
      const r = await this.$axios.get('/api/hello')
      this.text = r.data
    },
    moment() {
      this.text = this.$moment()
        .toDate()
        .toLocaleTimeString()
    },
    async dialogOpen() {
      const r = await this.$dialog.confirm({
        title: 'hello?',
        text: 'okok??'
      })
      this.text = r ? 'YEEEES' : 'NOOOOOO'
    }
  }
}
</script>
