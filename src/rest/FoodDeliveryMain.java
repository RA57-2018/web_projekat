package rest;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import javax.imageio.ImageIO;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Administrator;
import beans.Artical;
import beans.Buyer;
import beans.DAOAdministrator;
import beans.DAOArticles;
import beans.DAOBuyer;
import beans.DAODeliverer;
import beans.DAOLocation;
import beans.DAOManager;
import beans.DAORestaurant;
import beans.DAOUser;
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
	private static DAOArticles articlesDAO = new DAOArticles();
	private static DAOUser userDAO = new DAOUser();

	public static void main(String[] args) throws Exception {
		port(8080);
		
		staticFiles.externalLocation(new File("./static").getCanonicalPath()); 
		
		post("/login", (req, res)-> {
			String name  = req.queryParams("username");
			String pass = req.queryParams("password");			
			
			String userN = " ";
			ArrayList<String> response = new ArrayList<String>();
			if(buyerDAO.findBuyer(name, pass) != null) {
				if(!buyerDAO.findBuyer(name, pass).isDeleted()) {
				    userN = name;
					response.add(userN);
					response.add("buyer");
				}
			}
			else if(administratorDAO.findAdministrator(name, pass) != null){
					userN = name;
					response.add(userN);
					response.add("administrator");
			}
			else if(managerDAO.findManager(name, pass) != null){
				if(!managerDAO.findManager(name, pass).isDeleted()) {
					userN = name;
					response.add(userN);
					response.add("manager");
				}
			}else if(delivererDAO.findDeliverer(name, pass) != null){
				if(!delivererDAO.findDeliverer(name, pass).isDeleted()) {
					userN = name;
					response.add(userN);
					response.add("deliverer");
				}
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
			
			Restaurant restaurant = gsonReg.fromJson(reqBody, Restaurant.class);
			int locationId = locationDAO.findNextId();
			
			int id = restaurantDAO.findNextIdR();
			restaurant.setId(id);
			restaurant.setLocation(locationId);
			/*
			if(restaurant.getLogo() == null) {
				return false;
			}
			
			String imageString = restaurant.getLogo().split(",")[1];
			BufferedImage image = null;
            byte[] imageByte;
            
            imageByte = Base64.getDecoder().decode(imageString);
            ByteArrayInputStream bis = new ByteArrayInputStream(imageByte);
            image = ImageIO.read(bis);
            bis.close();
            String imageName= "restaurant" + id + ".jpg";
            
            File outputfile = new File(System.getProperty("restaurant1.dir")+ "\\static\\images\\" + imageName);
            ImageIO.write(image, "jpg", outputfile);
            restaurant.setLogo("../images/" + imageName);
		*/
			HashMap<Integer, Restaurant> restaurants = restaurantDAO.getRestaurants();
			restaurants.put(id, restaurant);
			restaurantDAO.setRestaurants(restaurants);
			restaurantDAO.writeRestaurants();
			return true;
			
		});
		
		get("/profile", (req, res)->{
			String name =  req.queryParams("username");
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
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
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
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
        
		get("/restaurant", (req, res) -> {
			String id = req.queryParams("id");
			Restaurant r = restaurantDAO.findRestaurant(Integer.parseInt(id));
			return g.toJson(r);
		});
		
		get("/restaurantLocation", (req, res) -> {
			String id = req.queryParams("id");
			return g.toJson(locationDAO.locationRestaurant(Integer.parseInt(id)));
		});
		
		get("/restaurantArticles", (req, res) -> {			
			String id = req.queryParams("id");
			ArrayList<Artical> valid = new ArrayList<Artical>();
			ArrayList<Artical> l = articlesDAO.articlesRestaurant(Integer.parseInt(id));
			for (Artical i : l) {
		    	if(!i.isDeleted()) {
		    		valid.add(i);
				}
		      }
			return g.toJson(valid);
		});
		
		get("/searchRestaurants", (req, res) -> {
			String searchName = (req.queryParams("searchName")).trim();
			String searchType = (req.queryParams("searchType")).trim();
			String searchLocation = (req.queryParams("searchLocation")).trim();
			HashMap<Integer,Restaurant> restaurants = restaurantDAO.getRestaurants();
			HashMap<Integer,Location> locations = locationDAO.getLocation();
			return g.toJson(restaurantDAO.search(restaurants,locations,searchName,searchType,searchLocation));
		});
		
        post("/addArticle", (req, res)-> {
    		
			String userName = req.queryParams("username");
			String reqBody = req.body();
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			
			int id = restaurantDAO.findManagerRestaurant(userName);
			Artical artical = gsonReg.fromJson(reqBody, Artical.class);
			artical.setRestaurant(id);
			
			if(artical.getImage() == null) {
				return false;
			}
			
			String imageString = artical.getImage().split(",")[1];
			BufferedImage image = null;
            byte[] imageByte;
            
            imageByte = Base64.getDecoder().decode(imageString);
            ByteArrayInputStream bis = new ByteArrayInputStream(imageByte);
            image = ImageIO.read(bis);
            bis.close();
            
            
            String imageName= "artikal" + id + ".jpg";

			File outputfile = new File(System.getProperty("user.dir")+ "\\static\\images\\" + imageName);
	        ImageIO.write(image, "jpg", outputfile);
	        
	        artical.setImage("../images/" + imageName);
	            			
			articlesDAO.addArticle(id, artical);
			articlesDAO.writeArticle();
			return true;
			
		});
        
		get("/myRestaurant", (req, res) -> {
			String userName = (req.queryParams("username")).trim();
			return g.toJson(restaurantDAO.findManagerRestaurant(userName));
		
		});
		
		get("/users", (req, res)->{
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd hh:mm").create();
			
			ArrayList<Buyer> buyers = new ArrayList<Buyer>();
			for (Map.Entry<String, Buyer> entry : buyerDAO.getBuyers().entrySet()) {
				if(!entry.getValue().isDeleted()) {
					buyers.add( entry.getValue());
				}
		        
		    }	
			return gsonReg.toJson(buyers);
			
		});
		
		get("/deliverers", (req, res)->{
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd hh:mm").create();
			
			ArrayList<Deliverer> deliverers = new ArrayList<Deliverer>();
			for (Map.Entry<String, Deliverer> entry : delivererDAO.getDeliverers().entrySet()) {
				if(!entry.getValue().isDeleted()) {
					deliverers.add( entry.getValue());
				}
		        
		    }	
			return gsonReg.toJson(deliverers);
			
		});
		
		get("/managers", (req, res)->{
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd hh:mm").create();
			
			ArrayList<Manager> managers = new ArrayList<Manager>();
			for (Map.Entry<String, Manager> entry : managerDAO.getManagers().entrySet()) {
				if(!entry.getValue().isDeleted()) {
					managers.add( entry.getValue());
				}
		        
		    }	
			return gsonReg.toJson(managers);
			
		});
		
		/*	get("/searchUsers", (req, res) -> {
		String searchName = (req.queryParams("searchName")).trim();
		String searchSurname = (req.queryParams("searchSurname")).trim();
		String searchUsername = (req.queryParams("searchUsername")).trim();
		HashMap<String,User> users = userDAO.getUsers();
		System.out.println("Hello");
		return userDAO.search(users,searchName,searchSurname,searchUsername);
	});*/
		
		/*get("/searchBuyer", (req, res)->{
		String p =  req.queryParams("pretraga");
		String u =  req.queryParams("uloga");
		Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd hh:mm").create();
		ArrayList<Buyer> buyers = new ArrayList<Buyer>();
		if(u.equals("kupac") || u.equals("")) {
			for (Map.Entry<String, Buyer> entry : buyerDAO.getBuyers().entrySet()) {
				if(p.equals("")) {
					buyers.add( entry.getValue());
				}else {
					if((entry.getValue().getName().contains(p) || entry.getValue().getSurname().contains(p) || entry.getValue().getUsername().contains(p)))
						buyers.add( entry.getValue());
				}
			}
		}
		return gsonReg.toJson(buyers);
		
	});
	
	get("/searchManager", (req, res)->{
		String p =  req.queryParams("pretraga");
		String u =  req.queryParams("uloga");
		Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd hh:mm").create();
		ArrayList<Manager> managers = new ArrayList<Manager>();
		if(u.equals("menadzer") || u.equals("")) {
			for (Map.Entry<String, Manager> entry : managerDAO.getManagers().entrySet()) {
				if(p.equals("")) {
					managers.add( entry.getValue());
				}else {
					if((entry.getValue().getName().contains(p) || entry.getValue().getSurname().contains(p) || entry.getValue().getUsername().contains(p)))
						managers.add( entry.getValue());
				}
			}
		}
		return gsonReg.toJson(managers);
		
	});
	
	get("/searchDeliverer", (req, res)->{
		String p =  req.queryParams("pretraga");
		String u =  req.queryParams("uloga");
		Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd hh:mm").create();
		ArrayList<Deliverer> deliverers = new ArrayList<Deliverer>();
		if(u.equals("dostavljac") || u.equals("")) {
			for (Map.Entry<String, Deliverer> entry : delivererDAO.getDeliverers().entrySet()) {
				if(p.equals("")) {
					deliverers.add( entry.getValue());
				}else {
					if((entry.getValue().getName().contains(p) || entry.getValue().getSurname().contains(p) || entry.getValue().getUsername().contains(p)))
						deliverers.add( entry.getValue());
				}
			}
		}
		return gsonReg.toJson(deliverers);
		
	});*/

		
		post("/delete", (req, res)-> {
			String uName =  req.queryParams("username");
			User u = null;
			u = buyerDAO.findBuyerProfile(uName);
			if(u != null) {
				buyerDAO.deleteBuyer(uName);
			}else {
					u = managerDAO.findManagerProfile(uName);
					if(u != null) {
						managerDAO.deleteManager(uName);
					}else {
						u = delivererDAO.findDelivererProfile(uName);
						if(u != null) {
							delivererDAO.deleteDeliverer(uName);
						}
					}
			}
			return true;
			
		});
		
		post("/deleteArticle", (req, res)-> {
			String aName =  req.queryParams("name");
			
			articlesDAO.findArticle(aName);
			
			return true;
			
		});
		
	}
	
	

}
