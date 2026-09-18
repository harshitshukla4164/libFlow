document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("fineSearch");

    const filterButtons =
        document.querySelectorAll(".fine-filter");

    const rows =
        document.querySelectorAll("#fineTableBody tr");

    const noFines =
        document.getElementById("noFines");

    const recordCount =
        document.getElementById("recordCount");


    /* =========================================
       SEARCH + FILTER
    ========================================= */

    function filterFines() {

        const searchText =
            searchInput.value.toLowerCase().trim();

        const activeFilter =
            document.querySelector(".fine-filter.active")
                ?.dataset.filter || "all";

        let visibleRecords = 0;


        rows.forEach(function (row) {

            const rowText =
                row.innerText.toLowerCase();

            const status =
                row.dataset.status;


            const matchesSearch =
                rowText.includes(searchText);


            let matchesFilter = true;


            if (activeFilter !== "all") {

                matchesFilter =
                    status === activeFilter;

            }


            if (matchesSearch && matchesFilter) {

                row.style.display = "";

                visibleRecords++;

            } else {

                row.style.display = "none";

            }

        });


        /* Update record count */

        recordCount.textContent =
            `${visibleRecords} Record${visibleRecords !== 1 ? "s" : ""}`;


        /* Empty state */

        if (visibleRecords === 0) {

            noFines.style.display = "block";

        } else {

            noFines.style.display = "none";

        }

    }


    /* =========================================
       SEARCH
    ========================================= */

    searchInput.addEventListener(
        "input",
        filterFines
    );


    /* =========================================
       FILTER BUTTONS
    ========================================= */

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            filterButtons.forEach(function (btn) {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            filterFines();

        });

    });


    /* =========================================
       NOTIFICATION
    ========================================= */

    const notificationBtn =
        document.getElementById("notificationBtn");


    if (notificationBtn) {

        notificationBtn.addEventListener("click", function () {

            showNotification(
                "You have ₹40 pending fine.",
                "warning"
            );

        });

    }


    /* =========================================
       NOTIFICATION HELPER
    ========================================= */

    function showNotification(message, type = "success") {

        const notification =
            document.getElementById("notification");


        if (!notification) return;


        notification.textContent =
            message;


        notification.className =
            `notification show ${type}`;


        setTimeout(function () {

            notification.classList.remove("show");

        }, 3000);

    }

});