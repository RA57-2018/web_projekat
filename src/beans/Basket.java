package beans;

import java.util.ArrayList;


public class Basket {

	private ArrayList<Artical> artical; //******
	private User user;
	private double price;
	
	public Basket() {}
	
	public ArrayList<Artical> getArtical() {
		return artical;
	}
	public void setArtical(ArrayList<Artical> artical) {
		this.artical = artical;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	
}
