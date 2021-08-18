const DeliverFood = { template: '<deliver-food></deliver-food>' }

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: DeliverFood}
	  ]
});

var app = new Vue({
	router,
	el: '#deliverFood'
});