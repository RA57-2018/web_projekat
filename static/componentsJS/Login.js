Vue.component("login", {
	name: "login",
    data: function () {
      return {
        userName: null,
        passWord:null,
        showErrorMessage: false,
    };	    
	},
    methods: {
    formSubmit: function (e) {
      e.preventDefault();
      this.errors = null;
        axios
        .post('/login', {username: this.userName, password: this.passWord})
        .then(response => (	alert("Prijava uspesna!")));
     
    },

  },
	template: `
     <div>
         <h2>Ulogujte se!</h2>
      
             <form @submit="formSubmit">      
        
             <div class="container">
                <label><b>Korisnicko ime</b></label><br />
                <input type="text" placeholder="Unesite korisnicko ime" required v-model="userName"><br />
            
                <label><b>Lozinka</b></label><br />
                <input type="password" placeholder="Unesite lozinku" required v-model="passWord"><br />
            
                <input type="submit" value="Uloguj se">
                
              </div>
              
            </form>
    </div>   
    `
    ,
});
	