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
import java.util.Comparator;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;


public class DAOUserUs {
	ArrayList<Buyer> buyers = new ArrayList<Buyer>();
	ArrayList<Administrator> administrators = new ArrayList<Administrator>();
	ArrayList<Manager> managers = new ArrayList<Manager>();
	ArrayList<Deliverer> deliverers = new ArrayList<Deliverer>();
	private DAOBuyer b;
	ArrayList<DAOUser> users = new ArrayList<DAOUser>();
	private DAOBuyer kC;
	private DAODeliverer dC;
	private DAOAdministrator aC;
	private DAOManager mC;
	
	public DAOUserUs() {
		
		kC=new DAOBuyer();
		dC=new DAODeliverer();
		aC=new DAOAdministrator();
		mC=new DAOManager();
		
		buyers = kC.findBuyers();
		deliverers = dC.findDeliverers();
		administrators = aC.findAdministrators();
		managers = mC.findManagers();
		
		try {
			this.readUsers();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void add(DAOUser u) throws IOException{
		users.add(u);
		this.writeUsers();
	}
	
	public void readUsers() throws FileNotFoundException {
		Gson gson = new Gson();
		Type token = new TypeToken<ArrayList<DAOUser>>(){}.getType();
		BufferedReader br = new BufferedReader(new FileReader("files/users.json"));
		this.users = gson.fromJson(br, token);
	}
	
public ArrayList<DAOUser> search(String searchName, String searchSurname, String searchUsername) throws ParseException{
	ArrayList<DAOUser> userName = new ArrayList<DAOUser>();
	ArrayList<DAOUser> userSurname = new ArrayList<DAOUser>();
	ArrayList<DAOUser> userUsername = new ArrayList<DAOUser>();
	
	if(!searchName.equals("")) {
		for (int i=0; i<users.size(); i++) {
			if(users.get(i).getName().equals(searchName)) {	
				userName.add(users.get(i));
			}	
	    }	
	}else if(!searchSurname.equals("")) {	
		for (int i=0; i<users.size(); i++) {
			if(users.get(i).getSurname().equals(searchSurname)) {	
				userSurname.add(users.get(i));
			}	
	    }		
	}else {
		userSurname = userName;
	} if(!searchUsername.equals("")) {		
		for (int i=0; i<users.size(); i++) {
			if(users.get(i).getUsername().equals(searchUsername)) {	
				userUsername.add(users.get(i));
			}	
	    }	
	}
	else {
		userUsername = userSurname;
	}
		return userUsername;
	}
	
	public ArrayList<DAOUser> getUsers() {
		return users;
	}
	public void setUsers(ArrayList<DAOUser> users) {
		this.users = users;
	}
	
	public DAOUser findUser(String username) {		
		for(int i=0; i<users.size(); i++) {			
			if(users.get(i).getUsername().equals(username)) {				
				return users.get(i);
			}
		}
		return null;
	}
	
	
	public void writeUsers() throws IOException{
		Gson gson = new Gson();
		FileWriter writer = new FileWriter("files/users.json");
		gson.toJson(this.users, writer);
		writer.flush();
		writer.close();
	}
	
}
