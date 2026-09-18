/* =====================================================
   SEARCH BOOKS
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("bookSearch");
    const categoryFilter = document.getElementById("categoryFilter");
    const availabilityFilter = document.getElementById("availabilityFilter");

    const resetFiltersBtn = document.getElementById("resetFilters");
    const clearSearchBtn = document.getElementById("clearSearch");
    const noResultResetBtn = document.getElementById("noResultReset");

    const booksGrid = document.getElementById("booksGrid");
    const bookCards = Array.from(document.querySelectorAll(".book-card"));

    const resultCount = document.getElementById("resultCount");
    const noResults = document.getElementById("noResults");

    const totalBooks = document.getElementById("totalBooks");
    const availableBooks = document.getElementById("availableBooks");
    const issuedBooks = document.getElementById("issuedBooks");
    const overdueBooks = document.getElementById("overdueBooks");


    /* =====================================================
       UPDATE SUMMARY
    ===================================================== */

    function updateSummary() {

        let available = 0;
        let issued = 0;
        let overdue = 0;

        bookCards.forEach(function (card) {

            const status = card.dataset.status;

            if (status === "available") {
                available++;
            }

            if (status === "issued") {
                issued++;
            }

            if (status === "overdue") {
                overdue++;
            }

        });

        totalBooks.textContent = bookCards.length;
        availableBooks.textContent = available;
        issuedBooks.textContent = issued;
        overdueBooks.textContent = overdue;
    }


    /* =====================================================
       SEARCH BOOKS
    ===================================================== */

    function filterBooks() {

        const searchValue = searchInput.value.trim().toLowerCase();
        const categoryValue = categoryFilter.value.toLowerCase();
        const availabilityValue = availabilityFilter.value.toLowerCase();

        let visibleCount = 0;


        bookCards.forEach(function (card) {

            const title = card.dataset.title.toLowerCase();
            const author = card.dataset.author.toLowerCase();
            const bookId = card.dataset.id.toLowerCase();

            const category = card.dataset.category.toLowerCase();
            const status = card.dataset.status.toLowerCase();


            const matchesSearch =
                searchValue === "" ||
                title.includes(searchValue) ||
                author.includes(searchValue) ||
                bookId.includes(searchValue);


            const matchesCategory =
                categoryValue === "all" ||
                category === categoryValue;


            const matchesAvailability =
                availabilityValue === "all" ||
                status === availabilityValue;


            const shouldShow =
                matchesSearch &&
                matchesCategory &&
                matchesAvailability;


            if (shouldShow) {

                card.style.display = "";

                visibleCount++;

            } else {

                card.style.display = "none";

            }

        });


        resultCount.textContent = visibleCount;


        if (visibleCount === 0) {

            noResults.style.display = "block";
            booksGrid.style.display = "none";

        } else {

            noResults.style.display = "none";
            booksGrid.style.display = "grid";

        }


        updateClearButton();
    }


    /* =====================================================
       CLEAR SEARCH ICON
    ===================================================== */

    function updateClearButton() {

        if (searchInput.value.trim() !== "") {

            clearSearchBtn.style.display = "flex";
            clearSearchBtn.style.alignItems = "center";
            clearSearchBtn.style.justifyContent = "center";

        } else {

            clearSearchBtn.style.display = "none";

        }

    }


    /* =====================================================
       RESET FILTERS
    ===================================================== */

    function resetFilters() {

        searchInput.value = "";
        categoryFilter.value = "all";
        availabilityFilter.value = "all";

        filterBooks();

    }


    /* =====================================================
       SEARCH EVENTS
    ===================================================== */

    searchInput.addEventListener("input", filterBooks);

    categoryFilter.addEventListener("change", filterBooks);

    availabilityFilter.addEventListener("change", filterBooks);


    /* =====================================================
       CLEAR SEARCH
    ===================================================== */

    clearSearchBtn.addEventListener("click", function () {

        searchInput.value = "";

        filterBooks();

        searchInput.focus();

    });


    /* =====================================================
       RESET BUTTONS
    ===================================================== */

    resetFiltersBtn.addEventListener("click", resetFilters);

    noResultResetBtn.addEventListener("click", resetFilters);


    /* =====================================================
       REQUEST ISSUE
    ===================================================== */

    const requestButtons =
        document.querySelectorAll(".request-btn");

    const requestModal =
        document.getElementById("requestModal");

    const closeRequestModal =
        document.getElementById("closeRequestModal");

    const requestDoneBtn =
        document.getElementById("requestDoneBtn");

    const requestMessage =
        document.getElementById("requestMessage");


    requestButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const bookName = button.dataset.book;

            requestMessage.innerHTML =
                `Your request for <strong>${bookName}</strong> has been submitted successfully.`;

            requestModal.classList.add("active");

        });

    });


    /* =====================================================
       CLOSE MODAL
    ===================================================== */

    function closeModal() {

        requestModal.classList.remove("active");

    }


    closeRequestModal.addEventListener(
        "click",
        closeModal
    );


    requestDoneBtn.addEventListener(
        "click",
        closeModal
    );


    requestModal.addEventListener(
        "click",
        function (event) {

            if (event.target === requestModal) {
                closeModal();
            }

        }
    );


    /* =====================================================
       NOTIFICATION
    ===================================================== */

    const notificationBtn =
        document.getElementById("notificationBtn");

    const libraryToast =
        document.getElementById("libraryToast");

    const toastMessage =
        document.getElementById("toastMessage");


    function showToast(message) {

        toastMessage.textContent = message;

        libraryToast.classList.add("show");

        setTimeout(function () {

            libraryToast.classList.remove("show");

        }, 3000);

    }


    notificationBtn.addEventListener("click", function () {

        showToast("You have no new notifications.");

    });


    /* =====================================================
       INITIAL LOAD
    ===================================================== */

    updateSummary();

    filterBooks();

});