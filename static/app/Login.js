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
        login(e) {

            axios
              .post('/login',{},{params:{username:this.userName,password:this.passWord}}
              )
	          .then(function(response){
                  
                if(JSON.parse(JSON.stringify(response.data))[0]===" "){
                    alert("Pogresno korisnicko ime ili lozinka");  
                }
                else{
                    localStorage.setItem('name', JSON.parse(JSON.stringify(response.data))[0]);
                    localStorage.setItem("role", JSON.parse(JSON.stringify(response.data))[1]);

                }
              });
               
          },
  
    },
	template: `
     <div>
         <h2>Ulogujte se!</h2>
      
             <form @submit="login" action="#/">      
        
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
	