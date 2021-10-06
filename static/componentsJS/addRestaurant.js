Vue.component("add-restaurant", {
  name: "add-restaurant",
  data: function () {
    return {
    	restaurantId: null,
        restaurant: null,
        location: null,
        address: null,
        name: null,
        type: null,
        status: null,
        longitude: null,
        latitude: null,
        streetName: null,
        number: null,
        city: null,
        postalCode: null,
        locations: null,
        imagesForBackend: null,
        logoShow: null,
        manager: null,
        managerList: [],
        seen: false,
        nameManager: null,
        surname: null,
      	username: null,
      	password:null,
      	passwordConfirmation: null,
      	date: null,
      	gender: null,
      	activeUser: false,
  };
  },
    methods: {
    	logoChange: function(event){
            const file = event.target.files[0];
            this.createBase64Image(file);
            this.logoShow = (URL.createObjectURL(file));
        },
        createBase64Image(file){
            const reader= new FileReader();
 
            reader.onload = (e) =>{
                this.imagesForBackend = (e.target.result);
            }
            reader.readAsDataURL(file);
        },
    	 Cancel: function(){
             router.replace({ path: `/home-page` })
    	 },
        createR: function(e){
        	e.preventDefault();
        	this.errors = null;
        	if(this.username != null){
        		this.manager = this.username;
        	}
        	if(!this.name || !this.type || !this.status || !this.longitude || !this.latitude || !this.streetName || !this.number || !this.city || !this.postalCode || !this.imagesForBackend || !this.manager){
				this.showErrorMessage = true;
				alert("Neophodno je uneti sve podatke!")
				e.preventDefault();
			}else if(!this.Float(this.longitude)){
			    alert("Geografska duzina mora biti broj!")
			    e.preventDefault();
			}else if(!this.Float(this.latitude)){
			    alert("Geografska sirina mora biti broj!")
			    e.preventDefault();
			}else if(!this.Word(this.streetName)){
			    alert("Naziv ulice mora sadrzati samo slova i veliko pocetno slovo!")
			    e.preventDefault();
			}else if(!this.Number(this.number)){
			    alert("Broj ulice mora biti ceo broj!")
			    e.preventDefault();
			}else if(!this.Word(this.city)){
			    alert("Naziv grada mora sadrzati samo slova i veliko pocetno slovo!")
			    e.preventDefault();
			}else if(!this.Number(this.postalCode)){
			    alert("Postanski broj mora biti ceo broj!")
			    e.preventDefault();
			}else{
			    this.restaurants = {}
				this.locations ={}
				this.address = {}
				this.restaurants.name = this.name;
				this.restaurants.type = this.type;
				this.restaurants.status = this.status;
				this.restaurants.logo = this.imagesForBackend;
				this.restaurants.manager = this.manager;
				this.locations.longitude=this.longitude;
				this.locations.latitude=this.latitude;
				this.address.streetName = this.streetName;
				this.address.number = this.number;
				this.address.city = this.city;
				this.address.postalCode = this.postalCode;
				this.locations.address = this.address;
				axios
		        .post('/add-restaurant' , {restaurant: this.restaurants, location: this.locations})
		        .then(function(response){ 
		        			alert("Uspesno dodat restoran!")
		        			router.replace({ path: `/home-page` })
		           });
			}
        },
    Number: function (value) {
       return /^[0-9]+$/.test(value);
      },
    Float: function(value){
       return /^[0-9]+(\.)?[0-9]*$/.test(value);
      }, 
    Word: function(value){
       return /^[A-Z][a-zA-Z]*$/.test(value);
      },
	createManager: function (e) {
      e.preventDefault();
      this.errors = null;
			if(!this.nameManager || !this.surname || !this.username || !this.password || !this.passwordConfirmation || !this.date || !this.gender){
				this.showErrorMessage = true;
				alert("Neophodno je uneti sve podatke!")
				e.preventDefault();
			}else if(this.passwordConfirmation != this.password){
                this.showErrorMessage = true;
				alert("Lozinke moraju biti iste!")
				e.preventDefault();
      		}else if(!this.Word(this.nameManager)){
			    alert("Ime mora sadrati samo slova i veliko pocetno slovo!")
			    e.preventDefault();
			}else if(!this.Word(this.surname)){
			    alert("Prezime mora sadrati samo slova i veliko pocetno slovo!")
			    e.preventDefault();
			}else{
        axios
        .post('/addManager', {name: this.nameManager, surname: this.surname,username: this.username,
        						password: this.password, gender : this.gender,
        						birthDate : this.date})
        .then(function(response){ 
        			alert("Uspesno dodat menadzer!")        			
           });
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
    mounted: function () {  
        this.username = window.localStorage.getItem('uName');
	    this.role = window.localStorage.getItem('role');
	    
	    if(this.role =="administrator" || this.role =="buyer" || this.role =="manager" || this.role =="deliverer"){
            this.activeUser = true;
        }
          
    axios.get("/restaurantManager")
			.then(response => {
				for(let i = 0; i < response.data.length; i++){
						this.managerList.push(response.data[i]);
				}
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
	   
   <form @submit="createR">
   <div class="container">
   
   		<label><b>Naziv restorana</b></label><br />
        <input type="text" placeholder="Unesite naziv restorana" required v-model="name"><br />
        
        <label><b>Tip restorana</b></label>
        <div>
           <input type="radio" v-model="type" value="kineski">
               <label>Kineski</label>
        </div>
              <label></label>
        <div>
            <input type="radio" v-model="type" value="italijanski" >
               <label>Italijanski</label>
        </div>
        	<label></label>
        <div>
            <input type="radio" v-model="type" value="rostilj" >
               <label>Rostilj</label>
        </div>
        	<label></label>
        <div>
            <input type="radio" v-model="type" value="pizza" >
               <label>Pizza</label>
        </div><br />
        
        <label><b>Status restorana</b></label>
        <div>
           <input type="radio" v-model="status" value="otvoren">
               <label>Otvoren</label>
        </div>
              <label></label>
        <div>
            <input type="radio" v-model="status" value="zatvoren" >
               <label>Zatvoren</label>
        </div><br />
        
        <label><b>Geografska duzina</b></label><br />
        <input type="text" placeholder="Unesite geografsku duzinu" required v-model="longitude"><br />
            
        <label><b>Geografska sirina</b></label><br />
        <input type="text" placeholder="Unesite geografsku sirinu" required v-model="latitude"><br />
        
        <label><b>Ulica</b></label><br />
        <input type="text" placeholder="Unesite ulicu" required v-model="streetName"><br />
        
        <label><b>Broj</b></label><br />
        <input type="text" placeholder="Unesite broj" required v-model="number"><br />
        
        <label><b>Grad</b></label><br />
        <input type="text" placeholder="Unesite grad" required v-model="city"><br />
        
        <label><b>Postanski broj</b></label><br />
        <input type="text" placeholder="Unesite postanski broj" required v-model="postalCode"><br />
        
        <label><b>Slika</b></label><br />
        <input type="file" v-on:change="logoChange"><br />
        
        <img v-if="!logoShow" src="" width="300" height="300">
        <img v-if="logoShow" :src="logoShow" width="300" height="300"><br /><br />
          	

        <label><b>Menadzer</b></label><br />
		<select v-model="manager" style="margin: 0.3em; width: 29.2em;">
    		<option v-for="(managers, value) in managerList" v-if="managers.id === 0" :value="managers.name" v-bind:value="managers.username">{{ managers.name }} {{ managers.surname }}</option>
    	</select><br /><br />
    	

		<div v-on:click="seen = !seen">
          	<button type="button">Registruj novog menadzera</button><br /><br />
		</div>

  		<div v-if="seen" id="hide">
  			<label><b>Kliknite opet na prethodno dugme da otkazete dodavanje novog menadzera</b></label><br /><br />
   
      		<form @submit="createManager">
   			<div class="container">
		   		<label><b>Ime</b></label><br />
		        <input type="text" placeholder="Unesite ime" required v-model="nameManager"><br />
		        
		        <label><b>Prezime</b></label><br />
		        <input type="text" placeholder="Unesite prezime" required v-model="surname"><br />
		        
		        <label><b>Korisnicko ime</b></label><br />
		        <input type="text" placeholder="Unesite korisnicko ime" required v-model="username"><br />
		            
		        <label><b>Lozinka</b></label><br />
		        <input type="password" placeholder="Unesite lozinku" required v-model="password"><br />
		        
		        <label><b>Potvrda lozinke</b></label><br />
		        <input type="password" placeholder="Unesite ponovo lozinku" required v-model="passwordConfirmation"><br />
		        
		        <label><b>Pol</b></label>
		        <div>
		           <input type="radio" v-model="gender" value="muski">
		               <label>Muski</label>
		        </div>
		              <label></label>
		        <div>
		            <input type="radio" v-model="gender" value="zenski" >
		               <label>Zenski</label>
		        </div><br />
		        
		        <label><b>Datum rodjenja</b></label><br />
		              <div>
		              <input v-model="date" type="date">
		              </div><br />
		              
		        <input class="inp" type="submit" value="Dodaj menadzera">
		              
		    </div>
   			</form> 
		             
  		</div>
        
        <button @click="Cancel" type="button">Nazad</button>  
        <input class="inp" type="submit" value="Dodaj restoran">
             
   </div>
   </form> 
   
   </div>
    
    `
  ,
});