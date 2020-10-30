import Vue from 'vue';
import mixins from '@shared/mixins'
import plugins from '@shared/plugins'
import router from './_router'
import store from './store'
import Portal from "./components/Portal.vue"

/* Register Mixins */
Vue.mixin(mixins);

/* Register Plugins */
plugins.forEach(plugin => Vue.use(plugin));

/* Register Component */
Portal.store = store
Portal.router = router
Vue.customElement('v-portal', Portal)