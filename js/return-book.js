/* =========================================
   RETURN BOOK PAGE JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const returnForm = document.getElementById("returnBookForm");
    const resetBtn = document.getElementById("resetReturnForm");

    const issueDate = document.getElementById("issueDate");
    const dueDate = document.getElementById("dueDate");
    const returnDate = document.getElementById("returnDate");

    const overdueDays = document.getElementById("overdueDays");
    const fineAmount = document.getElementById("fineAmount");

    const currentDate = document.getElementById("currentDate");

    const successModal =
        document.getElementById("returnSuccessModal");

    const closeReturnModal =
        document.getElementById("closeReturnModal");

    const returnDoneBtn =
        document.getElementById("returnDoneBtn");

    const returnSuccessMessage =
        document.getElementById("returnSuccessMessage");

    const notificationBtn =
        document.getElementById("notificationBtn");


    /* =========================================
       DATE HELPERS
    ========================================= */

    function formatDateForInput(date) {

        const year = date.getFullYear();

        const month = String(date.getMonth() + 1)
            .padStart(2, "0");

        const day = String(date.getDate())
            .padStart(2, "0");

        return `${year}-${month}-${day}`;
    }


    function formatDisplayDate(dateString) {

        if (!dateString) return "";

        const date = new Date(dateString);

        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    }


    /* =========================================
       TODAY
    ========================================= */

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (currentDate) {

        currentDate.textContent =
            today.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric"
            });
    }


    /* =========================================
       DEFAULT RETURN DATE
    ========================================= */

    if (returnDate) {
        returnDate.value = formatDateForInput(today);
    }


    /* =========================================
       SAMPLE DEFAULT ISSUE & DUE DATE
    ========================================= */

    if (issueDate && dueDate) {

        const sampleIssueDate = new Date();
        sampleIssueDate.setDate(
            sampleIssueDate.getDate() - 17
        );

        const sampleDueDate = new Date();
        sampleDueDate.setDate(
            sampleDueDate.getDate() - 3
        );

        issueDate.value =
            formatDateForInput(sampleIssueDate);

        dueDate.value =
            formatDateForInput(sampleDueDate);
    }


    /* =========================================
       CALCULATE FINE
       ₹5 PER OVERDUE DAY
    ========================================= */

    function calculateFine() {

        if (!dueDate || !returnDate) return;

        if (!dueDate.value || !returnDate.value) {

            if (overdueDays) {
                overdueDays.value = "0 days";
            }

            if (fineAmount) {
                fineAmount.value = "0";
            }

            return;
        }


        const due =
            new Date(dueDate.value);

        const returned =
            new Date(returnDate.value);


        due.setHours(0, 0, 0, 0);
        returned.setHours(0, 0, 0, 0);


        const difference =
            returned.getTime() - due.getTime();

        const oneDay =
            1000 * 60 * 60 * 24;


        let daysLate =
            Math.ceil(difference / oneDay);


        if (daysLate < 0) {
            daysLate = 0;
        }


        const fine =
            daysLate * 5;


        if (overdueDays) {

            overdueDays.value =
                `${daysLate} day${daysLate === 1 ? "" : "s"}`;
        }


        if (fineAmount) {

            fineAmount.value =
                fine.toString();
        }
    }


    /* =========================================
       RECALCULATE WHEN DATES CHANGE
    ========================================= */

    if (dueDate) {

        dueDate.addEventListener(
            "change",
            calculateFine
        );
    }


    if (returnDate) {

        returnDate.addEventListener(
            "change",
            function () {

                calculateFine();

            }
        );
    }


    calculateFine();


    /* =========================================
       RETURN DATE CANNOT BE BEFORE ISSUE DATE
    ========================================= */

    function validateDates() {

        if (
            !issueDate ||
            !dueDate ||
            !returnDate
        ) {
            return true;
        }


        if (
            !issueDate.value ||
            !dueDate.value ||
            !returnDate.value
        ) {
            return true;
        }


        const issue =
            new Date(issueDate.value);

        const due =
            new Date(dueDate.value);

        const returned =
            new Date(returnDate.value);


        issue.setHours(0, 0, 0, 0);
        due.setHours(0, 0, 0, 0);
        returned.setHours(0, 0, 0, 0);


        if (due <= issue) {

            alert(
                "Due date must be after the issue date."
            );

            return false;
        }


        if (returned < issue) {

            alert(
                "Return date cannot be before the issue date."
            );

            return false;
        }


        return true;
    }


    if (issueDate) {

        issueDate.addEventListener(
            "change",
            function () {

                validateDates();
                calculateFine();

            }
        );
    }


    /* =========================================
       FORM SUBMIT
    ========================================= */

    if (returnForm) {

        returnForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                /* -----------------------------
                   GET VALUES
                ----------------------------- */

                const studentName =
                    document.getElementById(
                        "studentName"
                    ).value.trim();


                const rollNumber =
                    document.getElementById(
                        "rollNumber"
                    ).value.trim();


                const bookTitle =
                    document.getElementById(
                        "bookTitle"
                    ).value.trim();


                const bookId =
                    document.getElementById(
                        "bookId"
                    ).value.trim();


                const bookCondition =
                    document.getElementById(
                        "bookCondition"
                    ).value;


                const fine =
                    fineAmount ?
                    fineAmount.value :
                    "0";


                const lateDays =
                    overdueDays ?
                    overdueDays.value :
                    "0 days";


                /* -----------------------------
                   REQUIRED FIELDS
                ----------------------------- */

                if (
                    !studentName ||
                    !rollNumber ||
                    !bookTitle ||
                    !bookId ||
                    !issueDate.value ||
                    !dueDate.value ||
                    !returnDate.value ||
                    !bookCondition
                ) {

                    alert(
                        "Please fill all required fields."
                    );

                    return;
                }


                /* -----------------------------
                   DATE VALIDATION
                ----------------------------- */

                if (!validateDates()) {
                    return;
                }


                /* -----------------------------
                   SUCCESS MESSAGE
                ----------------------------- */

                if (returnSuccessMessage) {

                    returnSuccessMessage.innerHTML =
                        `<strong>${bookTitle}</strong> has been
                        successfully returned by
                        <strong>${studentName}</strong>
                        (${rollNumber}).<br>
                        Return Date:
                        <strong>${formatDisplayDate(
                            returnDate.value
                        )}</strong><br>
                        Overdue:
                        <strong>${lateDays}</strong>
                        &nbsp; | &nbsp;
                        Fine:
                        <strong>₹${fine}</strong>`;
                }


                /* -----------------------------
                   SHOW MODAL
                ----------------------------- */

                if (successModal) {

                    successModal.classList.add(
                        "active"
                    );
                }


                /* -----------------------------
                   NOTIFICATION
                ----------------------------- */

                if (
                    typeof showMessage ===
                    "function"
                ) {

                    showMessage(
                        "Book returned successfully.",
                        "success"
                    );
                }

            }
        );
    }


    /* =========================================
       RESET FORM
    ========================================= */

    if (resetBtn) {

        resetBtn.addEventListener(
            "click",
            function () {

                if (!returnForm) return;

                returnForm.reset();


                if (returnDate) {

                    returnDate.value =
                        formatDateForInput(
                            new Date()
                        );
                }


                if (overdueDays) {
                    overdueDays.value =
                        "0 days";
                }


                if (fineAmount) {
                    fineAmount.value =
                        "0";
                }

            }
        );
    }


    /* =========================================
       CLOSE SUCCESS MODAL
    ========================================= */

    function closeSuccessModal() {

        if (successModal) {

            successModal.classList.remove(
                "active"
            );
        }
    }


    if (closeReturnModal) {

        closeReturnModal.addEventListener(
            "click",
            closeSuccessModal
        );
    }


    if (returnDoneBtn) {

        returnDoneBtn.addEventListener(
            "click",
            function () {

                closeSuccessModal();

                if (returnForm) {
                    returnForm.reset();
                }

                if (returnDate) {

                    returnDate.value =
                        formatDateForInput(
                            new Date()
                        );
                }

                if (overdueDays) {
                    overdueDays.value =
                        "0 days";
                }

                if (fineAmount) {
                    fineAmount.value =
                        "0";
                }

            }
        );
    }


    /* =========================================
       CLOSE MODAL BY CLICKING OUTSIDE
    ========================================= */

    if (successModal) {

        successModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === successModal
                ) {

                    closeSuccessModal();
                }

            }
        );
    }


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

});