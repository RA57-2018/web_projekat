package beans;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class DAOManager {
	private HashMap<String,Manager> managers;
	
	public DAOManager()
	{
		managers = new HashMap<String,Manager>();
		
		try {
			readManagers();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public HashMap<String, Manager> getManagers() {
		return managers;
	}

	public void setManagers(HashMap<String, Manager> managers) {
		this.managers = managers;
	}
	
	public void readManagers() throws FileNotFoundException {		
		Gson gson = new Gson();
		Type token = new TypeToken<HashMap<String,Manager>>(){}.getType();
		BufferedReader br = new BufferedReader(new FileReader("files/managers.json"));
		this.managers = gson.fromJson(br, token);
	}
	
	public Manager findManager(String username, String password) {
		for (Map.Entry<String, Manager> entry : managers.entrySet()) {
	        if(entry.getValue().getUsername().equals(username) && entry.getValue().getPassword().equals(password) ) {
	        	return entry.getValue();
	        }
	    }
		return null;
	}
}
