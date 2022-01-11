package auth;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class loginMgr {
	
	private String databaseUrl;
	private String useriD;
	private String password;

	public loginMgr() {
		this.databaseUrl = "jdbc:mysql://54.180.195.102:59448/hysight";
		this.useriD = "root";
		this.password = "1234";
	}
		
	private Connection getconnection() throws SQLException, ClassNotFoundException {
		Connection conn = null;
        Class.forName("com.mysql.jdbc.Driver");
		conn = DriverManager.getConnection(databaseUrl, useriD, password);
		return conn;
	}
	
	public boolean getLoginInfo(String getId, String getPw) throws SQLException, ClassNotFoundException {
		boolean logininfo = false;
		Connection conn = null;
		Statement statement = null;
		ResultSet res = null;
		
		conn = getconnection();
        statement = conn.createStatement();
        String query = "SELECT COUNT(*) FROM users WHERE ID = '" + getId +"' AND PASSWORD = "+ getPw;
		res = statement.executeQuery(query);
		while(res.next()) {
			int login = res.getInt(1);
			System.out.println(login);
            
            if(login > 0) {
				logininfo = true;
			}
		}
        
		res.close();
        statement.close();
        conn.close();
        
		return logininfo; 
	}
}
