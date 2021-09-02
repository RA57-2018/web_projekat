package beans;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class DAORestaurant {
	private HashMap<Integer,Restaurant> restaurants;
	
    public DAORestaurant() {
		
    	restaurants = new HashMap<Integer,Restaurant>();
		try {
			readRestaurants();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}
    
	private void readRestaurants() throws FileNotFoundException{
		Gson gson = new Gson();
		Type token = new TypeToken<HashMap<Integer,Restaurant>>(){}.getType();
		BufferedReader br = new BufferedReader(new FileReader("files/restaurants.json"));
		this.restaurants = gson.fromJson(br, token);
	}
    
    public void writeRestaurants() throws IOException{
		Gson gson = new Gson();
		FileWriter fw = new FileWriter("files/restaurants.json");
		gson.toJson(this.restaurants, fw);
		fw.flush();
		fw.close();
	}
    
    public int findNextIdR() {
		int maxValueKey = Collections.max(this.restaurants.keySet());
		return maxValueKey + 1;
	}

	public HashMap<Integer, Restaurant> getRestaurants() {
		return restaurants;
	}

	public void setRestaurants(HashMap<Integer, Restaurant> restaurants) {
		this.restaurants = restaurants;
	}
	
	public Restaurant findRestaurant(int id){

		for (Map.Entry<Integer, Restaurant> entry : restaurants.entrySet()) {
	        if( entry.getValue().getId() == id) {
	        	return entry.getValue();
	        }
	    }		
		return null;
	}
	
	public ArrayList<Restaurant> search(HashMap<Integer,Restaurant> restaurants,HashMap<Integer,Location> locations, String searchName, String searchType, String searchLocation) throws ParseException{
		ArrayList<Restaurant> valid = new ArrayList<Restaurant>();
	
		for(Restaurant r : restaurants.values()) 
		{
			if((r.getName()).toLowerCase().contains(searchName.toLowerCase()) && (r.getType()).toLowerCase().contains(searchType.toLowerCase())) 
			{			
				valid.add(r);
				
			}
									
		}				
		return valid;
	}
	
	/* pokusaj provere adrese tj grada prilikom pretrage
	public boolean check(HashMap<Integer,Restaurant> restaurants,HashMap<Integer,Location> locations, String searchLocation) {
		for(Restaurant r : restaurants.values()) {
			
				for(Location l : locations.values()) 
				{
					if((l.getAddress().getCity()).toLowerCase().contains(searchLocation)) {	
	
						if(r.getId() == l.getId()) {
							return true;
						}
					}
	
				}
			
		}
		return false;
	}
	*/	

	public int findManagerRestaurant(String username){

		for (Map.Entry<Integer, Restaurant> entry : restaurants.entrySet()) {
	        if( (entry.getValue().getManager()).equals(username) ) {
	        	return entry.getValue().getId();
	        }
	    }		
		return 0;
	}
}
