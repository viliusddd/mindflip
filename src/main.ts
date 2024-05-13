import './assets/main.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/aura-light-blue/theme.css'
import {createApp} from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'
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
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Menu from 'primevue/menu'
import PrimeVue from 'primevue/config'
import ProgressBar from 'primevue/progressbar'
import router from './router'
import Slider from 'primevue/slider'
import Tag from 'primevue/tag'
import Textarea from 'primevue/textarea'
import Toast from 'primevue/toast'
import Toolbar from 'primevue/toolbar'
import Tooltip from 'primevue/tooltip'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.component('Column', Column)
app.component('DataTable', DataTable)
app.component('Dropdown', Dropdown)
app.component('FileUpload', FileUpload)
app.component('FloatLabel', FloatLabel)
app.component('IconField', IconField)
app.component('Inplace', Inplace)
app.component('InputIcon', InputIcon)
app.component('InputSwitch', InputSwitch)
app.component('InputNumber', InputNumber)
app.component('InputText', InputText)
app.component('PButton', Button)
app.component('PDialog', Dialog)
app.component('PMenu', Menu)
app.component('ProgressBar', ProgressBar)
app.component('PTextarea', Textarea)
app.component('Slider', Slider)
app.component('Tag', Tag)
app.component('Toast', Toast)
app.component('Toolbar', Toolbar)

app.directive('tooltip', Tooltip)

app.mount('#app')
