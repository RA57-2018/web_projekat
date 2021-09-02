package beans;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.lang.reflect.Type;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class DAOUser {
private HashMap<String,User> users;
	
	

	public HashMap<String, User> getUsers() {
		return users;
	}

	public void setUsers(HashMap<String, User> users) {
		this.users = users;
	}
	
	public ArrayList<User> search(HashMap<String,User> users, String searchName, String searchSurname, String searchUsername) throws ParseException{
		ArrayList<User> valid = new ArrayList<User>();
	
		for(User u : users.values()) 
		{
			if((u.getName()).toLowerCase().contains(searchName.toLowerCase()) && (u.getSurname()).toLowerCase().contains(searchSurname.toLowerCase()) && (u.getUsername()).toLowerCase().contains(searchUsername.toLowerCase())) 
			{			
				valid.add(u);
				
			}
									
		}				
		return valid;
	}
	
	
}
