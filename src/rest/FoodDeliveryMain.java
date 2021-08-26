package rest;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.io.File;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Buyer;
import beans.DAOBuyer;
import beans.DAORestaurant;
import beans.Restaurant;

public class FoodDeliveryMain {
	
	private static Gson g = new Gson();
	private static DAOBuyer buyerDAO = new DAOBuyer();
	private static DAORestaurant restaurantDAO = new DAORestaurant();

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
		
		get("/", (req, res) -> {
			return g.toJson(restaurantDAO.getRestaurants().values());
		});
		
		post("/add-restaurant", (req, res)-> {
			
			String reqBody = req.body();
			Gson gsonReg = new GsonBuilder().create();
			
			Restaurant restaurant = gsonReg.fromJson(reqBody, Restaurant.class);
			restaurantDAO.addRestaurants(restaurant);
			return true;
			
		});

	}

}
