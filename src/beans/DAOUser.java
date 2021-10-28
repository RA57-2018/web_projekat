package beans;

public class DAOUser {
	
	private String name;
	private String surname;
	private String username;
	private UserType typeUser;
	private String role;
	private int points;
	
	public DAOUser() {
	}
	
	public DAOUser(String name, String surname, String username, UserType typeUser, String role, int points) {
		super();
		this.name = name;
		this.surname = surname;
		this.username = username;
		this.typeUser = typeUser;
		this.role = role;
		this.points = points;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public UserType getTypeUser() {
		return typeUser;
	}

	public void setTypeUser(UserType typeUser) {
		this.typeUser = typeUser;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public int getPoints() {
		return points;
	}

	public void setPoints(int points) {
		this.points = points;
	}
		
	
}