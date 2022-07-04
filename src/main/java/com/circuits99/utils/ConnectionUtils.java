package com.circuits99.utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;

public class ConnectionUtils {
	
	public static Connection createConnection() {
		Properties prop = PropertyFileReader.getValues();
		String DRIVER_CLASS = prop.getProperty("DRIVER_CLASS");
		String DB_URL = prop.getProperty("DB_URL");
		String DB_USERNAME = prop.getProperty("DB_USERNAME");
		String DB_PASSWORD = prop.getProperty("DB_PASSWORD");
		Connection connection = null;
		try {
			Class.forName(DRIVER_CLASS);
			connection = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return connection;
	}
	public static void close(ResultSet rs, PreparedStatement ps, Connection con) {
		try {
			if(rs != null) {
				rs.close();
			}
			if(ps != null) {
				ps.close();
			}if(con != null) {
				con.close();
			}
		}catch(SQLException e){
			e.printStackTrace();
		}
	}
	public static void main(String[] args) {
		System.out.println(createConnection());
	}
}
