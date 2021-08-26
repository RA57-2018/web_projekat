package beans;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.HashMap;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class DAORestaurant {
	private HashMap<String,Restaurant> restaurants;
	
    public DAORestaurant() {
		
    	restaurants = new HashMap<String,Restaurant>();
		try {
			readRestaurants();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}
    
    private void readRestaurants() throws FileNotFoundException{
		Gson gson = new Gson();
		Type token = new TypeToken<HashMap<String,Restaurant>>(){}.getType();
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
    
    public Restaurant addRestaurants(Restaurant restaurant) {
		restaurant.setStatus("otvoren");
		Location location = new Location();
		restaurant.setLocation(location);
		restaurants.put(restaurant.getName(),restaurant);
		try {
			this.writeRestaurants();
		} catch (IOException e) {
			e.printStackTrace();
		}
    	return restaurant;
    }

	public HashMap<String, Restaurant> getRestaurants() {
		return restaurants;
	}

	public void setRestaurants(HashMap<String, Restaurant> restaurants) {
		this.restaurants = restaurants;
	}
	
}
