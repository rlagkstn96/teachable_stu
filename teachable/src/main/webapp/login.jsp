<%@ page contentType = "text/html;charset=utf-8" %>
<html>
    <title>로그인 페이지</title>
<body>
	<jsp:useBean id="loginMgr" class="auth.loginMgr"></jsp:useBean>
	<%
		request.setCharacterEncoding("utf-8");
		
		String id = request.getParameter("username");
		String password = request.getParameter("password");		
		boolean info = false;				
		info = loginMgr.getLoginInfo(id, password);
	%>
	<script>
    <%    
        if(info != false){
        	session.setAttribute("id", id);
    %>        
            alert("로그인 성공!");
            location.href = "MyPage.jsp?id=<%=id%>";
    <%
        } else {      
    %>        
            alert("로그인 실패!!");
            location.href = "login.html";
    <%
        }
    %>
    
	</script>
</body>	
</html>
