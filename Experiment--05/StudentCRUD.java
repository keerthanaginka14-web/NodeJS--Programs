
import java.sql.*;

public class StudentCRUD {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/labdb";
        String user = "YOUR_MYSQL_USERNAME";
        String password = "YOUR_MYSQL_PASSWORD";

        try (Connection con =
                 DriverManager.getConnection(url, user, password)) {

            System.out.println("Database connected successfully!");

            // CREATE
            String insert = "INSERT INTO students VALUES (?, ?, ?)";
            try (PreparedStatement ps = con.prepareStatement(insert)) {
                ps.setInt(1, 3);
                ps.setString(2, "Arun");
                ps.setInt(3, 88);
                ps.executeUpdate();
                System.out.println("Record inserted.");
            }

            // READ
            try (Statement st = con.createStatement();
                 ResultSet rs = st.executeQuery("SELECT * FROM students")) {
                while (rs.next()) {
                    System.out.println(
                        rs.getInt("id") + " " +
                        rs.getString("name") + " " +
                        rs.getInt("marks")
                    );
                }
            }

            // UPDATE
            String update =
                "UPDATE students SET marks = ? WHERE id = ?";
            try (PreparedStatement ps = con.prepareStatement(update)) {
                ps.setInt(1, 95);
                ps.setInt(2, 3);
                ps.executeUpdate();
                System.out.println("Record updated.");
            }

            // DELETE
            String delete = "DELETE FROM students WHERE id = ?";
            try (PreparedStatement ps = con.prepareStatement(delete)) {
                ps.setInt(1, 3);
                ps.executeUpdate();
                System.out.println("Record deleted.");
            }

        } catch (SQLException e) {
            System.out.println("Database error: " + e.getMessage());
        }
    }
}
