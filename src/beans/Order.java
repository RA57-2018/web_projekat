package beans;

import java.util.ArrayList;
import java.util.Date;


public class Order {

	private String id;
	private ArrayList<Artical> artical;
	private Restaurant restaurant;
	private Date date; // i vreme?
	private double price;
	private User user;
	private Status status;
	
	public Order() {}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public ArrayList<Artical> getArtical() {
		return artical;
	}
	public void setArtical(ArrayList<Artical> artical) {
		this.artical = artical;
	}
	public Restaurant getRestaurant() {
		return restaurant;
	}
	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
	}
	
}
