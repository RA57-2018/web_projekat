package beans;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class DAOCanceling {
	ArrayList<Canceling> canceling;

	public ArrayList<Canceling> getCanceling() {
		return canceling;
	}

	public void setCanceling(ArrayList<Canceling> canceling) {
		this.canceling = canceling;
	}

	public DAOCanceling() {
		

		try {
			this.readCanceling();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void readCanceling() throws FileNotFoundException {
		
		Gson gson = new Gson();
		Type token = new TypeToken<ArrayList<Canceling>>(){}.getType();
		BufferedReader br = new BufferedReader(new FileReader("files/canceling.json"));
		this.canceling = gson.fromJson(br, token);
	}
	
	public void writeCanceledOrder() throws IOException{
		Gson gson = new Gson();
		FileWriter writer = new FileWriter("files/canceling.json");
		gson.toJson(this.canceling, writer);
		writer.flush();
		writer.close();
	}
	
	public int findNext() {
		
		return canceling.size()+1;
	}
	public boolean isSuspicious(String username) {
		
		int num=0;
		for(int i=0; i<canceling.size(); i++) {
			
			if(canceling.get(i).getBuyer().equals(username)) {
				
				num++;
				
			}
		}
		if(num>5) {
			return true;
		}
		return false;
	}
}
