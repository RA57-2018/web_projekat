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

    };
    },
    mounted: function(){
        this.uName = window.localStorage.getItem('uName');
        axios.get('/profile?username='+this.uName)
		.then(response => {
            this.name = response.data.name;
            this.surname = response.data.surname;
            this.username = response.data.username;
            this.password = response.data.password;
            this.date = response.data.birthDate;
            this.gender = response.data.gender;


        });
							
    },
    methods: {
        Edit: function(){
            this.t = false;
            this.backup.name = this.name;
            this.backup.surname = this.surname;
            this.backup.password = this.password;
            this.backup.gender = this.gender;
        },
        Cancel: function(){
            this.t = true;
            this.backup.name = this.name;
            this.backup.surname = this.surname;
            this.backup.username = this.username;
            this.backup.password = this.password;
            this.backup.date = this.date;
            this.backup.gender = this.gender;
            router.replace({ path: `/home-page` })
        },
        formSubmit: function(e){
            e.preventDefault();
                axios
                .post('/updateProfile',{name: this.name, surname: this.surname, username : this.username, password: this.password,
                    date : this.date,gender : this.gender}, {params:{username:this.username}})
                .then((response) => {
                  alert("Uspesno ste izmenili podatke! ");
                  this.backup = {};
                })
                .catch((err) => {
                  console.log(err);
                });
        }
  
    },
   template: ` 
   <div>
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