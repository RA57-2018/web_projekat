Vue.component("deliver-food", {
	data: function () {
		  return {
            username: "",
	        role: "",
	        activeUser: false,
	        restaurantList: [],
	        locationList: [],
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
    },
  mounted: function(){
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
	
	<div>
	   <ul>
	      <li style="float:left">
	         <a href="/#/">Pocetna stranica</a>
	      </li>
	       <li v-if="activeUser!=true">
                <a href="/#/registration">Registracija</a>
            </li>
            <li v-if="activeUser != true">
                <a href="/#/login">Prijava</a>
            </li>
          <li v-if="activeUser == true && role =='buyer'">
            <a href="/" @click="logout">Odjava</a>
          </li>
          <li v-if="activeUser == true && role =='buyer'">
            <a href="/#/add-restaurant">Dodaj restoran</a>
          </li>        
	   </ul>
	</div>

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