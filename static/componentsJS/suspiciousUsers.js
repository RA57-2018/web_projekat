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
    };
    },
    mounted: function(){
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
        
    },
    template: 
    ` 		<div>
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