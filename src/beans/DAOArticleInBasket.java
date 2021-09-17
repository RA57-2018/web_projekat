package beans;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class DAOArticleInBasket {

	private HashMap<Integer, ArticleInBasket> articlesInBasket;

	public HashMap<Integer, ArticleInBasket> getArticlesInBasket() {
		return articlesInBasket;
	}

	public void setArticlesInBasket(HashMap<Integer, ArticleInBasket> articlesInBasket) {
		this.articlesInBasket = articlesInBasket;
	}
	
	public DAOArticleInBasket() {
		
		articlesInBasket = new HashMap<Integer, ArticleInBasket>();
		try {
			readArticleInBasket();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}
	
	private void readArticleInBasket() throws FileNotFoundException{
		Gson gson = new Gson();
		Type token = new TypeToken<HashMap<Integer, ArticleInBasket>>(){}.getType();
		BufferedReader br = new BufferedReader(new FileReader("files/articlesInBasket.json"));
		this.articlesInBasket = gson.fromJson(br, token);
	}
	
	public ArticleInBasket findArticle(int id) {
		for (Map.Entry<Integer, ArticleInBasket> entry : articlesInBasket.entrySet()) {
	        if(entry.getValue().getId() == id) {
	        	return entry.getValue();
	        }
	    }	
		return null;
	}
	
	public void writeArticleInBasket() throws IOException{
		Gson gson = new Gson();
		FileWriter fw = new FileWriter("files/articlesInBasket.json");
		gson.toJson(this.articlesInBasket, fw);
		fw.flush();
		fw.close();
	}
}
