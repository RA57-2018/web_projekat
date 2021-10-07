Vue.component("add-employee", {
  name: "add-employee",
  data: function () {
    return {
      name: null,
      surname: null,
      username: null,
      password:null,
      passwordConfirmation: null,
      date: null,
      gender: null,
      rol: null,
      showErrorMessage: false,
      activeUser: false,
  };
  },
    methods: {
    Cancel: function(){
            router.replace({ path: `/home-page` })
    },
    formSubmit: function (e) {
      e.preventDefault();
      this.errors = null;
			if(!this.name || !this.surname || !this.username || !this.password || !this.passwordConfirmation || !this.date || !this.gender || !this.rol){
				this.showErrorMessage = true;
				alert("Neophodno je uneti sve podatke!")
				e.preventDefault();
			}else if(this.passwordConfirmation != this.password){
                this.showErrorMessage = true;
				alert("Lozinke moraju biti iste!")
				e.preventDefault();
      		}else if(!this.Word(this.name)){
			    alert("Ime mora sadrati samo slova i veliko pocetno slovo!")
			    e.preventDefault();
			}else if(!this.Word(this.surname)){
			    alert("Prezime mora sadrati samo slova i veliko pocetno slovo!")
			    e.preventDefault();
			}else{
        axios
        .post('/addEmployee', {name: this.name, surname: this.surname,username: this.username,
        						password: this.password, gender : this.gender,
        						birthDate : this.date, role: this.rol },{params:{username:this.username,password:this.passWord,role:this.rol}})
        .then(function(response){ 
        
        			if(JSON.parse(JSON.stringify(response.data))[0]===" "){
                    	alert("Korisnicko ime vec postoji! Mora biti jedinstveno!");
                    
                	}else{
        				alert("Uspesno dodat radnik!")
        				router.replace({ path: `/home-page` })
        			}
           });
      }

      
    },
    Word: function(value){
       return /^[A-Z][a-zA-Z]*$/.test(value);
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
        this.uName = window.localStorage.getItem('uName');
	    this.role = window.localStorage.getItem('role');
	    
	    if(this.role =="administrator" || this.role =="buyer" || this.role =="manager" || this.role =="deliverer"){
            this.activeUser = true;
        }

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
   
   <form @submit="formSubmit">
   <div class="container">
   
   		<label><b>Ime</b></label><br />
        <input type="text" placeholder="Unesite ime" required v-model="name"><br />
        
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
        
        <label><b>Uloga</b></label>
        <div>
           <input type="radio" v-model="rol" value="menadzer">
               <label>Menadzer</label>
        </div>
              <label></label>
        <div>
            <input type="radio" v-model="rol" value="dostavljac" >
               <label>Dostavljac</label>
        </div><br />
            
        <button @click="Cancel" type="button">Nazad</button>
        <input class="inp" type="submit" value="Dodaj">
             
   </div>
   </form> 
   
   </div>
    
    `
  ,
  
});