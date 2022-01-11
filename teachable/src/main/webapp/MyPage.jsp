<%@ page contentType = "text/html;charset=utf-8" %>
<%@ page import="java.util.*, assign.*"%>
<html>
    <link rel="stylesheet" href="css/menubarCs.css" />
    <link rel="stylesheet" href="css/sidebarCs.css" />
    <link rel="stylesheet" href="css/menu.css" />
    <link rel="stylesheet" href="css/searchCs.css" />
    <link rel="stylesheet" href="css/tableCs.css" />
    <%@ include file="top.jsp"%>
    <title>로그인 페이지</title>
<body>
    <%
		request.setCharacterEncoding("utf-8");
    	String id = (String)session.getAttribute("id"); 
	%>
    <script>              
        function buttonCall() {
            // test 팝업창 사이즈
            var _width = '450';
            var _height = '300';

            // 중앙값 구하는거인듯
            var _left = Math.ceil((window.screen.width - _width) / 2);
            var _top = Math.ceil((window.screen.height - _height) / 2);

            window.open(
                'insert.jsp',
                'pop01',
                'width=' + _width + ', height=' + _height + ', left=' + _left + ', top=' + _top,
                'status=no, menubar=no, toolbar=no, resizable=no'
            );
        }      
	</script>
	

     <!-- 사이드메뉴 -->
        <aside>
            <script type="text/javascript">
                $('#nav-btn').click(function () {
                    $('nav').toggle('slow');
                });
            </script>
            <h1>Hysight</h1>

            <nav>
                <ul>
                    <li id="products">과제 관리</li>
                    <li><a href="#">강좌 관리</a></li>
                </ul>
            </nav>

            <div class="vertical-line"></div>
        </aside>

        <header>
            <!-- 상단메뉴 -->
            <script type="text/javascript">
                var menu = $('nav#menu');
                var watcher = scrollMonitor.create(menu);
                watcher.lock();
                watcher.stateChange(function () {
                    $(menu).toggleClass('scrolled', this.isAboveViewport);
                });
            </script>

            <center>
                <nav id="menu">
                    <ul>
                        <li class="active"><a href="#">Home</a></li>
                        <li><a href="#">마이페이지</a></li>
                        <li><a href="#">학습</a></li>
                        <li><a href="#">고객센터</a></li>
                    </ul>
                </nav>
            </center>
        </header>

        <!-- 테이블부분 -->
        <article>
            <div class="table-wrapper">
                <!-- 검색창 -->
                <div class="wrap">
                    <div class="search">
                        <input
                            type="text"
                            class="searchTerm"
                            placeholder="검색할 내용을 입력해주세요."
                        />
                        <button type="submit" class="searchButton">
                            <i class="fa fa-search" style="margin-left: 10%; margin-right: 10%;">
                                Search
                            </i>
                        </button>

                        
                    </div>
                </div>
                <br />
                <br />
				<jsp:useBean id="assignmentMgr" class="assign.assignmentMgr"></jsp:useBean>
                <table class="fl-table">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>자세명</th>
                            <th>과제명</th>
                            <th>클래스명</th>
                        </tr>
                    </thead>
                    <tbody>
                        <%
                        	Vector alist = assignmentMgr.getAssignInfo(id);
                            for (int i = 0; i < alist.size(); i++) {
                            	assignment as = (assignment) alist.elementAt(i);
                        %>
                            <tr>
                                <td><%=as.getPid()%></td>
                                <td><a href=index.html><%=as.getPname()%></a></td>
                                <td><%=as.getAname()%></td>
                                <td><%=as.getCname()%></td>
                        <%
                            }
                        %>
                        </tr>
                    </tbody>
                </table>
            </div>
        </article>
</body>	
</html>
