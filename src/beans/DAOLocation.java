package beans;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.lang.reflect.Type;
import com.google.gson.reflect.TypeToken;
import com.google.gson.Gson;

public class DAOLocation {

private HashMap<Integer,Location> locations;
	
	public DAOLocation() {
		locations = new HashMap<Integer,Location>();
		
		try {
			readLocations();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public HashMap<Integer,Location> getLocation() {
		return locations;
	}

	public void setLocation(HashMap<Integer,Location> locations) {
		this.locations = locations;
	}
	
	public Location locationRestaurant(int id) {
		for(Location l : locations.values()) 
		{
			if(l.getId() == id) {
				return l;
			}
		}
		
		return null;
	}
	
	public void readLocations() throws FileNotFoundException {
		Gson gson = new Gson();
		Type token = new TypeToken<HashMap<Integer,Location>>(){}.getType();
		BufferedReader br = new BufferedReader(new FileReader("files/location.json"));
		this.locations = gson.fromJson(br, token);
		
	}
	
	public void writeLocation() throws IOException{
		Gson gson = new Gson();
		FileWriter fw = new FileWriter("files/location.json");
		gson.toJson(this.locations, fw);
		fw.flush();
		fw.close();
	}
	
	public boolean checkLocation(Location location, int id) {
		for(Location l : this.locations.values()) {
			if(l.getId() != id) {
				if(l.getLongitude() == location.getLongitude() && location.getLatitude() == l.getLongitude()
						 && l.getAddress().getCity().equalsIgnoreCase(location.getAddress().getCity()) && 
					     l.getAddress().getStreetName().equalsIgnoreCase(location.getAddress().getStreetName()) && location.getAddress().getNumber() == l.getAddress().getNumber() ) {
					return false;
				}
			}
		}
		return true;
	}
	
	public int findNextId() {
		int maxValueKey = Collections.max(this.locations.keySet());
		return maxValueKey + 1;
	}
}
