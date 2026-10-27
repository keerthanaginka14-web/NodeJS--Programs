
function validateRegistration() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (username.trim() === "" || email.trim() === "" || password.trim() === "") {
        alert("Please fill in all fields.");
        return false;
    }

    if (password.length < 6) {
        alert("Password must contain at least 6 characters.");
        return false;
    }

    alert("Registration form validated successfully!");
    return false;
}

function validateLogin() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    if (username.trim() === "" || password.trim() === "") {
        alert("Please enter both username and password.");
        return false;
    }

    if (password.length < 6) {
        alert("Password must contain at least 6 characters.");
        return false;
    }

    alert("Login form validated successfully!");
    return false;
}
