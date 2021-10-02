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
       /* Delete(event){          
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
        },*/
    load(){
    	axios.get('/users')
		.then(response => {
           
            this.users = response.data;
        });
    },
    search: function(){
    	var parameter = "name=" + this.searchName + "&surname="+this.searchSurname + "&username=" + this.searchUsername + "&role=" + this.filterRole + "&type=" + this.filterType + "&sortCriteria=" + this.sortiranje;
    	
        axios.get('/searchUsers?' + parameter)
                    .then(response => {
                    	this.users=response.data;
        })
    },
	
   },
	template: ` 
	<div>
	
	<h2>Pregled korisnika</h2>
	<div>
		<div>
          	<table>
	          <tr><td><i>Ime: &nbsp</i></td><td><input type="text" v-model="searchName"  placeholder="Ime..."></td></tr>
	          <tr><td><i>Prezime: &nbsp</i></td><td><input type="text" v-model="searchSurname"  placeholder="Prezime..."></td></tr>
	          <tr><td><i>Korisnicko ime: &nbsp</i></td><td><input type="text" v-model="searchUsername"  placeholder="Korisnicko ime..."></td></tr>
	         
	      	  <tr><td><button v-on:click="search">Pretrazi</button></td></tr>
	      	</table>
	      </div>
	
		  <div>
          	<table>
	          <tr><td><i>Unesite tip korisnika: &nbsp</i></td><td><select style="width:210px; height:40px;"  v-model="filterType">
	                        <option  value="zlatni" ><i>Zlatni</i></option>
	                        <option  value="srebrni"><i>Srebrni</i></option>
	                         <option  value="bronzani"><i>Bronzani</i></option>
	                    </select></td></tr>
	          <tr><td><i>Unesite ulogu: &nbsp</i></td><td><select style="width:210px; height:40px;"  v-model="filterRole">
	                        <option  value="administrator" ><i>Administrator</i></option>
	                        <option  value="dostavljac"><i>Dostavljac</i></option>
	                        <option  value="menadzer" ><i>Menadzer</i></option>
	                        <option  value="kupac"><i>Kupac</i></option>

	                    </select></td></tr>
	          
	                    
   			</table>
   			<br> 
	                    <br>
	                    <br> <br> <br> <br <br> <br> <br> <br>
	                    <br> <br> 
	                   
	                
	                  
   		 </div>
		 <div>
          	<table>
	          <tr><td><i>Sortiraj: &nbsp</i></td><td><select style="width:210px; height:40px;"  v-model="sortCriteria">
	                        <option  value="name-rastuce" ><i>Ime - rastuce</i></option>
	                        <option  value="name-opadajuce"><i>Ime - opadajuce</i></option>
	                        <option  value="surname-rastuce" ><i>Prezime - rastuce</i></option>
	                        <option  value="surname-opadajuce"><i>Prezime - opadajuce</i></option>
	                        <option  value="username-rastuce" ><i>Korisnicko ime - rastuce</i></option>
	                        <option  value="username-opadajuce"><i>Korisnicko ime- opadajuce</i></option>
	                         <option  value="points-rastuce" ><i>Broj sakupljenih bodova - rastuce</i></option>
	                        <option  value="points-opadajuce"><i>Broj sakupljenih bodova - opadajuce</i></option>
	                    </select></td></tr>
	                    
   			</table>
   			<br>
	                    <br>
	                    <br> <br> <br> <br <br> <br> <br> <br> 
	                    <br>
	          
	                    
   		 </div>
		</div>
		
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
                        </tr>

                    </table>
		</div>
	</div>	  
`
});