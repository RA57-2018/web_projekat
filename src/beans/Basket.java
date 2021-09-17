package beans;

import java.util.ArrayList;


public class Basket {

	private ArrayList<Integer> articalsInBasket; 
	private String user;
	private double price;
	
	public Basket() {}
	

	public ArrayList<Integer> getArticalsInBasket() {
		return articalsInBasket;
	}


	public void setArticalsInBasket(ArrayList<Integer> articalsInBasket) {
		this.articalsInBasket = articalsInBasket;
	}


	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	
}
