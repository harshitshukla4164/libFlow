/* =====================================================
   STUDENT DASHBOARD
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       TODAY'S DATE
    ===================================================== */

    const todayDate =
        document.getElementById("todayDate");

    if (todayDate) {

        const today = new Date();

        const options = {
            day: "2-digit",
            month: "short",
            year: "numeric"
        };

        todayDate.textContent =
            today.toLocaleDateString("en-IN", options);

    }


    /* =====================================================
       BOOK DATA
    ===================================================== */

    const books = [

        {
            title: "Clean Code",
            author: "Robert C. Martin",
            id: "BK-1001",
            status: "available"
        },

        {
            title: "Atomic Habits",
            author: "James Clear",
            id: "BK-1032",
            status: "issued"
        },

        {
            title: "Introduction to Algorithms",
            author: "Thomas H. Cormen",
            id: "BK-1055",
            status: "available"
        },

        {
            title: "Computer Networks",
            author: "Andrew S. Tanenbaum",
            id: "BK-1018",
            status: "issued"
        },

        {
            title: "Database System Concepts",
            author: "Abraham Silberschatz",
            id: "BK-1025",
            status: "available"
        },

        {
            title: "Operating System Concepts",
            author: "Abraham Silberschatz",
            id: "BK-1089",
            status: "issued"
        },

        {
            title: "Engineering Mathematics",
            author: "Erwin Kreyszig",
            id: "BK-1042",
            status: "available"
        },

        {
            title: "The Pragmatic Programmer",
            author: "David Thomas",
            id: "BK-1095",
            status: "issued"
        }

    ];


    /* =====================================================
       SEARCH ELEMENTS
    ===================================================== */

    const searchInput =
        document.getElementById("availabilitySearch");

    const searchButton =
        document.getElementById("availabilitySearchBtn");

    const resultBox =
        document.getElementById("availabilityResult");


    /* =====================================================
       SHOW SEARCH RESULT
    ===================================================== */

    function searchBook() {

        const value =
            searchInput.value.trim().toLowerCase();


        if (!value) {

            resultBox.innerHTML = `
                <div class="availability-placeholder">

                    <i class="fa-solid fa-book-open"></i>

                    <p>
                        Enter a book title, author or Book ID.
                    </p>

                </div>
            `;

            return;

        }


        const foundBooks = books.filter(function (book) {

            return (
                book.title.toLowerCase().includes(value) ||
                book.author.toLowerCase().includes(value) ||
                book.id.toLowerCase().includes(value)
            );

        });


        if (foundBooks.length === 0) {

            resultBox.innerHTML = `
                <div class="not-found-result">

                    <i class="fa-solid fa-book-open"></i>

                    <p>
                        No matching book found.
                    </p>

                </div>
            `;

            return;

        }


        const book = foundBooks[0];


        let statusHTML = "";


        if (book.status === "available") {

            statusHTML = `
                <span class="available-result">
                    Available
                </span>
            `;

        } else {

            statusHTML = `
                <span class="issued-result">
                    Currently Issued
                </span>
            `;

        }


        resultBox.innerHTML = `

            <div class="book-search-result">

                <div class="result-book-icon">
                    <i class="fa-solid fa-book"></i>
                </div>

                <div class="result-book-info">

                    <strong>
                        ${book.title}
                    </strong>

                    <span>
                        ${book.author} • ${book.id}
                    </span>

                    ${statusHTML}

                </div>

            </div>

        `;

    }


    /* =====================================================
       SEARCH BUTTON
    ===================================================== */

    if (searchButton) {

        searchButton.addEventListener(
            "click",
            searchBook
        );

    }


    /* =====================================================
       ENTER KEY
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    searchBook();

                }

            }
        );

    }


    /* =====================================================
       NOTIFICATION
    ===================================================== */

    const notificationButton =
        document.getElementById("notificationBtn");

    const toast =
        document.getElementById("studentToast");

    const toastMessage =
        document.getElementById("studentToastMessage");


    function showToast(message) {

        toastMessage.textContent = message;

        toast.classList.add("show");


        setTimeout(function () {

            toast.classList.remove("show");

        }, 3000);

    }


    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            function () {

                showToast(
                    "You have 1 overdue book notification."
                );

            }
        );

    }

});