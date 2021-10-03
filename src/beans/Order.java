package beans;

import java.util.ArrayList;
import java.util.Date;
import javax.json.bind.annotation.JsonbDateFormat;


public class Order {

	private int id;
	private ArrayList<Integer> artical;
	private int restaurant;
	@JsonbDateFormat(JsonbDateFormat.TIME_IN_MILLIS)
	private Date date;
	private double price;
	private String buyer;
	private String status;
	
	public Order() {}
	
	public Order(int id, ArrayList<Integer> artical, int restaurant, Date date, double price, String buyer,
			String status) {
		super();
		this.id = id;
		this.artical = artical;
		this.restaurant = restaurant;
		this.date = date;
		this.price = price;
		this.buyer = buyer;
		this.status = status;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public ArrayList<Integer> getArtical() {
		return artical;
	}
	public void setArtical(ArrayList<Integer> artical) {
		this.artical = artical;
	}
	public int getRestaurant() {
		return restaurant;
	}
	public void setRestaurant(int restaurant) {
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
	public String getBuyer() {
		return buyer;
	}
	public void setBuyer(String buyer) {
		this.buyer = buyer;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
}
