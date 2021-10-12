Vue.component("comment", {
    name: "comment",
    data: function () {
      return {
        userName: null,
        role:null,
        text: null,
        rating: null,
        activeUser: false,
        
    };
    },
    methods: {       
    	sentComment: function(e){   
    	    e.preventDefault();		
    		let id = this.$route.params.id
    		if(this.text == null || this.rating == null) {
    			alert("Morate popuniti sva polja!");
    			e.preventDefault();
    		}else{
	    		axios
	            .post('/sentComment', {buyer: this.userName, 
	                        restaurant: id,
	                        text: this.text,
	                        rating: this.rating,
	                        })
		          .then(function(response){
	                  alert("Komentar je poslat!");
            });
			}
		},
    Cancel: function(){
    		let id = this.$route.params.id
            router.replace({ path: `/restaurant/${id}` })
    },
    logout: function (event) {
            event.preventDefault();
            localStorage.removeItem('role');
            localStorage.removeItem('uName');
            router.replace({ path: `/` })
			
       },
    },
    
    mounted: function() {
        this.userName = window.localStorage.getItem('uName');
        this.role = window.localStorage.getItem('role');

 
         if(this.role =="administrator" || this.role =="buyer" || this.role =="manager" || this.role =="deliverer"){
            this.activeUser = true;
        }
        
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
        <li v-if="activeUser == true && (role =='administrator' |  role =='buyer' |  role =='manager' |  role =='deliverer')">
            <a href="/#/profile">Profil</a>
        </li>    
        <li v-if="activeUser == true && role =='buyer'">
            <a href="/#/basket">Moja korpa</a>
        </li> 
        <li v-if="activeUser == true && role =='buyer'">
            <a href="/#/orderTable">Moje porudzbine</a>
        </li>
	</ul>
    
    <form @submit="sentComment">
    	
    	<h1>Komentar</h1>
    	<br />
    	<br />
    	<br />
    	<br />
    	<br />
    	<div>
    		
	    	<center><label><b>Komentar:</b></label></center>
	    	<center><textarea rows="7" cols="100" v-model="text"></textarea></center><br />
    		

    		<center><label><b>Ocena:</b></label></center>
    		<center><select style="width:100px; height:30px;"  v-model="rating">
               	<option  value="1">1</option>
             	<option  value="2">2</option>
             	<option  value="3">3</option>
             	<option  value="4">4</option>
             	<option  value="5">5</option>
           	</select></center><br /><br />
    		
    		<center><button @click="Cancel" type="button">Nazad</button>
    		<input class="inp" type="submit" value="Posalji"></center>
     	</div>
    </form>
    </div>
    `
    ,
    
  });