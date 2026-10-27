
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/SessionTrackingServlet")
public class SessionTrackingServlet extends HttpServlet {

    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response) throws IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        out.println("<h2>Session Tracking Example</h2>");

        // Cookie example
        Cookie cookie = new Cookie("username", "Student");
        cookie.setMaxAge(60 * 60);
        cookie.setHttpOnly(true);
        response.addCookie(cookie);

        out.println("<p>Cookie created successfully.</p>");

        // HTTP Session example
        HttpSession session = request.getSession();
        session.setAttribute("username", "Student");

        out.println("<p>Session ID: " +
                    session.getId() + "</p>");
        out.println("<p>Session created successfully.</p>");

        // Read cookies
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie c : cookies) {
                if ("username".equals(c.getName())) {
                    out.println("<p>Cookie username: " +
                                c.getValue() + "</p>");
                }
            }
        }

        // Read session data
        out.println("<p>Session username: " +
                    session.getAttribute("username") + "</p>");
    }
}
