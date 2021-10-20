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
	private DAOBuyer bD;
	private DAODeliverer dD;
	private DAOAdministrator aD;
	private DAOManager mD;
	
	public DAOUserUs() {
		
		bD=new DAOBuyer();
		dD=new DAODeliverer();
		aD=new DAOAdministrator();
		mD=new DAOManager();
		
		buyers = bD.findBuyers();
		deliverers = dD.findDeliverers();
		administrators = aD.findAdministrators();
		managers = mD.findManagers();
		
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
	ArrayList<DAOUser> allUsers = new ArrayList<DAOUser>();
	ArrayList<DAOUser> userName = new ArrayList<DAOUser>();
	ArrayList<DAOUser> userSurname = new ArrayList<DAOUser>();
	ArrayList<DAOUser> userUsername = new ArrayList<DAOUser>();
	
	bD=new DAOBuyer();
	dD=new DAODeliverer();
	aD=new DAOAdministrator();
	mD=new DAOManager(); 
	
	for(int i=0; i<users.size(); i++) {
		
		if(users.get(i).getRole().equals("kupac")) {			
			Buyer buyer = bD.findBuyerProfile(users.get(i).getUsername());
			if(!buyer.isBlock() && !buyer.isBlocked()) {
				allUsers.add(users.get(i));
			}
		}else if(users.get(i).getRole().equals("menadzer")) {			
			Manager manager = mD.findManagerProfile(users.get(i).getUsername());
			if(!manager.isBlock()) {
				allUsers.add(users.get(i));
			}
		}else if(users.get(i).getRole().equals("administrator")) {			
			Administrator admin = aD.findAdministratorProfile(users.get(i).getUsername());
			if(!admin.isBlock()) {
				allUsers.add(users.get(i));
			}
		}else {			
			Deliverer deliverer = dD.findDelivererProfile(users.get(i).getUsername());
			if(!deliverer.isBlock()) {
				allUsers.add(users.get(i));
			}
		}
		
	}
	
	if(!searchName.equals("")) {
		for (int i=0; i<allUsers.size(); i++) {
			if(allUsers.get(i).getName().toLowerCase().equals(searchName.toLowerCase())) {	
				userName.add(allUsers.get(i));
			}	
	    }	
	}else {
		userName = allUsers;
	}
		
	if(!searchSurname.equals("")) {	
		for (int i=0; i<userName.size(); i++) {
			if(userName.get(i).getSurname().toLowerCase().equals(searchSurname.toLowerCase())) {	
				userSurname.add(userName.get(i));
			}	
	    }		
	}else {
		userSurname = userName;
	} 
	
	if(!searchUsername.equals("")) {		
		for (int i=0; i<userSurname.size(); i++) {
			if(userSurname.get(i).getUsername().toLowerCase().equals(searchUsername.toLowerCase())) {	
				userUsername.add(userSurname.get(i));
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
