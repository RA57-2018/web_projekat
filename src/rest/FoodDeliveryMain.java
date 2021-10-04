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
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.imageio.ImageIO;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Administrator;
import beans.Artical;
import beans.ArticleInBasket;
import beans.Basket;
import beans.Buyer;
import beans.DAOAdministrator;
import beans.DAOArticleInBasket;
import beans.DAOArticles;
import beans.DAOBuyer;
import beans.DAODeliverer;
import beans.DAOLocation;
import beans.DAOManager;
import beans.DAOOrder;
import beans.DAORestaurant;
import beans.DAOUser;
import beans.DAOUserUs;
import beans.Deliverer;
import beans.Location;
import beans.Manager;
import beans.Order;
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
	private static DAOArticleInBasket articlesInBasketDAO = new DAOArticleInBasket();
	private static DAOOrder orderDAO = new DAOOrder();
	private static DAOUser userDAO = new DAOUser();
	private static DAOUserUs userDAOus = new DAOUserUs();
	
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
				}else {
					response.add("blokiran");
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
				}else {
					response.add("blokiran");
				}
			}else if(delivererDAO.findDeliverer(name, pass) != null){
				if(!delivererDAO.findDeliverer(name, pass).isDeleted()) {
					userN = name;
					response.add(userN);
					response.add("deliverer");
				}else {
					response.add("blokiran");
				}
			}
			response.add(userN);
			return g.toJson(response);
		});
		
		
		post("/registration", (req, res)-> {

            String reqBody = req.body();
            Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();

            Buyer buyer = gsonReg.fromJson(reqBody, Buyer.class);

            String userName = " ";
            ArrayList<String> answer = new ArrayList<String>();
            if(buyerDAO.findUsername(buyer.getUsername()) != null) {
                answer.add(userName);
                return g.toJson(answer);
            }else {
                buyerDAO.addBuyer(buyer);
                return true;
            }

        });
		
		get("/restaurants", (req, res) -> {
			return g.toJson(restaurantDAO.getRestaurants().values());
		});
		
		get("/restaurantsLocations", (req, res) -> {
			return g.toJson(locationDAO.getLocation().values());
		});
		
		post("/add-restaurant", (req, res) -> {
			String reqBody = req.body();
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
						
			RestaurantDAO restaurant = gsonReg.fromJson(reqBody, RestaurantDAO.class);
			int locationId = locationDAO.findNextId();
			
			Location location = restaurant.getLocation();			
			location.setId(locationId);
			
			int id = restaurantDAO.findNextIdR();
			Restaurant rest = restaurant.getRestaurant();
			rest.setId(id);
			rest.setLocation(locationId);
			
								
			if(rest.getLogo() == null) {
				return false;
			}
			
			String imageString = rest.getLogo().split(",")[1];
			BufferedImage image = null;
            byte[] imageByte;
            
            imageByte = Base64.getDecoder().decode(imageString);
            ByteArrayInputStream bis = new ByteArrayInputStream(imageByte);
            image = ImageIO.read(bis);
            bis.close();
            
            int idr = restaurantDAO.imageNumberRestaurant();
            String imageName = "restoran" + idr + ".jpg";
            
            File outputfile = new File(System.getProperty("user.dir")+ "\\static\\images\\" + imageName);
            ImageIO.write(image, "jpg", outputfile);
            rest.setLogo("../images/" + imageName);
            
            managerDAO.writeIdManager(rest.getManager(), id);
            
			HashMap<Integer, Restaurant> restaurants = restaurantDAO.getRestaurants();
			restaurants.put(id, rest);
			restaurantDAO.setRestaurants(restaurants);
			restaurantDAO.writeRestaurants();
            
			HashMap<Integer,Location> locations = locationDAO.getLocation();
			locations.put(locationId, location);
			locationDAO.setLocation(locations);
			locationDAO.writeLocation();
	
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
			String articleName = req.queryParams("name");
			String reqBody = req.body();
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			
			int id = restaurantDAO.findManagerRestaurant(userName);
			Artical artical = gsonReg.fromJson(reqBody, Artical.class);
			
			String aName = " ";
			ArrayList<String> answer = new ArrayList<String>();
			if(articlesDAO.checkName(id, artical, articleName) != null) {
				answer.add(aName);
				return g.toJson(answer);
			}else {
				int idA = articlesDAO.imageNumber();
				String m = "a" + idA;
				
				artical.setId(m);
				
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
	            
	            int idd = articlesDAO.imageNumber();
	            String imageName= "artikal" + idd + ".jpg";
	            
				File outputfile = new File(System.getProperty("user.dir")+ "\\static\\images\\" + imageName);
		        ImageIO.write(image, "jpg", outputfile);
		        
		        artical.setImage("../images/" + imageName);
		            			
				articlesDAO.addArticle(id, artical);
				articlesDAO.writeArticle();
				return true;
			}
			
			
			
		});
        
		get("/myRestaurant", (req, res) -> {
			String userName = (req.queryParams("username")).trim();
			return g.toJson(restaurantDAO.findManagerRestaurant(userName));
		
		});
		
		get("/users", (req, res)->{
			ArrayList<DAOUser> users=userDAOus.getUsers();
			ArrayList<DAOUser> retUsers=new ArrayList<DAOUser>();
			for(int i=0; i<users.size(); i++) {
				
				if(users.get(i).getRole().equals("kupac")) {
					
					Buyer b = buyerDAO.findBuyerProfile(users.get(i).getUsername());
					if(!b.isBlock() && !b.isBlocked()) {
						retUsers.add(users.get(i));
					}
				}else if(users.get(i).getRole().equals("menadzer")) {
					
					Manager m = managerDAO.findManagerProfile(users.get(i).getUsername());
					if(!m.isBlock()) {
						retUsers.add(users.get(i));
					}
				}else if(users.get(i).getRole().equals("administrator")) {
					
					Administrator a = administratorDAO.findAdministratorProfile(users.get(i).getUsername());
					if(!a.isBlock()) {
						retUsers.add(users.get(i));
					}
				}else {
					Deliverer d = delivererDAO.findDelivererProfile(users.get(i).getUsername());
					if(!d.isBlock()) {
						retUsers.add(users.get(i));
					}
					
				}
			}
			return g.toJson(retUsers);
			
		});
		
		get("/administrators", (req, res)->{
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd hh:mm").create();
			
			ArrayList<Administrator> administrators = new ArrayList<Administrator>();
			for (Map.Entry<String, Administrator> entry : administratorDAO.getAdministrators().entrySet()) {
				
				administrators.add( entry.getValue());
		        
		    }	
			return gsonReg.toJson(administrators);
			
		});
		get("/buyers", (req, res)->{
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd hh:mm").create();
			
			ArrayList<Buyer> buyers = new ArrayList<Buyer>();
			for (Map.Entry<String, Buyer> entry : buyerDAO.getBuyers().entrySet()) {
				
				buyers.add( entry.getValue());
		        
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
		
		get("/searchUsers", (req, res) -> {
			String sortCriteria = (req.queryParams("sortCriteria")).trim();
			String type = (req.queryParams("type")).trim();
			String role = (req.queryParams("role")).trim();
			String username = (req.queryParams("username")).trim();
			String surname = (req.queryParams("surname")).trim();
			String name = (req.queryParams("name")).trim();
			return g.toJson(userDAOus.search(name, surname, username, type, role, sortCriteria));
		});
		
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
		
		get("/restaurantManager", (req, res) -> {
			return g.toJson(managerDAO.getManagers().values());
		});
		
        post("/addManager", (req, res)-> {
    					
			String reqBody = req.body();
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			
			Manager manager = gsonReg.fromJson(reqBody, Manager.class);
			manager.setRole("menadzer");
			managerDAO.addManager(manager);

			return true;
			
		});
        
		get("/oneArticle", (req, res)->{
			String idA =  req.queryParams("idA");
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			Artical artical = null;
			artical = articlesDAO.findArticleId(idA);
			
			if(artical != null) {
				return gsonReg.toJson(artical);
			}
			
			return gsonReg.toJson(artical);
		});
		
		post("/updateArticle", (req, res)-> {
			String idA =  req.queryParams("id");
			String reqBody = req.body();
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			Artical artical = null;
			artical = articlesDAO.findArticleId(idA);
			if(artical != null) {
				Artical a = gsonReg.fromJson(reqBody, Artical.class);
				articlesDAO.changeArticle(idA,a);
			}
			return true;
			
		});
		
		get("/articleInBasket", (req, res)->{
			String username =  req.queryParams("id");
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			Basket basket = null;

			basket = buyerDAO.findBasket(username);
			
			ArrayList<ArticleInBasket> a = new ArrayList<ArticleInBasket>();
			for(int i = 0; i < basket.getArticalsInBasket().size(); i++) {				
				ArticleInBasket articles = articlesInBasketDAO.findArticle(basket.getArticalsInBasket().get(i));
				if(!articles.isDeleted()) {
					a.add(articles);
				}
								
			}
			
			return gsonReg.toJson(a);
		});
		
		post("/deleteArticleInBasket", (req, res)-> {
			String id = req.queryParams("id");
			
			ArticleInBasket article = articlesInBasketDAO.findArticle(Integer.parseInt(id));
			
			article.setDeleted(true);
			
			HashMap<Integer, ArticleInBasket> articles = articlesInBasketDAO.getArticlesInBasket();
			articles.put(article.getId(), article);
			articlesInBasketDAO.setArticlesInBasket(articles);
			articlesInBasketDAO.writeArticleInBasket();
			
			return true;
		});
		
		post("/changeQuantity", (req, res)-> {
			String id = req.queryParams("id");			
			String quantity = req.queryParams("quantity");
			
			ArticleInBasket article = articlesInBasketDAO.findArticle(Integer.parseInt(id));
			article.setQuantity(Integer.parseInt(quantity));
			
			HashMap<Integer, ArticleInBasket> articles = articlesInBasketDAO.getArticlesInBasket();
			articles.put(article.getId(), article);
			articlesInBasketDAO.setArticlesInBasket(articles);
			articlesInBasketDAO.writeArticleInBasket();
			
			return true;
		});
		
		post("/createOrder", (req, res) -> {
			String reqBody = req.body();
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			
			Date date= java.util.Calendar.getInstance().getTime();
			
			Basket basket = gsonReg.fromJson(reqBody, Basket.class);
			
			HashMap<Integer, Order> orders = orderDAO.getOrders();
			
			Order o = new Order();
			
			o.setId(orderDAO.findNextId());
			o.setPrice(basket.getPrice());
			o.setBuyer(basket.getUser());
			o.setStatus("OBRADA");
			o.setDate(date);
			o.setArtical(basket.getArticalsInBasket());
			
			int idArticle = basket.getArticalsInBasket().get(0);
			ArticleInBasket a = articlesInBasketDAO.findArticle(idArticle);
			int restaurant = a.getArtical().getRestaurant();
		
			o.setRestaurant(restaurant);
			
			orders.put(o.getId(), o);
			orderDAO.setOrders(orders);
			
			orderDAO.write();
			
			HashMap<Integer, ArticleInBasket> artK = articlesInBasketDAO.getArticlesInBasket();
			
			for(int i = 0; i < basket.getArticalsInBasket().size(); i++) {
				
				int id = basket.getArticalsInBasket().get(i);
				ArticleInBasket artB = articlesInBasketDAO.findArticle(id);
				artB.setDeleted(true);
				
				artK.put(artB.getId(), artB);
				
			
			}
			articlesInBasketDAO.setArticlesInBasket(artK);
			articlesInBasketDAO.writeArticleInBasket();
			Buyer b = buyerDAO.findBuyerProfile(basket.getUser());
			int points=(int) (basket.getPrice()/1000 * 133) + b.getPoints();
			HashMap<String, Buyer> buyers = buyerDAO.getBuyers();
			
			b.setPoints(points);
			buyers.put(b.getUsername(), b);
			buyerDAO.setBuyers(buyers);
			buyerDAO.writeBuyers();
			
			ArrayList<DAOUser> users = userDAOus.getUsers();
			DAOUser us = userDAOus.findUser(basket.getUser());
			users.remove(us);
			us.setPoints(points);
			users.add(us);
			userDAOus.setUsers(users);
			userDAOus.writeUsers();
			
			return true;
		});
		
		
		get("/orders", (req, res)->{
			
			String user = req.queryParams("user");
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd hh:mm").create();
			
			ArrayList<Order> orders = new ArrayList<Order>();
			for (Map.Entry<Integer, Order> entry : orderDAO.getOrders().entrySet()) {
				
				if(entry.getValue().getBuyer().equals(user) && !entry.getValue().getStatus().equals("OTKAZANA") && !entry.getValue().getStatus().equals("DOSTAVLJENA")) {
				
					orders.add( entry.getValue());
				}
		        
		    }	
			return gsonReg.toJson(orders);
			
		});
		
		/*get("/articlesOrder", (req, res) -> {
			String id = req.queryParams("id");
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd hh:mm").create();
			
			Order o= orderDAO.findOrder(Integer.parseInt(id));
			ArrayList<ArticleInBasket> articles = new ArrayList<ArticleInBasket>();
			for(int i = 0; i<o.getArtical().size(); i++) {
				
				ArticleInBasket art = articlesInBasketDAO.findArticle(o.getArtical().get(i));
				
					articles.add(art);
				
				
				
			}
			
			return gsonReg.toJson(articles);
		});*/
		
		post("/block", (req, res)-> {
			
			String user = req.queryParams("user");
			DAOUser us=userDAOus.findUser(user);
			if(us.getRole().equals("kupac")) {
				
				Buyer b=buyerDAO.findBuyerProfile(user);
				b.setBlock(true);
				HashMap<String, Buyer> buyers=buyerDAO.getBuyers();
				buyers.put(b.getUsername(), b);
				buyerDAO.setBuyers(buyers);
				buyerDAO.writeBuyers();
			}else if(us.getRole().equals("menadzer")) {
				
				Manager m=managerDAO.findManagerProfile(user);
				m.setBlock(true);
				HashMap<String, Manager> managers=managerDAO.getManagers();
				managers.put(m.getUsername(), m);
				managerDAO.setManagers(managers);
				managerDAO.writeManager();
			}else{
				
				Deliverer d=delivererDAO.findDelivererProfile(user);
				d.setBlock(true);
				HashMap<String, Deliverer> deliverers=delivererDAO.getDeliverers();
				deliverers.put(d.getUsername(),d);
				delivererDAO.setDeliverers(deliverers);
				delivererDAO.writeDeliverer();
			}
			

			return true;
		});
		
		get("/suspiciousUsers", (req, res) -> {
			ArrayList<DAOUser> users=userDAOus.getUsers();
			ArrayList<DAOUser> retUsers=new ArrayList<DAOUser>();
			for(int i=0; i<users.size(); i++) {
				
				if(users.get(i).getRole().equals("kupac")) {
					
					Buyer b=buyerDAO.findBuyerProfile(users.get(i).getUsername());
					if(b.isSuspicious() && !b.isBlocked() && !b.isBlock()) {
						retUsers.add(users.get(i));
					}
				}
			}
			return g.toJson(retUsers);
		});
		
		post("/blockSuspicious", (req, res)-> {
			
			String user = req.queryParams("user");
			Buyer b=buyerDAO.findBuyerProfile(user);
			b.setBlocked(true);
			HashMap<String, Buyer> buyers=buyerDAO.getBuyers();
			buyers.put(b.getUsername(), b);
			buyerDAO.setBuyers(buyers);
			buyerDAO.writeBuyers();

			return true;
		});
		
	}
	
	

}
