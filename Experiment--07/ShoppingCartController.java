
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/ShoppingCartController")
public class ShoppingCartController extends HttpServlet {

    protected void doPost(
            HttpServletRequest request,
            HttpServletResponse response) throws IOException {

        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        String action = request.getParameter("action");

        if (action == null) {
            response.sendError(
                HttpServletResponse.SC_BAD_REQUEST,
                "Action parameter missing"
            );
            return;
        }

        switch (action) {
            case "register":
                out.println("Registration request received.");
                break;

            case "login":
                out.println("Login request received.");
                break;

            case "addToCart":
                String productId = request.getParameter("productId");

                if (productId == null || productId.trim().isEmpty()) {
                    response.sendError(
                        HttpServletResponse.SC_BAD_REQUEST,
                        "Product ID is required"
                    );
                    return;
                }

                out.println("Product " + productId + " requested.");
                break;

            default:
                response.sendError(
                    HttpServletResponse.SC_BAD_REQUEST,
                    "Invalid action"
                );
        }
    }
}
