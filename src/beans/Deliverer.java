package beans;

import java.util.ArrayList;

public class Deliverer extends User{
	
	private ArrayList<Integer> orders;
	
	public Deliverer() {}

	public ArrayList<Integer> getOrders() {
		return orders;
	}

	public void setOrders(ArrayList<Integer> orders) {
		this.orders = orders;
	}
	
	
}
