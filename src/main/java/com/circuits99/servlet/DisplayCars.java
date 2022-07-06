package com.circuits99.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import javax.print.attribute.HashAttributeSet;
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
import com.google.gson.JsonObject;

/**
 * Servlet implementation class DisplayCars
 */
@WebServlet("/admin/displaycars")
public class DisplayCars extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String dataStr = request.getParameter("dt");
		Gson g = new Gson();
		PrintWriter out = response.getWriter();
		JsonArray jsonArray = g.fromJson(dataStr, JsonArray.class);
		Map<Integer, Boolean> deatils = new HashMap<>();
		
		try {
			for(JsonElement obj:jsonArray) {
				JsonObject val = obj.getAsJsonObject();
				Boolean isUsed = val.get("isUsed").getAsBoolean() ? false : true;
				deatils.put(val.get("id").getAsInt(), isUsed);
			}
			new ProductDAO().update(deatils);
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
