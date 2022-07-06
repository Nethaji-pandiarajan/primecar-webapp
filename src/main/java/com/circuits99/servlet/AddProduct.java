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
import com.google.gson.JsonObject;

/**
 * Servlet implementation class AddProduct
 */
@WebServlet("/admin/addProduct")
public class AddProduct extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String dataStr = request.getParameter("dt");
		Gson g = new Gson();
		PrintWriter out = response.getWriter();
		JsonObject obj = g.fromJson(dataStr, JsonObject.class);
		Car data = g.fromJson(dataStr, Car.class);
		try {
			if(obj.get("id") == null) {
				new ProductDAO().save(data,obj.get("page").toString(),0);
			}else {
				new ProductDAO().save(data,obj.get("page").toString(),Integer.parseInt(obj.get("id").getAsString()));
			}
			response.setStatus(200);
			out.print("Success");
			out.flush();
		} catch (Exception e) {
			response.setStatus(400);
			out.print(e.getMessage());
			out.flush();
		} finally {
			out.close();
		}
	}
}
