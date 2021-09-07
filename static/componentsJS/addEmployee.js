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
        						birthDate : this.date, role: this.rol },{params:{username:this.userName,password:this.passWord,role:this.rol}})
        .then(function(response){ 
        			alert("Uspesno dodat radnik!")
        			router.replace({ path: `/home-page` })
           });
      }

      
    },
    Word: function(value){
       return /^[A-Z][a-zA-Z]*$/.test(value);
      },

   },
   template: ` 
   <div>
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