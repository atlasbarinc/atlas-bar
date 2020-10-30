
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/shipments", name: "shipments",
    component: require("./components/pages/cShipments.vue").default
  },
  { 
    path: "/details", name: 'details',
    component: require('./components/pages/cDetails.vue').default
  },
  { 
    path: "/orders", name: 'orders',
    component: require('./components/pages/cOrders.vue').default
  }
]

const router = new VueRouter({
  routes,
  base: '/account/',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router