document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("adminLoginForm");
    const usernameInput = document.getElementById("adminUsername");
    const passwordInput = document.getElementById("adminPassword");

    const passwordToggle = document.getElementById("passwordToggle");
    const forgotPassword = document.getElementById("forgotPassword");

    const loginError = document.getElementById("loginError");
    const loginSuccess = document.getElementById("loginSuccess");

    const loginButton = document.getElementById("loginButton");
    const rememberAdmin = document.getElementById("rememberAdmin");


    /* =====================================================
       DEMO ADMIN CREDENTIALS
    ===================================================== */

    const ADMIN_USERNAME = "admin";
    const ADMIN_PASSWORD = "admin123";


    /* =====================================================
       HIDE MESSAGES
    ===================================================== */

    function hideMessages() {

        if (loginError) {
            loginError.classList.remove("show");
        }

        if (loginSuccess) {
            loginSuccess.classList.remove("show");
        }

    }


    /* =====================================================
       PASSWORD TOGGLE
    ===================================================== */

    if (passwordToggle && passwordInput) {

        passwordToggle.addEventListener("click", function () {

            const isPassword =
                passwordInput.type === "password";


            if (isPassword) {

                passwordInput.type = "text";

                passwordToggle.innerHTML =
                    '<i class="fa-solid fa-eye-slash"></i>';

                passwordToggle.setAttribute(
                    "aria-label",
                    "Hide password"
                );

            } else {

                passwordInput.type = "password";

                passwordToggle.innerHTML =
                    '<i class="fa-solid fa-eye"></i>';

                passwordToggle.setAttribute(
                    "aria-label",
                    "Show password"
                );

            }

        });

    }


    /* =====================================================
       FORGOT PASSWORD
    ===================================================== */

    if (forgotPassword) {

        forgotPassword.addEventListener("click", function () {

            alert(
                "For the demo system, please use:\n\n" +
                "Username: admin\n" +
                "Password: admin123"
            );

        });

    }


    /* =====================================================
       REMOVE ERROR WHEN USER TYPES
    ===================================================== */

    if (usernameInput) {

        usernameInput.addEventListener("input", hideMessages);

    }


    if (passwordInput) {

        passwordInput.addEventListener("input", hideMessages);

    }


    /* =====================================================
       LOGIN
    ===================================================== */

    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            hideMessages();


            const username =
                usernameInput.value.trim();

            const password =
                passwordInput.value;


            /* Empty validation */

            if (!username || !password) {

                if (loginError) {

                    loginError.querySelector("span").textContent =
                        "Please enter username and password.";

                    loginError.classList.add("show");

                }

                return;

            }


            /* Disable button */

            if (loginButton) {

                loginButton.classList.add("loading");

                loginButton.querySelector("span").textContent =
                    "Checking login...";

            }


            /* Demo login check */

            setTimeout(function () {


                if (
                    username === ADMIN_USERNAME &&
                    password === ADMIN_PASSWORD
                ) {


                    /* Save login state */

                    localStorage.setItem(
                        "libraryAdminLoggedIn",
                        "true"
                    );


                    localStorage.setItem(
                        "libraryAdminUsername",
                        username
                    );


                    /* Remember me */

                    if (
                        rememberAdmin &&
                        rememberAdmin.checked
                    ) {

                        localStorage.setItem(
                            "libraryRememberAdmin",
                            "true"
                        );

                    } else {

                        localStorage.removeItem(
                            "libraryRememberAdmin"
                        );

                    }


                    /* Success message */

                    if (loginSuccess) {

                        loginSuccess.classList.add("show");

                    }


                    if (loginButton) {

                        loginButton.querySelector("span").textContent =
                            "Login Successful";

                    }


                    /* Redirect */

                    setTimeout(function () {

                        window.location.href =
                            "admin-dashboard.html";

                    }, 700);


                } else {


                    /* Invalid login */

                    if (loginError) {

                        loginError.querySelector("span").textContent =
                            "Invalid username or password.";

                        loginError.classList.add("show");

                    }


                    if (loginButton) {

                        loginButton.classList.remove("loading");

                        loginButton.querySelector("span").textContent =
                            "Login to Dashboard";

                    }

                }

            }, 500);

        });

    }


    /* =====================================================
       REMEMBER LOGIN
    ===================================================== */

    if (rememberAdmin) {

        const remembered =
            localStorage.getItem(
                "libraryRememberAdmin"
            );


        if (remembered === "true") {

            rememberAdmin.checked = true;

        }

    }


});