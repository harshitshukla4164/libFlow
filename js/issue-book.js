/* =========================================
   ISSUE BOOK PAGE JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const issueForm = document.getElementById("issueBookForm");
    const resetBtn = document.getElementById("resetIssueForm");

    const issueDate = document.getElementById("issueDate");
    const dueDate = document.getElementById("dueDate");

    const currentDate = document.getElementById("currentDate");

    const successModal = document.getElementById("issueSuccessModal");
    const closeIssueModal = document.getElementById("closeIssueModal");
    const successDoneBtn = document.getElementById("successDoneBtn");
    const successMessage = document.getElementById("successMessage");

    const notificationBtn = document.getElementById("notificationBtn");


    /* =========================================
       CURRENT DATE
    ========================================= */

    const today = new Date();

    const formattedToday = today.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

    if (currentDate) {
        currentDate.textContent = formattedToday;
    }


    /* =========================================
       FORMAT DATE FOR INPUT
    ========================================= */

    function formatDateForInput(date) {

        const year = date.getFullYear();

        const month = String(date.getMonth() + 1)
            .padStart(2, "0");

        const day = String(date.getDate())
            .padStart(2, "0");

        return `${year}-${month}-${day}`;
    }


    /* =========================================
       DEFAULT ISSUE DATE
    ========================================= */

    if (issueDate) {
        issueDate.value = formatDateForInput(today);
    }


    /* =========================================
       DEFAULT DUE DATE
       14 DAYS AFTER ISSUE DATE
    ========================================= */

    function setDefaultDueDate() {

        if (!issueDate || !dueDate) return;

        const selectedDate = new Date(issueDate.value);

        if (isNaN(selectedDate.getTime())) return;

        selectedDate.setDate(selectedDate.getDate() + 14);

        dueDate.value = formatDateForInput(selectedDate);
    }

    setDefaultDueDate();


    /* =========================================
       CHANGE DUE DATE WHEN ISSUE DATE CHANGES
    ========================================= */

    if (issueDate) {

        issueDate.addEventListener("change", function () {

            if (!issueDate.value) return;

            setDefaultDueDate();

        });
    }


    /* =========================================
       ISSUE DATE VALIDATION
    ========================================= */

    if (issueDate) {

        issueDate.addEventListener("change", function () {

            if (!issueDate.value) return;

            const selectedIssueDate = new Date(issueDate.value);
            const selectedToday = new Date();

            selectedIssueDate.setHours(0, 0, 0, 0);
            selectedToday.setHours(0, 0, 0, 0);

            if (selectedIssueDate > selectedToday) {

                alert("Issue date cannot be in the future.");

                issueDate.value = formatDateForInput(selectedToday);

                setDefaultDueDate();
            }
        });
    }


    /* =========================================
       DUE DATE VALIDATION
    ========================================= */

    if (dueDate) {

        dueDate.addEventListener("change", function () {

            if (!issueDate.value || !dueDate.value) return;

            const startDate = new Date(issueDate.value);
            const returnDate = new Date(dueDate.value);

            startDate.setHours(0, 0, 0, 0);
            returnDate.setHours(0, 0, 0, 0);

            if (returnDate <= startDate) {

                alert("Due date must be after the issue date.");

                setDefaultDueDate();
            }
        });
    }


    /* =========================================
       FORM SUBMIT
    ========================================= */

    if (issueForm) {

        issueForm.addEventListener("submit", function (event) {

            event.preventDefault();


            /* ---------------------------------
               GET FORM VALUES
            --------------------------------- */

            const studentName =
                document.getElementById("studentName").value.trim();

            const rollNumber =
                document.getElementById("rollNumber").value.trim();

            const bookTitle =
                document.getElementById("bookTitle").value.trim();

            const bookId =
                document.getElementById("bookId").value.trim();

            const department =
                document.getElementById("department").value.trim();

            const studentYear =
                document.getElementById("studentYear").value;

            const bookAuthor =
                document.getElementById("bookAuthor").value.trim();

            const bookCategory =
                document.getElementById("bookCategory").value.trim();

            const selectedIssueDate =
                document.getElementById("issueDate").value;

            const selectedDueDate =
                document.getElementById("dueDate").value;


            /* ---------------------------------
               REQUIRED FIELD CHECK
            --------------------------------- */

            if (
                !studentName ||
                !rollNumber ||
                !bookTitle ||
                !bookId ||
                !selectedIssueDate ||
                !selectedDueDate
            ) {

                alert("Please fill all required fields.");

                return;
            }


            /* ---------------------------------
               DATE CHECK
            --------------------------------- */

            const issueDateObj =
                new Date(selectedIssueDate);

            const dueDateObj =
                new Date(selectedDueDate);

            issueDateObj.setHours(0, 0, 0, 0);
            dueDateObj.setHours(0, 0, 0, 0);

            if (dueDateObj <= issueDateObj) {

                alert("Due date must be after the issue date.");

                return;
            }


            /* ---------------------------------
               FORMAT DISPLAY DATE
            --------------------------------- */

            const displayDueDate =
                dueDateObj.toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                });


            /* ---------------------------------
               SUCCESS MESSAGE
            --------------------------------- */

            if (successMessage) {

                successMessage.innerHTML =
                    `<strong>${bookTitle}</strong> has been issued to 
                    <strong>${studentName}</strong> 
                    (${rollNumber}).<br>
                    Due date: <strong>${displayDueDate}</strong>`;
            }


            /* ---------------------------------
               SHOW SUCCESS MODAL
            --------------------------------- */

            if (successModal) {

                successModal.classList.add("active");
            }


            /* ---------------------------------
               DEMO NOTIFICATION
            --------------------------------- */

            if (typeof showMessage === "function") {

                showMessage(
                    "Book issued successfully.",
                    "success"
                );
            }

        });
    }


    /* =========================================
       RESET FORM
    ========================================= */

    if (resetBtn) {

        resetBtn.addEventListener("click", function () {

            if (!issueForm) return;

            issueForm.reset();

            if (issueDate) {
                issueDate.value = formatDateForInput(new Date());
            }

            setDefaultDueDate();

        });
    }


    /* =========================================
       CLOSE SUCCESS MODAL
    ========================================= */

    function closeSuccessModal() {

        if (successModal) {

            successModal.classList.remove("active");
        }
    }


    if (closeIssueModal) {

        closeIssueModal.addEventListener(
            "click",
            closeSuccessModal
        );
    }


    if (successDoneBtn) {

        successDoneBtn.addEventListener(
            "click",
            function () {

                closeSuccessModal();

                if (issueForm) {
                    issueForm.reset();
                }

                if (issueDate) {
                    issueDate.value =
                        formatDateForInput(new Date());
                }

                setDefaultDueDate();
            }
        );
    }


    /* =========================================
       CLOSE MODAL ON OVERLAY CLICK
    ========================================= */

    if (successModal) {

        successModal.addEventListener("click", function (event) {

            if (event.target === successModal) {

                closeSuccessModal();
            }

        });
    }


    /* =========================================
       NOTIFICATION BUTTON
    ========================================= */

    if (notificationBtn) {

        notificationBtn.addEventListener("click", function () {

            alert(
                "You have 3 new library notifications."
            );

        });
    }

});