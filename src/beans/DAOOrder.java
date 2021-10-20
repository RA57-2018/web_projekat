package beans;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

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
	
	public Order findOrder(int id) {
		for (Map.Entry<Integer, Order> entry : orders.entrySet()) {
	        if(entry.getValue().getId() == id) {
	        	return entry.getValue();
	        }
	    }	
		return null;
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
		FileWriter writer = new FileWriter("files/orders.json");
		gson.toJson(this.orders, writer);
		writer.flush();
		writer.close();
	}
	
	public ArrayList<Order> searchDeliveryOrders(String searchRestaurant, String priceFrom, String priceTo, String dateFrom, String dateTo, String filterType) throws ParseException {		
		ArrayList<Order> orderDeliverer = new ArrayList<Order>();
		ArrayList<Order> orderRestaurant = new ArrayList<Order>();
		ArrayList<Order> orderPrice = new ArrayList<Order>();
		ArrayList<Order> orderDate = new ArrayList<Order>();
		ArrayList<Order> orderType = new ArrayList<Order>();
						
		DAORestaurant restaurants = new DAORestaurant();
				
		for (Map.Entry<Integer, Order> entry : orders.entrySet()) {			
				if(entry.getValue().getStatus().equals("CEKA DOSTAVLJACA")) {						
					orderDeliverer.add(entry.getValue());	
				}
		}
		
		if(!searchRestaurant.equals("")) {
			for (int i = 0; i < orderDeliverer.size(); i++) {								
				Restaurant r = restaurants.findRestaurant(orderDeliverer.get(i).getRestaurant());				
				if(r.getName().toLowerCase().equals(searchRestaurant.toLowerCase())) {						
					orderRestaurant.add(orderDeliverer.get(i));	
				}				 
		    }	
		}else{ 
			orderRestaurant = orderDeliverer; 
		}
		
		if(!priceFrom.equals("") || !priceTo.equals("")) {	
			if(!priceFrom.equals("") && !priceTo.equals("")) {			
				for (int i = 0; i < orderRestaurant.size(); i++) {				
					if(orderRestaurant.get(i).getPrice() >= Double.parseDouble(priceFrom) && orderRestaurant.get(i).getPrice() <= Double.parseDouble(priceTo)) {						
						orderPrice.add(orderRestaurant.get(i));	
					}				 
			    }
			}else if(!priceFrom.equals("") && priceTo.equals("")) {
				for (int i = 0; i < orderRestaurant.size(); i++) {				
					if(orderRestaurant.get(i).getPrice() >= Double.parseDouble(priceFrom)) {						
						orderPrice.add(orderRestaurant.get(i));	
					}				 
			    }
			}else if(priceFrom.equals("") && !priceTo.equals("")) {
				for (int i = 0; i < orderRestaurant.size(); i++) {				
					if(orderRestaurant.get(i).getPrice() <= Double.parseDouble(priceTo)) {						
						orderPrice.add(orderRestaurant.get(i));	
					}				 
			    }
			}
		}else{ 
			orderPrice = orderRestaurant; 
		}
		
		if(!dateFrom.equals("") || !dateTo.equals("")) {			
			if(!dateFrom.equals("") && !dateTo.equals("")) {
				Date fromDate = new SimpleDateFormat("yyyy-MM-dd").parse(dateFrom);
				Date toDate = new SimpleDateFormat("yyyy-MM-dd").parse(dateTo);
				for (int i = 0; i < orderPrice.size(); i++) {							
					if(orderPrice.get(i).getDate().after(fromDate) && orderPrice.get(i).getDate().before(toDate)) {					
						orderDate.add(orderPrice.get(i));	
					}				 
			    }	
			}else if(!dateFrom.equals("") && dateTo.equals("")) {
				Date fromDate = new SimpleDateFormat("yyyy-MM-dd").parse(dateFrom);
				for (int i = 0; i < orderPrice.size(); i++) {							
					if(orderPrice.get(i).getDate().after(fromDate)) {					
						orderDate.add(orderPrice.get(i));	
					}				 
			    }
			}else if(dateFrom.equals("") && !dateTo.equals("")) {
				Date toDate = new SimpleDateFormat("yyyy-MM-dd").parse(dateTo);
				for (int i = 0; i < orderPrice.size(); i++) {							
					if(orderPrice.get(i).getDate().before(toDate)) {					
						orderDate.add(orderPrice.get(i));	
					}				 
			    }
			}
		}else{ 
			orderDate = orderPrice; 
		}
		
		if(!filterType.equals("")) {		
			for (int i = 0; i < orderDate.size(); i++) {
				int id = orderDate.get(i).getRestaurant();
				Restaurant restaurant = restaurants.findRestaurant(id);
				
				if(restaurant.getType().toLowerCase().equals(filterType.toLowerCase())) {						
					orderType.add(orderDate.get(i));	
				}				 
		    }	
		}else{ 
			orderType = orderDate; 
		}
						
		return orderType;		
				
	}
	
	public ArrayList<Order> searchManager(String priceFrom, String priceTo, String dateFrom, String dateTo, String filterStatus, String username) throws ParseException {		
		ArrayList<Order> orderManager = new ArrayList<Order>();
		ArrayList<Order> orderPrice = new ArrayList<Order>();
		ArrayList<Order> orderDate = new ArrayList<Order>();
		ArrayList<Order> orderStatus = new ArrayList<Order>();
		
		DAOManager manager = new DAOManager();
				
		for (Map.Entry<Integer, Order> entry : orders.entrySet()) {	
				Manager m = manager.findManagerProfile(username);
				if(entry.getValue().getRestaurant() == m.getId()) {						
					orderManager.add(entry.getValue());	
				}
		}		
		
		if(!priceFrom.equals("") || !priceTo.equals("")) {	
			if(!priceFrom.equals("") && !priceTo.equals("")) {			
				for (int i = 0; i < orderManager.size(); i++) {				
					if(orderManager.get(i).getPrice() >= Double.parseDouble(priceFrom) && orderManager.get(i).getPrice() <= Double.parseDouble(priceTo)) {						
						orderPrice.add(orderManager.get(i));	
					}				 
			    }
			}else if(!priceFrom.equals("") && priceTo.equals("")) {
				for (int i = 0; i < orderManager.size(); i++) {				
					if(orderManager.get(i).getPrice() >= Double.parseDouble(priceFrom)) {						
						orderPrice.add(orderManager.get(i));	
					}				 
			    }
			}else if(priceFrom.equals("") && !priceTo.equals("")) {
				for (int i = 0; i < orderManager.size(); i++) {				
					if(orderManager.get(i).getPrice() <= Double.parseDouble(priceTo)) {						
						orderPrice.add(orderManager.get(i));	
					}				 
			    }
			}
		}else{ 
			orderPrice = orderManager; 
		}
		
		if(!dateFrom.equals("") || !dateTo.equals("")) {			
			if(!dateFrom.equals("") && !dateTo.equals("")) {
				Date fromDate = new SimpleDateFormat("yyyy-MM-dd").parse(dateFrom);
				Date toDate = new SimpleDateFormat("yyyy-MM-dd").parse(dateTo);
				for (int i = 0; i < orderPrice.size(); i++) {							
					if(orderPrice.get(i).getDate().after(fromDate) && orderPrice.get(i).getDate().before(toDate)) {					
						orderDate.add(orderPrice.get(i));	
					}				 
			    }	
			}else if(!dateFrom.equals("") && dateTo.equals("")) {
				Date fromDate = new SimpleDateFormat("yyyy-MM-dd").parse(dateFrom);
				for (int i = 0; i < orderPrice.size(); i++) {							
					if(orderPrice.get(i).getDate().after(fromDate)) {					
						orderDate.add(orderPrice.get(i));	
					}				 
			    }
			}else if(dateFrom.equals("") && !dateTo.equals("")) {
				Date toDate = new SimpleDateFormat("yyyy-MM-dd").parse(dateTo);
				for (int i = 0; i < orderPrice.size(); i++) {							
					if(orderPrice.get(i).getDate().before(toDate)) {					
						orderDate.add(orderPrice.get(i));	
					}				 
			    }
			}
		}else{ 
			orderDate = orderPrice; 
		}
		
		if(!filterStatus.equals("")) {		
			for (int i = 0; i < orderDate.size(); i++) {
				if(orderDate.get(i).getStatus().toLowerCase().equals(filterStatus.toLowerCase())) {						
					orderStatus.add(orderDate.get(i));	
				}				 
		    }	
		}else{ 
			orderStatus = orderDate; 
		}
						
		return orderStatus;		
				
	}
	
	public ArrayList<Order> searchDeliverer(String searchRestaurant, String priceFrom, String priceTo, String dateFrom, String dateTo, String filterType, String username) throws ParseException {		
		ArrayList<Order> orderDeliverer = new ArrayList<Order>();
		ArrayList<Order> orderRestaurant = new ArrayList<Order>();
		ArrayList<Order> orderPrice = new ArrayList<Order>();
		ArrayList<Order> orderDate = new ArrayList<Order>();
		ArrayList<Order> orderType = new ArrayList<Order>();
		
		DAORestaurant restaurant = new DAORestaurant();
		DAORequest request = new DAORequest();
				
		for (Map.Entry<Integer, Order> entry : orders.entrySet()) {					
				if(entry.getValue().getStatus().equals("U TRANSPORTU")) {						
					for(Map.Entry<Integer, Request> entry1 : request.getRequests().entrySet()) {						
						if(entry1.getValue().getDeliverer().equals(username) && entry1.getValue().isApproved() && entry1.getValue().getOrderId()==entry.getValue().getId()) {						
							orderDeliverer.add(entry.getValue());
						}
					}	
				}
		}		
		
		if(!searchRestaurant.equals("")) {	
			for (int i = 0; i < orderDeliverer.size(); i++) {				
				Restaurant r = restaurant.findRestaurant(orderDeliverer.get(i).getRestaurant());				
				if(r.getName().toLowerCase().equals(searchRestaurant.toLowerCase())) {				
					orderRestaurant.add(orderDeliverer.get(i));							
				}				 
		    }	
		}else{ 
			orderRestaurant = orderDeliverer; 
		}
		
		if(!priceFrom.equals("") || !priceTo.equals("")) {	
			if(!priceFrom.equals("") && !priceTo.equals("")) {			
				for (int i = 0; i < orderRestaurant.size(); i++) {				
					if(orderRestaurant.get(i).getPrice() >= Double.parseDouble(priceFrom) && orderRestaurant.get(i).getPrice() <= Double.parseDouble(priceTo)) {						
						orderPrice.add(orderRestaurant.get(i));	
					}				 
			    }
			}else if(!priceFrom.equals("") && priceTo.equals("")) {
				for (int i = 0; i < orderRestaurant.size(); i++) {				
					if(orderRestaurant.get(i).getPrice() >= Double.parseDouble(priceFrom)) {						
						orderPrice.add(orderRestaurant.get(i));	
					}				 
			    }
			}else if(priceFrom.equals("") && !priceTo.equals("")) {
				for (int i = 0; i < orderRestaurant.size(); i++) {				
					if(orderRestaurant.get(i).getPrice() <= Double.parseDouble(priceTo)) {						
						orderPrice.add(orderRestaurant.get(i));	
					}				 
			    }
			}
		}else{ 
			orderPrice = orderRestaurant; 
		}
		
		if(!dateFrom.equals("") || !dateTo.equals("")) {			
			if(!dateFrom.equals("") && !dateTo.equals("")) {
				Date fromDate = new SimpleDateFormat("yyyy-MM-dd").parse(dateFrom);
				Date toDate = new SimpleDateFormat("yyyy-MM-dd").parse(dateTo);
				for (int i = 0; i < orderPrice.size(); i++) {							
					if(orderPrice.get(i).getDate().after(fromDate) && orderPrice.get(i).getDate().before(toDate)) {					
						orderDate.add(orderPrice.get(i));	
					}				 
			    }	
			}else if(!dateFrom.equals("") && dateTo.equals("")) {
				Date fromDate = new SimpleDateFormat("yyyy-MM-dd").parse(dateFrom);
				for (int i = 0; i < orderPrice.size(); i++) {							
					if(orderPrice.get(i).getDate().after(fromDate)) {					
						orderDate.add(orderPrice.get(i));	
					}				 
			    }
			}else if(dateFrom.equals("") && !dateTo.equals("")) {
				Date toDate = new SimpleDateFormat("yyyy-MM-dd").parse(dateTo);
				for (int i = 0; i < orderPrice.size(); i++) {							
					if(orderPrice.get(i).getDate().before(toDate)) {					
						orderDate.add(orderPrice.get(i));	
					}				 
			    }
			}
		}else{ 
			orderDate = orderPrice; 
		}
		
		if(!filterType.equals("")) {		
			for (int i = 0; i < orderDate.size(); i++) {
				int id = orderDate.get(i).getRestaurant();
				Restaurant r = restaurant.findRestaurant(id);
				if(r.getType().toLowerCase().equals(filterType.toLowerCase())) {						
					orderType.add(orderDate.get(i));						
				}				 
		    }	
		}else{ 
			orderType = orderDate; 
		}
						
		return orderType;		
				
	}
	
	public ArrayList<Order> searchBuyer(String searchRestaurant, String priceFrom, String priceTo, String dateFrom, String dateTo, String filterType, String filterStatus, String username) throws ParseException {		
		ArrayList<Order> orderBuyer = new ArrayList<Order>();
		ArrayList<Order> orderRestaurant = new ArrayList<Order>();
		ArrayList<Order> orderPrice = new ArrayList<Order>();
		ArrayList<Order> orderDate = new ArrayList<Order>();
		ArrayList<Order> orderType = new ArrayList<Order>();
		ArrayList<Order> orderStatus = new ArrayList<Order>();
		
		DAORestaurant restaurant = new DAORestaurant();
				
		for (Map.Entry<Integer, Order> entry : orders.entrySet()) {					
			if(entry.getValue().getBuyer().toLowerCase().equals(username.toLowerCase())) {				
				orderBuyer.add(entry.getValue());						
			}
		}		
		
		if(!searchRestaurant.equals("")) {	
			for (int i = 0; i < orderBuyer.size(); i++) {				
				Restaurant r = restaurant.findRestaurant(orderBuyer.get(i).getRestaurant());				
				if(r.getName().toLowerCase().equals(searchRestaurant.toLowerCase())) {				
					orderRestaurant.add(orderBuyer.get(i));							
				}				 
		    }	
		}else{ 
			orderRestaurant = orderBuyer; 
		}
		
		if(!priceFrom.equals("") || !priceTo.equals("")) {	
			if(!priceFrom.equals("") && !priceTo.equals("")) {			
				for (int i = 0; i < orderRestaurant.size(); i++) {				
					if(orderRestaurant.get(i).getPrice() >= Double.parseDouble(priceFrom) && orderRestaurant.get(i).getPrice() <= Double.parseDouble(priceTo)) {						
						orderPrice.add(orderRestaurant.get(i));	
					}				 
			    }
			}else if(!priceFrom.equals("") && priceTo.equals("")) {
				for (int i = 0; i < orderRestaurant.size(); i++) {				
					if(orderRestaurant.get(i).getPrice() >= Double.parseDouble(priceFrom)) {						
						orderPrice.add(orderRestaurant.get(i));	
					}				 
			    }
			}else if(priceFrom.equals("") && !priceTo.equals("")) {
				for (int i = 0; i < orderRestaurant.size(); i++) {				
					if(orderRestaurant.get(i).getPrice() <= Double.parseDouble(priceTo)) {						
						orderPrice.add(orderRestaurant.get(i));	
					}				 
			    }
			}
		}else{ 
			orderPrice = orderRestaurant; 
		}
		
		if(!dateFrom.equals("") || !dateTo.equals("")) {			
			if(!dateFrom.equals("") && !dateTo.equals("")) {
				Date fromDate = new SimpleDateFormat("yyyy-MM-dd").parse(dateFrom);
				Date toDate = new SimpleDateFormat("yyyy-MM-dd").parse(dateTo);
				for (int i = 0; i < orderPrice.size(); i++) {							
					if(orderPrice.get(i).getDate().after(fromDate) && orderPrice.get(i).getDate().before(toDate)) {					
						orderDate.add(orderPrice.get(i));	
					}				 
			    }	
			}else if(!dateFrom.equals("") && dateTo.equals("")) {
				Date fromDate = new SimpleDateFormat("yyyy-MM-dd").parse(dateFrom);
				for (int i = 0; i < orderPrice.size(); i++) {							
					if(orderPrice.get(i).getDate().after(fromDate)) {					
						orderDate.add(orderPrice.get(i));	
					}				 
			    }
			}else if(dateFrom.equals("") && !dateTo.equals("")) {
				Date toDate = new SimpleDateFormat("yyyy-MM-dd").parse(dateTo);
				for (int i = 0; i < orderPrice.size(); i++) {							
					if(orderPrice.get(i).getDate().before(toDate)) {					
						orderDate.add(orderPrice.get(i));	
					}				 
			    }
			}
		}else{ 
			orderDate = orderPrice; 
		}
		
		if(!filterType.equals("")) {		
			for (int i = 0; i < orderDate.size(); i++) {
				int id = orderDate.get(i).getRestaurant();
				Restaurant r = restaurant.findRestaurant(id);
				if(r.getType().toLowerCase().equals(filterType.toLowerCase())) {						
					orderType.add(orderDate.get(i));						
				}				 
		    }	
		}else{ 
			orderType = orderDate; 
		}
		
		if(!filterStatus.equals("")) {			
			for (int i = 0; i < orderType.size(); i++) {
					if(orderType.get(i).getStatus().toLowerCase().equals(filterStatus.toLowerCase())) {
						orderStatus.add(orderType.get(i));
					}
		    }	
		}else{ 
			orderStatus = orderType; 
		}
						
		return orderStatus;		
				
	}
	
}
