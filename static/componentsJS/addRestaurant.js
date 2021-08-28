Vue.component("add-restaurant", {
  name: "add-restaurant",
  data: function () {
    return {
    	restaurantId: null,
        restaurant: null,
        location: null,
        address: null,
        nameR: null,
        type: null,
        status: null,
        longitude: null,
        latitude: null,
        streetName: null,
        number: null,
        city: null,
        postalCode: null,
  };
  },
    methods: {
    	 Cancel: function(){
             router.replace({ path: `/home-page` })
    	 },
        createR: function(e){
        	e.preventDefault();
        	this.errors = null;
        	if(!this.nameR || !this.type || !this.status || !this.longitude || !this.latitude || !this.streetName || !this.number || !this.city || !this.postalCode){
				this.showErrorMessage = true;
				alert("Neophodno je uneti sve podatke!")
				e.preventDefault();
			}else{
				axios
		        .post('/add-restaurant'/* , {name: this.restaurant.nameR, type: this.restaurant.type, status: this.restaurant.status,
		        	longitude: this.location.longitude, latitude : this.location.latitude,
		        	streetName : this.address.streetName, number: this.address.number, city : this.address.city,
		        	postalCode : this.address.postalCode}*/)
		        .then(function(response){ 
		        			alert("Uspesno dodat restoran!")
		        			//router.replace({ path: `/home-page` })
		           });
			}
        },
},

   template: ` 
	   <div>
   <form @submit="createR">
   <div class="container">
   
   		<label><b>Naziv restorana</b></label><br />
        <input type="text" placeholder="Unesite naziv restorana" required v-model="nameR"><br />
        
        <label><b>Tip restorana</b></label>
        <div>
           <input type="radio" v-model="type" value="kineski">
               <label>Kineski</label>
        </div>
              <label></label>
        <div>
            <input type="radio" v-model="type" value="italijanski" >
               <label>Italijanski</label>
        </div>
        	<label></label>
        <div>
            <input type="radio" v-model="type" value="rostilj" >
               <label>Rostilj</label>
        </div>
        	<label></label>
        <div>
            <input type="radio" v-model="type" value="pizza" >
               <label>Pizza</label>
        </div><br />
        
        <label><b>Status restorana</b></label><br />
        <input type="text" placeholder="Unesite status restorana" required v-model="status"><br />
        
        <label><b>Geografska duzina</b></label><br />
        <input type="text" placeholder="Unesite geografsku duzinu" required v-model="longitude"><br />
            
        <label><b>Geografska sirina</b></label><br />
        <input type="text" placeholder="Unesite geografsku sirinu" required v-model="latitude"><br />
        
        <label><b>Ulica</b></label><br />
        <input type="text" placeholder="Unesite ulicu" required v-model="streetName"><br />
        
        <label><b>Broj</b></label><br />
        <input type="text" placeholder="Unesite broj" required v-model="number"><br />
        
        <label><b>Grad</b></label><br />
        <input type="text" placeholder="Unesite grad" required v-model="city"><br />
        
        <label><b>Postanski broj</b></label><br />
        <input type="text" placeholder="Unesite postanski broj" required v-model="postalCode"><br />
        
        <button @click="Cancel" type="button">Nazad</button>  
        <input class="inp" type="submit" value="Dodaj restoran">
             
   </div>
   </form> 
   
   </div>
    
    `
  ,
});