Vue.component("ordertable", {
    name: "ordertable",
    data: function () {
      return {
        orders:[],
        restaurants:[],
        role:"",
        username:"",
        activeUser: false,
        restaurant: null,
        restaurantSearch: "",
        priceSearch: "",
        dateFrom: "",
        dateTo: "",
        sorting: "",
        filterType: "",
        filterStatus: "",
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
            axios.get('/orders?user=' + this.username)
            .then(response => {           
            	this.orders=response.data;                  
        });
        
        axios.get('/restaurants')
		.then(response => {          
            this.restaurants=response.data;                   
        });             
    },
    findRestaurant: function(id){
		let i = 0;
		for(i; i < this.restaurants.length; i++){
			if(this.restaurants[i].id == id){				    
				return this.restaurants[i].name;
			}
		}
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
       
	},
		
	/*search: function(){

		var parametar = "user=" + this.kIme + "&naziv="+this.restoranPretraga + "&cijena=" + this.cijenaPretraga + "&datumOd=" + this.datumOd + "&datumDo=" + this.datumDo +"&filterTip=" + this.filterTip +"&filterStatus=" + this.filterStatus + "&sortiranje=" + this.sortiranje;
	
            axios.get('/pretragaPorudzbinaKupac?' + parametar)
                        .then(response => {
                             this.porudzbine = response.data;
            })

    },*/
 
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
	</ul>
   	
   	  <h1>Porudzbine</h1>
	  <br />
	  <br />
	  <br />
	  
      
      <table align="center"> 
      		<tr>
      		    <th>Restoran</th>
            	<th>Datum</th>
                <th>Cena</th>
                <th>Status</th>                            
            </tr>
            <tr v-for="order in orders">
                <td>{{findRestaurant(order.restaurant)}}</td>
            	<td>{{order.date}}</td>
                <td>{{order.price}} din</td>
                <td>{{order.status}} </td>
            </tr>

      </table>

    </div>

`
    ,
    
  });