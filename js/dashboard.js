/* =========================================================
   ADMIN DASHBOARD JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* ================= CURRENT DATE ================= */

    const currentDate = document.getElementById("currentDate");

    if (currentDate) {

        const today = new Date();

        const options = {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        };

        currentDate.textContent = today.toLocaleDateString(
            "en-IN",
            options
        );
    }


    /* ================= MOBILE SIDEBAR ================= */

    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const sidebar = document.getElementById("sidebar");

    if (mobileMenuBtn && sidebar) {

        mobileMenuBtn.addEventListener("click", function () {
            sidebar.classList.toggle("active");
        });

    }


    /* ================= CLOSE SIDEBAR ON LINK CLICK ================= */

    if (sidebar) {

        const sidebarLinks = sidebar.querySelectorAll(".nav-link");

        sidebarLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                if (window.innerWidth <= 900) {
                    sidebar.classList.remove("active");
                }

            });

        });

    }


    /* ================= NOTIFICATION ================= */

    const notificationBtn = document.getElementById("notificationBtn");

    if (notificationBtn) {

        notificationBtn.addEventListener("click", function () {

            showMessage(
                "You have 3 new library notifications.",
                "success"
            );

        });

    }


    /* ================= REFRESH DASHBOARD ================= */

    const refreshButton = document.getElementById("refreshDashboard");

    if (refreshButton) {

        refreshButton.addEventListener("click", function () {

            const icon = refreshButton.querySelector("i");

            if (icon) {
                icon.classList.add("fa-spin");
            }

            refreshButton.disabled = true;

            setTimeout(function () {

                if (icon) {
                    icon.classList.remove("fa-spin");
                }

                refreshButton.disabled = false;

                showMessage(
                    "Dashboard data refreshed successfully.",
                    "success"
                );

            }, 800);

        });

    }


    /* ================= ACTIVITY PERIOD ================= */

    const activityPeriod = document.getElementById("activityPeriod");

    if (activityPeriod) {

        activityPeriod.addEventListener("change", function () {

            if (this.value === "month") {

                showMessage(
                    "Monthly activity view selected.",
                    "success"
                );

            } else {

                showMessage(
                    "Weekly activity view selected.",
                    "success"
                );

            }

        });

    }


    /* ================= QUICK STAT ANIMATION ================= */

    const statNumbers = document.querySelectorAll(
        ".dashboard-stat-content h2"
    );

    statNumbers.forEach(function (element) {

        const targetText = element.textContent.trim();

        const numericValue = parseInt(
            targetText.replace(/[^0-9]/g, ""),
            10
        );

        if (!isNaN(numericValue)) {

            let current = 0;
            const duration = 700;
            const increment = Math.ceil(
                numericValue / (duration / 20)
            );

            const counter = setInterval(function () {

                current += increment;

                if (current >= numericValue) {

                    current = numericValue;
                    clearInterval(counter);

                }

                element.textContent =
                    current.toLocaleString("en-IN");

            }, 20);

        }

    });


    /* ================= DASHBOARD CARD HOVER ================= */

    const statCards = document.querySelectorAll(
        ".dashboard-stat-card"
    );

    statCards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {
            card.style.transition = "0.25s ease";
        });

    });


});