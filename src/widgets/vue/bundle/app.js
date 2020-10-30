import Vue from 'vue'
import mixins from '@shared/mixins'
import plugins from '@shared/plugins'
import store from './store'
import Bundle from './components/Bundle.vue'

Vue.mixin(mixins)

plugins.forEach(plugin => Vue.use(plugin))

Bundle.store = store
Vue.customElement('v-bundle', Bundle)