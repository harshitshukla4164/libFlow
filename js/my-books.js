document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("bookSearch");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const bookCards = document.querySelectorAll(".issued-book-card");
    const emptyState = document.getElementById("emptyState");

    const renewModal = document.getElementById("renewModal");
    const renewMessage = document.getElementById("renewMessage");

    const closeRenewModal = document.getElementById("closeRenewModal");
    const cancelRenew = document.getElementById("cancelRenew");
    const confirmRenew = document.getElementById("confirmRenew");

    let selectedBook = "";


    /* =========================================
       SEARCH + FILTER
    ========================================= */

    function filterBooks() {

        const searchText = searchInput.value.toLowerCase().trim();

        const activeFilter =
            document.querySelector(".filter-btn.active")?.dataset.filter || "all";

        let visibleBooks = 0;

        bookCards.forEach(function (card) {

            const text = card.innerText.toLowerCase();
            const status = card.dataset.status;

            const matchesSearch = text.includes(searchText);

            let matchesFilter = true;

            if (activeFilter === "ontime") {
                matchesFilter = status === "ontime";
            }

            if (activeFilter === "overdue") {
                matchesFilter = status === "overdue";
            }

            if (matchesSearch && matchesFilter) {
                card.style.display = "flex";
                visibleBooks++;
            } else {
                card.style.display = "none";
            }

        });


        if (visibleBooks === 0) {
            emptyState.style.display = "block";
        } else {
            emptyState.style.display = "none";
        }
    }


    searchInput.addEventListener("input", filterBooks);


    /* =========================================
       FILTER BUTTONS
    ========================================= */

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            filterBooks();

        });

    });


    /* =========================================
       RENEW BOOK
    ========================================= */

    const renewButtons = document.querySelectorAll(".renew-btn");

    renewButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            selectedBook = button.dataset.book;

            renewMessage.textContent =
                `Do you want to request renewal for "${selectedBook}"?`;

            renewModal.classList.add("show");

        });

    });


    /* =========================================
       CLOSE MODAL
    ========================================= */

    function closeModal() {
        renewModal.classList.remove("show");
        selectedBook = "";
    }


    closeRenewModal.addEventListener("click", closeModal);
    cancelRenew.addEventListener("click", closeModal);


    renewModal.addEventListener("click", function (event) {

        if (event.target === renewModal) {
            closeModal();
        }

    });


    /* =========================================
       CONFIRM RENEWAL
    ========================================= */

    confirmRenew.addEventListener("click", function () {

        if (!selectedBook) return;

        closeModal();

        showNotification(
            `Renewal request sent for "${selectedBook}".`,
            "success"
        );

    });


    /* =========================================
       RETURN REQUIRED BUTTON
    ========================================= */

    const returnButtons =
        document.querySelectorAll(".return-info-btn");

    returnButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const bookName = button.dataset.book;

            const confirmReturn = confirm(
                `"${bookName}" is overdue. Would you like to go to the Return Book page?`
            );

            if (confirmReturn) {
                window.location.href = "return-book.html";
            }

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
                "You have 1 overdue book and ₹40 pending fine.",
                "warning"
            );

        });

    }


    /* =========================================
       NOTIFICATION HELPER
    ========================================= */

    function showNotification(message, type = "success") {

        let notification =
            document.getElementById("notification");

        if (!notification) return;

        notification.textContent = message;

        notification.className =
            `notification show ${type}`;

        setTimeout(function () {
            notification.classList.remove("show");
        }, 3000);

    }

});