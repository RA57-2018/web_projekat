Vue.component("managerComments", {
    name: "managerComments",
    data: function () {
      return {
        username: null,
        role:null,
        activeUser: false,
        buyers: [],
        comments: [],
        
    };
    },
    methods: { 
    load(){
        axios.get('/comments?username=' + this.username)
		.then(response => {          
           this.comments = response.data;        
        });
            
        axios.get('/buyers')
        	.then(response => {              
             this.buyers = response.data;
            
        });
        
        },
    findBuyer: function(value){
		let i = 0;
		for(i; i<this.buyers.length; i++){
			if(value === this.buyers[i].username){				    
				return this.buyers[i].name + " " + this.buyers[i].surname;				
			}
		}		
	},      
    logout: function (event) {
            event.preventDefault();
            localStorage.removeItem('role');
            localStorage.removeItem('uName');
            router.replace({ path: `/` })
			
       },
	myRestaurant: function(){
	    var parameter = "username=" + this.username;
		axios.get("/myRestaurant?" + parameter)
				.then(response => {
					this.id = response.data;
					router.push({ path: `/restaurant/${this.id}` })
				})
	},
	approveComment: function(id){			
			axios
            .post('/approveComment',{},{params:{id: id}})
	         .then(function(response){              
       			alert("Komentar je odobren!");
       			
            });
			this.load();
			
	},
	refuseComment: function(id){			
			axios
            .post('/refuseComment',{},{params:{id: id}})
	        .then(function(response){              
       			alert("Komentar je odbijen!");
       			
            });
			this.load();
			
	},
    },
    
    mounted: function() {
        this.username = window.localStorage.getItem('uName');
        this.role = window.localStorage.getItem('role');

 
         if(this.role =="administrator" || this.role =="buyer" || this.role =="manager" || this.role =="deliverer"){
            this.activeUser = true;
        }
        
        this.load();
        
    }, 
    template: 
    ` 
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
        <li v-if="activeUser == true && role =='manager'">
            <a href="/#/ManagerOrders">Porudzbine</a>
        </li>
        <li v-if="activeUser == true && role =='deliverer'">
            <a href="/#/DeliveryOrders">Porudzbine</a>
        </li>
        <li v-if="activeUser == true && role =='deliverer'">
            <a href="/#/OrdersForOneDeliverer">Moje porudzbine</a>
        </li>
        <li v-if="activeUser == true && role =='manager'">
            <a href="/#/Requests">Zahtevi</a>
        </li>
        <li v-if="activeUser == true && role =='manager'">
            <a href="/#/ManagerComments">Komentari</a>
        </li>
	</ul>
    
      <h1>Komentari</h1>
	  <br />
	  <br />
	  <br />
	  
      
      <table align="center"> 
      		<tr>
            	<th>Ime i prezime kupca</th>
                <th>Tekst</th>
                <th>Ocena</th> 
                <th>Odobri</th>  
                <th>Odbij</th>                       
            </tr>
            <tr v-for="comment in comments">
            	<td>{{findBuyer(comment.buyer)}}</td>
                <td>{{comment.text}}</td>
                <td>{{comment.rating}}</td> 
                <td><button v-on:click="approveComment(comment.id)">Odobri</button></td>
                <td><button v-on:click="refuseComment(comment.id)">Odbij</button></td>           
            </tr>
            

      </table>
   
   
    </div>
    `
    ,
    
  });