package com.circuits99.utils;

import java.io.InputStream;
import java.util.Properties;

public class PropertyFileReader {
	public static Properties getValues() {
		String filePath = "com/circuits99/resource/config.properties";
		Properties prop = new Properties();
		try {
			InputStream propReader = PropertyFileReader.class.getClassLoader().getResourceAsStream(filePath);
			prop.load(propReader);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return prop;
	}
}
