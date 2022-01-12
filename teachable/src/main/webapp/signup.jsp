<%@ page contentType = "text/html;charset=utf-8" %>
<html>
    <title>로그인 페이지</title>
<body>
	<jsp:useBean id="loginMgr" class="auth.loginMgr"></jsp:useBean>
	<%
		request.setCharacterEncoding("utf-8");
		
		String id = request.getParameter("username");
		String password = request.getParameter("password");
		String sname = request.getParameter("name");
		String email = request.getParameter("email");
		String birth = request.getParameter("birth");
		String sex = request.getParameter("sex");
		String phone = request.getParameter("phone");
		String address = request.getParameter("address");
		String gubun = request.getParameter("gubun");
		String sclass = request.getParameter("sclass");
		loginMgr.joinLoginInfo(id, password, sname, email, birth, sex, phone, address, gubun, sclass);
	%>
	<script>
		alert("회원가입 성공!");
		location.href = "login.html";    
	</script>
</body>	
</html>
