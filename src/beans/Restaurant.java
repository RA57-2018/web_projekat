package beans;

import java.util.ArrayList;

public class Restaurant {

	private int id;
	private String name;
	private String type;
	private ArrayList<Artical> articals;
	private String status;
	private int location;
	private String logo;
	
	public Restaurant() {}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getStatus() {
		return status;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	public int getLocation() {
		return location;
	}
	public void setLocation(int location) {
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
