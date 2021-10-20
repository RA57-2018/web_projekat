Vue.component("ordersForOneDeliverer", {
    name: "ordersForOneDeliverer",
    data: function () {
      return {
        orders:[],
        role:"",
        restaurants:[],
        username:"",
        activeUser: false,
        searchRestaurant: "",
        priceFrom: "",
        priceTo: "",
        dateFrom: "",
        dateTo: "",
        sorting: "",
        filterType: "",
        buyers: [],
    };
    },
    mounted: function(){
    	this.username = window.localStorage.getItem('uName');
    	this.role = window.localStorage.getItem('role');
    	
    	if(this.role =="administrator" || this.role =="buyer" || this.role =="manager" || this.role =="deliverer"){
            this.activeUser = true;
    	}
    	
        this.load();					
    },
    methods: {        
        load(){
            axios.get('/ordersForOneDeliverer?username=' + this.username)
            .then(response => {           
            	this.orders=response.data;                 
        }); 
        
            axios.get('/restaurants')
		.then(response => {          
            this.restaurants=response.data;                   
        });
         
        this.findBuyers();          
    },
	myRestaurant: function(){
	    var parameter = "username=" + this.username;
		axios.get("/myRestaurant?" + parameter)
				.then(response => {
					this.id = response.data;
					router.push({ path: `/restaurant/${this.id}` })
				})
	},
	findRestaurant: function(id){
		let i = 0;
		for(i; i < this.restaurants.length; i++){
			if(this.restaurants[i].id == id){				    
				return this.restaurants[i].name;
			}
		}
	},
    logout: function (event) {
            event.preventDefault();
            localStorage.removeItem('role');
            localStorage.removeItem('uName');
            router.replace({ path: `/` })
			
    },
    findBuyers: function(){
            axios.get('/buyers')
            .then(response => {           
            	this.buyers=response.data;                  
        	});	        
        	
	},
    findBuyer: function(value){
		let i = 0;
		for(i; i<this.buyers.length; i++){
			if(value === this.buyers[i].username){				    
				return this.buyers[i].name + " " + this.buyers[i].surname;				
			}
		}		
	},
	changeStatus: function(id){
		axios
        .post('/deliveryDelivered',{},{params:{id: id}})
        .then(function(response){
   			alert("Porudzbina je dostavljena!");
   			
        });
        
  		this.load();
		
	},
	search: function(){
		if(this.searchRestaurant == "" && this.priceFrom == "" && this.priceTo == "" && this.dateFrom == "" && this.dateTo == "" && this.filterType == ""){
			alert("Unesite parametar za pretragu!");
		}else{
			var searchParameters = "searchRestaurant=" + this.searchRestaurant + "&priceFrom=" + this.priceFrom + "&priceTo=" + this.priceTo + "&dateFrom=" + this.dateFrom + "&dateTo=" + this.dateTo + "&filterType=" + this.filterType + "&username=" + this.username;
			axios.get("/searchOrdersForOneDeliverer?" + searchParameters)
				.then(response => {
					this.orders = response.data;
				})
		}
	},
	}, 
    template: ` 		
   	<div> 
   	
   	<ul>
	    <li v-if="activeUser != true" style="float:left">
            <a href="/#/">Pocetna stranica</a>
        </li>
        <li v-if="activeUser == true && (role =='administrator' |  role =='buyer' |  role =='manager' |  role =='deliverer')" style="float:left">
            <a href="/#/home-page">Pocetna stranica</a>
        </li>
        <li v-if="activeUser == true && (role =='administrator' |  role =='buyer' |  role =='manager' |  role =='deliverer')">
            <a href="/" @click="logout">Odjava</a>
        </li>
        <li v-if="activeUser == true && role =='administrator'">
            <a href="/#/add-restaurant">Dodaj restoran</a>
        </li>
        <li v-if="activeUser == true && role =='administrator'">
            <a href="/#/suspiciousUsers">Sumnjivi korisnici</a>
        </li>
        <li v-if="activeUser == true && (role =='administrator' |  role =='buyer' |  role =='manager' |  role =='deliverer')">
            <a href="/#/profile">Profil</a>
        </li> 
        <li v-if="activeUser == true && role =='administrator'">
            <a href="/#/add-employee">Dodaj radnika</a>
        </li>   
        <li v-if="activeUser == true && role =='administrator'">
            <a href="/#/user-view">Pregled korisnika</a>
        </li>    
        <li v-if="activeUser == true && role =='manager'">
            <a href="/#/add-article">Dodaj artikal</a>
        </li>  
        <li v-if="activeUser == true && role =='manager'">
           <a style="cursor: pointer;" @click="myRestaurant">Moj restoran</a>
        </li> 
        <li v-if="activeUser == true && role =='buyer'">
            <a href="/#/basket">Moja korpa</a>
        </li> 
        <li v-if="activeUser == true && role =='buyer'">
            <a href="/#/orderTable">Moja porudzbina</a>
        </li>
        <li v-if="activeUser == true && role =='manager'">
            <a href="/#/ManagerOrders">Porudzbine</a>
        </li>
        <li v-if="activeUser == true && role =='deliverer'">
            <a href="/#/DeliveryOrders">Porudzbine</a>
        </li>
        <li v-if="activeUser == true && role =='deliverer'">
            <a href="/#/OrdersForOneDeliverer">Moje porudzbine</a>
        </li>
	</ul>
   	
   	  <h1>Moje porudzbine</h1>
	  <br />
	  <br />
	  <br />
	  
	  
	  
	<div>
		<label><b>Restoran &nbsp</b></label><input type="text" v-model="searchRestaurant" placeholder="Unesite ime restorana" style="margin: 0.3em; width: 15em;">&nbsp&nbsp
		<label><b>Tip</b></label>
		    	<select v-model="filterType" class="option">
    				<option value="italijanski">italijanski</option>
    				<option value="rostilj">rostilj</option>
    				<option value="kineski">kineski</option>
    				<option value="">svi</option>
    			</select><br />
    			
		<label><b>Cena &nbsp</b></label>
	    <label><b>od:</b></label><input type="text" v-model="priceFrom" style="margin: 0.3em; width: 12em;">
	    <label><b>do:</b></label><input type="text" v-model="priceTo" style="margin: 0.3em; width: 12em;"><br />

		<label><b>Datum &nbsp</b></label>
	    <label><b>od:</b></label><input type="date" v-model="dateFrom" placeholder="Od" style="margin: 0.3em; width: 12em;">
	    <label><b>do:</b></label><input type="date" v-model="dateTo" placeholder="Do" style="margin: 0.3em; width: 12em;">&nbsp;&nbsp
		<button v-on:click="search">Pretrazi</button>
	</div>
	
	<br />
	  
      
      <table align="center"> 
      		<tr>
      		    <th>Restoran</th>
            	<th>Datum</th>
                <th>Cena</th>
                <th>Status</th> 
                <th>Kupac</th>   
                <th>Izmena statusa</th>                        
            </tr>
            <tr v-for="order in orders">
                <td>{{findRestaurant(order.restaurant)}}</td>
            	<td>{{order.date}}</td>
                <td>{{order.price}} din</td>
                <td>{{order.status}} </td>
                <td>{{findBuyer(order.buyer)}} </td>
                <td><button v-on:click="changeStatus(order.id)">Promeni status</button></td>             
            </tr>
            

      </table>

    </div>

`
    ,
    
  });