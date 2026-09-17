// ========================================
// NOVA SIGNAL - CONVERSATION SYSTEM
// ========================================


// ========================================
// GET ELEMENTS
// ========================================

const nameInput =
    document.getElementById("nameInput");

const sendButton =
    document.getElementById("sendName");

const conversation =
    document.querySelector(".conversation");


// ========================================
// STORE USER INFORMATION
// ========================================

let userData = {

    name: "",
    age: "",
    location: "",
    email: ""

};


// ========================================
// CURRENT QUESTION
// ========================================

let currentStep = "name";


// ========================================
// SEND MESSAGE
// ========================================

function sendMessage() {

    const answer =
        nameInput.value.trim();


    // Don't allow empty messages

    if (answer === "") {

        nameInput.focus();

        return;

    }


    // Add user's answer to chat

    addUserMessage(answer);


    // Clear input

    nameInput.value = "";


    // ========================================
    // NAME
    // ========================================

    if (currentStep === "name") {

        userData.name = answer;

        currentStep = "age";


        setTimeout(() => {

            addNovaMessage(
                `Nice to meet you, ${userData.name}! ✨`,
                "How old are you?"
            );

        }, 700);

    }


    // ========================================
    // AGE
    // ========================================

    else if (currentStep === "age") {

        userData.age = answer;

        currentStep = "location";


        setTimeout(() => {

            addNovaMessage(
                "Got it! 👍",
                "Where are you from?"
            );

        }, 700);

    }


    // ========================================
    // LOCATION
    // ========================================

    else if (currentStep === "location") {

        userData.location = answer;

        currentStep = "email";


        setTimeout(() => {

            addNovaMessage(
                "Perfect! 📡",
                "What's your email address?"
            );

        }, 700);

    }


    // ========================================
    // EMAIL
    // ========================================

    else if (currentStep === "email") {

        // Check email format

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(answer)) {

            setTimeout(() => {

                addNovaMessage(
                    "Hmm... that doesn't look like a valid email.",
                    "Please enter your email address again."
                );

            }, 500);

            return;

        }


        // Save email

        userData.email = answer;


        // ========================================
        // SAVE ALL USER INFORMATION
        // ========================================

        sessionStorage.setItem(
            "novaName",
            userData.name
        );

        sessionStorage.setItem(
            "novaAge",
            userData.age
        );

        sessionStorage.setItem(
            "novaLocation",
            userData.location
        );

        sessionStorage.setItem(
            "novaEmail",
            userData.email
        );


        currentStep = "complete";


        // ========================================
        // FINAL NOVA MESSAGE
        // ========================================

        setTimeout(() => {

            addNovaMessage(
                "Thank you. I've got everything I need. ✨",
                `Alright, ${userData.name}...`
            );


            setTimeout(() => {

                addNovaMessage(
                    "I'm listening.",
                    "Taking you to a secure channel..."
                );


                // ========================================
                // REDIRECT TO SHIELD PAGE
                // ========================================

                setTimeout(() => {

                    window.location.href =
                        "help.html";

                }, 1500);


            }, 900);


        }, 700);

    }


    // ========================================
    // CONVERSATION COMPLETE
    // ========================================

    else {

        console.log(
            "Conversation completed."
        );

    }

}


// ========================================
// ADD USER MESSAGE
// ========================================

function addUserMessage(message) {

    const userMessage =
        document.createElement("div");


    userMessage.classList.add(
        "message",
        "user-message"
    );


    userMessage.innerHTML = `
        <div class="message-name">
            YOU
        </div>

        <div class="message-text">
            <p>${message}</p>
        </div>
    `;


    conversation.insertBefore(
        userMessage,
        document.querySelector(
            ".user-input-area"
        )
    );


    // Scroll to latest message

    scrollToBottom();

}


// ========================================
// ADD NOVA MESSAGE
// ========================================

function addNovaMessage(
    firstText,
    secondText
) {

    const novaMessage =
        document.createElement("div");


    novaMessage.classList.add(
        "message",
        "nova-message"
    );


    novaMessage.innerHTML = `
        <div class="message-name">
            NOVA
        </div>

        <div class="message-text">

            <p>
                ${firstText}
            </p>

            <p class="big-question">
                ${secondText}
            </p>

        </div>
    `;


    conversation.insertBefore(
        novaMessage,
        document.querySelector(
            ".user-input-area"
        )
    );


    scrollToBottom();

}


// ========================================
// SCROLL CHAT TO BOTTOM
// ========================================

function scrollToBottom() {

    setTimeout(() => {

        conversation.scrollTop =
            conversation.scrollHeight;

    }, 100);

}


// ========================================
// BUTTON CLICK
// ========================================

sendButton.addEventListener(
    "click",
    sendMessage
);


// ========================================
// ENTER KEY
// ========================================

nameInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            sendMessage();

        }

    }
);