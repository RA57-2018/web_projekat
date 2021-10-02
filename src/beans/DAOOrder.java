package beans;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Collections;
import java.util.HashMap;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class DAOOrder {

	private HashMap<Integer, Order> orders;
	
	public DAOOrder() {
		orders = new HashMap<Integer, Order>();
		
		try {
			readOrders();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public HashMap<Integer, Order> getOrders() {
		return orders;
	}

	public void setOrders(HashMap<Integer, Order> orders) {
		this.orders = orders;
	}

	private void readOrders() throws FileNotFoundException {
		Gson gson = new Gson();
		Type token = new TypeToken<HashMap<Integer,Order>>(){}.getType();
		BufferedReader br = new BufferedReader(new FileReader("files/orders.json"));
		this.orders = gson.fromJson(br, token);
	}
	
	public int findNextId() {
		int maxValueKey = Collections.max(this.orders.keySet());
		return maxValueKey + 1;
	}
	
	public void write() throws IOException{
		Gson gson = new Gson();
		FileWriter writer = new FileWriter("json/orders.json");
		gson.toJson(this.orders, writer);
		writer.flush();
		writer.close();
	}
	
}
