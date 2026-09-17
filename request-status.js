document.addEventListener(
    "DOMContentLoaded",
    function () {

        const requestId =
            document.getElementById("requestId");

        const message =
            document.getElementById("message");

        const homeButton =
            document.getElementById("homeButton");


        const step1 =
            document.getElementById("step1");

        const step2 =
            document.getElementById("step2");

        const step3 =
            document.getElementById("step3");


        /* =========================
           CREATE UNIQUE REQUEST ID
        ========================= */

        let id =
            localStorage.getItem("novaRequestId");


        if (!id) {

            const now = new Date();

            const date =
                now.getFullYear() +
                String(now.getMonth() + 1).padStart(2, "0") +
                String(now.getDate()).padStart(2, "0");

            const random =
                Math.random()
                    .toString(36)
                    .substring(2, 8)
                    .toUpperCase();

            id =
                "NOVA-" +
                date +
                "-" +
                random;

            localStorage.setItem(
                "novaRequestId",
                id
            );
        }


        requestId.textContent = id;


        /* =========================
           STEP 1
        ========================= */

        setTimeout(function () {

            step1.classList.add("active");

            message.textContent =
                "NOVA has received your grievance request.";

        }, 700);


        /* =========================
           STEP 1 COMPLETE
        ========================= */

        setTimeout(function () {

            step1.classList.remove("active");

            step1.classList.add("complete");

            step1.querySelector(".icon")
                .textContent = "✓";


            step2.classList.add("active");

            message.textContent =
                "NOVA is checking your request...";

        }, 1800);


        /* =========================
           STEP 2 COMPLETE
        ========================= */

        setTimeout(function () {

            step2.classList.remove("active");

            step2.classList.add("complete");

            step2.querySelector(".icon")
                .textContent = "✓";


            step3.classList.add("active");

            message.textContent =
                "Your grievance is being processed by NOVA...";

        }, 3200);


        /* =========================
           FINAL
        ========================= */

        setTimeout(function () {

            step3.classList.remove("active");

            step3.classList.add("complete");

            step3.querySelector(".icon")
                .textContent = "✓";


            message.textContent =
                "Your request has been successfully received by NOVA.";


            homeButton.classList.add("ready");

        }, 5000);


        /* =========================
           GO TO HOME
        ========================= */

        homeButton.addEventListener(
            "click",
            function () {

                window.location.href =
                    "index.html";

            }
        );

    }
);