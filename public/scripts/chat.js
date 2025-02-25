// ✅ Only define firebaseConfig ONCE to prevent "already declared" errors
if (!window.firebaseConfig) {
    window.firebaseConfig = {
        apiKey: "AIzaSyAiDhTmDJGHqJZm9NjegDNeEyRS4T1JVt0",
        authDomain: "trydylma.firebaseapp.com",
        databaseURL: "https://trydylma-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "trydylma",
        storageBucket: "trydylma.firebasestorage.app",
        messagingSenderId: "1061323020109",
        appId: "1:1061323020109:web:29d165044fb5e4b61d0904",
        measurementId: "G-ZB053SPK2M"
    };

    firebase.initializeApp(window.firebaseConfig);
}

// ✅ Get Firebase Database Reference
const db = firebase.database();
const chatRef = db.ref("messages");

// ✅ Function to Send Messages
function sendMessage() {
    const messageInput = document.getElementById("message");
    const messageText = messageInput.value.trim();

    if (messageText !== "") {
        chatRef.push({ text: messageText });
        messageInput.value = ""; // Clear input field
    }
}

// ✅ Function to Display Messages
chatRef.on("child_added", (snapshot) => {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.textContent = snapshot.val().text;
    messageDiv.classList.add("chat-message");
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
});

// ✅ Event Listener for Send Button
document.getElementById("send-btn").addEventListener("click", sendMessage);

// ✅ Allow pressing "Enter" to send message
document.getElementById("message").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});
