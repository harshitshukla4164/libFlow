/* =========================================
   FINE MANAGEMENT JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const searchInput =
        document.getElementById("fineSearch");

    const statusFilter =
        document.getElementById("fineStatus");

    const departmentFilter =
        document.getElementById("fineDepartment");

    const tableBody =
        document.getElementById("fineTableBody");

    const emptyState =
        document.getElementById("fineEmpty");

    const countText =
        document.getElementById("fineCount");

    const modal =
        document.getElementById("fineModal");

    const detailsBox =
        document.getElementById("fineDetails");

    const closeModal =
        document.getElementById("closeFineModal");

    const confirmBtn =
        document.getElementById("confirmFineBtn");

    const collectFineBtn =
        document.getElementById("collectFineBtn");

    const paymentMethod =
        document.getElementById("paymentMethod");

    const notificationBtn =
        document.getElementById("notificationBtn");


    let selectedRow = null;


    const rows =
        Array.from(
            tableBody.querySelectorAll("tr")
        );


    /* =========================================
       FILTER RECORDS
    ========================================= */

    function filterFines() {

        const search =
            searchInput.value
                .toLowerCase()
                .trim();

        const selectedStatus =
            statusFilter.value;

        const selectedDepartment =
            departmentFilter.value;

        let visibleCount = 0;


        rows.forEach(function (row) {

            const rowText =
                row.innerText.toLowerCase();

            const rowStatus =
                row.dataset.status;

            const rowDepartment =
                row.dataset.department;


            const matchesSearch =
                !search ||
                rowText.includes(search);


            const matchesStatus =
                selectedStatus === "all" ||
                rowStatus === selectedStatus;


            const matchesDepartment =
                selectedDepartment === "all" ||
                rowDepartment === selectedDepartment;


            const show =
                matchesSearch &&
                matchesStatus &&
                matchesDepartment;


            if (show) {

                row.style.display = "";

                visibleCount++;

            } else {

                row.style.display = "none";

            }

        });


        if (visibleCount === 0) {

            emptyState.classList.add("show");

        } else {

            emptyState.classList.remove("show");

        }


        countText.textContent =
            `Showing ${visibleCount} record${visibleCount === 1 ? "" : "s"}`;
    }


    searchInput.addEventListener(
        "input",
        filterFines
    );

    statusFilter.addEventListener(
        "change",
        filterFines
    );

    departmentFilter.addEventListener(
        "change",
        filterFines
    );


    /* =========================================
       OPEN COLLECT FINE MODAL
    ========================================= */

    const collectButtons =
        document.querySelectorAll(".collect-btn");


    collectButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                selectedRow =
                    button.closest("tr");

                if (!selectedRow) return;


                const cells =
                    selectedRow.querySelectorAll("td");


                const student =
                    cells[0].innerText
                        .replace(/\n/g, " ")
                        .trim();


                const book =
                    cells[1].innerText
                        .replace(/\n/g, " ")
                        .trim();


                const dueDate =
                    cells[2].innerText.trim();


                const overdue =
                    cells[3].innerText.trim();


                const fine =
                    cells[4].innerText.trim();


                detailsBox.innerHTML = `

                    <div class="fine-detail-box">

                        <div class="fine-detail-row">
                            <span>Student</span>
                            <strong>${student}</strong>
                        </div>

                        <div class="fine-detail-row">
                            <span>Book</span>
                            <strong>${book}</strong>
                        </div>

                        <div class="fine-detail-row">
                            <span>Due Date</span>
                            <strong>${dueDate}</strong>
                        </div>

                        <div class="fine-detail-row">
                            <span>Overdue</span>
                            <strong>${overdue}</strong>
                        </div>

                        <div class="fine-detail-row">
                            <span>Fine Amount</span>
                            <strong>${fine}</strong>
                        </div>

                    </div>

                `;


                modal.classList.add("active");

            }
        );

    });


    /* =========================================
       TOP COLLECT FINE BUTTON
    ========================================= */

    collectFineBtn.addEventListener(
        "click",
        function () {

            const pendingRow =
                rows.find(function (row) {

                    return row.dataset.status === "pending";

                });


            if (pendingRow) {

                const button =
                    pendingRow.querySelector(".collect-btn");

                button.click();

            } else {

                alert(
                    "There are no pending fines."
                );

            }

        }
    );


    /* =========================================
       CONFIRM PAYMENT
    ========================================= */

    confirmBtn.addEventListener(
        "click",
        function () {

            if (!selectedRow) return;


            const method =
                paymentMethod.value;


            const fineCell =
                selectedRow.querySelector(
                    ".fine-value"
                );


            const studentName =
                selectedRow
                    .querySelector(".table-user strong")
                    .innerText;


            selectedRow.dataset.status =
                "paid";


            const statusCell =
                selectedRow.cells[5];


            statusCell.innerHTML =
                `<span class="badge badge-success">
                    Paid
                </span>`;


            const actionCell =
                selectedRow.cells[6];


            actionCell.innerHTML =
                `<button
                    class="table-action view-payment-btn"
                    title="View Payment"
                >
                    <i class="fa-solid fa-eye"></i>
                </button>`;


            modal.classList.remove("active");


            selectedRow = null;


            filterFines();


            if (
                typeof showMessage ===
                "function"
            ) {

                showMessage(
                    `Fine payment received from ${studentName} via ${method.toUpperCase()}.`,
                    "success"
                );

            } else {

                alert(
                    `Fine payment received successfully via ${method.toUpperCase()}.`
                );

            }

        }
    );


    /* =========================================
       VIEW PAID PAYMENT
    ========================================= */

    const viewPaymentButtons =
        document.querySelectorAll(".view-payment-btn");


    viewPaymentButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const row =
                    button.closest("tr");

                if (!row) return;


                const student =
                    row.cells[0].innerText
                        .replace(/\n/g, " ")
                        .trim();

                const book =
                    row.cells[1].innerText
                        .replace(/\n/g, " ")
                        .trim();

                const fine =
                    row.cells[4].innerText.trim();


                detailsBox.innerHTML = `

                    <div class="fine-detail-box">

                        <div class="fine-detail-row">
                            <span>Student</span>
                            <strong>${student}</strong>
                        </div>

                        <div class="fine-detail-row">
                            <span>Book</span>
                            <strong>${book}</strong>
                        </div>

                        <div class="fine-detail-row">
                            <span>Fine Paid</span>
                            <strong>${fine}</strong>
                        </div>

                        <div class="fine-detail-row">
                            <span>Payment Status</span>
                            <strong>Paid</strong>
                        </div>

                    </div>

                `;


                modal.classList.add("active");


                confirmBtn.style.display =
                    "none";

            }
        );

    });


    /* =========================================
       CLOSE MODAL
    ========================================= */

    function closeFineModal() {

        modal.classList.remove("active");

        confirmBtn.style.display = "flex";

        selectedRow = null;

    }


    closeModal.addEventListener(
        "click",
        closeFineModal
    );


    modal.addEventListener(
        "click",
        function (event) {

            if (event.target === modal) {

                closeFineModal();

            }

        }
    );


    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeFineModal();

            }

        }
    );


    /* =========================================
       NOTIFICATION
    ========================================= */

    if (notificationBtn) {

        notificationBtn.addEventListener(
            "click",
            function () {

                alert(
                    "You have 3 new library notifications."
                );

            }
        );

    }


    /* =========================================
       INITIAL LOAD
    ========================================= */

    filterFines();

});