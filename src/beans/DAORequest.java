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

public class DAORequest {

	private HashMap<Integer, Request> requests;
	
	public HashMap<Integer, Request> getRequests() {
		return requests;
	}

	public void setRequests(HashMap<Integer, Request> requests) {
		this.requests = requests;
	}

	public DAORequest() {
		
		requests = new HashMap<Integer, Request>();
		try {
			readRequests();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}
	
	private void readRequests() throws FileNotFoundException{
		Gson gson = new Gson();
		Type token = new TypeToken<HashMap<Integer,Request>>(){}.getType();
		BufferedReader br = new BufferedReader(new FileReader("files/requests.json"));
		this.requests = gson.fromJson(br, token);
	}
	
	public void writeRequests() throws IOException{
		Gson gson = new Gson();
		FileWriter fw = new FileWriter("files/requests.json");
		gson.toJson(this.requests, fw);
		fw.flush();
		fw.close();
	}
	
	public int findNextId() {
		int maxValueKey = Collections.max(this.requests.keySet());
		return maxValueKey + 1;
	}
	public Request findRequest(int id) {
		for (Map.Entry<Integer, Request> entry : requests.entrySet()) {
	        if(entry.getValue().getId() == id) {
	        	return entry.getValue();
	        }
	    }	
		return null;
	}
}
