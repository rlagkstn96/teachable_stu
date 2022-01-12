package auth;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
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
	
	public void joinLoginInfo(String id, String password, String sname, String email, String birth, String sex, String phone, String address, String gubun, String sclass) throws SQLException, ClassNotFoundException {
		Connection conn = null;
		PreparedStatement pstmt = null;

		try {
			conn = getconnection();

			String mySQL = "INSERT INTO student INSERT INTO users (`id`, `password`, `sname`, `email`, `birth`, `sex`, `phone`, `address`, `gubun`, `sclass`) VALUES (?, ?, ?, ?, ?, ?,?,?,?,?)";
			pstmt = conn.prepareStatement(mySQL);
			pstmt.setString(1,id);
			pstmt.setString(2, password);
			pstmt.setString(3, sname);
			pstmt.setString(4, email);
			pstmt.setString(5, birth);
			pstmt.setString(6, sex);
			pstmt.setString(7, phone);
			pstmt.setString(8, address);
			pstmt.setString(9, gubun);
			pstmt.setString(10, sclass);
			pstmt.executeUpdate();

			pstmt.close();
			conn.close();
		} catch (Exception ex) {
			System.out.println("Exception" + ex);
		}
		
		
	}
}
