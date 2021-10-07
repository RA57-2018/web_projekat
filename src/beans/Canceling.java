package beans;

import java.util.Date;

public class Canceling {

	private int id;
	private Date datum;
	private String buyer;
	
	public Canceling() {}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getDatum() {
		return datum;
	}

	public void setDatum(Date datum) {
		this.datum = datum;
	}

	public String getBuyer() {
		return buyer;
	}

	public void setBuyer(String buyer) {
		this.buyer = buyer;
	}

	public Canceling(int id, Date datum, String buyer) {
		super();
		this.id = id;
		this.datum = datum;
		this.buyer = buyer;
	}
	
	
}
