/* =========================================
       BASIC CHAT STATE
    ========================================= */

    let conversation = [];

    let conversationId =
        localStorage.getItem(
            "unsaid_conversation_id"
        );


    let recognition = null;

    let isListening = false;

    let isSpeaking = false;


    const form =
        document.getElementById(
            "chatForm"
        );


    const input =
        document.getElementById(
            "messageInput"
        );


    const chatWindow =
        document.getElementById(
            "chatWindow"
        );


    const sendButton =
        document.getElementById(
            "sendButton"
        );


    const voiceButton =
        document.getElementById(
            "voiceButton"
        );


    const conversationList =
        document.getElementById(
            "conversationList"
        );


    const newConversationButton =
        document.getElementById(
            "newConversationButton"
        );


    const callButton =
        document.getElementById(
            "callButton"
        );


    const callScreen =
        document.getElementById(
            "callScreen"
        );


    const callBackButton =
        document.getElementById(
            "callBackButton"
        );


    const endCallButton =
        document.getElementById(
            "endCallButton"
        );


    const muteButton =
        document.getElementById(
            "muteButton"
        );


    const callStatus =
        document.getElementById(
            "callStatus"
        );


    const callTimer =
        document.getElementById(
            "callTimer"
        );

        const mobileMenuButton =
    document.getElementById(
        "mobileMenuButton"
    );


const mobileSidebarOverlay =
    document.getElementById(
        "mobileSidebarOverlay"
    );


