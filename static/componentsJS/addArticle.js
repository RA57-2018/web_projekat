Vue.component("add-article", {
  name: "add-article",
  data: function () {
    return {
      name: null,
      price: null,
      typeArtical: null,
      quantity: null,
      description: null,
      image: null,
      username: "",
	  role: "",
  };
  },
    methods: {
    Cancel: function(){
            router.replace({ path: `/home-page` })
    },
    formSubmit: function (e) {
      e.preventDefault();
      this.errors = null;
			if(!this.name || !this.price || !this.typeArtical || !this.image){
				this.showErrorMessage = true;
				alert("Neophodno je uneti sve podatke!")
				e.preventDefault();
			}else{
        axios
        .post('/addArticle', {name: this.name, price: this.price, typeArtical: this.typeArtical,
        						quantity: this.quantity, description : this.description,
        						image : this.image},{params:{username:this.username}})
        .then(function(response){ 
        			alert("Uspesno dodat artikal!")
        			router.replace({ path: `/home-page` })
           });
      }

      
    },

   },
     mounted: function () {
        this.username = window.localStorage.getItem('uName');
	    this.role = window.localStorage.getItem('role');

    },
   template: ` 
   <div>
   <form @submit="formSubmit">
   <div class="container">
   
   		<label><b>Ime</b></label><br />
        <input type="text" placeholder="Unesite ime" required v-model="name"><br />
        
        <label><b>Cena</b></label><br />
        <input type="text" placeholder="Unesite cenu" required v-model="price"><br />
        
		<label><b>Tip</b></label>
        <div>
           <input type="radio" v-model="typeArtical" value="jelo">
               <label>Jelo</label>
        </div>
              <label></label>
        <div>
            <input type="radio" v-model="typeArtical" value="pice" >
               <label>Pice</label>
        </div><br />
            
        <label><b>Kolicina</b></label><br />
        <input type="text" placeholder="Unesite kolicinu u gramima ili mililitrima" v-model="quantity"><br />
        
        <label><b>Opis</b></label><br />
        <input type="text" placeholder="Unesite opis" v-model="description"><br />
        
        <label><b>Slika</b></label><br />
        <input type="text" placeholder="Unesite sliku" v-model="image"><br />
           
        <button @click="Cancel" type="button">Nazad</button>
        <input class="inp" type="submit" value="Dodaj">
             
   </div>
   </form> 
   
   </div>
    
    `
  ,
  
});