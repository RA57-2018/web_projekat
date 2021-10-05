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
            searchName: "",
            searchSurname: "",
            searchUsername: "",
            filterRole: "",
            filterType: "",
      }  
	},
	mounted: function(){
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
    search: function(){
    	var par = "name=" + this.searchName + "&surname="+this.searchSurname + "&username=" + this.searchUsername + "&role=" + this.filterRole + "&type=" + this.filterType + "&sortCriteria=" + this.sortCriteria;
    	console.log(par);
        axios.get('/searchUsers?' + par)
                    .then(response => {
                    	this.users=response.data;
        });
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
	
   },
	template: ` 
	<div>
	
	<h2>Pregled korisnika</h2>
	<div>
		<div>
          	<table>
	          <tr><td>Ime: &nbsp</td><td><input type="text" v-model="searchName"  placeholder="Ime..."></td></tr>
	          <tr><td>Prezime: &nbsp</td><td><input type="text" v-model="searchSurname"  placeholder="Prezime..."></td></tr>
	          <tr><td>Korisnicko ime: &nbsp</td><td><input type="text" v-model="searchUsername"  placeholder="Korisnicko ime..."></td></tr>
	         
	      	  <tr><td><button v-on:click="search">Pretrazi</button></td></tr>
	      	</table>
	      </div>
	
		  <div>
          	<table>
	          <tr><td>Unesite tip korisnika: &nbsp</td><td><select style="width:210px; height:40px;"  v-model="filterType">
	                        <option  value="zlatni" >Zlatni</option>
	                        <option  value="srebrni">Srebrni</option>
	                         <option  value="bronzani">Bronzani</option>
	                    </select></td></tr>
	          <tr><td>Unesite ulogu: &nbsp</td><td><select style="width:210px; height:40px;"  v-model="filterRole">
	                        <option  value="administrator" >Administrator</option>
	                        <option  value="dostavljac">Dostavljac</option>
	                        <option  value="menadzer" >Menadzer</option>
	                        <option  value="kupac">Kupac</option>

	                    </select></td></tr>
	          
	                    
   			</table>
   			<br> 
   		 </div>
		 <div>
          	<table>
	          <tr><td>Sortiraj: &nbsp</td><td><select style="width:210px; height:40px;"  v-model="sortCriteria">
	                        <option  value="ime-rastuce" ><i>Ime - rastuce</i></option>
	                        <option  value="ime-opadajuce"><i>Ime - opadajuce</i></option>
	                        <option  value="prezime-rastuce" ><i>Prezime - rastuce</i></option>
	                        <option  value="prezime-opadajuce"><i>Prezime - opadajuce</i></option>
	                        <option  value="kIme-rastuce" ><i>Korisnicko ime - rastuce</i></option>
	                        <option  value="kIme-opadajuce"><i>Korisnicko ime- opadajuce</i></option>
	                         <option  value="brBodova-rastuce" ><i>Broj sakupljenih bodova - rastuce</i></option>
	                        <option  value="brBodova-opadajuce"><i>Broj sakupljenih bodova - opadajuce</i></option>
	                    </select></td></tr>
	                    
   			</table>
   			<br>
	                    
   		 </div>
		</div>
		
		<div>
			<table> 
                        <tr>
                            <th>Ime</th>
                            <th>Prezime</th>
                            <th>Korisnicko ime</th>
                            <th>Uloga</th
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