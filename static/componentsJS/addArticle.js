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
	  imageShow: null,
	  imageForBackend: null,
	  error: null,
  };
  },
    methods: {
    Cancel: function(){
            router.replace({ path: `/home-page` })
    },
    formSubmit: function (e) {
      e.preventDefault();
      this.errors = null;
			if(!this.name || !this.price || !this.typeArtical || !this.imageForBackend){
				this.showErrorMessage = true;
				alert("Neophodno je uneti sve podatke!")
				e.preventDefault();
			}else if(!this.Number(this.price)){
			    alert("Cena mora biti ceo broj!")
			    e.preventDefault();
			}
			else{
        axios
        .post('/addArticle', {name: this.name, price: this.price, typeArtical: this.typeArtical,
        						quantity: this.quantity, description : this.description,
        						image : this.imageForBackend},{params:{username:this.username, name: this.name}})
        .then(function(response){ 
        
                if(JSON.parse(JSON.stringify(response.data))[0]===" "){
                    alert("Jelo vec postoji! Ime jela mora biti jedinstveno!");
                    
                }else{
        			alert("Uspesno dodat artikal!")
        			router.replace({ path: `/home-page` })
                }
        
           });
      }
      
    },
	ChangeImage: function(event){
       const file = event.target.files[0];
       this.createBaseImage(file);
       this.imageShow = (URL.createObjectURL(file));
      },
    createBaseImage(file){
       const reader= new FileReader();
 
       reader.onload = (e) =>{
             this.imageForBackend = (e.target.result);
           }
          reader.readAsDataURL(file);
      },
    Number: function (value) {
       return /^[0-9]+$/.test(value);
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
        <input type="file" v-on:change="ChangeImage"><br />
        
        <img v-if="!imageShow" src="" width="300" height="300">
        <img v-if="imageShow" :src="imageShow" width="300" height="300"><br />
           
        <button @click="Cancel" type="button">Nazad</button>
        <input class="inp" type="submit" value="Dodaj">
        
             
   </div>
   </form> 
   
   </div>
    
    `
  ,
  
});