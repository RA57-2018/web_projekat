Vue.component("comment", {
    name: "comment",
    data: function () {
      return {
        userName: null,
        role:null,
        text: null,
        rating: null,
        
    };
    },
    methods: {
       
    	sentComment: function(e){
    		
    		let id = this.$route.params.id;
    		if(this.text == null || this.rating == null) {
    			alert("Morate popuniti sva polja!");
    			e.preventDefault();
    		} else {
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
    },
    
    mounted: function() {
        this.userName = window.localStorage.getItem('uName');
        this.role = window.localStorage.getItem('role');
 
        
    }, 
    template: 
    ` 
    <div>
    <form @submit="sentComment" action="#/">

    	<br>
    	
    	<h3>Komentar</h3>
    	<div>
    		
	    	<label>Komentar:</label>
	    	<textarea rows="4" cols="50" v-model="text"></textarea>
    		
    		<br>
    		<label>Ocena:</label>
    		<select style="width:210px; height:40px;"  v-model="rating">
               	<option  value="1">1</option>
             	<option  value="2">2</option>
             	<option  value="3">3</option>
             	<option  value="4">4</option>
             	<option  value="5">5</option>
           	</select>
    		
    		<br>
    		<center><input type="submit" value="Send"></center>
     	</div>
    </form>
    </div>
    `
    ,
    
  });