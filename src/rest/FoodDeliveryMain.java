package rest;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Administrator;
import beans.Buyer;
import beans.DAOAdministrator;
import beans.DAOBuyer;
import beans.DAODeliverer;
import beans.DAOLocation;
import beans.DAOManager;
import beans.DAORestaurant;
import beans.Deliverer;
import beans.Location;
import beans.Manager;
import beans.Restaurant;
import beans.RestaurantDAO;
import beans.User;

public class FoodDeliveryMain {
	
	private static Gson g = new Gson();
	private static DAOBuyer buyerDAO = new DAOBuyer();
	private static DAORestaurant restaurantDAO = new DAORestaurant();
	private static DAOAdministrator administratorDAO = new DAOAdministrator();
	private static DAOManager managerDAO = new DAOManager();
	private static DAODeliverer delivererDAO = new DAODeliverer();
	private static DAOLocation locationDAO = new DAOLocation();

	public static void main(String[] args) throws Exception {
		
	port(8080);
		
		staticFiles.externalLocation(new File("./static").getCanonicalPath()); 
		
		post("/login", (req, res)-> {
			String name  = req.queryParams("username");
			String pass = req.queryParams("password");			
			
			String userN = " ";
			ArrayList<String> response = new ArrayList<String>();
			if(buyerDAO.findBuyer(name, pass) != null) {
			    userN = name;
				response.add(userN);
				response.add("buyer");
			}
			else if(administratorDAO.findAdministrator(name, pass) != null){
				userN = name;
				response.add(userN);
				response.add("administrator");
			}
			else if(managerDAO.findManager(name, pass) != null){
				userN = name;
				response.add(userN);
				response.add("manager");
			}else if(delivererDAO.findDeliverer(name, pass) != null){
				userN = name;
				response.add(userN);
				response.add("deliverer");
			}
			response.add(userN);
			return g.toJson(response);
		});
		
		
		post("/registration", (req, res)-> {
			
			String reqBody = req.body();
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			
			Buyer buyer = gsonReg.fromJson(reqBody, Buyer.class);
			buyerDAO.addBuyer(buyer);
			return true;
			
		});
		
		get("/restaurants", (req, res) -> {
			return g.toJson(restaurantDAO.getRestaurants().values());
		});
		
		get("/restaurantsLocations", (req, res) -> {
			return g.toJson(locationDAO.getLocation().values());
		});
		
		post("/add-restaurant", (req, res) -> {
			String reqBody = req.body();
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd'T'hh:mm").create();
			
			RestaurantDAO r = gsonReg.fromJson(reqBody, RestaurantDAO.class);
			int locationId = locationDAO.findNextId();
			Location location = r.getLocation();
			location.setId(locationId);
			
			int id = restaurantDAO.findNextIdR();
			Restaurant restaurant = r.getRestaurant();
			restaurant.setId(id);
			restaurant.setLocation(locationId);
		
			HashMap<Integer, Location> locations = locationDAO.getLocation();
			locations.put(locationId, location);
			locationDAO.setLocation(locations);
			locationDAO.writeLocation();
			System.out.println("Hello");
			return true;
			
		});
		
		get("/profile", (req, res)->{
			String name =  req.queryParams("username");
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd hh:mm").create();
			User u = null;
			u = buyerDAO.findBuyerProfile(name);
			if(u != null) {
				return gsonReg.toJson(u);
			}
			else
			{
				u = administratorDAO.findAdministratorProfile(name);
				if(u != null) {
					return gsonReg.toJson(u);
				}else {
					u = managerDAO.findManagerProfile(name);
					if(u != null) {
						return gsonReg.toJson(u);
					}else {
						u = delivererDAO.findDelivererProfile(name);
						if(u != null) {
							return gsonReg.toJson(u);
						}
					}	
				}	
			}
			return gsonReg.toJson(u);
		});
		
		
		post("/updateProfile", (req, res)-> {
			String name =  req.queryParams("username");
			String reqBody = req.body();
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd hh:mm").create();
			User u = null;
			u = administratorDAO.findAdministratorProfile(name);
			if(u != null) {
				Administrator administrator = gsonReg.fromJson(reqBody, Administrator.class);
				administratorDAO.changeAdministrator(name,administrator);
			}else {
				u = buyerDAO.findBuyerProfile(name);
				if(u != null) {
					Buyer buyer = gsonReg.fromJson(reqBody, Buyer.class);
					buyerDAO.changeBuyer(name,buyer);
				}else {
					u = managerDAO.findManagerProfile(name);
					if(u != null) {
						Manager manager = gsonReg.fromJson(reqBody, Manager.class);
						managerDAO.changeManager(name,manager);
					}else {
						u = delivererDAO.findDelivererProfile(name);
						if(u != null) {
							Deliverer deliverer = gsonReg.fromJson(reqBody, Deliverer.class);
							delivererDAO.changeDeliverer(name,deliverer);
						}	
					}
				}	
				
			}
			return true;
			
		});
		
		
        post("/addEmployee", (req, res)-> {
        		
			String rol = req.queryParams("role");
			
			String reqBody = req.body();
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			
			if(rol.equals("menadzer")) {
				Manager manager = gsonReg.fromJson(reqBody, Manager.class);
				managerDAO.addManager(manager);
			}else if(rol.equals("dostavljac")) {
				Deliverer deliverer = gsonReg.fromJson(reqBody, Deliverer.class);
				delivererDAO.addDeliverer(deliverer);
			}
			return true;
			
		});

	}

}
