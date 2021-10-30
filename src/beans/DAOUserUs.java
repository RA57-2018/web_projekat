package beans;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.text.ParseException;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;


public class DAOUserUs {
	ArrayList<Buyer> buyers = new ArrayList<Buyer>();
	ArrayList<Administrator> administrators = new ArrayList<Administrator>();
	ArrayList<Manager> managers = new ArrayList<Manager>();
	ArrayList<Deliverer> deliverers = new ArrayList<Deliverer>();
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
	
public ArrayList<DAOUser> search(String searchName, String searchSurname, String searchUsername,String filterRole, String filterType) throws ParseException{
	ArrayList<DAOUser> allUsers = new ArrayList<DAOUser>();
	ArrayList<DAOUser> userName = new ArrayList<DAOUser>();
	ArrayList<DAOUser> userSurname = new ArrayList<DAOUser>();
	ArrayList<DAOUser> userUsername = new ArrayList<DAOUser>();
	ArrayList<DAOUser> userRole = new ArrayList<DAOUser>();
	ArrayList<DAOUser> userType = new ArrayList<DAOUser>();

	
	bD=new DAOBuyer();
	dD=new DAODeliverer();
	aD=new DAOAdministrator();
	mD=new DAOManager(); 
	
	for(int i=0; i<users.size(); i++) {
		
		if(users.get(i).getRole().equals("kupac")) {			
			Buyer buyer = bD.findBuyerProfile(users.get(i).getUsername());
			if(!buyer.isBlock() && !buyer.isBlocked() && !buyer.isDeleted()) {
				allUsers.add(users.get(i));
			}
		}else if(users.get(i).getRole().equals("menadzer")) {			
			Manager manager = mD.findManagerProfile(users.get(i).getUsername());
			if(!manager.isBlock() && !manager.isDeleted()) {
				allUsers.add(users.get(i));
			}
		}else if(users.get(i).getRole().equals("administrator")) {			
			Administrator admin = aD.findAdministratorProfile(users.get(i).getUsername());
			if(!admin.isBlock() && !admin.isDeleted()) {
				allUsers.add(users.get(i));
			}
		}else {			
			Deliverer deliverer = dD.findDelivererProfile(users.get(i).getUsername());
			if(!deliverer.isBlock() && !deliverer.isDeleted()) {
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
	
	if(!filterRole.equals("")) {		
		if(filterRole.equals("kupac")) {			
			for(int i=0; i<userUsername.size(); i++) {
				for (int j = 0; j < buyers.size(); j++) {
					if(buyers.get(j).getUsername().equals(userUsername.get(i).getUsername())) {
						
						DAOUser user = new DAOUser();
						user.setName(buyers.get(j).getName());
						user.setSurname(buyers.get(j).getSurname());
						user.setUsername(buyers.get(j).getUsername());
						user.setRole("kupac");
						user.setPoints(buyers.get(j).getPoints());
						user.setTypeUser(buyers.get(j).getType());
						userRole.add(user);
						
					}											
			    }
			}
		}else if(filterRole.equals("dostavljac")) {
			for(int i=0; i<userUsername.size(); i++) {
				for (int j = 0; j < deliverers.size(); j++) {
					if(deliverers.get(j).getUsername().equals(userUsername.get(i).getUsername())) {
						
						DAOUser user = new DAOUser();
						user.setName(deliverers.get(j).getName());
						user.setSurname(deliverers.get(j).getSurname());
						user.setUsername(deliverers.get(j).getUsername());
						user.setRole("dostavljac");
						userRole.add(user);
						
					}											
			    }
			}
		}else if(filterRole.equals("menadzer")) {
			for(int i=0; i<userUsername.size(); i++) {
				for (int j = 0; j < managers.size(); j++) {
					if(managers.get(j).getUsername().equals(userUsername.get(i).getUsername())) {
						
						DAOUser user = new DAOUser();
						user.setName(managers.get(j).getName());
						user.setSurname(managers.get(j).getSurname());
						user.setUsername(managers.get(j).getUsername());
						user.setRole("menadzer");
						userRole.add(user);
						
					}											
			    }
			}
		}else{
			for(int i=0; i<userUsername.size(); i++) {
				for (int j = 0; j < administrators.size(); j++) {
					if(administrators.get(j).getUsername().equals(userUsername.get(i).getUsername())) {
						
						DAOUser user = new DAOUser();
						user.setName(administrators.get(j).getName());
						user.setSurname(administrators.get(j).getSurname());
						user.setUsername(administrators.get(j).getUsername());
						user.setRole("administrator");
						userRole.add(user);
						
					}											
			    }
			}						
		}
		
	}else{ 
		userRole = userUsername; 
	}
	
	if(!filterType.equals("")) {		
		for(int i=0; i<userRole.size(); i++) {			
			for (int j = 0; j < buyers.size(); j++) {	
				for(int k = 0; k < users.size(); k++) {
					if(buyers.get(j).getType().getType().equals(filterType) && users.get(k).getUsername().equals(buyers.get(j).getUsername()) && users.get(k).getUsername().equals(userRole.get(i).getUsername())) {

						DAOUser user = new DAOUser();
						user.setName(users.get(k).getName());
						user.setSurname(users.get(k).getSurname());
						user.setUsername(users.get(k).getUsername());
						user.setPoints(users.get(k).getPoints());
						user.setRole("kupac");
						user.setTypeUser(users.get(k).getTypeUser());
						
						userType.add(user);
					}							
				}				 
		    }							
		}
		
	}else{ 
		userType = userRole; 
	}
	
		return userType;
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
	
	public void changeUser(String name, String surname, String username) {
		for(int i=0; i<users.size(); i++) {			
			if(users.get(i).getUsername().equals(username)) {				
				users.get(i).setName(name);
				users.get(i).setSurname(surname);;
			}
		}
		
		try {
			writeUsers();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

    }
	
}
