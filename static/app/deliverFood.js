Vue.component("deliver-food", {
	data: function () {
		    
	},
	template: ` 
<div>
	<h1>Dostava hrane</h1>
	<h2>Brzo i lako za samo par minuta!</h2>

    <div class="row">
  		<div class="column">
    		<img src="images/pizza.jpg" width="660" height="300">
   		 	<img src="images/food.jpg" width="660" height="300">
  		</div>
  		<div class="column">
    		<img src="images/chinese.jpg" width="660" height="300">
   		 	<img src="images/barbecue.jpg" width="660" height="300">
  		</div>
  	</div>
  	
  	<h2>Prijavite se!</h2>
  	
  	<form action="action_page.php" method="post">	  

	 <div class="container">
	    <label for="uname"><b>Korisnicko ime</b></label><br />
	    <input type="text" placeholder="Unesite korisnicko ime" name="uname" required><br />
	
	    <label for="psw"><b>Lozinka</b></label><br />
	    <input type="password" placeholder="Unesite lozinku" name="psw" required><br />
	
	    <button type="submit">Login</button>
	    
	    <div class="container">
    		<p><b>Nemate nalog? Registrujte se </b><a href="#">Ovde</a>.</p>
  		</div>
	    
	  </div>
	  
</form>

</div>		  
`
});