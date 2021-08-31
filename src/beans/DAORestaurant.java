package beans;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
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
}
