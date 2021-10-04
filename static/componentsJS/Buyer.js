Vue.component("buyers", {
    name: "buyers",
    data: function () {
      return {
        buyers: [],
        username: null,
    };
    },
    mounted: function(){
    	this.username = window.localStorage.getItem('uName');
        this.load();					
    },
    methods: {

        
        load(){
            axios.get('/buyerRest?manager=' + this.username)
		.then(response => {
           
           this.buyers=response.data;
           
         
        });
        },
        
   },
   
    template: 
    
    ` 		<div> 
    
                    <tablealign="center"> 
                        <tr>
                            <th><i>Ime</i> </th>
                            <th><i>Prezime</i></th>
                            <th><i>Broj bodova</i></th>
                            <th><i>Tip kupca</i> </th>
                            
                           
                            
                        </tr>
                        <tr v-for="b in buyers">
                            <td>{{ b.name }} </td>
                            <td> {{ b.surname }}</td>
                            <td> {{ b.points }}</td>
                            <td> {{ b.type }} </td>
                      
                        </tr>

                    </table>
          </div>
             

`
    ,
    
  });