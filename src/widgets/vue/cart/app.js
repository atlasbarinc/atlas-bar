import Vue from 'vue';
import mixins from '@shared/mixins'
import plugins from '@shared/plugins'
import store from './store'
import Cart from "./components/Cart.vue"

/* Register Filters */
// filters.forEach(filter => {
//   const key = Object.keys(filter)[0];
//   const fn = filter[key]
//   Vue.filter(key, fn)
// });

/* Register Mixins */
Vue.mixin(mixins);

/* Register Plugins */
plugins.forEach(plugin => Vue.use(plugin));

/* Register Component */
Cart.store = store
Vue.customElement('v-cart', Cart)