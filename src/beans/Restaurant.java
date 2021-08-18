package beans;

import java.util.ArrayList;

public class Restaurant {

	private String name;
	private TypeRestaurant type;
	private ArrayList<Artical> articals;
	private boolean status;
	private Location location;
	private String logo;
	
	public Restaurant() {}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public TypeRestaurant getType() {
		return type;
	}
	public void setType(TypeRestaurant type) {
		this.type = type;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public Location getLocation() {
		return location;
	}
	public void setLocation(Location location) {
		this.location = location;
	}
	public String getLogo() {
		return logo;
	}
	public void setLogo(String logo) {
		this.logo = logo;
	}
	public ArrayList<Artical> getArticals() {
		return articals;
	}
	public void setArticals(ArrayList<Artical> articals) {
		this.articals = articals;
	}
	
}
