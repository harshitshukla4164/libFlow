/* =========================================
   REPORTS PAGE JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const periodSelect =
        document.getElementById("reportPeriod");

    const generateBtn =
        document.getElementById("generateReportBtn");

    const downloadBtn =
        document.getElementById("downloadReportBtn");

    const notificationBtn =
        document.getElementById("notificationBtn");


    /* =========================================
       REPORT DATA
    ========================================= */

    const reportData = {

        month: {
            issued: "346",
            returned: "291",
            students: "1,185",
            fine: "₹12,200"
        },

        "last-month": {
            issued: "319",
            returned: "276",
            students: "1,164",
            fine: "₹11,480"
        },

        quarter: {
            issued: "982",
            returned: "841",
            students: "1,185",
            fine: "₹34,650"
        },

        year: {
            issued: "3,486",
            returned: "3,102",
            students: "1,185",
            fine: "₹1,28,450"
        }

    };


    /* =========================================
       UPDATE REPORT
    ========================================= */

    function updateReport() {

        const selectedPeriod =
            periodSelect.value;

        const data =
            reportData[selectedPeriod];


        document.getElementById(
            "booksIssued"
        ).textContent = data.issued;


        document.getElementById(
            "booksReturned"
        ).textContent = data.returned;


        document.getElementById(
            "activeStudents"
        ).textContent = data.students;


        document.getElementById(
            "fineCollected"
        ).textContent = data.fine;


        if (
            typeof showMessage ===
            "function"
        ) {

            showMessage(
                "Report updated successfully.",
                "success"
            );

        }

    }


    /* =========================================
       GENERATE REPORT
    ========================================= */

    generateBtn.addEventListener(
        "click",
        updateReport
    );


    /* =========================================
       DOWNLOAD REPORT
    ========================================= */

    downloadBtn.addEventListener(
        "click",
        function () {

            const selectedPeriod =
                periodSelect.value;

            const data =
                reportData[selectedPeriod];


            const reportName =
                periodSelect
                    .options[
                        periodSelect.selectedIndex
                    ]
                    .text;


            let reportText = "";

            reportText +=
                "LIBRARY MANAGEMENT SYSTEM\n";

            reportText +=
                "================================\n\n";

            reportText +=
                "Report Period: " +
                reportName +
                "\n\n";

            reportText +=
                "BOOKS ISSUED: " +
                data.issued +
                "\n";

            reportText +=
                "BOOKS RETURNED: " +
                data.returned +
                "\n";

            reportText +=
                "ACTIVE STUDENTS: " +
                data.students +
                "\n";

            reportText +=
                "FINE COLLECTED: " +
                data.fine +
                "\n\n";

            reportText +=
                "Most Issued Books\n";

            reportText +=
                "1. Clean Code - 48 issues\n";

            reportText +=
                "2. Atomic Habits - 42 issues\n";

            reportText +=
                "3. Computer Networks - 37 issues\n";

            reportText +=
                "4. Database System Concepts - 31 issues\n\n";

            reportText +=
                "Department Activity\n";

            reportText +=
                "CSE - 185\n";

            reportText +=
                "IT - 124\n";

            reportText +=
                "ECE - 96\n";

            reportText +=
                "ME - 74\n";

            reportText +=
                "CE - 58\n";


            const blob =
                new Blob(
                    [reportText],
                    {
                        type: "text/plain;charset=utf-8"
                    }
                );


            const url =
                URL.createObjectURL(blob);


            const link =
                document.createElement("a");


            link.href = url;

            link.download =
                "library-report.txt";


            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

            URL.revokeObjectURL(url);


            if (
                typeof showMessage ===
                "function"
            ) {

                showMessage(
                    "Report downloaded successfully.",
                    "success"
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
       CHART HOVER EFFECT
    ========================================= */

    const bars =
        document.querySelectorAll(
            ".chart-bars .bar"
        );


    bars.forEach(function (bar) {

        bar.addEventListener(
            "mouseenter",
            function () {

                bar.style.opacity = "0.75";

            }
        );


        bar.addEventListener(
            "mouseleave",
            function () {

                bar.style.opacity = "1";

            }
        );

    });

});