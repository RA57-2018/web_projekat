Vue.component("home-page", {
	data: function () {
		  return {
            username: "",
	        role: "",
	        activeUser: false,
      }  
	},
    methods: {
    logout: function (event) {
            event.preventDefault();
            localStorage.removeItem('role');
            localStorage.removeItem('uName');
            router.replace({ path: `/` })
			
       },
    },
    mounted: function () {
        this.username = window.localStorage.getItem('uName');
	    this.role = window.localStorage.getItem('role');
        console.log(this.role);
        if(this.role =="administrator" || this.role =="buyer" || this.role =="manager" || this.role =="deliverer"){
            this.activeUser = true;
        }
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
        <li v-if="activeUser == true && (role =='administrator' |  role =='buyer' |  role =='manager' |  role =='deliverer')">
            <a href="/#/profile">Profil</a>
        </li>        
	</ul>

	<h1>Dostava hrane</h1>
	<h2>Brzo i lako za samo par minuta!</h2>


  	<div class="row">
	  <div class="column">
	    <img src="../images/foodPicture.jpg">
	  </div>
	  <div class="column">
	    <img src="../images/restaurant1.jpg">
	  </div>
    </div>
     
     
    <h2>Restorani</h2>


 	<div class="column">
	 <div class="gallery">
	  <a href="#/login">
	    <img src="images/pizza.jpg">
	  </a>
	  <div class="desc">Add a description here</div>
	</div>
	</div>
	
	<div class="column">
	 <div class="gallery">
	  <a href="#/login">
	    <img src="images/pasta.jpg">
	  </a>
	  <div class="desc">Add a description here</div>
	</div>
	</div>
	
	<div class="column">
	 <div class="gallery">
	  <a href="#/login">
	    <img src="images/chinese.jpg">
	  </a>
	  <div class="desc">Add a description here</div>
	</div>
	</div>
	
    <div class="column">
	 <div class="gallery">
	  <a href="#/login">
	    <img src="images/barbecue.jpg">
	  </a>
	  <div class="desc">Add a description here</div>
	</div>
	</div>

	</div>	  
`
});