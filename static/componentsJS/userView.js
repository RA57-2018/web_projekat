Vue.component("user-view", {
	name: "user-view",
	data: function () {
		  return {
            username: "",
	        role: "",
	        activeUser: false,
	        users: [],
	        sortCriteria: "",
            sortType: "",
            searchName: "",
            searchSurname: "",
            searchUsername: "",
            filterType: "",
      }  
	},
    methods: {
        Delete(event){          
            userName = event.target.id;
            for(var i =0; i<this.users.length; i++){
                if(this.users[i].username == userName && this.users[i].role =="administrator"){
                    alert("Ne mozete da obrisete administratora!");
                }else if(this.users[i].username == userName){
                    axios
                .post('/delete',{}, {params:{username:userName}})
                .then((response) => {
                  alert("Uspesno obrisan korisnik!");
                  this.users = [];
                  this.refresh();
                  
                })
                .catch((err) => {
                  console.log(err);
                });
                }
            }
        },
    refresh(){
    	axios.get('/users')
		.then(response => {
           
            for(var i =0;i< response.data.length;i++){
                var user = {};
                user.name = response.data[i].name;
                user.surname = response.data[i].surname;
                user.username = response.data[i].username;
                user.role = "kupac";
                this.users.push(user);
            }
         
        });
    	axios.get('/deliverers')
		.then(response => {
           
            for(var i =0;i< response.data.length;i++){
                var user = {};
                user.name = response.data[i].name;
                user.surname = response.data[i].surname;
                user.username = response.data[i].username;
                user.role = "dostavljac";
                this.users.push(user);
            }
         
        });
    	axios.get('/managers')
		.then(response => {
           
            for(var i =0;i< response.data.length;i++){
                var user = {};
                user.name = response.data[i].name;
                user.surname = response.data[i].surname;
                user.username = response.data[i].username;
                user.role = "menadzer";
                this.users.push(user);
            }
         
        });
    	},
    	search: function(){
    		if(this.searchName == "" && this.searchSurname == "" && this.searchUsername == ""){
    			alert("Unesite parametar za pretragu!");
    		}else{
    			var searchParameters = "searchName=" + this.searchName+ "&searchSurname=" + this.searchSurname+ "&searchUsername=" + this.searchUsername;
    			axios.get("/searchUsers?" + searchParameters)
    				.then(response => {
    					this.users = response.data;
    				})
    		}
    	},
	sortiraj: function(){
			if(this.sortCriteria != "ime" && this.sortCriteria != "prezime" && this.sortCriteria != "korisnicko ime")
			{
				alert("Morate uneti kriterijum sortiranja pretrage!");
			}
			else if(this.sortType != "opadajuce" && this.sortType != "rastuce")
			{
				alert("Morate uneti smer sortiranja pretrage!");
			}
			else
			{
				if(this.sortCriteria == "prezime")
				{
					this.users.sort(this.compareSurname);
				}
				else if(this.sortCriteria == "korisnicko ime")
				{
					this.users.sort(this.compareUsername);
				}
				else
				{
					this.users.sort(this.compareData);
				}
										
			}
		},
	compareData: function(o,t){
			let first, second;
			if(this.sortCriteria == "ime")
			{
				first = o.name;
				second = t.name;
			}
			if(first < second)
			{
				if(this.sortType == 'rastuce')
				{
					return -1;
				}
				else
				{
					return 1;
				}
			}
			else if(first > second)
			{
				if(this.sortType == 'opadajuce')
				{
					return 1;
				}
				else
				{
					return -1;
				}
			}
			else
			{
				return 0;
			}

		},
		compareSurname: function(o,t){
			let first1 = o.surname;
			let second1 = t.surname;
			if(first1 < second1)
			{
				if(this.sortType == 'rastuce')
				{
					return -1;
				}
				else
				{
					return 1;
				}
			}
			else if(first1 > second1)
			{
				if(this.sortType == 'opadajuce')
				{
					return 1;
				}
				else
				{
					return -1;
				}
			}
			else
			{
				return 0;
			}

		},
		compareUsername: function(o,t){
			let f = o.username;
			let s = t.username;
			
			if(f < s)
			{
				if(this.sortType == 'rastuce')
				{
					return -1;
				}
				else
				{
					return 1;
				}
			}
			else if(f > s)
			{
				if(this.sortType == 'opadajuce')
				{
					return 1;
				}
				else
				{
					return -1;
				}
			}
			else
			{
				return 0;
			}

		},

    },
    mounted: function () {
    	this.refresh();
    },
	template: ` 
<div>
	
	<h2>Pregled korisnika</h2>
	
	<div>
		<input type="text" v-model="searchName" placeholder="Pretrazite po imenu" style="margin: 0.3em; width: 12em;">
		<input type="text" v-model="searchSurname" placeholder="Pretrazite po prezimenu" style="margin: 0.3em; width: 12em;">
		<input type="text" v-model="searchUsername" placeholder="Pretrazite po korisnickom imenu" style="margin: 0.3em; width: 12em;">
		<button v-on:click="search">Pretrazi</button>
	</div>
	
    <div>
		<label>Filteri</label>
    	<select v-model="filterType" style="margin: 0.3em; width: 29.2em;">
    		<option value="normalan">normalan</option>
    		<option value="zlatni">zlatni</option>
    		<option value="srebrni">srebrni</option>
    		<option value="bronzani">bronzani</option>
    	</select>
    </div>
    <div>
		<label for="sortCriteria">Sortiranje</label>
		<select v-model="sortCriteria" style="margin: 0.6em; width: 15em;">
						<option value="ime">Ime</option>
						<option value="prezime">Prezime</option>
						<option value="korisnicko ime">Korisnicko ime</option>
		</select>  
        <label><b>Smer</b></label>
		<select v-model="sortType" style="margin: 0.6em; width: 15em;">
						<option value="rastuce">Rastuce</option>
						<option value="opadajuce">Opadajuce</option>
		</select>
		<button v-on:click="sortiraj">Sortiraj</button>
	</div>


<div v-for="(user, username) in users">
 	<div class="column">
	  	<h2>{{ user.name }}</h2>
	  	<ul>
			<li style="float:left"><b>Ime:</b> {{ user.name }}</li><br />
			<li style="float:left"><b>Prezime:</b> {{ user.surname }}</li><br />
			<li style="float:left"><b>Korisnicko ime:</b> {{ user.username }} </li><br />
			<li style="float:left"><b>Uloga:</b> {{ user.role }} </li><br />
			<li style="float:left"><button type="button" @click="Delete" :id="user.username">Obrisi</button></li>
		</ul>
	</div>
</div>	
</div>	  
`
});