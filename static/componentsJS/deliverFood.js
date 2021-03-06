Vue.component("deliver-food", {
	data: function () {
		  return {
            username: "",
	        role: "",
	        activeUser: false,
	        restaurantList: [],
	        locationList: [],	       
            sortCriteria: "",
            sortType: "",
            searchName: "",
            searchType: "",
            searchLocation: "",
            searchRating: "",
            searchOpen: "",
            id: null,
            allComments: [],
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
	restaurantComments: function(id){
			let i = 0;
			for(i ; i < this.allComments.length; i++){
				if(this.allComments[i].restaurant == id){
					return this.allComments[i];
				}
			}
		},
	sortThis: function(){
			if(this.sortCriteria != "naziv" && this.sortCriteria != "lokacija" && this.sortCriteria != "ocena")
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
				else if(this.sortCriteria == "naziv")
				{
					this.restaurantList.sort(this.compareData);
				}
				else
				{
					this.restaurantList.sort(this.compareRatings);
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
    compareRatings: function(o, t){
			let f = this.restaurantComments(o.id);
			let s = this.restaurantComments(t.id);

			if(f.rating > s.rating)
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
			else if(f.rating < s.rating)
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
	search: function(){
		if(this.searchName == "" && this.searchType == "" && this.searchLocation == "" && this.searchRating == "" && this.searchOpen == ""){
			alert("Unesite parametar za pretragu!");
		}else{
			var searchParameters = "searchName=" + this.searchName + "&searchType=" + this.searchType + "&searchLocation=" + this.searchLocation + "&searchRating=" + this.searchRating + "&searchOpen=" + this.searchOpen;
			axios.get("/searchRestaurants?" + searchParameters)
				.then(response => {
					this.restaurantList = response.data;
				})
		}
	},
	average: function(id){			
    		let middleValue = 0;
			let numberRating = 0;
			for(let i = 0; i<this.allComments.length; i++)
			{
				if(id == this.allComments[i].restaurant)
                {
					middleValue = middleValue + this.allComments[i].rating;
					numberRating++;
				}
			}
			if(middleValue == 0){
				middleValue = "Neocenjen";
			}
			else{
				middleValue = (middleValue/numberRating).toFixed(2);
			}
			return middleValue;
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
	
		axios.get("/ratings")
			.then(response => {          
          		 this.allComments = response.data;
    		});		
			
	localStorage.removeItem('role');
    localStorage.removeItem('uName');

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
    
    <div>
    	<label for="sortCriteria"><b>Sortiranje</b></label><br />
    	<label><b>Kriterijum</b></label>
    	
		<select v-model="sortCriteria" style="margin: 0.6em; width: 15em;">
						<option value="naziv">Naziv restorana</option>
						<option value="lokacija">Lokacija</option>
						<option value="ocena">Ocena</option>
		</select>    	

        <label><b>Smer</b></label>
		<select v-model="sortType" style="margin: 0.6em; width: 15em;">
						<option value="rastuce">Rastuce</option>
						<option value="opadajuce">Opadajuce</option>
		</select>
		<button v-on:click="sortThis">Sortiraj</button>
	</div>
	
	
	<div>
		<input type="text" v-model="searchName" placeholder="Pretrazite po imenu" style="margin: 0.3em; width: 12em;">
		<label><b>Tip</b></label>
		    	<select v-model="searchType" class="option">
    				<option value="italijanski">italijanski</option>
    				<option value="rostilj">rostilj</option>
    				<option value="kineski">kineski</option>
    				<option value="">svi</option>
    			</select>
		<input type="text" v-model="searchLocation" placeholder="Pretrazite po gradu" style="margin: 0.3em; width: 12em;">
		<label><b>Ocena</b></label>
		    	<select v-model="searchRating" class="option">
    				<option value="1">1</option>
    				<option value="2">2</option>
    				<option value="3">3</option>
    				<option value="4">4</option>
    				<option value="5">5</option>
    				<option value="0">Neocenjeni</option>
    				<option value="">Svi</option>
    			</select>
    	<input type="radio" v-model="searchOpen" value="otvoren"><label><b>Otvoren &nbsp</b></label>
		<button v-on:click="search">Pretrazi</button>

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
			<li style="float:left"><b>Ocena:</b> {{ average(restaurant.id) }}</li><br /><br />
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
			<li style="float:left"><b>Ocena:</b> {{ average(restaurant.id) }}</li><br /><br />
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