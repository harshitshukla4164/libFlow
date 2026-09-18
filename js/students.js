document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("studentSearch");
    const departmentFilter = document.getElementById("departmentFilter");
    const statusFilter = document.getElementById("statusFilter");

    const clearSearch = document.getElementById("clearSearch");
    const tableBody = document.getElementById("studentTableBody");
    const noStudents = document.getElementById("noStudents");
    const visibleStudents = document.getElementById("visibleStudents");

    const addStudentBtn = document.getElementById("addStudentBtn");
    const studentModal = document.getElementById("studentModal");
    const closeStudentModal = document.getElementById("closeStudentModal");
    const cancelStudent = document.getElementById("cancelStudent");
    const studentForm = document.getElementById("studentForm");

    const exportStudents = document.getElementById("exportStudents");

    const prevPage = document.getElementById("prevPage");
    const nextPage = document.getElementById("nextPage");



    /* =========================================
       GET STUDENT ROWS
    ========================================= */

    function getStudentRows() {
        return Array.from(
            tableBody.querySelectorAll("tr")
        );
    }



    /* =========================================
       SEARCH + FILTER
    ========================================= */

    function filterStudents() {

        const searchValue = searchInput.value
            .trim()
            .toLowerCase();

        const selectedDepartment =
            departmentFilter.value;

        const selectedStatus =
            statusFilter.value;

        let visibleCount = 0;


        getStudentRows().forEach(row => {

            const name =
                row.dataset.name.toLowerCase();

            const roll =
                row.dataset.roll.toLowerCase();

            const department =
                row.dataset.department;

            const status =
                row.dataset.status;

            const email =
                row.cells[4].textContent.toLowerCase();


            const matchesSearch =
                name.includes(searchValue) ||
                roll.includes(searchValue) ||
                email.includes(searchValue);


            const matchesDepartment =
                selectedDepartment === "all" ||
                department === selectedDepartment;


            const matchesStatus =
                selectedStatus === "all" ||
                status === selectedStatus;


            if (
                matchesSearch &&
                matchesDepartment &&
                matchesStatus
            ) {

                row.style.display = "";
                visibleCount++;

            } else {

                row.style.display = "none";

            }

        });


        visibleStudents.textContent = visibleCount;

        noStudents.classList.toggle(
            "show",
            visibleCount === 0
        );


        clearSearch.style.display =
            searchValue ? "block" : "none";
    }



    searchInput.addEventListener(
        "input",
        filterStudents
    );

    departmentFilter.addEventListener(
        "change",
        filterStudents
    );

    statusFilter.addEventListener(
        "change",
        filterStudents
    );


    clearSearch.addEventListener("click", () => {

        searchInput.value = "";

        departmentFilter.value = "all";

        statusFilter.value = "all";

        filterStudents();

    });



    /* =========================================
       MODAL
    ========================================= */

    function openStudentModal() {

        studentModal.classList.add("active");

        document.body.style.overflow = "hidden";

        setTimeout(() => {

            document.getElementById("studentName").focus();

        }, 100);

    }


    function closeModal() {

        studentModal.classList.remove("active");

        document.body.style.overflow = "";

        studentForm.reset();

    }


    addStudentBtn.addEventListener(
        "click",
        openStudentModal
    );


    closeStudentModal.addEventListener(
        "click",
        closeModal
    );


    cancelStudent.addEventListener(
        "click",
        closeModal
    );


    studentModal.addEventListener("click", event => {

        if (event.target === studentModal) {
            closeModal();
        }

    });



    /* =========================================
       ADD STUDENT
    ========================================= */

    studentForm.addEventListener("submit", event => {

        event.preventDefault();


        const name =
            document.getElementById("studentName").value.trim();

        const roll =
            document.getElementById("rollNumber").value.trim();

        const department =
            document.getElementById("department").value;

        const year =
            document.getElementById("year").value;

        const email =
            document.getElementById("email").value.trim();


        if (
            !name ||
            !roll ||
            !department ||
            !year ||
            !email
        ) {

            alert("Please fill all student details.");

            return;
        }


        const nameParts = name.split(" ");

        const initials =
            nameParts
                .slice(0, 2)
                .map(part => part.charAt(0))
                .join("")
                .toUpperCase();


        const newRow =
            document.createElement("tr");


        newRow.dataset.name = name;
        newRow.dataset.roll = roll;
        newRow.dataset.department = department;
        newRow.dataset.status = "Active";


        newRow.innerHTML = `

            <td>

                <div class="student-cell">

                    <div class="student-avatar">
                        ${initials}
                    </div>

                    <div>
                        <strong>${name}</strong>
                        <span>Library Member</span>
                    </div>

                </div>

            </td>


            <td>${roll}</td>

            <td>${department}</td>

            <td>${year}</td>

            <td>${email}</td>


            <td>
                <span class="badge badge-success">
                    Active
                </span>
            </td>


            <td>

                <div class="table-actions">

                    <button
                        class="action-btn edit-btn"
                        title="Edit Student"
                    >
                        <i class="fas fa-pen"></i>
                    </button>

                    <button
                        class="action-btn delete-btn"
                        title="Delete Student"
                    >
                        <i class="fas fa-trash"></i>
                    </button>

                </div>

            </td>

        `;


        tableBody.prepend(newRow);


        closeModal();


        filterStudents();


        alert(
            `${name} has been added successfully.`
        );

    });



    /* =========================================
       EDIT / DELETE
    ========================================= */

    tableBody.addEventListener("click", event => {

        const editButton =
            event.target.closest(".edit-btn");

        const deleteButton =
            event.target.closest(".delete-btn");


        const row =
            event.target.closest("tr");


        if (!row) return;


        if (editButton) {

            const studentName =
                row.dataset.name;

            alert(
                `Edit option selected for ${studentName}.`
            );

        }


        if (deleteButton) {

            const studentName =
                row.dataset.name;


            const confirmDelete =
                confirm(
                    `Are you sure you want to delete ${studentName}?`
                );


            if (confirmDelete) {

                row.remove();

                filterStudents();

                alert(
                    `${studentName} has been removed.`
                );

            }

        }

    });



    /* =========================================
       EXPORT CSV
    ========================================= */

    exportStudents.addEventListener("click", () => {

        const rows =
            getStudentRows().filter(
                row => row.style.display !== "none"
            );


        if (rows.length === 0) {

            alert("There are no students to export.");

            return;

        }


        let csv =
            "Name,Roll Number,Department,Year,Email,Status\n";


        rows.forEach(row => {

            const name =
                row.dataset.name;

            const roll =
                row.dataset.roll;

            const department =
                row.dataset.department;

            const year =
                row.cells[3].textContent.trim();

            const email =
                row.cells[4].textContent.trim();

            const status =
                row.dataset.status;


            csv +=
                `"${name}","${roll}","${department}","${year}","${email}","${status}"\n`;

        });


        const blob =
            new Blob([csv], {
                type: "text/csv;charset=utf-8;"
            });


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");


        link.href = url;

        link.download =
            "student-list.csv";


        document.body.appendChild(link);

        link.click();

        link.remove();


        URL.revokeObjectURL(url);

    });



    /* =========================================
       PAGINATION DEMO
    ========================================= */

    prevPage.addEventListener("click", () => {

        alert("You are already on the first page.");

    });


    nextPage.addEventListener("click", () => {

        alert(
            "Pagination is ready for backend integration."
        );

    });


    document
        .querySelectorAll(".pagination-btn")
        .forEach(button => {

            if (
                button !== prevPage &&
                button !== nextPage
            ) {

                button.addEventListener(
                    "click",
                    () => {

                        document
                            .querySelectorAll(".pagination-btn")
                            .forEach(btn =>
                                btn.classList.remove("active")
                            );


                        button.classList.add("active");

                    }
                );

            }

        });



    /* =========================================
       NOTIFICATION
    ========================================= */

    const notificationBtn =
        document.getElementById("notificationBtn");


    if (notificationBtn) {

        notificationBtn.addEventListener(
            "click",
            () => {

                alert(
                    "You have 3 new library notifications."
                );

            }
        );

    }



    /* =========================================
       INITIAL LOAD
    ========================================= */

    filterStudents();

});