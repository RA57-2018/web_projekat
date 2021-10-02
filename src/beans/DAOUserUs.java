package beans;

import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

import com.google.gson.Gson;

public class DAOUserUs {
	ArrayList<Buyer> buyers = new ArrayList<Buyer>();
	ArrayList<Administrator> administrators = new ArrayList<Administrator>();
	ArrayList<Manager> managers = new ArrayList<Manager>();
	ArrayList<Deliverer> deliverers = new ArrayList<Deliverer>();
	private DAOBuyer b;
	ArrayList<DAOUser> users = new ArrayList<DAOUser>();
	
	public static Comparator<DAOUser> imeRastuce = new Comparator<DAOUser>() {

        public int compare(DAOUser k1, DAOUser k2) {
           String name1 = k1.getName().toUpperCase();
           String name2 = k2.getName().toUpperCase();

           return name1.compareTo(name2);

    }};
    
    public static Comparator<DAOUser> imeOpadajuce = new Comparator<DAOUser>() {

        public int compare(DAOUser k1, DAOUser k2) {
           String name1 = k1.getName().toUpperCase();
           String name2 = k2.getName().toUpperCase();

           return name2.compareTo(name1);

    }};
    
    public static Comparator<DAOUser> prezimeRastuce = new Comparator<DAOUser>() {

        public int compare(DAOUser k1, DAOUser k2) {
           String surname1 = k1.getSurname().toUpperCase();
           String surname2 = k2.getSurname().toUpperCase();

           return surname1.compareTo(surname2);

    }};
    
    public static Comparator<DAOUser> prezimeOpadajuce = new Comparator<DAOUser>() {

        public int compare(DAOUser k1, DAOUser k2) {
           String surname1 = k1.getSurname().toUpperCase();
           String surname2 = k2.getSurname().toUpperCase();

           return surname2.compareTo(surname1);

    }};
    
    public static Comparator<DAOUser> kImeRastuce = new Comparator<DAOUser>() {

        public int compare(DAOUser k1, DAOUser k2) {
           String username1 = k1.getUsername().toUpperCase();
           String username2 = k2.getUsername().toUpperCase();

           return username1.compareTo(username2);

    }};
    
    public static Comparator<DAOUser> kImeOpadajuce = new Comparator<DAOUser>() {

        public int compare(DAOUser k1, DAOUser k2) {
           String username1 = k1.getUsername().toUpperCase();
           String username2 = k2.getUsername().toUpperCase();

           return username2.compareTo(username1);

    }};
    
    public static Comparator<DAOUser> brBodovaRastuce = new Comparator<DAOUser>() {

        public int compare(DAOUser k1, DAOUser k2) {
           int points1 = k1.getPoints();
           int points2 = k2.getPoints();

           return Integer.compare(points1, points2);

    }};
    
