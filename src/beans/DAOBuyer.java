package beans;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
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
	
	
	public Buyer addBuyer(Buyer buyer) {
		buyer.setPoints(0);
		UserType type = new UserType();
		type.setType("normal");
		type.setDiscount(0);
		type.setScore(0);
		buyer.setType(type);
		buyers.put(buyer.getUsername(),buyer);
		try {
			this.writeBuyers();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return buyer;
	}
	
	public void writeBuyers() throws IOException{
		Gson gson = new Gson();
		FileWriter fw = new FileWriter("files/buyers.json");
		gson.toJson(this.buyers, fw);
		fw.flush();
		fw.close();
	}
	
	public Buyer findBuyerProfile(String username) {
		for (Map.Entry<String, Buyer> entry : buyers.entrySet()) {
	        if(entry.getValue().getUsername().equals(username) ) {
	        	return entry.getValue();
	        }
	    }
		return null;
	}
	
	public void changeBuyer(String username, Buyer buyer) {
		for (Map.Entry<String, Buyer> entry : buyers.entrySet()) {
	        if(entry.getValue().getUsername().equals(username)) {
	        	entry.getValue().setName(buyer.getName());
	        	entry.getValue().setSurname(buyer.getSurname());
	        	entry.getValue().setPassword(buyer.getPassword());
	        	entry.getValue().setGender(buyer.getGender());
	        }
	    }
		
		try {
			writeBuyers();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
}
