package com.circuits99.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.circuits99.dao.ProductDAO;
import com.circuits99.model.Car;
import com.google.gson.Gson;
import com.google.gson.JsonElement;

/**
 * Servlet implementation class UpdateCars
 */
@WebServlet("/admin/UpdateCars")
public class UpdateCars extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		int id = Integer.parseInt(request.getParameter("dt"));
		Gson g = new Gson();  
		PrintWriter out = response.getWriter();
		try {
			Car car = ProductDAO.find(id);
		    JsonElement userJson = g.toJsonTree(car);
		    out.println(userJson.toString());
		} catch (Exception e) {
			response.setStatus(400);
			out.print(e.getMessage());
			out.flush();
		}finally {
			out.close();
		}
	}

}
