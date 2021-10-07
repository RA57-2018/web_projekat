package beans;

public class Comment {

	private int id;
	private String buyer;
	private int restaurant;
	private String text;
	private int rating;
	private boolean approved;
	private boolean viewComment;
	
	public Comment() {}
	
	
	public Comment(int id, String buyer, int restaurant, String text, int rating, boolean approved,
			boolean viewComment) {
		super();
		this.id = id;
		this.buyer = buyer;
		this.restaurant = restaurant;
		this.text = text;
		this.rating = rating;
		this.approved = approved;
		this.viewComment = viewComment;
	}


	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getBuyer() {
		return buyer;
	}

	public void setBuyer(String buyer) {
		this.buyer = buyer;
	}

	public int getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(int restaurant) {
		this.restaurant = restaurant;
	}

	public boolean isApproved() {
		return approved;
	}

	public void setApproved(boolean approved) {
		this.approved = approved;
	}

	public boolean isViewComment() {
		return viewComment;
	}

	public void setViewComment(boolean viewComment) {
		this.viewComment = viewComment;
	}

	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public int getRating() {
		return rating;
	}
	public void setRating(int rating) {
		this.rating = rating;
	}
	
}
