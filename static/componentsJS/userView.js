Vue.component("user-view", {
	data: function () {
		  return {
            username: "",
	        role: "",
	        activeUser: false,
	        userList: [],
	        sortCriteria: "",
            sortType: "",
      }  
	},
    methods: {
	checkUser: function(username){
			router.push({ path: `/buyer/${username}` })
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
					this.userList.sort(this.compareSurname);
				}
				else if(this.sortCriteria == "korisnicko ime")
				{
					this.userList.sort(this.compareUsername);
				}
				else
				{
					this.userList.sort(this.compareData);
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
		compareSurname: function(o,t){
			let first1, second1;
			if(this.sortCriteria == "prezime")
			{
				first1 = o.surname;
				second1 = t.surname;
			}
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
		compareData: function(o,t){
			let f, s;
			if(this.sortCriteria == "korisnicko ime")
			{
				f = o.username;
				s = t.username;
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

    },
    mounted: function () {
        this.username = window.localStorage.getItem('name');
	    this.role = window.localStorage.getItem('role');
        console.log(this.role);
        if(this.role =="administrator"){
            this.activeUser = true;
        }
        
    axios.get("/users")
    	.then(response => {
    		this.userList = response.data;
    	});
    },
	template: ` 
	<div>
	
	<h2>Pregled korisnika</h2>
	
    <div>
    	<label for="sortCriteria"><b>Sortiranje</b></label><br />
    	<label><b>Kriterijum</b></label>
    	
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


<div v-for="(user, username) in userList">
 	<div class="column">
	  <div class="desc">
	  	<h2>{{ user.name }}</h2>
	  	<ul>
			<li style="float:left"><b>Ime:</b> {{ user.name }}</li><br />
			<li style="float:left"><b>Prezime:</b> {{ user.surname }}</li><br />
			<li style="float:left"><b>Korisnicko ime:</b> {{ user.username }} </li><br />
		</ul>
	  </div>
	</div>
</div>	
</div>

	</div>	  
`
});