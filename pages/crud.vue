<template>
  <v-card>
    <v-card-title>
      CRUD test
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="items"
        :loading="loading"
        :total-items="totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="perPages"
        item-key="id"
        rows-per-page-text=""
      >
        <template v-slot:items="props">
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.title }}</td>
          <td>{{ props.item.content }}</td>
          <td>
            <v-btn small icon @click="modDialog(props.item)"
              ><v-icon dark>create</v-icon></v-btn
            >
            <v-btn small icon @click="del(props.item)"
              ><v-icon dark>delete</v-icon></v-btn
            >
          </td>
        </template>
      </v-data-table>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="list">
        list
      </v-btn>
      <v-btn @click="addDialog">
        add
      </v-btn>
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ mode ? '쓰기' : '수정하기' }}</span>
          </v-card-title>
          <v-card-text>
            <v-form v-model="valid">
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field
                      v-model="form.title"
                      label="제목"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-textarea
                      v-model="form.content"
                      label="글"
                      required
                    ></v-textarea>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn v-if="mode" color="blue darken-1" flat @click="add"
              >add</v-btn
            >
            <v-btn v-else color="blue darken-1" flat @click="mod">mod</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      headers: [
        { text: 'id', value: 'id' },
        { text: 'title', value: 'title' },
        { text: 'content', value: 'content' },
        { text: 'actions', value: 'actions', sorted: false }
      ],
      items: [],
      loading: false,
      totalItems: 0,
      pagination: {
        descending: true
      },
      perPages: [5, 10, 60, 120, 240, 600],
      form: {
        title: '',
        content: ''
      },
      dialog: false,
      valid: false,
      mode: false
    }
  },
  computed: {
    setSkip() {
      if (this.pagination.page <= 0) return 0
      return (this.pagination.page - 1) * this.pagination.rowsPerPage
    },
    setOrder() {
      let order = this.pagination.sortBy
      if (!this.pagination.sortBy) order = 'st'
      return order
    },
    setSort() {
      return this.pagination.descending ? -1 : 1
    },
    pages() {
      if (this.pagination.rowsPerPage == null || this.totalItems == null)
        return 0

      return Math.ceil(this.totalItems / this.pagination.rowsPerPage)
    }
  },
  watch: {
    // pagination: {
    //   handler() {
    //     this.list()
    //   },
    //   deep: true
    // }
  },
  mounted() {
    this.list()
  },
  methods: {
    async list() {
      try {
        const snapshot = await this.$db.collection('boards').get()
        this.items = []
        snapshot.forEach(doc => {
          // console.log(doc.id, '=>', doc.data())
          const d = doc.data()
          this.items.push({
            id: doc.id,
            title: d.title,
            content: d.content
          })
        })
        // this.items = r
        // this.text = `Document written with ID: => ${r.id}`
      } catch (e) {
        await this.$dialog.notify.error(e.message)
      }
    },
    async add() {
      this.dialog = false
      try {
        const r = await this.$db.collection('boards').add(this.form)
        console.log(r)
        await this.list()
      } catch (e) {
        await this.$dialog.notify.error(e.message)
      }
    },
    async mod() {
      this.dialog = false
      try {
        const r = await this.$db
          .collection('boards')
          .doc(this.sel.id)
          .set(this.form)
        console.log(r)
        await this.list()
      } catch (e) {
        await this.$dialog.notify.error(e.message)
      }
    },
    async del(p) {
      const c = await this.$dialog.confirm({
        title: '위험',
        text: '정말 지우겠습니까?'
      })
      if (c) {
        const r = await this.$db
          .collection('boards')
          .doc(p.id)
          .delete()
        console.log(r)
        await this.list()
      }
    },
    addDialog() {
      this.mode = true
      this.form.title = ''
      this.form.content = ''
      this.dialog = true
    },
    modDialog(p) {
      this.mode = false
      this.sel = p
      this.form.title = p.title
      this.form.content = p.content
      this.dialog = true
    }
  }
}
</script>
