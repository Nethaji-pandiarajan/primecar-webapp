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
 * Servlet implementation class Product
 */
@WebServlet("/product")
public class Product extends HttpServlet {
	private static final long serialVersionUID = 1L;
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		int id = Integer.parseInt(req.getParameter("dt"));
		Gson g = new Gson();  
		PrintWriter out = resp.getWriter();
		try {
			Car car = ProductDAO.find(id);
		    JsonElement userJson = g.toJsonTree(car);
		    out.println(userJson.toString());
		} catch (Exception e) {
			resp.setStatus(400);
			out.print(e.getMessage());
			out.flush();
		}finally {
			out.close();
		}
	}
}
