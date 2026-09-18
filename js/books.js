/* =========================================================
   BOOK MANAGEMENT JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("bookSearch");
    const categoryFilter = document.getElementById("categoryFilter");
    const availabilityFilter = document.getElementById("availabilityFilter");
    const clearSearch = document.getElementById("clearSearch");

    const tableBody = document.getElementById("booksTableBody");
    const noBooks = document.getElementById("noBooks");

    const resultCount = document.getElementById("resultCount");
    const visibleCount = document.getElementById("visibleCount");

    const addBookBtn = document.getElementById("addBookBtn");
    const bookModal = document.getElementById("bookModal");
    const closeBookModal = document.getElementById("closeBookModal");
    const cancelBookBtn = document.getElementById("cancelBookBtn");
    const bookForm = document.getElementById("bookForm");

    const exportBooks = document.getElementById("exportBooks");


    /* ================= GET BOOK ROWS ================= */

    function getBookRows() {
        return Array.from(
            tableBody.querySelectorAll("tr[data-title]")
        );
    }


    /* ================= FILTER BOOKS ================= */

    function filterBooks() {

        const searchValue = searchInput.value
            .trim()
            .toLowerCase();

        const categoryValue = categoryFilter.value;
        const availabilityValue = availabilityFilter.value;

        let visible = 0;

        getBookRows().forEach(function (row) {

            const title = row.dataset.title || "";
            const author = row.dataset.author || "";
            const isbn = row.dataset.isbn || "";
            const category = row.dataset.category || "";
            const status = row.dataset.status || "";

            const matchesSearch =
                title.includes(searchValue) ||
                author.includes(searchValue) ||
                isbn.includes(searchValue);

            const matchesCategory =
                categoryValue === "all" ||
                category === categoryValue;

            const matchesStatus =
                availabilityValue === "all" ||
                status === availabilityValue;

            if (
                matchesSearch &&
                matchesCategory &&
                matchesStatus
            ) {

                row.style.display = "";
                visible++;

            } else {

                row.style.display = "none";

            }

        });


        resultCount.textContent = visible;
        visibleCount.textContent = visible;

        if (visible === 0) {
            noBooks.classList.add("show");
        } else {
            noBooks.classList.remove("show");
        }


        /* Search clear button */

        if (searchValue.length > 0) {
            clearSearch.classList.add("show");
        } else {
            clearSearch.classList.remove("show");
        }

    }


    /* ================= SEARCH ================= */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterBooks
        );

    }


    /* ================= CATEGORY FILTER ================= */

    if (categoryFilter) {

        categoryFilter.addEventListener(
            "change",
            filterBooks
        );

    }


    /* ================= STATUS FILTER ================= */

    if (availabilityFilter) {

        availabilityFilter.addEventListener(
            "change",
            filterBooks
        );

    }


    /* ================= CLEAR SEARCH ================= */

    if (clearSearch) {

        clearSearch.addEventListener("click", function () {

            searchInput.value = "";

            filterBooks();

            searchInput.focus();

        });

    }


    /* ================= OPEN ADD BOOK MODAL ================= */

    function openBookModal() {

        if (bookModal) {
            bookModal.classList.add("active");
        }

    }


    if (addBookBtn) {

        addBookBtn.addEventListener(
            "click",
            openBookModal
        );

    }


    /* ================= CLOSE MODAL ================= */

    function closeModal() {

        if (bookModal) {
            bookModal.classList.remove("active");
        }

    }


    if (closeBookModal) {
        closeBookModal.addEventListener(
            "click",
            closeModal
        );
    }


    if (cancelBookBtn) {
        cancelBookBtn.addEventListener(
            "click",
            closeModal
        );
    }


    /* ================= CLICK OUTSIDE MODAL ================= */

    if (bookModal) {

        bookModal.addEventListener(
            "click",
            function (event) {

                if (event.target === bookModal) {
                    closeModal();
                }

            }
        );

    }


    /* ================= ESCAPE KEY ================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {
                closeModal();
            }

        }
    );


    /* ================= ADD BOOK ================= */

    if (bookForm) {

        bookForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const title =
                    document.getElementById("bookTitle").value.trim();

                const author =
                    document.getElementById("bookAuthor").value.trim();

                const isbn =
                    document.getElementById("bookISBN").value.trim();

                const category =
                    document.getElementById("bookCategory").value;

                const copies =
                    document.getElementById("bookCopies").value;


                if (!title || !author || !isbn || !category) {

                    showMessage(
                        "Please fill all required fields.",
                        "error"
                    );

                    return;
                }


                /*
                    Demo behaviour:
                    In the frontend prototype the new book is
                    confirmed visually. Backend/database can be
                    connected later.
                */

                closeModal();

                bookForm.reset();

                showMessage(
                    `"${title}" has been added successfully.`,
                    "success"
                );

            }
        );

    }


    /* ================= EDIT BUTTONS ================= */

    document.querySelectorAll(".edit-btn").forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const row =
                        button.closest("tr");

                    const title =
                        row.querySelector(
                            ".book-cell strong"
                        ).textContent;

                    showMessage(
                        `Edit option selected for "${title}".`,
                        "success"
                    );

                }
            );

        }
    );


    /* ================= DELETE BUTTONS ================= */

    document.querySelectorAll(".delete-btn").forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const row =
                        button.closest("tr");

                    const title =
                        row.querySelector(
                            ".book-cell strong"
                        ).textContent;


                    const confirmed =
                        confirm(
                            `Are you sure you want to delete "${title}"?`
                        );


                    if (confirmed) {

                        row.remove();

                        filterBooks();

                        showMessage(
                            `"${title}" has been removed.`,
                            "success"
                        );

                    }

                }
            );

        }
    );


    /* ================= EXPORT ================= */

    if (exportBooks) {

        exportBooks.addEventListener(
            "click",
            function () {

                const rows = getBookRows()
                    .filter(function (row) {
                        return row.style.display !== "none";
                    });


                let csv =
                    "Title,Author,ISBN,Category,Status\n";


                rows.forEach(function (row) {

                    const title =
                        row.dataset.title;

                    const author =
                        row.dataset.author;

                    const isbn =
                        row.dataset.isbn;

                    const category =
                        row.dataset.category;

                    const status =
                        row.dataset.status;


                    csv +=
                        `"${title}","${author}","${isbn}","${category}","${status}"\n`;

                });


                const blob =
                    new Blob(
                        [csv],
                        { type: "text/csv;charset=utf-8;" }
                    );


                const url =
                    URL.createObjectURL(blob);


                const link =
                    document.createElement("a");

                link.href = url;
                link.download = "library-books.csv";

                document.body.appendChild(link);

                link.click();

                document.body.removeChild(link);

                URL.revokeObjectURL(url);


                showMessage(
                    "Book list exported successfully.",
                    "success"
                );

            }
        );

    }


    /* ================= PAGINATION DEMO ================= */

    document.querySelectorAll(
        ".pagination-btn"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                if (
                    button.classList.contains("next")
                ) {

                    showMessage(
                        "Next page selected.",
                        "success"
                    );

                    return;
                }


                document.querySelectorAll(
                    ".pagination-btn"
                ).forEach(function (btn) {
                    btn.classList.remove("active");
                });


                button.classList.add("active");

                showMessage(
                    `Page ${button.textContent} selected.`,
                    "success"
                );

            }
        );

    });


    /* ================= INITIAL FILTER ================= */

    filterBooks();

});