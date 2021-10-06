Vue.component("basket", {
  name: "basket",
  data: function(){
    return {
      user: localStorage.getItem('uName'),
	  articles: [],
      errorMessage: "",
      artical: null,
      username: null,
      activeUser: false,
      quantity: null,
      newQuantity: null,  
      price: null,   
      buyer: null,
      articlesOrder: [],
      basket: null,
      idArticle: null,
    }
  },
  methods: {
	findBuyersArticles(){
		axios.get('/articleInBasket?id=' + this.username)
        .then(response => {
          this.articles = response.data;
          this.findBuyer();
        	
        });
	},
    Delete(event){       
            basketId = event.target.id;
                axios
                .post('/deleteArticleInBasket',{}, {params:{id:basketId}})
                .then((response) => {
                  alert("Uspesno izbacen artikal iz korpe!");
                  this.findBuyersArticles();
                  
                })
                .catch((err) => {
                  console.log(err);
                });

    },
    changeQuantity(idB){  	
    	for(let i=0; i <this.articles.length; i++){    		
    		if(this.articles[i].id == idB){
    			this.newQuantity = this.articles[i].quantity;    			
    		}
    	}
    	
    	 axios
         .post('/changeQuantity',{},{params:{id: idB, quantity: this.newQuantity }}
         )    	
    	
    	this.changePrice();
    },
    changePrice: function() {    	
    	 this.price = 0;
    	 for(i = 0; i < this.articles.length; i++) {
    	 	this.price += this.articles[i].artical.price * this.articles[i].quantity;
    	 } 
    	 
    	 if(this.buyer.type.type == "zlatni"){
    		 this.price = this.price*0.9;
    	 }else if(this.buyer.type.type == "srebrni"){   		 
    		 this.price = this.price*0.95;	 
    	 }else if(this.buyer.type.type == "bronzani"){
    	 	 this.price = this.price*0.97;
    	 } 	 

    },
    findBuyer: function(){    	
    	axios.get('/profile?username=' + this.username)
        .then(response => {
          this.buyer = response.data;
          this.changePrice();
        });
    	
    },
    createObject: function(){
    	this.basket = {};
  		
  		for(i = 0; i < this.articles.length; i++) {
  			this.articlesOrder.push(this.articles[i].id);
  		}
  		
  		this.createOrder();
    },
    createOrder: function(){
    	axios.post("/createOrder", {
            articalsInBasket: this.articlesOrder,  
            user: this.username,
            price : this.price,         
          })
          .then(response =>{
                alert( "Porudzbina je kreirana!")
              	this.findBuyersArticles();
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

  },
  mounted: function() {
    this.username = window.localStorage.getItem('uName');
    this.role = window.localStorage.getItem('role');
    if(this.role =="administrator" || this.role =="buyer" || this.role =="manager" || this.role =="deliverer"){
            this.activeUser = true;
    }
    
    this.findBuyersArticles();     
    
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
  
  <h1>Artikli u korpi</h1>
	  <br />
	  <br />
	  <br />	  
	  <div v-if="!articles.length"><h2 style="float:left">Vasa korpa je prazna</h2></div>
	  
	  <div v-if="articles.length">	  
	  <label style="margin-left:1em; font-size:20px;"><b>Ukupna cena:</b></label><input type style="margin-left:1em; width:100px; font-weight:700; color:black;" disabled="true" v-model="price">din<br />
	  <p><button type="button" v-on:click="createObject">Poruci</button></p>
	  </div>
	  	  
	  <div>
	  <div v-for="(articleInBasket, index) in articles">
	   	<div class="column">
	    <div class="gallery">
	     <img :src="articleInBasket.artical.image">
			  <div class="desc">
			  	<h2>{{ articleInBasket.artical.name }}</h2>
			  	<ul>
					<li style="float:left"><b>Cena:</b> {{ articleInBasket.artical.price }}din</li><br />
					<li style="float:left"><b>Tip artikla:</b> {{ articleInBasket.artical.typeArtical }}</li><br />
		            <li style="float:left"><b>Kolicina:</b> {{ articleInBasket.artical.quantity }}</li><br />
		            <li style="float:left"><b>Opis:</b> {{ articleInBasket.artical.description }}</li><br />
		            <li style="float:left"><b>Kolicina koju ste stavili u korpu:</b>   <input type="number" v-on:click.exact="changeQuantity(articleInBasket.id)" v-model="articleInBasket.quantity" style="width:50px" size="3" min="1" placeholder="..." :max = "articleInBasket.artical.quantity"></li><br />
		            <li><button type="button" @click="Delete" :id="articleInBasket.id">Izbaci iz korpe</button></li><br />
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