Vue.component("home-page", {
	data: function () {
		  return {

      }  
	},
	template: ` 
	<div>

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