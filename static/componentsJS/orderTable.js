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
        searchRestaurant: "",
        priceFrom: "",
        priceTo: "",
        dateFrom: "",
        dateTo: "",
        sortCriteria: "",
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
    cancelOrder: function(idO){
		
		axios
        .post('/cancelOrder',{},{params:{id: idO}}
        )
          .then(function(response){
          
   			alert("Porudzbina je otkazana!");
   			
        });
  this.load();
		
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
	search: function(){
		if(this.searchRestaurant == "" && this.priceFrom == "" && this.priceTo == "" && this.dateFrom == "" && this.dateTo == "" && this.filterType == "" && this.filterStatus == ""){
			alert("Unesite parametar za pretragu!");
		}else{
			var searchParameters = "searchRestaurant=" + this.searchRestaurant + "&priceFrom=" + this.priceFrom + "&priceTo=" + this.priceTo + "&dateFrom=" + this.dateFrom + "&dateTo=" + this.dateTo + "&filterType=" + this.filterType + "&filterStatus=" + this.filterStatus + "&username=" + this.username;
			axios.get("/searchBuyersOrders?" + searchParameters)
				.then(response => {
					this.orders = response.data;
				})
		}
	},
	restaurantName: function(id){
			let i = 0;
			for(i ; i < this.restaurants.length; i++){
				if(this.restaurants[i].id == id){
					return this.restaurants[i];
				}
			}
		},
	sortThis: function(){
			if(this.sortCriteria != "naziv" && this.sortCriteria != "cena" && this.sortCriteria != "datum")
			{
				alert("Morate uneti kriterijum sortiranja pretrage!");
			}
			else if(this.sortType != "opadajuce" && this.sortType != "rastuce")
			{
				alert("Morate uneti smer sortiranja pretrage!");
			}
			else
			{
				if(this.sortCriteria == "naziv")
				{
					this.orders.sort(this.compareName)
				}
				else if(this.sortCriteria == "cena")
				{
					this.orders.sort(this.comparePrice);
				}
				else
				{
					this.orders.sort(this.compareDate);
				}
										
			}
		},
	compareName: function(o, t){
			let f = this.restaurantName(o.restaurant);
			let s = this.restaurantName(t.restaurant);

			if(f.name > s.name)
			{
				if(this.sortType == 'rastuce')
				{
					return 1;
				}
				else
				{
					return -1;
				}
			}
			else if(f.name < s.name)
			{
				if(this.sortType == 'rastuce')
				{
					return -1;
				}
				else
				{
					return 1;
				}
			}
			else
			{
				return 0;
			}		
			
		},
	comparePrice: function(o,t){
			let first, second;
			if(this.sortCriteria == "cena")
			{
				first = o.price;
				second = t.price;
			}
			if(first < second)
			{
				if(this.sortType == 'rastuce')
				{
					return -1;
				}
				else
				{
					return 1;
				}
			}
			else if(first > second)
			{
				if(this.sortType == 'rastuce')
				{
					return 1;
				}
				else
				{
					return -1;
				}
			}
			else
			{
				return 0;
			}

		},
	compareDate: function(o,t){
			let first, second;
			if(this.sortCriteria == "datum")
			{
				first = o.date;
				second = t.date;
			}
			if(first < second)
			{
				if(this.sortType == 'rastuce')
				{
					return -1;
				}
				else
				{
					return 1;
				}
			}
			else if(first > second)
			{
				if(this.sortType == 'rastuce')
				{
					return 1;
				}
				else
				{
					return -1;
				}
			}
			else
			{
				return 0;
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
            <a href="/#/orderTable">Moje porudzbine</a>
        </li>
	</ul>
   	
   	  <h1>Porudzbine</h1>
	  <br />
	  <br />
	  <br />
	  
	  
	<div>
    	<label for="sortCriteria"><b>Sortiranje</b></label><br />
    	<label><b>Kriterijum</b></label>
    	
		<select v-model="sortCriteria" style="margin: 0.6em; width: 15em;">
						<option value="naziv">Naziv restorana</option>
						<option value="cena">Cena porudzbine</option>
						<option value="datum">Datum porudzbine</option>
		</select>    	

        <label><b>Smer</b></label>
		<select v-model="sortType" style="margin: 0.6em; width: 15em;">
						<option value="rastuce">Rastuce</option>
						<option value="opadajuce">Opadajuce</option>
		</select>
		<button v-on:click="sortThis">Sortiraj</button>
	</div>   
	  
	
	<div>
		<label><b>Restoran &nbsp</b></label><input type="text" v-model="searchRestaurant" placeholder="Unesite ime restorana" style="margin: 0.3em; width: 15em;">&nbsp&nbsp
		<label><b>Tip</b></label>
		    	<select v-model="filterType" class="option">
    				<option value="italijanski">italijanski</option>
    				<option value="rostilj">rostilj</option>
    				<option value="kineski">kineski</option>
    				<option value="">svi</option>
    			</select>&nbsp;&nbsp
    			
    	<label><b>Status</b></label>
		    	<select v-model="filterStatus" class="option">
    				<option value="OBRADA">Obrada</option>
    				<option value="U PRIPREMI">U pripremi</option>
    				<option value="CEKA DOSTAVLJACA">Ceka dostavljaca</option>
    				<option value="U TRANSPORTU">U transportu</option>
    				<option value="DOSTAVLJENA">Dostavljena</option>
    				<option value="OTKAZANA">Otkazana</option>
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
            </tr>
            <tr v-for="order in orders">
                <td>{{findRestaurant(order.restaurant)}}</td>
            	<td>{{order.date}}</td>
                <td>{{order.price}} din</td>
                <td>{{order.status}} </td>
                <td  v-if="order.status=='OBRADA' "><button v-on:click="cancelOrder(order.id)">Otkazi porudzbinu</button></td>
            </tr>

      </table>

    </div>

`
    ,
    
  });