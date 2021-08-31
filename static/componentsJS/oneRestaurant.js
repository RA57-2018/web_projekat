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
      articles: null,

    }
  },
  methods: {
    findRestaurant: function() {
      let id = this.$route.params.id;
      axios.get('/restaurant?id=' + id)
      .then(response => {
        this.restaurant = response.data;
       
        this.findLocation(id);
        this.findArticles(id);
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
    findArticles: function(id){
      axios.get("/restaurantArticles?id=" + this.restaurant.articles)
      .then(response => {
        this.articles = response.data;
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



	  
	  <div>
	  <div v-for="(article, index) in articles">
	   	<div class="column">
	    <div class="gallery">
	     <img :src="article.image">
			  <div class="desc">
			  	<h2>{{ article.name }}</h2>
			  	<ul>
					<li style="float:left"><b>Cena:</b> {{ article.price }}din</li><br />
					<li style="float:left"><b>Tip artikla:</b> {{ article.typeArtical }}</li><br />
		            <li style="float:left"><b>Kolicina:</b> {{ article.quantity }}</li><br />
		            <li style="float:left"><b>Opis:</b> {{ article.description }}</li><br />
				</ul>
			  </div>
	  </div>
	</div>

      </div>
	  </div>

		
  </div>

  `
  ,
});