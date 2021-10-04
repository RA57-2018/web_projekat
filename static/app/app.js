const DeliverFood = { template: '<deliver-food></deliver-food>' }
const Login = { template: '<login></login>' }
const Registration = { template: '<registration></registration>' }
const HomePage = { template: '<home-page></home-page>' }
const AddRestaurant = { template: '<add-restaurant></add-restaurant>' }
const Profiles = { template: '<profile></profile>' }
const AddEmployee = { template: '<add-employee></add-employee>' }
const UserView = { template: '<user-view></user-view>' }
const OneRestaurant = { template: '<restaurant></restaurant>' }
const AddArticle = { template: '<add-article></add-article>' }
const OneArticle = { template: '<one-article></one-article>' }
const Basket = { template: '<basket></basket>' }
const Order = { template: '<order></order>' }
const OrderTable = { template: '<ordertable></ordertable>' }
const SuspiciousUser = { template: '<suspicioususers></suspicioususers>' }
const ChangePasword = { template: '<changepassword></changepassword>' }

const router = new VueRouter({
	  mode: 'hash',
	  routes: [	  
	    { path: '/', component: DeliverFood},
	    { path: '/login', component: Login},
	    { path: '/registration', component: Registration},
	    { path: '/home-page', component: HomePage},
	    { path: '/add-restaurant', component: AddRestaurant},
	    { path: '/profile', component: Profiles},
	    { path: '/add-employee', component: AddEmployee},
	    { path: '/user-view', component: UserView},
	    { path: '/restaurant/:id', component: OneRestaurant},
	    { path: '/add-article', component: AddArticle},
	    { path: '/oneArticle/:id', component: OneArticle},
	    { path: '/basket', component: Basket},
	    { path: '/order', component: Order},
	    { path: '/ordertable', component: OrderTable},
	    { path: '/suspicioususers', component: SuspiciousUser},
	    { path: '/changepassword', component: ChangePasword}
	  ]
});

var app = new Vue({
	router,
	el: '#deliverFood'
});