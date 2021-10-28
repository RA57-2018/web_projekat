Vue.component("profile", {
    name: "profile",
    data: function () {
      return {
        name: null,
        surname: null,
        username: null,
        password: null,
        date: null,
        gender: null,
        showErrorMessage: false,
        uName: null,
        backup: {},
        t: true,
        activeUser: false,

    };
    },
    mounted: function(){
        this.uName = window.localStorage.getItem('uName');
        this.role = window.localStorage.getItem('role');
        
        axios.get('/profile?username='+this.uName)
		.then(response => {
            this.name = response.data.name;
            this.surname = response.data.surname;
            this.username = response.data.username;
            this.password = response.data.password;
            this.date = response.data.birthDate;
            this.gender = response.data.gender;


        });
		
		
		if(this.role =="administrator" || this.role =="buyer" || this.role =="manager" || this.role =="deliverer"){
            this.activeUser = true;
        }					
    },
    methods: {
        Edit: function(){
            this.t = false;
            this.backup.name = this.name;
            this.backup.surname = this.surname;
            this.backup.password = this.password;
            this.backup.date = this.date;
            this.backup.gender = this.gender;
        },
        Cancel: function(){
            this.t = true;
            this.name = this.backup.name;
            this.surname = this.backup.surname;
            this.password = this.backup.password;
            this.date =  this.backup.date;
            this.gender = this.backup.gender;
            router.replace({ path: `/home-page` })
        },
        formSubmit: function(e){
            e.preventDefault();
            if(!this.name || !this.surname || !this.username || !this.password  || !this.date || !this.gender){
				this.showErrorMessage = true;
				alert("Neophodno je uneti sve podatke!")
				e.preventDefault();
			}else if(!this.Word(this.name)){
			    alert("Ime mora sadrati samo slova i veliko pocetno slovo!")
			    e.preventDefault();
			}else if(!this.Word(this.surname)){
			    alert("Prezime mora sadrati samo slova i veliko pocetno slovo!")
			    e.preventDefault();
      		}else{
                axios
                .post('/updateProfile',{name: this.name, surname: this.surname, username : this.username, password: this.password,
                    birthDate : this.date, gender : this.gender}, {params:{username:this.username}})
                .then((response) => {
                  alert("Uspesno ste izmenili podatke! ");
                  this.backup = {};
                })
                .catch((err) => {
                  console.log(err);
                });
             }
        },
    	Word: function(value){
       		return /^[A-Z][a-zA-Z]+(?:[\s-][A-Z][a-zA-Z]+)*$/.test(value);
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
            <a href="/#/orderTable">Moje porudzbine</a>
        </li>
        <li v-if="activeUser == true && role =='manager'">
            <a href="/#/ManagerOrders">Porudzbine</a>
        </li>
        <li v-if="activeUser == true && role =='deliverer'">
            <a href="/#/DeliveryOrders">Porudzbine</a>
        </li>
        <li v-if="activeUser == true && role =='deliverer'">
            <a href="/#/OrdersForOneDeliverer">Moje porudzbine</a>
        </li>
        <li v-if="activeUser == true && role =='manager'">
            <a href="/#/Requests">Zahtevi</a>
        </li>
        <li v-if="activeUser == true && role =='manager'">
            <a href="/#/ManagerComments">Komentari</a>
        </li>
	</ul>
   
   <h2>Profil</h2>
   
   <form @submit="formSubmit">
   <div class="container">
   
   		<label><b>Ime</b></label><br />
        <input type="text" v-bind:disabled="t" v-model="name"><br />
        
        <label><b>Prezime</b></label><br />
        <input type="text" v-bind:disabled="t" v-model="surname"><br />
        
        <label><b>Korisnicko ime</b></label><br />
        <input type="text" disabled v-model="username"><br />
            
        <label><b>Lozinka</b></label><br />
        <input type="text" v-bind:disabled="t" v-model="password"><br />
        
        <label><b>Datum rodjenja</b></label><br />
        <input type="text" v-bind:disabled="t" v-model="date"><br />
        
        <label><b>Pol</b></label>
        <div>
           <input type="radio" v-model="gender" v-bind:disabled="t" value="muski">
               <label>Muski</label>
        </div>
              <label></label>
        <div>
            <input type="radio" v-model="gender" v-bind:disabled="t" value="zenski" >
               <label>Zenski</label>
        </div><br />
           

        <button @click="Cancel" type="button">Nazad</button>
        <button @click="Edit" type="button">Izmeni</button>
        <button type="submit">Sacuvaj</button>

             
   </div>
   </form> 
   
   </div>
    
    `
  ,
  
});