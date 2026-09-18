/* =====================================================
   COLLEGE LIBRARY MANAGEMENT SYSTEM
   MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   DOM READY
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =================================================
       CURRENT YEAR
    ================================================= */

    const yearElements =
        document.querySelectorAll("[data-year]");


    yearElements.forEach(function (element) {

        element.textContent =
            new Date().getFullYear();

    });



    /* =================================================
       LOGIN DROPDOWN
    ================================================= */

    const loginDropdown =
        document.getElementById("loginDropdown");

    const loginDropdownBtn =
        document.getElementById("loginDropdownBtn");


    if (loginDropdown && loginDropdownBtn) {


        /* Open / Close */

        loginDropdownBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                loginDropdown.classList.toggle("active");

            }
        );


        /* Close outside */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    !loginDropdown.contains(
                        event.target
                    )
                ) {

                    loginDropdown.classList.remove(
                        "active"
                    );

                }

            }
        );


        /* Close after selecting option */

        const loginLinks =
            loginDropdown.querySelectorAll(
                ".login-dropdown-menu a"
            );


        loginLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    loginDropdown.classList.remove(
                        "active"
                    );

                }
            );

        });

    }



    /* =================================================
       MOBILE SIDEBAR
       Existing dashboard pages ke liye
    ================================================= */

    const sidebar =
        document.querySelector(".sidebar");

    const menuToggle =
        document.querySelector(
            "[data-sidebar-toggle]"
        );


    if (sidebar && menuToggle) {

        menuToggle.addEventListener(
            "click",
            function () {

                sidebar.classList.toggle(
                    "active"
                );

            }
        );

    }



    /* =================================================
       CLOSE SIDEBAR ON MOBILE
    ================================================= */

    const sidebarLinks =
        document.querySelectorAll(
            ".sidebar .nav-link"
        );


    sidebarLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                if (window.innerWidth <= 900) {

                    if (sidebar) {

                        sidebar.classList.remove(
                            "active"
                        );

                    }

                }

            }
        );

    });



    /* =================================================
       LOGOUT
    ================================================= */

    const logoutButtons =
        document.querySelectorAll(
            "[data-logout]"
        );


    logoutButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const currentPage =
                    window.location.pathname
                    .split("/")
                    .pop();


                const studentPages = [

                    "student-dashboard.html",
                    "search-books.html",
                    "my-books.html",
                    "issue-history.html",
                    "fine-details.html",
                    "profile.html"

                ];


                /* Student Logout */

                if (
                    studentPages.includes(
                        currentPage
                    )
                ) {

                    localStorage.removeItem(
                        "libraryStudentLoggedIn"
                    );

                    localStorage.removeItem(
                        "libraryStudentId"
                    );

                    window.location.href =
                        "student-login.html";

                    return;
                }


                /* Admin Logout */

                localStorage.removeItem(
                    "libraryAdminLoggedIn"
                );

                window.location.href =
                    "admin-login.html";

            }
        );

    });



    /* =================================================
       MODAL OPEN
    ================================================= */

    const modalOpenButtons =
        document.querySelectorAll(
            "[data-modal-open]"
        );


    modalOpenButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const modalId =
                    button.getAttribute(
                        "data-modal-open"
                    );


                const modal =
                    document.getElementById(
                        modalId
                    );


                if (modal) {

                    modal.classList.add(
                        "active"
                    );

                }

            }
        );

    });



    /* =================================================
       MODAL CLOSE
    ================================================= */

    const modalCloseButtons =
        document.querySelectorAll(
            "[data-modal-close]"
        );


    modalCloseButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const modal =
                    button.closest(
                        ".modal-overlay"
                    );


                if (modal) {

                    modal.classList.remove(
                        "active"
                    );

                }

            }
        );

    });



    /* =================================================
       CLOSE MODAL BY CLICKING OUTSIDE
    ================================================= */

    const modalOverlays =
        document.querySelectorAll(
            ".modal-overlay"
        );


    modalOverlays.forEach(function (overlay) {

        overlay.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === overlay
                ) {

                    overlay.classList.remove(
                        "active"
                    );

                }

            }
        );

    });

});



/* =====================================================
   MESSAGE HELPER
===================================================== */

function showMessage(
    message,
    type = "success"
) {

    let messageBox =
        document.getElementById(
            "globalMessage"
        );


    if (!messageBox) {

        messageBox =
            document.createElement(
                "div"
            );

        messageBox.id =
            "globalMessage";


        messageBox.style.position =
            "fixed";

        messageBox.style.top =
            "20px";

        messageBox.style.right =
            "20px";

        messageBox.style.zIndex =
            "99999";

        messageBox.style.padding =
            "13px 18px";

        messageBox.style.borderRadius =
            "9px";

        messageBox.style.fontSize =
            "13px";

        messageBox.style.fontWeight =
            "600";

        messageBox.style.boxShadow =
            "0 8px 25px rgba(0,0,0,0.15)";


        document.body.appendChild(
            messageBox
        );

    }


    if (type === "success") {

        messageBox.style.background =
            "#E5F3EA";

        messageBox.style.color =
            "#2F7D4A";

    }
    else {

        messageBox.style.background =
            "#FBE5E4";

        messageBox.style.color =
            "#B94A48";

    }


    messageBox.textContent =
        message;


    messageBox.style.display =
        "block";


    setTimeout(function () {

        messageBox.style.display =
            "none";

    }, 3000);

}



/* =====================================================
   DELETE CONFIRMATION
===================================================== */

function confirmDelete(
    message = "Are you sure you want to delete this item?"
) {

    return window.confirm(
        message
    );

}