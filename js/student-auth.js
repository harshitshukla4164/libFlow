document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       ELEMENTS
    ========================================= */

    const loginSection = document.getElementById("loginSection");
    const registerSection = document.getElementById("registerSection");

    const showRegister = document.getElementById("showRegister");
    const showLogin = document.getElementById("showLogin");

    const loginForm = document.getElementById("studentLoginForm");
    const registerForm = document.getElementById("studentRegisterForm");


    /* =========================================
       STORAGE
    ========================================= */

    const STORAGE_KEY = "libraryStudents";


    /*
       Get registered students
    */
    function getStudents() {

        const students = localStorage.getItem(STORAGE_KEY);

        if (!students) {
            return [];
        }

        try {
            return JSON.parse(students);
        } catch (error) {
            return [];
        }
    }


    /*
       Save students
    */
    function saveStudents(students) {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(students)
        );
    }


    /* =========================================
       DEMO STUDENT
    ========================================= */

    /*
       Agar koi student pehle register nahi hua hai,
       to demo account available rahega.
    */

    function createDemoStudent() {

        const students = getStudents();

        const demoExists = students.some(
            student => student.username === "STU1001"
        );

        if (!demoExists) {

            students.push({
                id: "STU1001",
                name: "Ashutosh Tripathi",
                rollNumber: "CS2025001",
                email: "ashutosh@example.com",
                mobile: "9876543210",
                department: "Computer Science",
                course: "B.Tech",
                year: "2nd Year",
                semester: "3rd Semester",
                username: "STU1001",
                password: "student123",
                status: "Active",
                registeredAt: new Date().toISOString()
            });

            saveStudents(students);
        }
    }

    createDemoStudent();


    /* =========================================
       SHOW LOGIN
    ========================================= */

    if (showLogin) {

        showLogin.addEventListener("click", function () {

            registerSection.classList.remove("active");
            loginSection.style.display = "block";

            clearMessages();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =========================================
       SHOW REGISTRATION
    ========================================= */

    if (showRegister) {

        showRegister.addEventListener("click", function () {

            loginSection.style.display = "none";
            registerSection.classList.add("active");

            clearMessages();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =========================================
       LOGIN
    ========================================= */

    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const username = document
                .getElementById("studentUsername")
                .value
                .trim();

            const password = document
                .getElementById("studentPassword")
                .value;


            const loginButton =
                document.getElementById("studentLoginButton");


            hideMessage("studentLoginError");
            hideMessage("studentLoginSuccess");


            if (!username || !password) {

                showMessage(
                    "studentLoginError",
                    "Please enter username and password."
                );

                return;
            }


            const students = getStudents();


            const student = students.find(function (item) {

                return (
                    item.username.toLowerCase() ===
                    username.toLowerCase() &&
                    item.password === password
                );

            });


            if (!student) {

                showMessage(
                    "studentLoginError",
                    "Invalid username or password. Please try again."
                );

                return;
            }


            if (
                student.status &&
                student.status.toLowerCase() === "inactive"
            ) {

                showMessage(
                    "studentLoginError",
                    "Your student account is inactive. Please contact the library."
                );

                return;
            }


            /*
               Save logged-in student
            */

            localStorage.setItem(
                "libraryStudentLoggedIn",
                "true"
            );

            localStorage.setItem(
                "libraryStudentId",
                student.id
            );

            localStorage.setItem(
                "libraryCurrentStudent",
                JSON.stringify(student)
            );


            /*
               Remember me
            */

            const rememberStudent =
                document.getElementById("rememberStudent");

            if (rememberStudent && rememberStudent.checked) {

                localStorage.setItem(
                    "libraryRememberStudent",
                    "true"
                );

            } else {

                localStorage.removeItem(
                    "libraryRememberStudent"
                );

            }


            /*
               Button loading
            */

            if (loginButton) {
                loginButton.classList.add("loading");
                loginButton.disabled = true;
            }


            showMessage(
                "studentLoginSuccess",
                "Login successful! Opening your dashboard..."
            );


            /*
               Redirect
            */

            setTimeout(function () {

                window.location.href =
                    "student-dashboard.html";

            }, 800);

        });

    }


    /* =========================================
       REGISTRATION
    ========================================= */

    if (registerForm) {

        registerForm.addEventListener("submit", function (event) {

            event.preventDefault();


            hideMessage("registerError");
            hideMessage("registerSuccess");


            /* GET VALUES */

            const name =
                document.getElementById("registerName")
                .value.trim();

            const rollNumber =
                document.getElementById("registerRoll")
                .value.trim();

            const email =
                document.getElementById("registerEmail")
                .value.trim();

            const mobile =
                document.getElementById("registerMobile")
                .value.trim();

            const department =
                document.getElementById("registerDepartment")
                .value;

            const course =
                document.getElementById("registerCourse")
                .value;

            const year =
                document.getElementById("registerYear")
                .value;

            const semester =
                document.getElementById("registerSemester")
                .value;

            const username =
                document.getElementById("registerUsername")
                .value.trim();

            const password =
                document.getElementById("registerPassword")
                .value;

            const confirmPassword =
                document.getElementById("registerConfirmPassword")
                .value;

            const terms =
                document.getElementById("registerTerms").checked;


            /* =====================================
               BASIC VALIDATION
            ===================================== */

            if (
                !name ||
                !rollNumber ||
                !email ||
                !mobile ||
                !department ||
                !course ||
                !year ||
                !semester ||
                !username ||
                !password ||
                !confirmPassword
            ) {

                showMessage(
                    "registerError",
                    "Please fill all required fields."
                );

                return;
            }


            /* NAME */

            if (name.length < 3) {

                showMessage(
                    "registerError",
                    "Please enter a valid full name."
                );

                return;
            }


            /* MOBILE */

            if (!/^[0-9]{10}$/.test(mobile)) {

                showMessage(
                    "registerError",
                    "Please enter a valid 10-digit mobile number."
                );

                return;
            }


            /* EMAIL */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                showMessage(
                    "registerError",
                    "Please enter a valid email address."
                );

                return;
            }


            /* USERNAME */

            if (username.length < 4) {

                showMessage(
                    "registerError",
                    "Username must contain at least 4 characters."
                );

                return;
            }


            if (/\s/.test(username)) {

                showMessage(
                    "registerError",
                    "Username cannot contain spaces."
                );

                return;
            }


            /* PASSWORD */

            if (password.length < 6) {

                showMessage(
                    "registerError",
                    "Password must contain at least 6 characters."
                );

                return;
            }


            /* PASSWORD MATCH */

            if (password !== confirmPassword) {

                showMessage(
                    "registerError",
                    "Password and Confirm Password do not match."
                );

                return;
            }


            /* TERMS */

            if (!terms) {

                showMessage(
                    "registerError",
                    "Please confirm that your information is correct."
                );

                return;
            }


            /* =====================================
               CHECK EXISTING STUDENT
            ===================================== */

            const students = getStudents();


            const usernameExists = students.some(function (student) {

                return (
                    student.username.toLowerCase() ===
                    username.toLowerCase()
                );

            });


            if (usernameExists) {

                showMessage(
                    "registerError",
                    "This username is already registered. Please choose another username."
                );

                return;
            }


            const rollExists = students.some(function (student) {

                return (
                    student.rollNumber.toLowerCase() ===
                    rollNumber.toLowerCase()
                );

            });


            if (rollExists) {

                showMessage(
                    "registerError",
                    "This roll number is already registered. Please login instead."
                );

                return;
            }


            const emailExists = students.some(function (student) {

                return (
                    student.email.toLowerCase() ===
                    email.toLowerCase()
                );

            });


            if (emailExists) {

                showMessage(
                    "registerError",
                    "This email is already registered. Please use another email."
                );

                return;
            }


            /* =====================================
               CREATE STUDENT ID
            ===================================== */

            const studentId =
                generateStudentId(students);


            /* =====================================
               CREATE STUDENT OBJECT
            ===================================== */

            const newStudent = {

                id: studentId,

                name: name,

                rollNumber: rollNumber,

                email: email,

                mobile: mobile,

                department: department,

                course: course,

                year: year,

                semester: semester,

                username: username,

                password: password,

                status: "Active",

                registeredAt:
                    new Date().toISOString()

            };


            /* =====================================
               SAVE STUDENT
            ===================================== */

            students.push(newStudent);

            saveStudents(students);


            /* =====================================
               SUCCESS
            ===================================== */

            showMessage(
                "registerSuccess",
                "Registration successful! Your Student ID is " +
                studentId +
                ". Redirecting to login..."
            );


            const registerButton =
                document.getElementById("registerButton");


            if (registerButton) {

                registerButton.classList.add("loading");
                registerButton.disabled = true;

            }


            /*
               Automatically fill username
            */

            setTimeout(function () {

                registerSection.classList.remove("active");

                loginSection.style.display = "block";


                document.getElementById(
                    "studentUsername"
                ).value = username;


                document.getElementById(
                    "studentPassword"
                ).value = "";


                hideMessage("registerSuccess");


                if (registerButton) {

                    registerButton.classList.remove("loading");
                    registerButton.disabled = false;

                }


                showMessage(
                    "studentLoginSuccess",
                    "Registration complete. Please login using your username and password."
                );


                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });


            }, 1800);

        });

    }


    /* =========================================
       GENERATE STUDENT ID
    ========================================= */

    function generateStudentId(students) {

        let number = 1001;


        while (
            students.some(
                student => student.id === "STU" + number
            )
        ) {

            number++;

        }


        return "STU" + number;

    }


    /* =========================================
       PASSWORD TOGGLE - LOGIN
    ========================================= */

    const passwordToggle =
        document.getElementById(
            "studentPasswordToggle"
        );


    if (passwordToggle) {

        passwordToggle.addEventListener(
            "click",
            function () {

                const password =
                    document.getElementById(
                        "studentPassword"
                    );

                const icon =
                    passwordToggle.querySelector("i");


                if (password.type === "password") {

                    password.type = "text";

                    icon.classList.remove("fa-eye");
                    icon.classList.add("fa-eye-slash");

                } else {

                    password.type = "password";

                    icon.classList.remove("fa-eye-slash");
                    icon.classList.add("fa-eye");

                }

            }
        );

    }


    /* =========================================
       PASSWORD TOGGLE - REGISTER
    ========================================= */

    const registerPasswordToggle =
        document.getElementById(
            "registerPasswordToggle"
        );


    if (registerPasswordToggle) {

        registerPasswordToggle.addEventListener(
            "click",
            function () {

                const password =
                    document.getElementById(
                        "registerPassword"
                    );

                const icon =
                    registerPasswordToggle.querySelector("i");


                if (password.type === "password") {

                    password.type = "text";

                    icon.classList.remove("fa-eye");
                    icon.classList.add("fa-eye-slash");

                } else {

                    password.type = "password";

                    icon.classList.remove("fa-eye-slash");
                    icon.classList.add("fa-eye");

                }

            }
        );

    }


    /* =========================================
       FORGOT PASSWORD
    ========================================= */

    const forgotPassword =
        document.getElementById(
            "forgotStudentPassword"
        );


    if (forgotPassword) {

        forgotPassword.addEventListener(
            "click",
            function () {

                alert(
                    "For password recovery, please contact the library administrator."
                );

            }
        );

    }


    /* =========================================
       MESSAGE FUNCTIONS
    ========================================= */

    function showMessage(id, message) {

        const element =
            document.getElementById(id);

        if (!element) return;


        const span =
            element.querySelector("span");


        if (span) {
            span.textContent = message;
        }


        element.classList.add("show");

    }


    function hideMessage(id) {

        const element =
            document.getElementById(id);

        if (!element) return;

        element.classList.remove("show");

    }


    function clearMessages() {

        hideMessage("studentLoginError");
        hideMessage("studentLoginSuccess");

        hideMessage("registerError");
        hideMessage("registerSuccess");

    }


    /* =========================================
       MOBILE NUMBER - ONLY NUMBERS
    ========================================= */

    const mobileInput =
        document.getElementById(
            "registerMobile"
        );


    if (mobileInput) {

        mobileInput.addEventListener(
            "input",
            function () {

                this.value =
                    this.value.replace(
                        /[^0-9]/g,
                        ""
                    );

            }
        );

    }

});