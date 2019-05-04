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
      <v-btn @click="dbWrite">
        dbWrite
      </v-btn>
      <v-btn @click="dbRead">
        dbRead
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
    },
    async dbWrite() {
      const r = await this.$db.collection('test').add({
        title: 'test',
        content: 'oh yes'
      })
      this.text = r.id
    },
    async dbRead() {
      const r = await this.$db.collection('test').get()
      // this.text = JSON.stringify(r.docs[0])
      console.log(r.docs[0])
    }
  }
}
</script>
