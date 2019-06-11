<template>
  <div style="max-width: 100%">
    <v-toolbar flat color="white">
      <v-toolbar-title>My history</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-data-table :headers="headers" :items="registers" class="elevation-1">
      <template #items="props">
        <td>{{ timeFormat(props.item.timestamp) }}</td>
        <td>
          <v-chip
            :color="props.item.status ? 'green' : 'red'"
            outline
            label
            pill
            >{{ props.item.status ? 'Success' : 'Error' }}</v-chip
          >
        </td>
        <td class="text-xs-right">
          <v-btn :disabled="!props.item.status" @click="download(props.item)">
            Download
          </v-btn>
        </td>
        <td class="text-xs-right">{{ props.item.accuracy }}</td>
        <td class="text-xs-right">{{ props.item.loss }}</td>
        <td class="text-xs-right">{{ props.item.dataset }}</td>
        <td class="justify-center layout px-0">
          <v-dialog v-model="dialog" max-width="500">
            <template #activator="{ on }">
              <v-icon small class="mr-2" @click="viewItem(props.item)">
                visibility
              </v-icon>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Full model history</span>
              </v-card-title>

              <v-card-text>
                <v-layout justify-center align-center>
                  <v-chip v-if="!isOk" text-color="white" color="error">
                    {{ viewer.message }}
                  </v-chip>
                  <table v-else border="1">
                    <tr>
                      <th>Epoch</th>
                      <th>Accuracy</th>
                      <th>Loss</th>
                    </tr>
                    <tr v-for="(item, index) in viewer" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>{{ item.accuracy }}</td>
                      <td>{{ item.loss }}</td>
                    </tr>
                  </table>
                </v-layout>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="dialog = false">
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-icon small @click="deleteItem(props.item)">
            delete
          </v-icon>
        </td>
      </template>
      <template #no-data>
        <v-alert :value="true" color="error" icon="warning">
          Sorry, nothing to display here :(
        </v-alert>
      </template>
    </v-data-table>
    <v-footer
      fixed
      app
      style="background-color:rgba(0,0,0, 0)"
      :style="{ visibility: alert ? 'visible' : 'hidden' }"
    >
      <v-alert v-model="alert" dismissible type="error" icon="warning">
        Error downloading the file
      </v-alert>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'History',
  middleware: 'authenticated',
  layout: 'navbar',
  data() {
    return {
      headers: [
        {
          text: 'Time started',
          sortable: false,
          value: 'timestamp'
        },
        {
          text: 'Status',
          sortable: false,
          value: 'status'
        },
        {
          text: 'Download model',
          sortable: false,
          value: 'path'
        },
        {
          text: 'Final accuracy',
          sortable: false,
          value: 'accuracy'
        },
        {
          text: 'Final Loss',
          sortable: false,
          value: 'loss'
        },
        {
          text: 'Dataset',
          sortable: false,
          value: 'dataset'
        },
        {
          text: 'Actions',
          sortable: false,
          value: 'status'
        }
      ],
      registers: [],
      viewer: '',
      isOk: false,
      dialog: false,
      alert: false
    }
  },
  beforeMount() {
    this.getRegisters()
  },
  methods: {
    deleteItem(item) {
      const index = this.registers.indexOf(item)
      const parent = this
      this.$axios.setToken(this.$cookies.get('auth').access, 'Bearer')
      this.$axios
        .post('/api/model/history/', { id: item.id })
        .then(function(res) {
          parent.registers.splice(index, 1)
        })
        .catch(function(err) {
          console.log(err)
        })
    },
    getRegisters() {
      const parent = this
      this.$axios.setToken(this.$cookies.get('auth').access, 'Bearer')
      this.$axios
        .get('/api/model/history/')
        .then(function(res) {
          parent.registers = []
          parent.registers.push(...res.data.history)
        })
        .catch(function(err) {
          console.log(err)
        })
    },
    viewItem(item) {
      this.isOk = item.status
      this.viewer = item.steps_info
      this.dialog = true
    },
    download(item) {
      const parent = this
      this.$axios.setToken(this.$cookies.get('auth').access, 'Bearer')
      this.$axios
        .post('/api/model/', { id: item.id }, { responseType: 'blob' })
        .then(function(res) {
          const url = window.URL.createObjectURL(new Blob([res.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'model.zip')
          document.body.appendChild(link)
          link.click()
          link.parentNode.removeChild(link)
        })
        .catch(function(err) {
          console.log(err)
          parent.alert = true
        })
    },
    timeFormat(time) {
      const format = new Date(time * 1000)
      const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short'
      }

      return new Intl.DateTimeFormat('es-ES', options).format(format)
    }
  }
}
</script>

<style scoped></style>
