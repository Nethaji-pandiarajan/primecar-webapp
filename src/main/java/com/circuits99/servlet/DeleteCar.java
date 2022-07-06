package com.circuits99.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.circuits99.dao.ProductDAO;

/**
 * Servlet implementation class DeleteCar
 */
@WebServlet("/admin/deletecar")
public class DeleteCar extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String dataStr = request.getParameter("dt");
		PrintWriter out = response.getWriter();
		
		try {
			new ProductDAO().deleteCar(Integer.parseInt(dataStr));;
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
