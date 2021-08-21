const DeliverFood = { template: '<deliver-food></deliver-food>' }
const Login = { template: '<login></login>' }

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: DeliverFood},
	    { path: '/login', component: Login}
	  ]
});

var app = new Vue({
	router,
	el: '#deliverFood'
});