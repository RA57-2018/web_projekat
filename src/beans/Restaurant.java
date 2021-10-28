package beans;

public class Restaurant {

	private int id;
	private String name;
	private String type;
	private int articles;
	private String status;
	private int location;
	private String logo;
	private String manager;
	
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
	public int getArticals() {
		return articles;
	}
	public void setArticals(int articles) {
		this.articles = articles;
	}
	public int getArticles() {
		return articles;
	}

	public void setArticles(int articles) {
		this.articles = articles;
	}

	public String getManager() {
		return manager;
	}

	public void setManager(String manager) {
		this.manager = manager;
	}
	
	
}
