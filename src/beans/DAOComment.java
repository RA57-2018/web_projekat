package beans;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class DAOComment {

private HashMap<Integer,Comment> comments;
	
	public DAOComment() {
		comments = new HashMap<Integer,Comment>();
		
		try {
			readComment();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	
	public HashMap<Integer, Comment> getComments() {
		return comments;
	}


	public void setComments(HashMap<Integer, Comment> comments) {
		this.comments = comments;
	}


	public void readComment() throws FileNotFoundException {
		
		Gson gson = new Gson();
		Type token = new TypeToken<HashMap<Integer,Comment>>(){}.getType();
		BufferedReader br = new BufferedReader(new FileReader("files/comments.json"));
		this.comments = gson.fromJson(br, token);
		
	}
	
	public void writeComment() throws IOException{
		Gson gson = new Gson();
		FileWriter writer = new FileWriter("files/comments.json");
		gson.toJson(this.comments, writer);
		writer.flush();
		writer.close();
	}
	
	public int findNextId() {
		int maxValueKey = Collections.max(this.comments.keySet());
		return maxValueKey + 1;
	}
	
	public Comment findComment(int id) {
		for (Map.Entry<Integer, Comment> entry : comments.entrySet()) {
	        if(entry.getValue().getId() == id) {
	        	return entry.getValue();
	        }
	    }	
		return null;
	}
	
	public ArrayList<Comment> findRestaurantComments(int id) {
		
		ArrayList<Comment> commentsR = new ArrayList<Comment>();
		
		for (Map.Entry<Integer, Comment> entry : comments.entrySet()) {
	        if(entry.getValue().getRestaurant() == id && entry.getValue().isViewComment() && entry.getValue().isApproved()) {
	        	commentsR.add(entry.getValue());
	        }
	    }	
		
		return commentsR;
		
	}
}
