Vue.component("home-page", {
	data: function () {
		  return {
            username: "",
	        role: "",
	        activeUser: false,
	        restaurantList: [],
	        locationList: [],
	        sortCriteria: "",
            sortType: "",
      }  
	},
    methods: {
    logout: function (event) {
            event.preventDefault();
            localStorage.removeItem('role');
            localStorage.removeItem('uName');
            router.replace({ path: `/` })
			
       },
	checkRestaurant: function(id){
			router.push({ path: `/restaurant/${id}` })
			
		},
	restaurantLocation: function(id){
			let i = 0;
			for(i ; i < this.locationList.length; i++){
				if(this.locationList[i].id == id){
					return this.locationList[i];
				}
			}
		},
	sortThis: function(){
			if(this.sortCriteria != "naziv" && this.sortCriteria != "lokacija")
			{
				alert("Morate uneti kriterijum sortiranja pretrage!");
			}
			else if(this.sortType != "opadajuce" && this.sortType != "rastuce")
			{
				alert("Morate uneti smer sortiranja pretrage!");
			}
			else
			{
				if(this.sortCriteria == "lokacija")
				{
					this.restaurantList.sort(this.compareLocations)
				}
				else
				{
					this.restaurantList.sort(this.compareData);
				}
										
			}
		},
	compareData: function(o,t){
			let first, second;
			if(this.sortCriteria == "naziv")
			{
				first = o.name;
				second = t.name;
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
    compareLocations: function(o, t){
			let f = this.restaurantLocation(o.location);
			let s = this.restaurantLocation(t.location);


			if(f.address.streetName > s.address.streetName)
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
			else if(f.address.streetName < s.address.streetName)
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
				if(f.address.city > s.address.city)
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
			    else if(f.address.city < s.address.city)
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
			}
			
		},

    },
    mounted: function () {
        this.username = window.localStorage.getItem('uName');
	    this.role = window.localStorage.getItem('role');
        console.log(this.role);
        if(this.role =="administrator" || this.role =="buyer" || this.role =="manager" || this.role =="deliverer"){
            this.activeUser = true;
        }
        
    axios.get("/restaurants")
			.then(response => {
				for(let i = 0; i < response.data.length; i++){
						this.restaurantList.push(response.data[i]);
				}
			});
			
	axios.get("/restaurantsLocations")
			.then(response => {
				this.locationList = response.data;
			});
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
        <li v-if="activeUser == true && (role =='administrator' |  role =='buyer' |  role =='manager' |  role =='deliverer')">
            <a href="/#/profile">Profil</a>
        </li> 
        <li v-if="activeUser == true && role =='administrator'">
            <a href="/#/add-employee">Dodaj radnika</a>
        </li>        
	</ul>

	<h1>Dostava hrane</h1>
	<h2>Brzo i lako za samo par minuta!</h2>


  	<div class="row">
	  <div class="column">
	    <img src="../images/foodPicture.jpg">
	  </div>
	  <div class="column">
	    <img src="../images/restaurant1.jpg">
	  </div>
    </div><br /><br />
     
     
    <h1>Restorani</h1>
    
    <div>
    	<label for="sortCriteria"><b>Sortiranje</b></label><br />
    	<label><b>Kriterijum</b></label>
    	
		<select v-model="sortCriteria" style="margin: 0.6em; width: 15em;">
						<option value="naziv">Naziv restorana</option>
						<option value="lokacija">Lokacija</option>
		</select>    	

        <label><b>Smer</b></label>
		<select v-model="sortType" style="margin: 0.6em; width: 15em;">
						<option value="rastuce">Rastuce</option>
						<option value="opadajuce">Opadajuce</option>
		</select>
		<button v-on:click="sortThis">Sortiraj</button>
	</div>


<div v-for="(restaurant, index) in restaurantList">
<div v-if="restaurant.status === 'otvoren'">
 	<div class="column">
	 <div class="gallery">
	    <img :src="restaurant.logo">
	  <div class="desc">
	  	<h2>{{ restaurant.name }}</h2>
	  	<ul>
			<li style="float:left"><b>Tip:</b> {{ restaurant.type }}</li><br />
			<li style="float:left"><b>Status:</b> {{ restaurant.status }}</li><br />
			<li style="float:left"><b>Lokacija:</b> {{ (restaurantLocation(restaurant.location)).address.streetName}} {{(restaurantLocation(restaurant.location)).address.number}}, {{ (restaurantLocation(restaurant.location)).address.city}} {{ (restaurantLocation(restaurant.location)).address.postalCode}} </li><br />
			<li style="float:left"><button type="button" v-on:click="checkRestaurant(restaurant.id)">Detaljnije</button></li>
		</ul>
	  </div>
	</div>
	</div>
</div>	
</div>
<div v-for="(restaurant, index) in restaurantList">
<div v-if="restaurant.status === 'zatvoren'">
 	<div class="column">
	 <div class="gallery">
	    <img :src="restaurant.logo">
	  <div class="desc">
	  	<h2>{{ restaurant.name }}</h2>
	  	<ul>
			<li style="float:left"><b>Tip:</b> {{ restaurant.type }}</li><br />
			<li style="float:left"><b>Status:</b> {{ restaurant.status }}</li><br />
			<li style="float:left"><b>Lokacija:</b> {{ (restaurantLocation(restaurant.location)).address.streetName}} {{(restaurantLocation(restaurant.location)).address.number}}, {{ (restaurantLocation(restaurant.location)).address.city}} {{ (restaurantLocation(restaurant.location)).address.postalCode}} </li><br />
			<li style="float:left"><button type="button" v-on:click="checkRestaurant(restaurant.id)">Detaljnije</button></li>
		</ul>
	  </div>
	</div>
	</div>
</div>	
</div>


	</div>	  
`
});