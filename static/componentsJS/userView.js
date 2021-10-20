Vue.component("user-view", {
	name: "user-view",
	data: function () {
		  return {
			users: [],
	        role: "",
	        type: "",
	        name: "",
	        surname: "",
	        username: "",
	        points: "",
	        sortCriteria: "",
	        sortType: "",
            searchName: "",
            searchSurname: "",
            searchUsername: "",
            activeUser: false,
      }  
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
    load(){
    	axios.get('/users')
		.then(response => {
            this.users = response.data;
        });
    },
    sortThisUser: function(){
		if(this.sortCriteria != "ime" && this.sortCriteria != "prezime" && this.sortCriteria != "korisnicko ime" && this.sortCriteria != "broj bodova")
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
				this.users.sort(this.compareSurname)
			}
			else if(this.sortCriteria == "korisnicko ime")
			{
				this.users.sort(this.compareUsername)
			}
			else if(this.sortCriteria == "broj bodova")
			{
				this.users.sort(this.comparePoints)
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
			if(this.sortType == 'rastuce')
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
	compareSurname: function(o, t){
		let f, s;
		if(this.sortCriteria == "prezime")
		{
			f = o.surname;
			s = t.surname;
		}
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
			if(this.sortType == 'rastuce')
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
	compareUsername: function(o, t){
		let f1, s1;
		if(this.sortCriteria == "korisnicko ime")
		{
			f1 = o.username;
			s1 = t.username;
		}
		if(f1 < s1)
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
		else if(f1 > s1)
		{
			if(this.sortType == 'rastuce')
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
	comparePoints: function(o, t){
		let ff, ss;
		if(this.sortCriteria == "broj bodova")
		{
			ff = o.points;
			ss = t.points;
		}
		if(ff < ss)
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
		else if(ff > ss)
		{
			if(this.sortType == 'rastuce')
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
	search: function(){
		if(this.searchName == "" && this.searchSurname == "" && this.searchUsername == ""){
			alert("Unesite parametar za pretragu!");
		}else{
			var searchParameters = "searchName=" + this.searchName + "&searchSurname=" + this.searchSurname + "&searchUsername=" + this.searchUsername;
			axios.get("/searchUsers?" + searchParameters)
				.then(response => {
					this.users = response.data;
				})
		}
	},
    block: function(username){
    	axios
        .post('/block',{},{params:{user: username}}
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
	
	<h2>Pregled korisnika</h2>
	<div>
		<div>
    	<label for="sortCriteria"><b>Sortiranje</b></label><br />
    	<label><b>Kriterijum</b></label>
    	
		<select v-model="sortCriteria" style="margin: 0.6em; width: 15em;">
						<option value="ime">Ime korisnika</option>
						<option value="prezime">Prezime korisnika</option>
						<option value="korisnicko ime">Korisnicko ime korisnika</option>
						<option value="broj bodova">Broj bodova</option>
		</select>    	

        <label><b>Smer</b></label>
		<select v-model="sortType" style="margin: 0.6em; width: 15em;">
						<option value="rastuce">Rastuce</option>
						<option value="opadajuce">Opadajuce</option>
		</select>
		<button v-on:click="sortThisUser">Sortiraj</button>
	</div>
	<div>
		<input type="text" v-model="searchName" placeholder="Pretrazite po imenu" style="margin: 0.3em; width: 12em;">
		<input type="text" v-model="searchSurname" placeholder="Pretrazite po prezimenu" style="margin: 0.3em; width: 15em;">
		<input type="text" v-model="searchUsername" placeholder="Pretrazite po korisnickom imenu" style="margin: 0.3em; width: 18em;">
		<button v-on:click="search">Pretrazi</button>
	</div>
		
		</div>
		
		<div>
			<table> 
                        <tr>
                            <th>Ime</th>
                            <th>Prezime</th>
                            <th>Korisnicko ime</th>
                            <th>Uloga</th>
                            <th>Tip kupca</th>
                            <th>Sakupljeni bodovi</th>
                            <th></th>
                            
                        </tr>
                        <tr v-for="user in users">
                            <td>{{user.name}} </td>
                            <td> {{user.surname}}</td>
                            <td> {{user.username}}</td>
                            <td> {{user.role}} </td>
                            <td> {{user.type}} </td>
                            <td v-if="user.role=='kupac'"> {{user.points}} </td>
                            <td v-if="user.role=='administrator'">&nbsp</td>
                            <td v-if="user.role=='dostavljac'">&nbsp</td>
                            <td v-if="user.role=='menadzer'">&nbsp</td>
                      		<td v-if="user.role=='kupac' || user.role=='menadzer' || user.role=='dostavljac' "> <button v-on:click="block(user.username)">Blokiraj</button></td>
                        </tr>

                    </table>
		</div>
	</div>	  
`
});