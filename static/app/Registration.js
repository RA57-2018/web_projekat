Vue.component("registration", {
  name: "registration",
  data: function () {
    return {
      name: null,
      surname: null,
      username: null,
      password:null,
      passwordConfirmation: null,
      date: null,
      gender: null,
      showErrorMessage: false,
  };
  },
    methods: {
    formSubmit: function (e) {
      e.preventDefault();
      this.errors = null;
			if(!this.name || !this.surname || !this.username || !this.password || !this.passwordConfirmation || !this.date || !this.gender){
				this.showErrorMessage = true;
				alert("Neophodno je uneti sve podatke!")
				e.preventDefault();
			}else if(this.passwordConfirmation != this.password){
        this.showErrorMessage = true;
				alert("Lozinke moraju biti iste!")
				e.preventDefault();
      }else{
        axios
        .post('/registration', {name: this.name, surname: this.surname,username: this.username,
        						password: this.password,gender : this.gender,
        						dateBirth : this.date
                    })
        .then(response => (	alert("Registracija uspesna!")));
      }

      
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
        </div>
        
        <label><b>Datum rodjenja</b></label><br />
              <div>
              <input v-model="date" type="date">
              </div>
            
        <input type="submit" value="Registruj se">
             
   </div>
   </form> 
   
   </div>
    
    `
  ,
  
});