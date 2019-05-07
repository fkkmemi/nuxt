<template>
  <v-card>
    <v-card-title>
      hihihi
    </v-card-title>
    <v-card-text>
      <v-textarea v-model="text" />
    </v-card-text>
    <v-card-actions>
      <v-btn @click="write">
        write
      </v-btn>
      <v-btn @click="read">
        read
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
    async write() {
      try {
        const r = await this.$db.collection('users').add({
          first: 'Ada',
          last: 'Lovelace',
          born: 1815
        })
        this.text = `Document written with ID: => ${r.id}`
      } catch (e) {
        await this.$dialog.notify.error(e.message)
      }
    },
    async read() {
      try {
        const rs = await this.$db.collection('users').get()
        const ss = []
        rs.forEach(r => {
          ss.push(`${r.id} => ${JSON.stringify(r.data())}`)
        })
        this.text = ss.join('\n')
      } catch (e) {
        await this.$dialog.notify.error(e.message)
      }
    }
  }
}
</script>
