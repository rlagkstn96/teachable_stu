package assign;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Vector;

public class assignmentMgr {
	
	private String databaseUrl;
	private String useriD;
	private String password;

	public assignmentMgr() {
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
	
	public Vector getAssignInfo(String getId) throws SQLException, ClassNotFoundException {
		Vector vecList = new Vector();
        
		Connection conn = null;
		Statement statement = null;
		ResultSet res = null;
		
		conn = getconnection();
        statement = conn.createStatement();
        String query = "SELECT p.pid, p.pname, a.aname, c.cname, u.sname FROM posture p, class c, assignment a, users u WHERE u.sid = a.uid AND c.cid = a.cid AND p.aid = a.aid AND u.id = '" + getId + "'";
		res = statement.executeQuery(query);
		while(res.next()) {
            assignment as = new assignment();
			as.setPid(res.getInt("pid"));
            as.setPname(res.getString("pname"));
            as.setAname(res.getString("aname"));
            as.setCname(res.getString("cname"));
            as.setSname(res.getString("sname"));
            vecList.add(as);
		}
        
		res.close();
        statement.close();
        conn.close();
        
		return vecList; 
	}
	
	public int DeleteAssignInfo(String getPId) throws SQLException, ClassNotFoundException {
		int count = 0;
        
		Connection conn = null;
		Statement statement = null;
		ResultSet res = null;
		
		conn = getconnection();
        statement = conn.createStatement();
        String query = "DELETE FROM posture WHERE pid = '" + getPId + "'";
		res = statement.executeQuery(query);
		while(res.next()) {
            count = res.getInt(1);
		}
        
		res.close();
        statement.close();
        conn.close();
        
		return count; 
	}
}
