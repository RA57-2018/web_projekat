Vue.component("managerOrders", {
    name: "managerOrders",
    data: function () {
      return {
        orders:[],
        role:"",
        username:"",
        activeUser: false,
        priceSearch: "",
        dateFrom: "",
        dateTo: "",
        sorting: "",
        filterStatus: "",
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
            axios.get('/managerOrders?username=' + this.username)
            .then(response => {           
            	this.orders=response.data;                 
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
        .post('/changeStatusManager',{},{params:{id: id}}
        )
	    .then(function(response){             
       		alert("Promenjen status porudzbine!");       			
        });
		this.load();			
	},
	changeStatusWaitDelivery: function(id){			
		axios
        .post('/changeStatusWaitDelivery',{},{params:{id: id}}
        )
	    .then(function(response){             
       		alert("Promenjen status porudzbine!");       			
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
	</ul>
   	
   	  <h1>Porudzbine</h1>
	  <br />
	  <br />
	  <br />
	  
      
      <table align="center"> 
      		<tr>
            	<th>Datum</th>
                <th>Cena</th>
                <th>Status</th> 
                <th>Kupac</th>   
                <th>Izmena statusa</th>                        
            </tr>
            <tr v-for="order in orders">
            	<td>{{order.date}}</td>
                <td>{{order.price}} din</td>
                <td>{{order.status}} </td>
                <td>{{findBuyer(order.buyer)}} </td> 
                <td  v-if="order.status ==='OBRADA'"><button v-on:click="changeStatus(order.id)">U pripremi</button></td>
                <td  v-if="order.status ==='U PRIPREMI'"><button v-on:click="changeStatusWaitDelivery(order.id)">Ceka dostavljaca</button></td>             
            </tr>
            

      </table>

    </div>

`
    ,
    
  });