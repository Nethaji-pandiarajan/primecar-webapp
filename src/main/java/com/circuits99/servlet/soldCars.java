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
 * Servlet implementation class ViewCars
 */
@WebServlet("/admin/soldCars")
public class soldCars extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Gson g = new Gson();  
		PrintWriter out = response.getWriter();
		JsonArray jsonArray = new JsonArray();
		try {
			List<Car> cars = new ProductDAO().soldedCarsList();
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
