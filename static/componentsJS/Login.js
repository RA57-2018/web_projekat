Vue.component("login", {
	name: "login",
    data: function () {
      return {
        userName: null,
        passWord: null,
        showErrorMessage: false,
        role: "",
	    activeUser: false,
    };	    
	},
    methods: {      
    formSubmit: function (e) {
      e.preventDefault();
      this.errors = null;
        axios
        .post('/login',{},{params:{username:this.userName,password:this.passWord}})
        .then(function(response){                
                if(JSON.parse(JSON.stringify(response.data))[0]===" "){
                    alert("Pogresno korisnicko ime ili lozinka!");                    
                }else{
                	if(JSON.parse(JSON.stringify(response.data))[0]==="blokiran"){
                		alert("Nalog vam je blokiran ili obrisan!");
                	}
                	else{
                		alert("Prijava uspesna!")
                		localStorage.setItem('uName', JSON.parse(JSON.stringify(response.data))[0]);
                		localStorage.setItem('role', JSON.parse(JSON.stringify(response.data))[1]);
                		router.replace({ path: `/home-page` })
                	}
                }
              });       	     
      },

    },
	template: `
     <div>
     
     <ul>
        <li v-if="activeUser != true" style="float:left">
            <a href="/#/">Pocetna stranica</a>
        </li>
    </ul>
     
         <h2>Ulogujte se!</h2>
      
             <form @submit="formSubmit">      
        
             <div class="container">
                <label><b>Korisnicko ime</b></label><br />
                <input type="text" placeholder="Unesite korisnicko ime" required v-model="userName"><br />
            
                <label><b>Lozinka</b></label><br />
                <input type="password" placeholder="Unesite lozinku" required v-model="passWord"><br />
            
                <input class="inp" type="submit" value="Uloguj se">
                
              </div>
              
            </form>
    </div>   
    `
    ,
});
	