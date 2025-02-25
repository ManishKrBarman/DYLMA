// ✅ Firebase Config (Same as before)
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

// ✅ References
const db = firebase.database();
const chatRef = db.ref("messages");
const usersRef = db.ref("users");

// ✅ Authenticate User (Anonymous)
firebase.auth().signInAnonymously()
    .then((userCredential) => {
        const userId = userCredential.user.uid;
        const username = "User-" + userId.substring(0, 5); // Generate a short username

        // Save user to DB
        usersRef.child(userId).set({
            username: username,
            status: "online"
        });

        // Remove user when they leave
        window.addEventListener("beforeunload", () => {
            usersRef.child(userId).remove();
        });

        console.log("Logged in as:", username);
    })
    .catch((error) => console.error("Auth Error:", error));

// ✅ Update Online Users List
usersRef.on("value", (snapshot) => {
    const usersList = document.getElementById("users-list");
    usersList.innerHTML = ""; // Clear list

    snapshot.forEach((childSnapshot) => {
        const userData = childSnapshot.val();
        const li = document.createElement("li");
        li.textContent = userData.username;
        usersList.appendChild(li);
    });
});

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
