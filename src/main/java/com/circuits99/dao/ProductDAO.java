package com.circuits99.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.circuits99.model.Car;
import com.circuits99.utils.ConnectionUtils;

public class ProductDAO {

	public List<Car> fetch(Car data) {
		List<Car> cars = null;
		Connection con = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		try {
			cars = new ArrayList<Car>();
			con = ConnectionUtils.createConnection();
			pst = con.prepareStatement(buildFetchQuery(data));
			rs = pst.executeQuery();
			while (rs.next()) {
				Car car = new Car();
				car.setId(rs.getInt("id"));
				car.setCarName(rs.getString("car_name"));
				car.setBrand(rs.getString("brand"));
				car.setModel(rs.getString("model"));
				car.setTransmissionType(rs.getString("transmission_type"));
				car.setFuelType(rs.getString("fuel_type"));
				car.setYear(rs.getInt("year"));
				car.setPrice(rs.getLong("price"));
				car.setDistanceTravel(rs.getLong("distance_travel"));
				car.setExteriorColour(rs.getString("exterior_colour"));
				car.setInteriorColour(rs.getString("interior_colour"));
				car.setSeatingCapacity(rs.getInt("seating_capacity"));
				car.setDescription(rs.getString("description"));
				car.setFinance(rs.getString("finance"));
				car.setWhyBuyFromUs(rs.getString("why_buy_from_us"));
				car.setWarranty(rs.getString("warranty"));
				car.setImageBash64_1(rs.getString("image1"));
				cars.add(car);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			ConnectionUtils.close(rs, pst, con);
		}
		return cars;
	}

	private String buildFetchQuery(Car data) {
		StringBuilder query1 = new StringBuilder();
		StringBuilder query2 = new StringBuilder();
		query1.append("SELECT * FROM car_details ");
		if (data != null) {
			if (!"null".equals(data.getBrand()) && !data.getBrand().isBlank()) {
				query2.append("brand = '" + data.getBrand().toUpperCase() + "'");
			}
			if (!"null".equals(data.getModel()) && !data.getModel().isBlank()) {
				query2.append(" AND model = '" + data.getModel().toUpperCase() + "'");
			}
			if (!"null".equals(data.getFuelType()) && !data.getFuelType().isBlank()) {
				if (!"null".equals(data.getBrand()) && !data.getBrand().isBlank()) {
					query2.append(" AND ");
				}
				query2.append(" fuel_type = '" + data.getFuelType().toUpperCase() + "'");
			}
			if (!"null".equals(data.getTransmissionType()) && !data.getTransmissionType().isBlank()) {
				if (!"null".equals(data.getBrand()) && !data.getBrand().isBlank()) {
					query2.append(" AND ");
				}
				query2.append(" transmission_type = '" + data.getTransmissionType().toUpperCase() + "'");
			}
			if (data.getYear() != 0) {
				if (!"null".equals(data.getBrand()) && !data.getBrand().isBlank()) {
					query2.append(" AND ");
				}
				query2.append(" (year >= " + data.getFromYear() + " AND year <= " + data.getToYear() + ")");
			}

			if (!"null".equals(data.getPriceChoice()) && !data.getPriceChoice().isBlank()) {
				if (!"null".equals(data.getBrand()) && !data.getBrand().isBlank()) {
					query2.append(" AND ");
				}
				switch (data.getPriceChoice()) {
				case "<5L":
					query2.append(" price < 500000 ");
					break;
				case "5L-10L":
					query2.append(" price >= 500000 AND price < 1000000 ");
					;
					break;
				case "10L-25L":
					query2.append(" price >= 1000000 AND price < 2500000 ");
					break;
				case "25L-50L":
					query2.append(" price >= 2500000 AND price < 5000000 ");
					break;
				case ">50L":
					query2.append(" price > 5000000 ");
					break;
				}
			}

			if (query2.length() != 0) {
				query1.append(" WHERE " + query2);
			}
		}
		return query1.toString();
	}

	public void save(Car car,String page, int id) {
		Connection con = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		String sql = "";
		if(page.equalsIgnoreCase("add")) {
			sql = "INSERT INTO car_details (car_name,brand,model,transmission_type,fuel_type,year,price,distance_travel,exterior_colour,interior_colour,seating_capacity,description,finance,why_buy_from_us,warranty,image1,image2,image3,image4,image5)"
					+ "values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		}else {
			sql = "UPDATE car_details SET car_name = ? ,brand = ? ,model = ? ,transmission_type = ? ,"
					+ "fuel_type = ? year = ? price = ? distance_travel = ? exterior_colour = ? interior_colour = ? seating_capacity = ?"
					+ "description = ? finance = ? why_buy_from_us = ? warranty = ? image1 = ? image2 = ? image3 = ? image4 = ? image5 = ? WHERE id=?";
		}
		try {
			con = ConnectionUtils.createConnection();
			pst = con.prepareStatement(sql);
			pst.setString(1, car.getCarName().toUpperCase());
			pst.setString(2, car.getBrand().toUpperCase());
			pst.setString(3, car.getModel().toUpperCase());
			pst.setString(4, car.getTransmissionType().toUpperCase());
			pst.setString(5, car.getFuelType().toUpperCase());
			pst.setInt(6, car.getYear());
			pst.setLong(7, car.getPrice());
			pst.setLong(8, car.getDistanceTravel());
			pst.setString(9, car.getExteriorColour().toUpperCase());
			pst.setString(10, car.getInteriorColour().toUpperCase());
			pst.setInt(11, car.getSeatingCapacity());
			pst.setString(12, car.getDescription());
			pst.setString(13, car.getFinance());
			pst.setString(14, car.getWhyBuyFromUs());
			pst.setString(15, car.getWarranty());
			pst.setString(16, car.getImageBash64_1());
			pst.setString(17, car.getImageBash64_2());
			pst.setString(18, car.getImageBash64_3());
			pst.setString(19, car.getImageBash64_4());
			pst.setString(20, car.getImageBash64_5());
			if(id !=0) {
				pst.setInt(21, id);
			}
			pst.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			ConnectionUtils.close(rs, pst, con);
		}
	}

	public static Car find(int id) {
		Car car = null;
		Connection con = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		try {
			car = new Car();
			con = ConnectionUtils.createConnection();
			pst = con.prepareStatement("SELECT * FROM car_details WHERE id = ?");
			pst.setInt(1, id);
			rs = pst.executeQuery();
			if (rs.next()) {
				car.setId(rs.getInt("id"));
				car.setCarName(rs.getString("car_name"));
				car.setBrand(rs.getString("brand"));
				car.setModel(rs.getString("model"));
				car.setTransmissionType(rs.getString("transmission_type"));
				car.setFuelType(rs.getString("fuel_type"));
				car.setYear(rs.getInt("year"));
				car.setPrice(rs.getLong("price"));
				car.setDistanceTravel(rs.getLong("distance_travel"));
				car.setExteriorColour(rs.getString("exterior_colour"));
				car.setInteriorColour(rs.getString("interior_colour"));
				car.setSeatingCapacity(rs.getInt("seating_capacity"));
				car.setDescription(rs.getString("description"));
				car.setFinance(rs.getString("finance"));
				car.setWhyBuyFromUs(rs.getString("why_buy_from_us"));
				car.setWarranty(rs.getString("warranty"));
				car.setImageBash64_1(rs.getString("image1"));
				car.setImageBash64_2(rs.getString("image2"));
				car.setImageBash64_3(rs.getString("image3"));
				car.setImageBash64_4(rs.getString("image4"));
				car.setImageBash64_5(rs.getString("image5"));
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			ConnectionUtils.close(rs, pst, con);
		}
		return car;
	}

	public List<Car> fetchByAdmin() {
		List<Car> cars = null;
		Connection con = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		try {
			cars = new ArrayList<Car>();
			con = ConnectionUtils.createConnection();
			pst = con.prepareStatement("SELECT * FROM car_details");
			rs = pst.executeQuery();
			while (rs.next()) {
				Car car = new Car();
				car.setId(rs.getInt("id"));
				car.setCarName(rs.getString("car_name"));
				car.setBrand(rs.getString("brand"));
				car.setModel(rs.getString("model"));
				car.setTransmissionType(rs.getString("transmission_type"));
				car.setFuelType(rs.getString("fuel_type"));
				car.setYear(rs.getInt("year"));
				car.setPrice(rs.getLong("price"));
				car.setDistanceTravel(rs.getLong("distance_travel"));
				car.setExteriorColour(rs.getString("exterior_colour"));
				car.setInteriorColour(rs.getString("interior_colour"));
				car.setSeatingCapacity(rs.getInt("seating_capacity"));
				car.setDescription(rs.getString("description"));
				car.setFinance(rs.getString("finance"));
				car.setWhyBuyFromUs(rs.getString("why_buy_from_us"));
				car.setWarranty(rs.getString("warranty"));
				car.setImageBash64_1(rs.getString("image1"));
				car.setUsed(rs.getBoolean("isUsed"));
				car.setSolde((rs.getBoolean("isSolded")));
				cars.add(car);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			ConnectionUtils.close(rs, pst, con);
		}
		return cars;
	}

	public void update(Map<Integer, Boolean> deatils) {
		Connection con = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		try {
			con = ConnectionUtils.createConnection();
			pst = con.prepareStatement(buildUpdateQuery(deatils));
			pst.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			ConnectionUtils.close(rs, pst, con);
		}
	}

	public List<Car> fetchDispalyCars() {
		Connection con = null;
		List<Car> cars = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		String sql = "SELECT * FROM car_details WHERE isUsed = true";
		try {
			cars = new ArrayList<Car>();
			con = ConnectionUtils.createConnection();
			pst = con.prepareStatement(sql);
			rs = pst.executeQuery();
			while (rs.next()) {
				Car car = new Car();
				car.setId(rs.getInt("id"));
				car.setCarName(rs.getString("car_name"));
				car.setPrice(rs.getLong("price"));
				car.setUsed(rs.getBoolean("isUsed"));
				car.setSolde(rs.getBoolean("isSolded"));
				car.setImageBash64_1(rs.getString("image1"));
				cars.add(car);
			}
			pst.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			ConnectionUtils.close(rs, pst, con);
		}
		return cars;
	}

	private String buildUpdateQuery(Map<Integer, Boolean> deatils) {
		StringBuilder query1 = new StringBuilder();
		StringBuilder query2 = new StringBuilder();
		query1.append("update car_details set isUsed=data_table.isUsed from (values");
		for (Entry<Integer, Boolean> entry : deatils.entrySet()) {
			query2.append("(" + entry.getKey() + "," + entry.getValue() + "),");
		}
		query2.delete(query2.length() - 1,query2.length());
		query1.append(query2);
		query1.append(")as data_table");
		query1.append("(id,isUsed)");
		query1.append(" where");
		query1.append(" car_details.id = data_table.id");
		return query1.toString();
	}

	public int fetchSoldCarCount() {
		Connection con = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		String sql = "SELECT COUNT(isSolded) as sold FROM car_details WHERE isSolded = true";
		int count = 0;
		try {
			con = ConnectionUtils.createConnection();
			pst = con.prepareStatement(sql);
			rs = pst.executeQuery();
			if (rs.next()) {
				count = rs.getInt("sold");
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			ConnectionUtils.close(rs, pst, con);
		}
		return count;
	}

	public int fetchActiveCarCount() {
		Connection con = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		String sql = "SELECT COUNT(isSolded) as active FROM car_details WHERE isSolded = false";
		int count = 0;
		try {
			con = ConnectionUtils.createConnection();
			pst = con.prepareStatement(sql);
			rs = pst.executeQuery();
			if (rs.next()) {
				count = rs.getInt("active");
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			ConnectionUtils.close(rs, pst, con);
		}
		return count;
	}

	public int fetchTotalCarCount() {
		Connection con = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		String sql = "SELECT COUNT(id) as total FROM car_details";
		int count = 0;
		try {
			con = ConnectionUtils.createConnection();
			pst = con.prepareStatement(sql);
			rs = pst.executeQuery();
			if (rs.next()) {
				count = rs.getInt("total");
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			ConnectionUtils.close(rs, pst, con);
		}
		return count;
	}
	public void deleteCar(int id) {
		Connection con = null;
		PreparedStatement pst = null;
		String sql = "DELETE FROM car_details WHERE id = ?";
		try {
			con = ConnectionUtils.createConnection();
			pst = con.prepareStatement(sql);
			pst.setInt(1, id);
			pst.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			ConnectionUtils.close(null, pst, con);
		}
	}
}
