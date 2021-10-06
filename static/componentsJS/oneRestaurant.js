Vue.component("restaurant", {
  name: "restaurant",
  data: function(){
    return {
      restaurant: null,
      location: null,
      role: "",
      username: "",
      activeUser: false,
      user: localStorage.getItem('uName'),
      errorMessage: "",
      typeUser: {},
      articles: [],
      quantityA: null,
    }
  },
  methods: {
        Delete(event){   
         this.findRestaurant();     
            articleName = event.target.id;
            for(var i =0; i<this.articles.length; i++){
                if(this.articles[i].name == articleName){
                axios
                .post('/deleteArticle',{}, {params:{name:articleName}})
                .then((response) => {
                  alert("Uspesno obrisan artikal!");
                  this.articles = [];
                  this.refresh();
                  
                })
                .catch((err) => {
                  console.log(err);
                });
                }
            }
        },
    refresh(){
        this.findRestaurant();
    	},
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
    checkArticle: function(id){
    	if(this.restaurant.manager == this.user){
		router.push({ path: `/oneArticle/${id}` })
		}else{
           alert("Ne mozete da menjate tudje artikle!");
         }
		
	},
    addArticle: function(id) {
    	axios
         .post('/addArticleInBasket',{},{params:{quantityA:this.quantityA, id:id, user: this.uName}}
          )
	     .then(function(response){
			alert("Artikal dodat u korpu!");
          });
    },
	myRestaurant: function(){
	    var parameter = "username=" + this.user;
		axios.get("/myRestaurant?" + parameter)
				.then(response => {
					this.id = response.data;
					router.push({ path: `/restaurant/${this.id}` })
					this.refresh();
				})		
	},
    logout: function (event) {
            event.preventDefault();
            localStorage.removeItem('role');
            localStorage.removeItem('uName');
            router.replace({ path: `/` })
			
    },
   	
  },
  mounted: function() {
    this.uName = window.localStorage.getItem('uName');
    this.role = window.localStorage.getItem('role');
    
    if(this.role =="administrator" || this.role =="buyer" || this.role =="manager" || this.role =="deliverer"){
            this.activeUser = true;
    }
    
    this.findRestaurant();     
    
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
	</ul>
  
  
  
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
		            <li v-if="role =='administrator'"><button type="button" @click="Delete" :id="article.name">Obrisi</button></li>
		            <li v-if="role =='manager'"><button type="button" v-on:click="checkArticle(article.id)">Izmeni</button></li>
		            <li style="float:left" v-if="role =='buyer' && restaurant.status=='otvoren'"><b>Kolicina:</b>   <input type="number" :value="quantityA" @input="quantityA = $event.target.value"  style="width:50px" size="3" min="1" placeholder="..." :max = "article.quantity"></li><br />
		            <li v-if="role =='buyer' && restaurant.status=='otvoren'"><button type="button" v-on:click="addArticle(article.id)">Dodaj artikal u korpu</button></li>
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