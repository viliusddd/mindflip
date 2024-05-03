import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import FileUpload from 'primevue/fileupload'
import FloatLabel from 'primevue/floatlabel'
import IconField from 'primevue/iconfield'
import Inplace from 'primevue/inplace'
import InputIcon from 'primevue/inputicon'
import InputSwitch from 'primevue/inputswitch'
import InputText from 'primevue/inputtext'
import Menu from 'primevue/menu'
import PrimeVue from 'primevue/config'
import ProgressBar from 'primevue/progressbar'
import Tag from 'primevue/tag'
import Textarea from 'primevue/textarea'
import Toast from 'primevue/toast'
import Toolbar from 'primevue/toolbar'
import Tooltip from 'primevue/tooltip'

import 'primeicons/primeicons.css'
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/aura-light-blue/theme.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.component('PButton', Button)
app.component('Column', Column)
app.component('DataTable', DataTable)
app.component('PDialog', Dialog)
app.component('Dropdown', Dropdown)
app.component('FileUpload', FileUpload)
app.component('FloatLabel', FloatLabel)
app.component('IconField', IconField)
app.component('Inplace', Inplace)
app.component('InputIcon', InputIcon)
app.component('InputSwitch', InputSwitch)
app.component('InputText', InputText)
app.component('PMenu', Menu)
app.component('ProgressBar', ProgressBar)
app.component('Tag', Tag)
app.component('PTextarea', Textarea)
app.component('Toast', Toast)
app.component('Toolbar', Toolbar)

app.directive('tooltip', Tooltip)

app.mount('#app')
