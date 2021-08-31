Vue.component("restaurant", {
  name: "restaurant",
  data: function(){
    return {
      restaurant: null,
      location: null,
      role: "",
      user: localStorage.getItem('uName'),
      errorMessage: "",
      typeUser: {},

    }
  },
  methods: {
    findRestaurant: function() {
      console.log(this.user);
      let id = this.$route.params.id;
      axios.get('/restaurant?id=' + id)
      .then(response => {
        this.restaurant = response.data;
       
        this.findLocation(id);
      })
      .catch(error =>{
        console.log(error);
      });
      
    },
   findLocation: function(id) {
      axios.get("/restaurantLocation?id=" + this.restaurant.location)
      .then(response1 => {
        this.location = response1.data;
      });
    },
  },
  mounted: function() {
    this.uName = window.localStorage.getItem('uName');
    this.role = window.localStorage.getItem('role');
    
    this.findRestaurant();      
    },
  template: `
  
  <div>
  <h1>{{ restaurant.name }}</h1>

	  <img :src="restaurant.logo">
	  <div class="desc">
	  	<ul>
			<li style="float:left"><b>Tip:</b> {{ restaurant.type }}</li><br />
			<li style="float:left"><b>Status:</b> {{ restaurant.status }}</li><br />
			<li style="float:left"><b>Lokacija:</b> {{ location.address.streetName}} {{location.address.number}}, {{ location.address.city}} {{ location.address.postalCode}} </li><br />
		</ul>
	  </div>

		
  </div>

  `
  ,
});