package beans;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
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
	
	public Manager findManagerProfile(String username) {
		for (Map.Entry<String, Manager> entry : managers.entrySet()) {
	        if(entry.getValue().getUsername().equals(username) ) {
	        	return entry.getValue();
	        }
	    }
		return null;
	}
	
	public void changeManager(String username, Manager manager) {
		for (Map.Entry<String, Manager> entry : managers.entrySet()) {
	        if(entry.getValue().getUsername().equals(username)) {
	        	entry.getValue().setName(manager.getName());
	        	entry.getValue().setSurname(manager.getSurname());
	        	entry.getValue().setPassword(manager.getPassword());
	        	entry.getValue().setBirthDate(manager.getBirthDate());
	        	entry.getValue().setGender(manager.getGender());
	        }
	    }
		
		try {
			writeManager();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	public void writeManager() throws IOException{
		Gson gson = new Gson();
		FileWriter fw = new FileWriter("files/managers.json");
		gson.toJson(this.managers, fw);
		fw.flush();
		fw.close();
	}
	
	public Manager addManager(Manager manager) {

		manager.setDeleted(false);
		manager.setId(0);
		managers.put(manager.getUsername(),manager);
		try {
			this.writeManager();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return manager;
	}
	
	public void deleteManager(String username) {
		for (Map.Entry<String, Manager> entry : managers.entrySet()) {
	        if(entry.getValue().getUsername().equals(username) ) {
	        	entry.getValue().setDeleted(true);
	        }
	    }
		
		try {
			writeManager();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void writeIdManager(String username, int id) {
		for (Map.Entry<String, Manager> entry : managers.entrySet()) {
	        if(entry.getValue().getUsername().equals(username) ) {
	        	entry.getValue().setId(id);
	        }
	    }
		
		try {
			writeManager();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
