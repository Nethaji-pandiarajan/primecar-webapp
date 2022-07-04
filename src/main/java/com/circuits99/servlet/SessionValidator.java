package com.circuits99.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet implementation class SessionValidator
 */
@WebServlet("/admin/SessionValidator")
public class SessionValidator extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String id = request.getParameter("dt");
		HttpSession session = request.getSession(false);
		boolean isValid = false;
		if(session != null) {
			if(id.equals(request.getRequestedSessionId())) {
				isValid = true;
			}
		}
		PrintWriter out = response.getWriter();
		out.println(isValid);
		out.flush();
		out.close();
	}

}
