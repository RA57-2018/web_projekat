package beans;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;

public class DAOBuyer {

	private HashMap<String,Buyer> buyers;
	
	public DAOBuyer() {
		
		buyers = new HashMap<String,Buyer>();
		try {
			readBuyers();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}

	private void readBuyers() throws FileNotFoundException{
		Gson gson = new Gson();
		Type token = new TypeToken<HashMap<String,Buyer>>(){}.getType();
		BufferedReader br = new BufferedReader(new FileReader("files/buyers.json"));
		this.buyers = gson.fromJson(br, token);
	}
	
	public Buyer findBuyer(String username, String password) {
		for (Map.Entry<String, Buyer> entry : buyers.entrySet()) {
	        if(entry.getValue().getUsername().equals(username) && entry.getValue().getPassword().equals(password) ) {
	        	return entry.getValue();
	        }
	    }
		return null;
	}
}
