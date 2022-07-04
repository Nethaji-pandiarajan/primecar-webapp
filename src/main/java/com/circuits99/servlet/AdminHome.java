package com.circuits99.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.circuits99.dao.ProductDAO;
import com.google.gson.JsonObject;

/**
 * Servlet implementation class AdminHome
 */
@WebServlet("/admin/adminhome")
public class AdminHome extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		JsonObject jsonData = new JsonObject();
		ProductDAO productDao = new ProductDAO();
		jsonData.addProperty("sold", productDao.fetchSoldCarCount());
		jsonData.addProperty("active", productDao.fetchActiveCarCount());
		jsonData.addProperty("total", productDao.fetchTotalCarCount());
		out.println(jsonData.toString());
		out.close();
	}

}
