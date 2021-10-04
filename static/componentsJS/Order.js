Vue.component("order", {
  name: "order",
  data: function(){
    return {    
      articles: [],  
	  username: null,
      user: localStorage.getItem('uName'),
      errorMessage: "",
     
    }
  },
  
  methods: {
	  articlesOrder: function() {
	      let id = this.$route.params.id;
	      axios.get('/articlesOrder?id=' + id)
	      .then(response => {
	        this.articles = response.data;
    
	      })
	      .catch(error =>{
	        console.log(error);
	      });
	    },
  },
   
  mounted: function() {
    this.username = window.localStorage.getItem('uName');
	this.articlesOrder();
   }, 
 

  template: `
<div>        
	  	<center>
	  		<h3><i>Artikli porudzbine</i></h3>
	  	</center>
	  	 <div v-for="(articleInBasket, index) in articles">

             <div>
                      <br> <br>
               	<div>
                 	<br>
                	<center>
                 	<img :src="articleInBasket.artical.image" width="200em" height="200em"> 
                 	</center>

                    	<div>
                        <h5><i>{{ articleInBasket.artical.name }}</i></h5>
                        <p><i>Cijena: {{ articleInBasket.artical.price }}</i></p>
                        <p><i>Tip: {{ articleInBasket.artical.typeArtical }}</i></p>
                        <p><i>Kolicina: {{ articleInBasket.artical.quantity }}</i></p>
                        <p><i>Opis: {{ articleInBasket.artical.description }}</i></p>
                   		</div>
                 </div>
             </div>
       </div>
  </div>	

  `
});