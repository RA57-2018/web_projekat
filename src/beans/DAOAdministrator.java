package beans;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class DAOAdministrator {
	private HashMap<String,Administrator> administrators;
	
	public DAOAdministrator()
	{
		administrators = new HashMap<String,Administrator>();
		
		try {
			readAdministrators();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
    public HashMap<String, Administrator> getAdministrators() {
		return administrators;
	}


	public void setAdministrators(HashMap<String, Administrator> administrators) {
		this.administrators = administrators;
	}


	public void readAdministrators() throws FileNotFoundException {		
		Gson gson = new Gson();
		Type token = new TypeToken<HashMap<String,Administrator>>(){}.getType();
		BufferedReader br = new BufferedReader(new FileReader("files/administrators.json"));
		this.administrators = gson.fromJson(br, token);
	}
	
	public Administrator findAdministrator(String username, String password) {
		for (Map.Entry<String, Administrator> entry : administrators.entrySet()) {
	        if(entry.getValue().getUsername().equals(username) && entry.getValue().getPassword().equals(password) ) {
	        	return entry.getValue();
	        }
	    }
		return null;
	}

}
