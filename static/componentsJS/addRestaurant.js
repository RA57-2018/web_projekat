Vue.component("add-restaurant", {
  name: "add-restaurant",
  data: function () {
    return {
      name: null,
      type: null,
      longitude: null,
      latitude: null,
      streetName: null,
      number: null,
      city: null,
      postalCode: null,
      logo: null,
  };
  },
    methods: {
    formSubmit: function (e) {
      e.preventDefault();
      this.errors = null;
        axios
        .post('/add-restaurant', {name: this.name, type: this.type,
        					      longitude: this.longitude,
        					      latitude: this.latitude,
        					      streetName: this.streetName,
        					      number: this.number,
        					      city: this.city,
        					      postalCode: this.postalCode,
        					      logo: this.logo})
        .then(response => (	alert("Restoran je uspesno dodat!")));

    },
},

   template: ` 
   <div>
   <form @submit="formSubmit">
   <div class="container">
   
   		<label><b>Naziv restorana</b></label><br />
        <input type="text" placeholder="Unesite naziv restorana" required v-model="name"><br />
        
        <label><b>Tip restorana</b></label>
        <div>
           <input type="radio" v-model="type" value="kineski">
               <label>Kineski</label>
        </div>
              <label></label>
        <div>
            <input type="radio" v-model="type" value="rostilj" >
               <label>Rostilj</label>
        </div>
        	<label></label>
        <div>
            <input type="radio" v-model="type" value="italijanski" >
               <label>Italijanski</label>
        </div>
        	<label></label>
        <div>
            <input type="radio" v-model="type" value="pizza" >
               <label>Pizza</label>
        </div>
        
        <label><b>Lokacija restorana</b></label><br />
        <input type="text" placeholder="Unesite geografsku duzinu" required v-model="longitude"><br />
        <input type="text" placeholder="Unesite geografsku sirinu" required v-model="latitude"><br />
        <input type="text" placeholder="Unesite ulicu" required v-model="streetName"><br />
        <input type="text" placeholder="Unesite broj" required v-model="number"><br />
        <input type="text" placeholder="Unesite grad" required v-model="city"><br />
        <input type="text" placeholder="Unesite postanski broj" required v-model="postalCode"><br />
        
       	<label><b>Izaberite logo restorana</b></label>
        <div>
           <input type="radio" v-model="logo" value="../images/chinese.jpg">
               <img src="../images/chinese.jpg">
        </div>
              <label></label>
        <div>
            <input type="radio" v-model="logo" value="../images/barbecue.jpg" >
               <img src="../images/barbecue.jpg">
        </div>
        	<label></label>
        <div>
            <input type="radio" v-model="logo" value="../images/pasta.jpg" >
               <img src="../images/pasta.jpg">
        </div>
        	<label></label>
        <div>
            <input type="radio" v-model="logo" value="../images/pizza.jpg" >
               <img src="../images/pizza.jpg">
        </div>
        
        <input type="submit" value="Dodaj restoran">
             
   </div>
   </form> 
   
   </div>
    
    `
  
});