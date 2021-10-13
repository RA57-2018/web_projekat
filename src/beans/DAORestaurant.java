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
	
	public ArrayList<Restaurant> search(String searchName, String searchType, String searchLocation, String searchRating, String searchOpen) throws ParseException{
		ArrayList<Restaurant> restaurantName = new ArrayList<Restaurant>();
		ArrayList<Restaurant> restaurantType = new ArrayList<Restaurant>();
		ArrayList<Restaurant> restaurantLocation = new ArrayList<Restaurant>();
		ArrayList<Restaurant> restaurantRating = new ArrayList<Restaurant>();
		ArrayList<Restaurant> restaurantOpen = new ArrayList<Restaurant>();
		DAOLocation locationDAO = new DAOLocation();
		
		if(!searchName.equals("")) {
			for (Map.Entry<Integer, Restaurant> entry : restaurants.entrySet()) {
				if(entry.getValue().getName().toLowerCase().equals(searchName.toLowerCase())) {	
					restaurantName.add(entry.getValue());
				}				 
		    }	
		}else{ 
			restaurantName = findRestaurants(); 
		}
		
		if(!searchType.equals("")) {	
			for (int i = 0; i < restaurantName.size(); i++) {				
				if(restaurantName.get(i).getType().toLowerCase().equals(searchType.toLowerCase())) {
					restaurantType.add(restaurantName.get(i));							
				}				 
		    }	
		}else{ 
			restaurantType = restaurantName; 
		}
		
		if(!searchLocation.equals("")) {		
			for (int i = 0; i < restaurantType.size(); i++) {
				Location location = locationDAO.locationRestaurant(restaurantType.get(i).getLocation());				
				if(location.getAddress().getCity().toLowerCase().contains(searchLocation.toLowerCase())) {	
					restaurantLocation.add(restaurantType.get(i));							
				}			 
		    }	
		}else{ 
			restaurantLocation = restaurantType; 
		}
		
		if(!searchRating.equals("")) {			
			for (int i = 0; i < restaurantLocation.size(); i++) {
				double averageRating = averageRating(restaurantLocation.get(i).getId()); 
				
				if(averageRating == Double.parseDouble(searchRating)) {						
					restaurantRating.add(restaurantLocation.get(i));							
				}				 
		    }	
		}else{ 
			restaurantRating = restaurantLocation; 
		}
		
		if(!searchOpen.equals("")) {			
			for (int i = 0; i < restaurantRating.size(); i++) {				
				if(restaurantRating.get(i).getStatus().toLowerCase().equals(searchOpen.toLowerCase())) {
					restaurantOpen.add(restaurantRating.get(i));
				}				 
		    }	
		}else{ 
			restaurantOpen = restaurantRating; 
		}

		return restaurantOpen;
	}
		

	public int findManagerRestaurant(String username){

		for (Map.Entry<Integer, Restaurant> entry : restaurants.entrySet()) {
	        if( (entry.getValue().getManager()).equals(username) ) {
	        	return entry.getValue().getId();
	        }
	    }		
		return 0;
	}

	public int imageNumberRestaurant() {
		restaurants = new HashMap<Integer, Restaurant>();
		try {
            readRestaurants();
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
		
		int idR = 0;
		for(Restaurant r : restaurants.values()) {
			idR++;
		}
		
		return idR;
	}
	
	public ArrayList<Restaurant> findRestaurants(){
		ArrayList<Restaurant> restaurant = new ArrayList<Restaurant>();
		
		for (Map.Entry<Integer, Restaurant> entry : restaurants.entrySet()) {	        
			restaurant.add(entry.getValue());
	        
	    }				
		return restaurant;
	}
	
	public static double averageRating(int id) {
		
		double middleValue = 0;
		int numberRating = 0;
				
		DAOComment comments = new DAOComment();
		ArrayList<Comment> comment = comments.findRestaurantComments(id);
		
		for(int i = 0; i < comment.size(); i++)
		{
			middleValue = middleValue + comment.get(i).getRating();
			numberRating++;
		
		}
		
		double average = 0;
		
		if(middleValue != 0) {
			middleValue = (middleValue/numberRating);
			average = Math.round(middleValue*100.0)/100.0;
		} 
		
		return average;
		
	}
}
