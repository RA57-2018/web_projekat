Vue.component("ordertable", {
    name: "ordertable",
    data: function () {
      return {
        orders:[],
        restaurants:[],
        role:"",
        username:"",
        restaurant: null,
        restaurantSearch: "",
        priceSearch: "",
        dateFrom: "",
        dateTo: "",
        sorting: "",
        filterType: "",
        filterStatus: "",
    };
    },
    mounted: function(){
    	this.username = window.localStorage.getItem('uName');
        this.load();					
    },
    methods: {

        
        load(){
            axios.get('/orders?user=' + this.username)
            .then(response => {
           
            this.orders=response.data;
           
         
        });
        
        axios.get('/restaurants')
		.then(response => {
           
            this.restaurants=response.data;
            
         
        });
        
       
        },
       
		},
		
	/*search: function(){

		var parametar = "user=" + this.kIme + "&naziv="+this.restoranPretraga + "&cijena=" + this.cijenaPretraga + "&datumOd=" + this.datumOd + "&datumDo=" + this.datumDo +"&filterTip=" + this.filterTip +"&filterStatus=" + this.filterStatus + "&sortiranje=" + this.sortiranje;
	
            axios.get('/pretragaPorudzbinaKupac?' + parametar)
                        .then(response => {
                             this.porudzbine = response.data;
            })

    },*/
 
    template: 
    
    ` 		
   		<div> 
                    <table align="center"> 
                        <tr>
                            <th><i>Datum</i></th>
                            <th><i>Cena</i></th>
                            <th><i>Status</i> </th>
                            <th></th>
                            <th></th>
                           
                            
                        </tr>
                        <tr v-for="order in orders">
                            <td> {{order.date}}</td>
                            <td> {{order.price}}</td>
                            <td> {{order.status}} </td>
                        </tr>

                    </table>
          </div>
                </div>

`
    ,
    
  });