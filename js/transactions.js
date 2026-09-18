/* =========================================
   TRANSACTIONS PAGE JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const searchInput =
        document.getElementById("transactionSearch");

    const typeFilter =
        document.getElementById("transactionType");

    const departmentFilter =
        document.getElementById("transactionDepartment");

    const dateFilter =
        document.getElementById("transactionDate");

    const tableBody =
        document.getElementById("transactionTableBody");

    const emptyState =
        document.getElementById("transactionEmpty");

    const countText =
        document.getElementById("transactionCount");

    const exportBtn =
        document.getElementById("exportBtn");

    const modal =
        document.getElementById("transactionModal");

    const closeModal =
        document.getElementById("closeTransactionModal");

    const doneBtn =
        document.getElementById("transactionDoneBtn");

    const detailsBox =
        document.getElementById("transactionDetails");

    const notificationBtn =
        document.getElementById("notificationBtn");


    /* =========================================
       GET ALL ROWS
    ========================================= */

    const rows =
        Array.from(
            tableBody.querySelectorAll("tr")
        );


    /* =========================================
       FILTER TRANSACTIONS
    ========================================= */

    function filterTransactions() {

        const search =
            searchInput.value
                .toLowerCase()
                .trim();

        const selectedType =
            typeFilter.value;

        const selectedDepartment =
            departmentFilter.value;

        const selectedDate =
            dateFilter.value;

        let visibleCount = 0;


        rows.forEach(function (row) {

            const rowText =
                row.innerText.toLowerCase();

            const rowType =
                row.dataset.type;

            const rowDepartment =
                row.dataset.department;

            const rowDate =
                row.dataset.date;


            const matchesSearch =
                !search ||
                rowText.includes(search);


            const matchesType =
                selectedType === "all" ||
                rowType === selectedType;


            const matchesDepartment =
                selectedDepartment === "all" ||
                rowDepartment === selectedDepartment;


            const matchesDate =
                !selectedDate ||
                rowDate === selectedDate;


            const shouldShow =
                matchesSearch &&
                matchesType &&
                matchesDepartment &&
                matchesDate;


            if (shouldShow) {

                row.style.display = "";

                visibleCount++;

            } else {

                row.style.display = "none";

            }

        });


        /* Empty State */

        if (visibleCount === 0) {

            emptyState.classList.add("show");

        } else {

            emptyState.classList.remove("show");

        }


        /* Count */

        countText.textContent =
            `Showing ${visibleCount} transaction${visibleCount === 1 ? "" : "s"}`;
    }


    /* =========================================
       FILTER EVENTS
    ========================================= */

    searchInput.addEventListener(
        "input",
        filterTransactions
    );

    typeFilter.addEventListener(
        "change",
        filterTransactions
    );

    departmentFilter.addEventListener(
        "change",
        filterTransactions
    );

    dateFilter.addEventListener(
        "change",
        filterTransactions
    );


    /* =========================================
       VIEW TRANSACTION DETAILS
    ========================================= */

    const viewButtons =
        document.querySelectorAll(".view-btn");


    viewButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const row =
                    button.closest("tr");

                if (!row) return;


                const cells =
                    row.querySelectorAll("td");


                const transactionId =
                    cells[0].innerText.trim();

                const student =
                    cells[1].innerText.trim();

                const book =
                    cells[2].innerText.trim();

                const type =
                    cells[3].innerText.trim();

                const issueDate =
                    cells[4].innerText.trim();

                const returnDate =
                    cells[5].innerText.trim();

                const fine =
                    cells[6].innerText.trim();

                const status =
                    cells[7].innerText.trim();


                detailsBox.innerHTML = `

                    <div class="transaction-detail-list">

                        <div class="transaction-detail-row">
                            <span>Transaction ID</span>
                            <strong>${transactionId}</strong>
                        </div>

                        <div class="transaction-detail-row">
                            <span>Student</span>
                            <strong>${student}</strong>
                        </div>

                        <div class="transaction-detail-row">
                            <span>Book</span>
                            <strong>${book}</strong>
                        </div>

                        <div class="transaction-detail-row">
                            <span>Transaction Type</span>
                            <strong>${type}</strong>
                        </div>

                        <div class="transaction-detail-row">
                            <span>Issue Date</span>
                            <strong>${issueDate}</strong>
                        </div>

                        <div class="transaction-detail-row">
                            <span>Due / Return Date</span>
                            <strong>${returnDate}</strong>
                        </div>

                        <div class="transaction-detail-row">
                            <span>Fine</span>
                            <strong>${fine}</strong>
                        </div>

                        <div class="transaction-detail-row">
                            <span>Status</span>
                            <strong>${status}</strong>
                        </div>

                    </div>

                `;


                modal.classList.add("active");

            }
        );

    });


    /* =========================================
       CLOSE MODAL
    ========================================= */

    function closeTransactionModal() {

        modal.classList.remove("active");

    }


    closeModal.addEventListener(
        "click",
        closeTransactionModal
    );


    doneBtn.addEventListener(
        "click",
        closeTransactionModal
    );


    modal.addEventListener(
        "click",
        function (event) {

            if (event.target === modal) {

                closeTransactionModal();

            }

        }
    );


    /* =========================================
       ESC KEY
    ========================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeTransactionModal();

            }

        }
    );


    /* =========================================
       EXPORT
    ========================================= */

    exportBtn.addEventListener(
        "click",
        function () {

            const visibleRows =
                rows.filter(function (row) {

                    return row.style.display !== "none";

                });


            if (visibleRows.length === 0) {

                alert(
                    "There are no transactions to export."
                );

                return;
            }


            let csv =
                "Transaction ID,Student,Book,Type,Issue Date,Due/Return Date,Fine,Status\n";


            visibleRows.forEach(function (row) {

                const cells =
                    row.querySelectorAll("td");


                const values = [

                    cells[0].innerText.trim(),

                    cells[1].innerText
                        .replace(/\n/g, " ")
                        .trim(),

                    cells[2].innerText
                        .replace(/\n/g, " ")
                        .trim(),

                    cells[3].innerText.trim(),

                    cells[4].innerText.trim(),

                    cells[5].innerText.trim(),

                    cells[6].innerText.trim(),

                    cells[7].innerText.trim()

                ];


                csv += values
                    .map(function (value) {

                        return `"${value.replace(/"/g, '""')}"`;

                    })
                    .join(",") + "\n";

            });


            const blob =
                new Blob(
                    [csv],
                    {
                        type: "text/csv;charset=utf-8;"
                    }
                );


            const url =
                URL.createObjectURL(blob);


            const link =
                document.createElement("a");


            link.href = url;

            link.download =
                "library-transactions.csv";


            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

            URL.revokeObjectURL(url);


            if (
                typeof showMessage ===
                "function"
            ) {

                showMessage(
                    "Transaction report exported successfully.",
                    "success"
                );

            } else {

                alert(
                    "Transaction report exported successfully."
                );

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
       INITIAL FILTER
    ========================================= */

    filterTransactions();

});