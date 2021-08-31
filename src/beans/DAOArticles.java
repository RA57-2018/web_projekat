package beans;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class DAOArticles {

	private HashMap<Integer,ArrayList<Artical>> articles;
	
	public DAOArticles() {
		articles = new HashMap<Integer,ArrayList<Artical>>();
		
		try {
			readArticles();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public HashMap<Integer, ArrayList<Artical>> getArticles() {
		return articles;
	}

	public void setArticles(HashMap<Integer, ArrayList<Artical>> articles) {
		this.articles = articles;
	}
	
	public void readArticles() throws FileNotFoundException {
		Gson gson = new Gson();
		Type token = new TypeToken<HashMap<Integer,ArrayList<Artical>>>(){}.getType();
		BufferedReader br = new BufferedReader(new FileReader("files/articles.json"));
		this.articles = gson.fromJson(br, token);
		
	}
	
	public ArrayList<Artical> articlesRestaurant(int id) {
		articles = new HashMap<Integer,ArrayList<Artical>>();
		try {
			readArticles();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		for(ArrayList<Artical> l : articles.values()) 
		{
		    for (Artical i : l) {
		    	if(i.getRestaurant() == id) {
					return l;
				}
		      }
		}
		
		return null;
	}
}
