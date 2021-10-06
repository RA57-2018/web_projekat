Vue.component("suspicioususers", {
    name: "suspicioususers",
    data: function () {
      return {
        users:[],
        role:"",
        type:"",
        name:"",
        surname:"",
        username:"",
        points:"",
        searchName: "",
        searchSurname: "",
        searchUsername: "",
        sortCriteria:"",
        roleFilter: "",
        typeFilter: "",
        activeUser: false,
    };
    },
    mounted: function(){
        this.username = window.localStorage.getItem('uName');
	    this.role = window.localStorage.getItem('role');
	    
	    if(this.role =="administrator" || this.role =="buyer" || this.role =="manager" || this.role =="deliverer"){
            this.activeUser = true;
        }
        
        this.load();					
    },
    methods: {
        load(){
            axios.get('/suspiciousUsers')
		.then(response => {
			this.users=response.data;
         
        });
        },
        
        block: function(username){
			axios
            .post('/blockSuspicious',{},{params:{user: username}}
            )
	          .then(function(response){
                  alert("Korisnik je blokiran!");
            });
			this.load();
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
    template:  ` 		
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
    
      <br />
	  <br />
	  <br />
   		<div> 
                    <table align="center"> 
                        <tr>
                            <th><i>Ime</i> </th>
                            <th><i>Prezime</i></th>
                            <th><i>Korisnicko ime</i></th>
                            <th><i>Uloga</i> </th>
                            <th><i>Tip kupca</i> </th>
                            <th> <i>Sakupljeni bodovi </i> </th>
                            <th></th>
                            
                        </tr>
                        <tr v-for="user in users">
                            <td>{{user.name}} </td>
                            <td> {{user.surname}}</td>
                            <td> {{user.username}}</td>
                            <td> {{user.role}} </td>
                            <td> {{user.type}} </td>
                            <td> {{user.points}} </td>
                            <td> <button v-on:click="block(user.username)">Blokiraj</button></td>
                      
                        </tr>
                    </table>
          
                </div>
    	</div>
`
    ,
    
  });