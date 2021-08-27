Vue.component("deliver-food", {
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
	template: ` 

	<div>
	
	<div>
	   <ul>
	      <li style="float:left">
	         <a href="/#/">Pocetna stranica</a>
	      </li>
	       <li v-if="activeUser!=true">
                <a href="/#/registration">Registracija</a>
            </li>
            <li v-if="activeUser != true">
                <a href="/#/login">Prijava</a>
            </li>
          <li v-if="activeUser == true && role =='buyer'">
            <a href="/" @click="logout">Odjava</a>
          </li>
          <li v-if="activeUser == true && role =='buyer'">
            <a href="/#/add-restaurant">Dodaj restoran</a>
          </li>        
	   </ul>
	</div>

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