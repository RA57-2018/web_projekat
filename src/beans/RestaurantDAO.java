package beans;

public class RestaurantDAO {
	private Restaurant restaurant;
	private Location location;
	
	public RestaurantDAO() {
		
	}
	
	public RestaurantDAO(Restaurant restaurant, Location location) {
		this.restaurant = restaurant;
		this.location = location;
	}
	
	public Restaurant getRestaurant() {
		return restaurant;
	}
	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}
	public Location getLocation() {
		return location;
	}
	public void setLocation(Location location) {
		this.location = location;
	}
}
