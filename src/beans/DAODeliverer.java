package beans;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class DAODeliverer {
	private HashMap<String,Deliverer> deliverers;
	
	public DAODeliverer()
	{
		deliverers = new HashMap<String,Deliverer>();
		
		try {
			readDeliverers();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public HashMap<String, Deliverer> getDeliverers() {
		return deliverers;
	}

	public void setDeliverers(HashMap<String, Deliverer> deliverers) {
		this.deliverers = deliverers;
	}
	
	public void readDeliverers() throws FileNotFoundException {		
		Gson gson = new Gson();
		Type token = new TypeToken<HashMap<String,Deliverer>>(){}.getType();
		BufferedReader br = new BufferedReader(new FileReader("files/deliverers.json"));
		this.deliverers = gson.fromJson(br, token);
	}
	
	public Deliverer findDeliverer(String username, String password) {
		for (Map.Entry<String, Deliverer> entry : deliverers.entrySet()) {
	        if(entry.getValue().getUsername().equals(username) && entry.getValue().getPassword().equals(password) ) {
	        	return entry.getValue();
	        }
	    }
		return null;
	}

}
