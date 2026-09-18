/* =====================================================
   MY PROFILE JS
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const editButton =
        document.getElementById("editProfileBtn");

    const editModal =
        document.getElementById("editProfileModal");

    const closeEditModal =
        document.getElementById("closeEditModal");

    const cancelEdit =
        document.getElementById("cancelEdit");

    const profileForm =
        document.getElementById("profileForm");


    const changePasswordButton =
        document.getElementById("changePasswordBtn");

    const passwordModal =
        document.getElementById("passwordModal");

    const closePasswordModal =
        document.getElementById("closePasswordModal");

    const cancelPassword =
        document.getElementById("cancelPassword");

    const passwordForm =
        document.getElementById("passwordForm");


    const toast =
        document.getElementById("profileToast");

    const toastMessage =
        document.getElementById("toastMessage");


    /* =====================================================
       OPEN EDIT PROFILE
    ===================================================== */

    if (editButton) {

        editButton.addEventListener("click", function () {

            editModal.classList.add("active");

        });

    }


    /* =====================================================
       CLOSE EDIT PROFILE
    ===================================================== */

    function closeEditProfile() {

        editModal.classList.remove("active");

    }


    if (closeEditModal) {

        closeEditModal.addEventListener(
            "click",
            closeEditProfile
        );

    }


    if (cancelEdit) {

        cancelEdit.addEventListener(
            "click",
            closeEditProfile
        );

    }


    /* =====================================================
       SAVE PROFILE
    ===================================================== */

    if (profileForm) {

        profileForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "profileName"
                    ).value.trim();


                const email =
                    document.getElementById(
                        "profileEmail"
                    ).value.trim();


                const phone =
                    document.getElementById(
                        "profilePhone"
                    ).value.trim();


                if (!name || !email || !phone) {

                    showToast(
                        "Please fill all profile details."
                    );

                    return;

                }


                document.querySelector(
                    ".profile-main-info h2"
                ).textContent = name;


                document.querySelector(
                    ".profile-main-info p"
                ).innerHTML =
                    '<i class="fa-solid fa-id-card"></i> Student ID: STU1001';


                const infoValues =
                    document.querySelectorAll(
                        ".profile-grid .info-item strong"
                    );


                if (infoValues.length >= 4) {

                    infoValues[0].textContent = name;
                    infoValues[2].textContent = email;
                    infoValues[3].textContent = phone;

                }


                closeEditProfile();


                showToast(
                    "Profile updated successfully."
                );

            }
        );

    }


    /* =====================================================
       PASSWORD MODAL
    ===================================================== */

    if (changePasswordButton) {

        changePasswordButton.addEventListener(
            "click",
            function () {

                passwordModal.classList.add("active");

            }
        );

    }


    function closePassword() {

        passwordModal.classList.remove("active");

    }


    if (closePasswordModal) {

        closePasswordModal.addEventListener(
            "click",
            closePassword
        );

    }


    if (cancelPassword) {

        cancelPassword.addEventListener(
            "click",
            closePassword
        );

    }


    /* =====================================================
       CHANGE PASSWORD
    ===================================================== */

    if (passwordForm) {

        passwordForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const currentPassword =
                    document.getElementById(
                        "currentPassword"
                    ).value;


                const newPassword =
                    document.getElementById(
                        "newPassword"
                    ).value;


                const confirmPassword =
                    document.getElementById(
                        "confirmPassword"
                    ).value;


                if (
                    !currentPassword ||
                    !newPassword ||
                    !confirmPassword
                ) {

                    showToast(
                        "Please fill all password fields."
                    );

                    return;

                }


                if (newPassword.length < 6) {

                    showToast(
                        "New password must contain at least 6 characters."
                    );

                    return;

                }


                if (newPassword !== confirmPassword) {

                    showToast(
                        "New passwords do not match."
                    );

                    return;

                }


                passwordForm.reset();

                closePassword();


                showToast(
                    "Password changed successfully."
                );

            }
        );

    }


    /* =====================================================
       CLOSE MODAL ON OUTSIDE CLICK
    ===================================================== */

    document.querySelectorAll(
        ".profile-modal"
    ).forEach(function (modal) {

        modal.addEventListener(
            "click",
            function (event) {

                if (event.target === modal) {

                    modal.classList.remove("active");

                }

            }
        );

    });


    /* =====================================================
       TOAST
    ===================================================== */

    function showToast(message) {

        toastMessage.textContent = message;

        toast.classList.add("show");


        setTimeout(function () {

            toast.classList.remove("show");

        }, 3000);

    }

});