const conversationSidebar =
    document.querySelector(
        ".conversation-sidebar"
    );


    const csrfToken =
        document
            .querySelector(
                'meta[name="csrf-token"]'
            )
            .getAttribute("content");


    /* =========================================
       CALL STATE
    ========================================= */

    let callActive = false;

    let callMuted = false;

    let callSeconds = 0;

    let callTimerInterval = null;


    /* =========================================
       VOICE STATE
    ========================================= */

    let silenceTimer = null;

    let speechDetected = false;


    /* =========================================
       WELCOME MESSAGE
    ========================================= */

    function showWelcomeMessage() {

        chatWindow.innerHTML = `

            <div class="message ai">

                <div class="bubble">

                    I'm here. You can tell me what's going on.
                    No need to make it sound a certain way.

                </div>

            </div>

        `;

    }


    /* =========================================
       ADD MESSAGE
    ========================================= */

    function addMessage(message, type) {

        const messageContainer =
            document.createElement(
                "div"
            );


        messageContainer.className =
            `message ${type}`;


        const bubble =
            document.createElement(
                "div"
            );


        bubble.className =
            "bubble";


        bubble.textContent =
            message;


        messageContainer.appendChild(
            bubble
        );


        chatWindow.appendChild(
            messageContainer
        );


        chatWindow.scrollTop =
            chatWindow.scrollHeight;


        return messageContainer;

    }


    /* =========================================
       LOADING MESSAGE
    ========================================= */

    function addLoadingMessage() {

        const loadingContainer =
            document.createElement(
                "div"
            );


        loadingContainer.className =
            "message ai loading";


        loadingContainer.id =
            "loadingMessage";


        const bubble =
            document.createElement(
                "div"
            );


        bubble.className =
            "bubble";


        bubble.textContent =
            "I'm listening...";


        loadingContainer.appendChild(
            bubble
        );


        chatWindow.appendChild(
            loadingContainer
        );


        chatWindow.scrollTop =
            chatWindow.scrollHeight;

    }


    function removeLoadingMessage() {

        const loadingMessage =
            document.getElementById(
                "loadingMessage"
            );


        if (loadingMessage) {

            loadingMessage.remove();

        }

    }


    /* =========================================
       LOAD CONVERSATION LIST
    ========================================= */

    async function loadConversationList() {

        try {

            const response =
                await fetch(
                    window.unsaidConfig.conversationsUrl
                );


            if (!response.ok) {

                throw new Error(
                    "Could not load conversations."
                );

            }


            const conversations =
                await response.json();


            conversationList.innerHTML =
                "";


            if (
                conversations.length === 0
            ) {

                const emptyMessage =
                    document.createElement(
                        "p"
                    );


                emptyMessage.textContent =
                    "No conversations yet.";


                emptyMessage.style.color =
                    "var(--muted)";


                emptyMessage.style.fontSize =
                    "12px";


                emptyMessage.style.padding =
                    "10px 5px";


                conversationList.appendChild(
                    emptyMessage
                );


                return;

            }


            conversations.forEach(
                function(item) {


                    const conversationItem =
                        document.createElement(
                            "div"
                        );


                    conversationItem.className =
                        "conversation-item";


                    if (
                        String(item.id) ===
                        String(conversationId)
                    ) {

                        conversationItem.classList.add(
                            "active"
                        );

                    }


                    /* Conversation button */

                    const conversationContent =
                        document.createElement(
                            "button"
                        );


                    conversationContent.type =
                        "button";


                    conversationContent.className =
                        "conversation-content";


                    const title =
                        document.createElement(
                            "span"
                        );


                    title.className =
                        "conversation-title";


                    title.textContent =
                        item.title ||
                        "New Conversation";


                    const time =
                        document.createElement(
                            "span"
                        );


                    time.className =
                        "conversation-time";


                    time.textContent =
                        item.updated_at;


                    conversationContent.appendChild(
                        title
                    );


                    conversationContent.appendChild(
                        time
                    );


                    /* Delete button */

                    const deleteButton =
                        document.createElement(
                            "button"
                        );


                    deleteButton.type =
                        "button";


                    deleteButton.className =
                        "delete-conversation";


                    deleteButton.textContent =
                        "×";


                    deleteButton.setAttribute(
                        "aria-label",
                        "Delete conversation"
                    );


                    /* Open conversation */

                    conversationContent.addEventListener(
                        "click",
                        function() {

                            conversationId =
                                item.id;


                            localStorage.setItem(
                                "unsaid_conversation_id",
                                conversationId
                            );


                            loadConversation();

                        }
                    );


                    /* Delete conversation */

                    deleteButton.addEventListener(
                        "click",
                        async function(event) {

                            event.stopPropagation();


                            const confirmed =
                                confirm(
                                    "Delete this conversation?"
                                );


                            if (!confirmed) {

                                return;

                            }


                            try {

                                const response =
                                    await fetch(
                                        `${window.unsaidConfig.conversationsUrl}/${item.id}`,
                                        {
                                            method:
                                                "DELETE",

                                            headers: {

                                                "Accept":
                                                    "application/json",

                                                "X-CSRF-TOKEN":
                                                    csrfToken

                                            }

                                        }
                                    );


                                const data =
                                    await response.json();


                                if (!response.ok) {

                                    throw new Error(
                                        data.error ||
                                        "Could not delete conversation."
                                    );

                                }


                                if (
                                    String(item.id) ===
                                    String(conversationId)
                                ) {

                                    conversationId =
                                        null;


                                    conversation =
                                        [];


                                    localStorage.removeItem(
                                        "unsaid_conversation_id"
                                    );


                                    showWelcomeMessage();

                                }


                                loadConversationList();


                            } catch (error) {

                                console.error(
                                    "Could not delete conversation:",
                                    error
                                );


                                alert(
                                    "Could not delete conversation."
                                );

                            }

                        }
                    );


                    conversationItem.appendChild(
                        conversationContent
                    );


                    conversationItem.appendChild(
                        deleteButton
                    );


                    conversationList.appendChild(
                        conversationItem
                    );

                }
            );


        } catch (error) {

            console.error(
                "Could not load conversation list:",
                error
            );

        }

    }


    /* =========================================
       LOAD ONE CONVERSATION
    ========================================= */

    async function loadConversation() {

        if (!conversationId) {

            conversation = [];

            showWelcomeMessage();

            return;

        }


        try {

            const response =
                await fetch(
                    `${window.unsaidConfig.chatUrl}/${conversationId}`
                );


            if (!response.ok) {

                throw new Error(
                    "Could not load conversation."
                );

            }


            const data =
                await response.json();


            conversationId =
                data.conversation_id;


            conversation = [];


            chatWindow.innerHTML =
                "";


            data.messages.forEach(
                function(message) {

                    conversation.push({
                        role:
                            message.role,

                        content:
                            message.content
                    });


                    addMessage(
                        message.content,

                        message.role === "user"
                            ? "user"
                            : "ai"
                    );

                }
            );


            localStorage.setItem(
                "unsaid_conversation_id",
                conversationId
            );


            loadConversationList();


        } catch (error) {

            console.error(
                "Could not load conversation:",
                error
            );

        }

    }


    /* =========================================
       NEW CONVERSATION
    ========================================= */

    newConversationButton.addEventListener(
        "click",
        function() {

            stopSpeaking();


            if (
                recognition &&
                isListening
            ) {

                recognition.stop();

            }


            conversation = [];


            conversationId = null;


            localStorage.removeItem(
                "unsaid_conversation_id"
            );


            input.value = "";


            chatWindow.innerHTML =
                "";


            showWelcomeMessage();


            loadConversationList();


            input.focus();

        }
    );


    /* =========================================
       TEXT CHAT
    ========================================= */

    form.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const message =
                input.value.trim();


            if (!message) {

                return;

            }


            addMessage(
                message,
                "user"
            );


            input.value =
                "";


            sendButton.disabled =
                true;


            addLoadingMessage();


            conversation.push({

                role:
                    "user",

                content:
                    message

            });


            try {

                const response =
                    await fetch(
                        window.unsaidConfig.chatMessageUrl,
                        {

                            method:
                                "POST",

                            headers: {

                                "Content-Type":
                                    "application/json",

                                "Accept":
                                    "application/json",

                                "X-CSRF-TOKEN":
                                    csrfToken

                            },

                            body:
                                JSON.stringify({

                                    conversation:
                                        conversation,

                                    conversation_id:
                                        conversationId

                                })

                        }
                    );


                const data =
                    await response.json();


                if (
                    data.conversation_id
                ) {

                    conversationId =
                        data.conversation_id;


                    localStorage.setItem(
                        "unsaid_conversation_id",
                        conversationId
                    );

                }


                removeLoadingMessage();


                if (!response.ok) {

                    throw new Error(
                        data.error ||
                        data.message ||
                        "Something went wrong."
                    );

                }


                addMessage(
                    data.reply,
                    "ai"
                );


                conversation.push({

                    role:
                        "assistant",

                    content:
                        data.reply

                });


                /*
                 * In Call Mode:
                 * Unsaid speaks and then listens again.
                 *
                 * In normal mode:
                 * Unsaid simply speaks.
                 */

                speakResponse(
                    data.reply
                );


                loadConversationList();


            } catch (error) {

                removeLoadingMessage();


                addMessage(
                    "Error: " + error.message,
                    "ai"
                );


                console.error(
                    error
                );

            } finally {

                sendButton.disabled =
                    false;


                input.focus();

            }

        }
    );


    /* =========================================
       TEXT TO SPEECH
    ========================================= */

    function speakResponse(text) {

        if (
            !("speechSynthesis" in window)
        ) {

            console.warn(
                "Speech synthesis is not supported."
            );

            return;

        }


        window.speechSynthesis.cancel();


        const speech =
            new SpeechSynthesisUtterance(
                text
            );


        speech.lang =
            "en-US";


        speech.rate =
            0.95;


        speech.pitch =
            1;


        speech.onstart =
            function() {

                isSpeaking =
                    true;


                voiceButton.classList.add(
                    "speaking"
                );


                voiceButton.textContent =
                    "■";


                voiceButton.setAttribute(
                    "aria-label",
                    "Stop speaking"
                );


                /*
                 * Call Mode is now speaking.
                 */

                if (callActive) {

                    callScreen.classList.remove(
                        "listening"
                    );


                    callScreen.classList.add(
                        "speaking"
                    );


                    callStatus.textContent =
                        "Unsaid is speaking...";

                }

            };


        speech.onend =
            function() {

                isSpeaking =
                    false;


                voiceButton.classList.remove(
                    "speaking"
                );


                voiceButton.textContent =
                    "♫";


                voiceButton.setAttribute(
                    "aria-label",
                    "Voice mode"
                );


                /*
                 * Call Mode automatically
                 * returns to listening.
                 */

                if (
                    callActive &&
                    !callMuted
                ) {

                    callScreen.classList.remove(
                        "speaking"
                    );


                    callStatus.textContent =
                        "Listening...";


                    setTimeout(
                        function() {

                            if (
                                callActive &&
                                !callMuted &&
                                !isListening
                            ) {

                                startCallListening();

                            }

                        },
                        400
                    );

                }

            };


        speech.onerror =
            function(event) {

                console.error(
                    "Speech synthesis error:",
                    event
                );


                isSpeaking =
                    false;


                voiceButton.classList.remove(
                    "speaking"
                );


                voiceButton.textContent =
                    "♫";


                voiceButton.setAttribute(
                    "aria-label",
                    "Voice mode"
                );


                if (callActive) {

                    callScreen.classList.remove(
                        "speaking"
                    );


                    if (!callMuted) {

                        callStatus.textContent =
                            "Listening...";


                        startCallListening();

                    }

                }

            };


        window.speechSynthesis.speak(
            speech
        );

    }


    /* =========================================
       STOP AI SPEAKING
    ========================================= */

    function stopSpeaking() {

        if (
            !("speechSynthesis" in window)
        ) {

            return;

        }


        window.speechSynthesis.cancel();


        isSpeaking =
            false;


        voiceButton.classList.remove(
            "speaking"
        );


        voiceButton.textContent =
            "♫";


        voiceButton.setAttribute(
            "aria-label",
            "Voice mode"
        );


        if (callActive) {

            callScreen.classList.remove(
                "speaking"
            );

        }

    }


    /* =========================================
       VOICE INPUT
    ========================================= */

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (SpeechRecognition) {

        recognition =
            new SpeechRecognition();


        recognition.lang =
            "en-US";


        recognition.continuous =
            true;


        recognition.interimResults =
            true;


        /* -----------------------------------------
           NORMAL VOICE BUTTON
        ----------------------------------------- */

        voiceButton.addEventListener(
            "click",
            function() {

                if (isSpeaking) {

                    stopSpeaking();

                    return;

                }


                if (isListening) {

                    return;

                }


                try {

                    clearTimeout(
                        silenceTimer
                    );


                    speechDetected =
                        false;


                    recognition.start();

                } catch (error) {

                    console.error(
                        "Could not start recognition:",
                        error
                    );

                }

            }
        );


        /* -----------------------------------------
           RECOGNITION START
        ----------------------------------------- */

        recognition.onstart =
            function() {

                console.log(
                    "🎤 Unsaid is listening..."
                );


                isListening =
                    true;


                speechDetected =
                    false;


                voiceButton.classList.add(
                    "listening"
                );


                voiceButton.textContent =
                    "●";


                voiceButton.setAttribute(
                    "aria-label",
                    "Listening"
                );


                if (callActive) {

                    callScreen.classList.remove(
                        "speaking"
                    );


                    callScreen.classList.add(
                        "listening"
                    );


                    callStatus.textContent =
                        "Listening...";

                }

            };


        /* -----------------------------------------
           RECOGNITION RESULT
        ----------------------------------------- */

        recognition.onresult =
            function(event) {

                let transcript =
                    "";


                for (
                    let i =
                        event.resultIndex;

                    i <
                        event.results.length;

                    i++
                ) {

                    transcript +=
                        event.results[i][0]
                            .transcript;

                }


                if (
                    transcript.trim()
                ) {

                    speechDetected =
                        true;


                    input.value =
                        transcript;

                }


                console.log(
                    "🗣️ Unsaid heard:",
                    transcript
                );


                clearTimeout(
                    silenceTimer
                );


                if (
                    speechDetected
                ) {

                    silenceTimer =
                        setTimeout(
                            function() {

                                console.log(
                                    "🤫 Silence detected. Finishing message..."
                                );


                                if (
                                    isListening
                                ) {

                                    recognition.stop();

                                }

                            },
                            3000
                        );

                }

            };


        /* -----------------------------------------
           RECOGNITION ERROR
        ----------------------------------------- */

        recognition.onerror =
            function(event) {

                console.error(
                    "❌ Speech recognition error:",
                    event.error
                );


                clearTimeout(
                    silenceTimer
                );


                isListening =
                    false;


                voiceButton.classList.remove(
                    "listening"
                );


                voiceButton.textContent =
                    "♫";


                voiceButton.setAttribute(
                    "aria-label",
                    "Voice mode"
                );


                if (callActive) {

                    callScreen.classList.remove(
                        "listening"
                    );


                    if (
                        event.error ===
                        "not-allowed"
                    ) {

                        callStatus.textContent =
                            "Microphone permission required.";

                    }

                }

            };


        /* -----------------------------------------
           RECOGNITION END
        ----------------------------------------- */

        recognition.onend =
            function() {

                console.log(
                    "🛑 Unsaid stopped listening."
                );


                clearTimeout(
                    silenceTimer
                );


                isListening =
                    false;


                voiceButton.classList.remove(
                    "listening"
                );


                voiceButton.textContent =
                    "♫";


                voiceButton.setAttribute(
                    "aria-label",
                    "Voice mode"
                );


                if (callActive) {

                    callScreen.classList.remove(
                        "listening"
                    );

                }


                /*
                 * If speech was detected,
                 * send it to Unsaid.
                 */

                if (
                    speechDetected &&
                    input.value.trim()
                ) {

                    speechDetected =
                        false;


                    form.requestSubmit();

                }

            };


    } else {

        voiceButton.addEventListener(
            "click",
            function() {

                alert(
                    "Voice input isn't supported by this browser."
                );

            }
        );

    }


    /* =========================================
       CALL MODE
    ========================================= */

    function startCall() {

        if (callActive) {

            return;

        }


        callActive =
            true;


        callMuted =
            false;


        callSeconds =
            0;


        callScreen.style.display =
            "flex";


        callStatus.textContent =
            "Listening...";


        callTimer.textContent =
            "00:00";


        muteButton.classList.remove(
            "muted"
        );


        muteButton.textContent =
            "🎤";


        startCallTimer();


        startCallListening();

    }


    function endCall() {

        callActive =
            false;


        clearInterval(
            callTimerInterval
        );


        clearTimeout(
            silenceTimer
        );


        if (
            recognition &&
            isListening
        ) {

            recognition.stop();

        }


        stopSpeaking();


        callScreen.classList.remove(
            "listening"
        );


        callScreen.classList.remove(
            "speaking"
        );


        callScreen.style.display =
            "none";


        callStatus.textContent =
            "Ready to listen";


        callTimer.textContent =
            "00:00";


        callSeconds =
            0;


        callMuted =
            false;


        muteButton.classList.remove(
            "muted"
        );


        muteButton.textContent =
            "🎤";

    }


    /* =========================================
       CALL TIMER
    ========================================= */

    function startCallTimer() {

        clearInterval(
            callTimerInterval
        );


        callTimerInterval =
            setInterval(
                function() {

                    if (!callActive) {

                        return;

                    }


                    callSeconds++;


                    const minutes =
                        Math.floor(
                            callSeconds / 60
                        );


                    const seconds =
                        callSeconds % 60;


                    callTimer.textContent =
                        String(minutes)
                            .padStart(2, "0")
                        +
                        ":"
                        +
                        String(seconds)
                            .padStart(2, "0");

                },
                1000
            );

    }


    /* =========================================
       START CALL LISTENING
    ========================================= */

    function startCallListening() {

        if (!SpeechRecognition) {

            callStatus.textContent =
                "Voice input isn't supported.";

            return;

        }


        if (
            !callActive ||
            callMuted ||
            isListening ||
            isSpeaking
        ) {

            return;

        }


        try {

            speechDetected =
                false;


            clearTimeout(
                silenceTimer
            );


            recognition.start();

        } catch (error) {

            console.error(
                "Could not start Call Mode:",
                error
            );

        }

    }


    /* =========================================
       CALL BUTTON
    ========================================= */

    callButton.addEventListener(
        "click",
        function() {

            startCall();

        }
    );


    /* =========================================
       CLOSE CALL
    ========================================= */

    callBackButton.addEventListener(
        "click",
        function() {

            endCall();

        }
    );


    endCallButton.addEventListener(
        "click",
        function() {

            endCall();

        }
    );


    /* =========================================
       MUTE
    ========================================= */

    muteButton.addEventListener(
        "click",
        function() {

            callMuted =
                !callMuted;


            if (callMuted) {

                muteButton.classList.add(
                    "muted"
                );


                muteButton.textContent =
                    "🔇";


                callStatus.textContent =
                    "Muted";


                callScreen.classList.remove(
                    "listening"
                );


                clearTimeout(
                    silenceTimer
                );


                if (
                    recognition &&
                    isListening
                ) {

                    recognition.stop();

                }

            } else {

                muteButton.classList.remove(
                    "muted"
                );


                muteButton.textContent =
                    "🎤";


                callStatus.textContent =
                    "Listening...";


                startCallListening();

            }

        }
    );

    /* =========================================
   MOBILE SIDEBAR
========================================= */

function openMobileSidebar() {

    conversationSidebar.classList.add(
        "open"
    );

    mobileSidebarOverlay.classList.add(
        "show"
    );

}


function closeMobileSidebar() {

    conversationSidebar.classList.remove(
        "open"
    );

    mobileSidebarOverlay.classList.remove(
        "show"
    );

}


mobileMenuButton.addEventListener(
    "click",
    function() {

        openMobileSidebar();

    }
);


mobileSidebarOverlay.addEventListener(
    "click",
    function() {

        closeMobileSidebar();

    }
);


    /* =========================================
       STARTUP
    ========================================= */

    loadConversation();

    loadConversationList();
