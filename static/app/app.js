const DeliverFood = { template: '<deliver-food></deliver-food>' }
const Login = { template: '<login></login>' }
const Registration = { template: '<registration></registration>' }
const HomePage = { template: '<home-page></home-page>' }
const AddRestaurant = { template: '<add-restaurant></add-restaurant>' }
const Profiles = { template: '<profile></profile>' }

const router = new VueRouter({
	  mode: 'hash',
	  routes: [	  
	    { path: '/', component: DeliverFood},
	    { path: '/login', component: Login},
	    { path: '/registration', component: Registration},
	    { path: '/home-page', component: HomePage},
	    { path: '/add-restaurant', component: AddRestaurant},
	    { path: '/profile', component: Profiles}
	  ]
});

var app = new Vue({
	router,
	el: '#deliverFood'
});