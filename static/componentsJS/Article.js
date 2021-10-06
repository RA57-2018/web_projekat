Vue.component("one-article", {
    name: "one-article",
    data: function () {
      return {
        id: null,
        name: null,
        price: null,
        typeArtical: null,
        restaurant: null,
        quantity: null,
        description: null,
        image: null,
        showErrorMessage: false,
        backup: {},
        t: true,
        activeUser: false,

    };
    },
    methods: {
        Edit: function(){
            this.t = false;
            this.backup.name = this.name;
            this.backup.price = this.price;
            this.backup.typeArtical = this.typeArtical;
            this.backup.quantity = this.quantity;
            this.backup.description = this.description;
        },
        Cancel: function(){
            this.t = true;
            this.name = this.backup.name;
            this.price = this.backup.price;
            this.typeArtical = this.backup.typeArtical;
            this.quantity =  this.backup.quantity;
            this.description = this.backup.description;
            this.$router.go(-1);
        },
        formSubmit: function(e){
        	if(this.name == "" || this.price == ""){
                alert("Morate popuniti polja za naziv i cenu!");
        		e.preventDefault();
            }else if(!this.Number(this.price)){
			    alert("Cena mora biti ceo broj!")
			    e.preventDefault();
			}else{
                e.preventDefault();
                axios
                .post('/updateArticle',{name: this.name, price: this.price, typeArtical: this.typeArtical, quantity: this.quantity,
                    description: this.description}, {params:{id: this.id}})
                .then((response) => {
                  alert("Uspesno ste izmenili podatke! ");
                  this.backup = {};
                })
                .catch((err) => {
                  console.log(err);
                });
            }
        },
        findArticle: function() {
	      let id = this.$route.params.id;
	      console.log(id);
	      axios.get('/oneArticle?idA=' + id)
	      .then(response => {
			    this.id = response.data.id;
	            this.name = response.data.name;
	            this.price = response.data.price;
	            this.typeArtical = response.data.typeArtical;
	            this.restaurant = response.data.restaurant;
	            this.quantity = response.data.quantity;
	            this.description = response.data.description;
	            this.image = response.data.image;
	      })
	      .catch(error =>{
	        console.log(error);
	      });
      
    },
    Number: function (value) {
       return /^[0-9]+$/.test(value);
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
 
    	this.findArticle();     
    
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
   
   <h2>Artikal</h2>
   
   <form @submit="formSubmit">
   <div class="container">
   
   		<label><b>Naziv</b></label><br />
        <input type="text" v-bind:disabled="t" v-model="name"><br />
        
        <label><b>Cena</b></label><br />
        <input type="text" v-bind:disabled="t" v-model="price"><br />
        
		<label><b>Tip</b></label>
        <div>
           <input type="radio" v-model="typeArtical" v-bind:disabled="t" value="jelo">
               <label>Jelo</label>
        </div>
              <label></label>
        <div>
            <input type="radio" v-model="typeArtical" v-bind:disabled="t" value="pice" >
               <label>Pice</label>
        </div><br />
            
        <label><b>Kolicina</b></label><br />
        <input type="text" v-bind:disabled="t" v-model="quantity"><br />
        
        <label><b>Opis</b></label><br />
        <input type="text" v-bind:disabled="t" v-model="description"><br />
        
        <img :src="this.image">   

        <button @click="Cancel" type="button">Nazad</button>
        <button @click="Edit" type="button">Izmeni</button>
        <button type="submit">Sacuvaj</button>

             
   </div>
   </form> 
   
   </div>
    
    `
  ,
  
});