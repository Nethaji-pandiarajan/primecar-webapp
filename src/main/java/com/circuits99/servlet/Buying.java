package com.circuits99.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.circuits99.dao.ProductDAO;
import com.circuits99.model.Car;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;

/**
 * Servlet implementation class Buying
 */
@WebServlet("/buying")
public class Buying extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String dataStr = request.getParameter("dt");
		Gson g = new Gson();  
		PrintWriter out = response.getWriter();
		JsonArray jsonArray = new JsonArray();
		Car data = g.fromJson(dataStr, Car.class);
		try {
			List<Car> cars = new ProductDAO().fetch(data);
		    for(Car car:cars) {
		    	JsonElement userJson = g.toJsonTree(car);
		    	jsonArray.add(userJson);
		    }
		    out.println(jsonArray.toString());
		} catch (Exception e) {
			response.setStatus(400);
			out.print(e.getMessage());
			out.flush();
		}finally {
			out.close();
		}
	}

}
