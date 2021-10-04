package beans;

import java.util.ArrayList;

public class Buyer extends User{
	
	private int points;
	private UserType type;
	private Basket basket;
	private ArrayList<String> orders;
	private boolean blocked;
	private boolean suspicious;
	
	public boolean isSuspicious() {
		return suspicious;
	}
	public void setSuspicious(boolean suspicious) {
		this.suspicious = suspicious;
	}
	public boolean isBlocked() {
		return blocked;
	}
	public void setBlocked(boolean blocked) {
		this.blocked = blocked;
	}
	public ArrayList<String> getOrders() {
		return orders;
	}
	public void setOrders(ArrayList<String> orders) {
		this.orders = orders;
	}
	public Basket getBasket() {
		return basket;
	}
	public void setBasket(Basket basket) {
		this.basket = basket;
	}
	public int getPoints() {
		return points;
	}
	public void setPoints(int points) {
		this.points = points;
	}
	public UserType getType() {
		return type;
	}
	public void setType(UserType type) {
		this.type = type;
	}
	
}
