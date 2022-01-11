<%@ page language="java" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head><title>Insert title here</title></head>
<body>
	<% 
		String s_id = (String)session.getAttribute("id"); 
		String log;
  	
		if(s_id==null){
			log="<a href=login.jsp>로그인</a>";
		} else {
			log="<a href=logout.jsp>로그아웃</a>";
		}
	%>
</body>
</html>

