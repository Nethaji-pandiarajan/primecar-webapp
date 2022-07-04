package com.circuits99.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

/**
 * Servlet implementation class LoginServlet
 */
@WebServlet("/admin/LoginServlet")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		String dataStr = request.getParameter("dt");
		Gson g = new Gson();
		PrintWriter out = response.getWriter();
		
	//	JsonElement data = g.fromJson(dataStr, JsonObject.class);
		JsonObject user = g.fromJson(dataStr, JsonObject.class);
		
		String username = user.get("username").getAsString();
		String password = user.get("password").getAsString();
		if(username != null && !username.isBlank() && password != null && !password.isBlank()) {
			if(username.equals("admin")  && password.equals("Test@ab12")) {
				HttpSession session = request.getSession();
				session.setMaxInactiveInterval(60);
				JsonObject value = new JsonObject();
				response.setStatus(200);
				value.addProperty("Message", "Login Successfull");
				value.addProperty("id", session.getId());
				out.print(value.toString());
				out.flush();
			}else {
				response.setStatus(400);
				out.print("Invalid user");
				out.flush();
			}
		}
		out.close();
	}

}
