Vue.component("requests", {
    name: "requests",
    data: function () {
      return {
        orders:[],
        role:"",
        requests:[],
        deliverers:[],
        username:"",
        activeUser: false,
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
            axios.get('/managerOrders?username=' + this.username)
            .then(response => {           
            	this.orders = response.data;                 
        }); 
        
            axios.get('/managersRequests?username=' + this.username)
	        .then(response => {          
            	this.requests = response.data;        
        });
        
            axios.get('/deliverers')
	        .then(response => {          
            	this.deliverers = response.data;
        
        });
         
         
    },
	myRestaurant: function(){
	    var parameter = "username=" + this.username;
		axios.get("/myRestaurant?" + parameter)
				.then(response => {
					this.id = response.data;
					router.push({ path: `/restaurant/${this.id}` })
				})
	},
    logout: function (event) {
            event.preventDefault();
            localStorage.removeItem('role');
            localStorage.removeItem('uName');
            router.replace({ path: `/` })
			
    },
	orderDate: function(id){
			let i = 0;
			for(i; i<this.orders.length; i++){
				if(this.orders[i].id == id){				    
					return this.orders[i].date;
				}
			}
	},
	orderPrice: function(id){
			let i = 0;
			for(i; i< this.orders.length; i++){
				if(this.orders[i].id == id){				    
					return this.orders[i].price;
				}
			}
	},
	delivererName: function(username){
			let i = 0;
			for(i; i<this.deliverers.length; i++){
				if(this.deliverers[i].username == username){				    
					return this.deliverers[i].name;
				}
			}
	},
	delivererSurname: function(username){
			let i = 0;
			for(i; i<this.deliverers.length; i++){
				if(this.deliverers[i].username == username){				    
					return this.deliverers[i].surname;
				}
			}
	},
	approveRequest: function(id){			
			axios
            .post('/approveRequest',{},{params:{id: id}})
	         .then(function(response){             
       			alert("Zahtev odobren!");      			
            });
            
			this.load();
						
	},
	refuseRequest: function(id){			
			axios
            .post('/refuseRequest',{},{params:{id: id}})
	         .then(function(response){              
       			alert("Zahtev odbijen!");       			
            });
            
			this.load();						
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
        <li v-if="activeUser == true && role =='manager'">
            <a href="/#/Requests">Zahtevi</a>
        </li>
	</ul>
   	
   	  <h1>Zahtevi</h1>
	  <br />
	  <br />
	  <br />
	  
      
      <table align="center"> 
      		<tr>
            	<th>Datum</th>
                <th>Cena</th>
                <th>Ime dostavljaca</th> 
                <th>Prezime dostavljaca</th>   
                <th>Odobri</th>  
                <th>Odbij</th>                      
            </tr>
            <tr v-for="request in requests">
            	<td>{{orderDate(request.orderId)}}</td>
                <td>{{orderPrice(request.orderId)}} din</td>
                <td>{{delivererName(request.deliverer)}}</td>
                <td>{{delivererSurname(request.deliverer)}}</td>
                <td ><button v-on:click="approveRequest(request.id)">Odobri zahtev</button></td>
                <td ><button v-on:click="refuseRequest(request.id)">Odbij zahtev</button></td>                
            </tr>
            

      </table>

    </div>

`
    ,
    
  });