    public static Comparator<DAOUser> brBodovaOpadajuce = new Comparator<DAOUser>() {

        public int compare(DAOUser k1, DAOUser k2) {
           int points1 = k1.getPoints();
           int points2 = k2.getPoints();

           return Integer.compare(points2, points1);

    }};
    
public ArrayList<DAOUser> search(String ime, String prezime, String username, String tip, String uloga, String sortiranje) {
		
		ArrayList<DAOUser> sviKorisnici=new ArrayList<DAOUser>(); 
		ArrayList<DAOUser> imeK=new ArrayList<DAOUser>();
		ArrayList<DAOUser> prezimeK=new ArrayList<DAOUser>();
		ArrayList<DAOUser> usernameK=new ArrayList<DAOUser>();
		ArrayList<DAOUser> tipK=new ArrayList<DAOUser>();
		ArrayList<DAOUser> ulogaK=new ArrayList<DAOUser>();
		ArrayList<DAOUser> sortK =new ArrayList<DAOUser>();
		DAOBuyer kC=new DAOBuyer();
		DAOAdministrator aC=new DAOAdministrator();
		DAODeliverer dC=new DAODeliverer();
		DAOManager mC=new DAOManager();
	
		if(ime != "") {
			for (int i=0; i<sviKorisnici.size(); i++) {
				if(sviKorisnici.get(i).getName().toLowerCase().equals(ime.toLowerCase())) {
					imeK.add(sviKorisnici.get(i));
				} 
		    }	
		} else { imeK = sviKorisnici; }
		if(prezime != "") {
			for (int i = 0; i < imeK.size(); i++) {
				if(imeK.get(i).getSurname().toLowerCase().equals(prezime.toLowerCase())) {
					prezimeK.add(imeK.get(i));
				}
		    }	
		} else { prezimeK = imeK; }
		if(username != "") {
			for (int i = 0; i < prezimeK.size(); i++) {
				if(prezimeK.get(i).getUsername().toLowerCase().equals(username.toLowerCase())) {
					usernameK.add(prezimeK.get(i));
							
				}
				 
		    }	
		} else { usernameK = prezimeK; }
		
		if(tip != "") {
			
			for(int j=0; j<usernameK.size(); j++) {
				
				for (int i = 0; i < buyers.size(); i++) {
					
					
					if(buyers.get(i).getType().equals(tip) && buyers.get(i).getUsername().equals(usernameK.get(j).getUsername())) {
							
						DAOUser k=new DAOUser();
						k.setName(buyers.get(i).getName());
						k.setSurname(buyers.get(i).getSurname());
						k.setUsername(buyers.get(i).getUsername());
						k.setPoints(buyers.get(i).getPoints());
						k.setRole("kupac");
						k.setTypeUser(buyers.get(i).getType());
						
						tipK.add(k);
								
					}
					 
			    }	
				
				
			}
			
		} else { tipK = usernameK; }
		
		if(uloga != "") {
			
			if(uloga.equals("Administrator")) {
				
				for(int j=0; j<tipK.size(); j++) {
					for (int i = 0; i < administrators.size(); i++) {
						if(administrators.get(i).getUsername().equals(tipK.get(j).getUsername())) {
							
							DAOUser k=new DAOUser();
							k.setName(administrators.get(i).getName());
							k.setSurname(administrators.get(i).getSurname());
							k.setUsername(administrators.get(i).getUsername());
							k.setRole("administrator");
							ulogaK.add(k);
							
						}
							
							
				    }
				}
			}else if(uloga.equals("Dostavljac")) {
				for(int j=0; j<tipK.size(); j++) {
					for (int i = 0; i < deliverers.size(); i++) {
						if(deliverers.get(i).getUsername().equals(tipK.get(j).getUsername()))
						{
							
							DAOUser k=new DAOUser();
							k.setName(deliverers.get(i).getName());
							k.setSurname(deliverers.get(i).getSurname());
							k.setUsername(deliverers.get(i).getUsername());
							k.setRole("dostavljac");
						
							ulogaK.add(k);
							
						}
							
				    }
				}
				
			}else if(uloga.equals("Menadzer")) {
				for(int j=0; j<tipK.size(); j++) {
					for (int i = 0; i < managers.size(); i++) {
						if(managers.get(i).getUsername().equals(tipK.get(j).getUsername()))
						{
							
							DAOUser k=new DAOUser();
							k.setName(managers.get(i).getName());
							k.setSurname(managers.get(i).getSurname());
							k.setUsername(managers.get(i).getUsername());
							k.setRole("menadzer");
							ulogaK.add(k);
							
						}
							
				    }
				}
				
			}else {
				for(int j=0; j<tipK.size(); j++) {
					for (int i = 0; i < buyers.size(); i++) {
						if(buyers.get(i).getUsername().equals(tipK.get(j).getUsername()))
{
							
							DAOUser k=new DAOUser();
							k.setName(buyers.get(i).getName());
							k.setSurname(buyers.get(i).getSurname());
							k.setUsername(buyers.get(i).getUsername());
							k.setRole("kupac");
							k.setPoints(buyers.get(i).getPoints());
							k.setTypeUser(buyers.get(i).getType());
							ulogaK.add(k);
							
						}
							
							
				    }
				}
				
				
			}
			
		} else { ulogaK = tipK; }
		
		if(sortiranje != "") {
			
			if(sortiranje.equals("ime-rastuce")) { Collections.sort(ulogaK, imeRastuce); } 
			else if(sortiranje.equals("ime-opadajuce")) { Collections.sort(ulogaK, imeOpadajuce); }
			else if(sortiranje.equals("prezime-rastuce")) { Collections.sort(ulogaK, prezimeRastuce); }
			else if(sortiranje.equals("prezime-opadajuce")) { Collections.sort(ulogaK, prezimeOpadajuce); }
			else if(sortiranje.equals("username-rastuce")) { Collections.sort(ulogaK, kImeRastuce); }
			else if(sortiranje.equals("username-opadajuce")) { Collections.sort(ulogaK, kImeOpadajuce); }
			else if(sortiranje.equals("brojBodova-rastuce")) { 
				if(uloga.equals("Kupac")) {
					
					Collections.sort(ulogaK, brBodovaRastuce);
					
				}
					
					
				
				
			}
			else { 
				if(uloga.equals("Kupac")) {
					
					
					Collections.sort(ulogaK, brBodovaOpadajuce);
					
				}
			}
			sortK = ulogaK;
			
		} else { sortK = ulogaK; }
		
		return sortK;
		
		
		
	}
	
	public ArrayList<DAOUser> getUsers() {
		return users;
	}
	public void setUsers(ArrayList<DAOUser> users) {
		this.users = users;
	}
	public ArrayList<Buyer> getBuyers() {
		return buyers;
	}
	public void setBuyers(ArrayList<Buyer> buyers) {
		this.buyers = buyers;
	}
	public DAOBuyer getB() {
		return b;
	}
	public void setB(DAOBuyer b) {
		this.b = b;
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
		FileWriter writer = new FileWriter("json/users.json");
		gson.toJson(this.users, writer);
		writer.flush();
		writer.close();
	}
	
}
