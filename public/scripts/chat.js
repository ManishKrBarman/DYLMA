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
const usersRef = db.ref("users");
let currentUserId = null;
let currentUsername = null;
let selectedUserId = null; // For private chat

// ✅ Show Name Input Modal
document.getElementById("name-modal").style.display = "block";

document.getElementById("save-username").addEventListener("click", () => {
    const nameInput = document.getElementById("username-input").value.trim();

    if (nameInput !== "") {
        startChat(nameInput);
    }
});

function startChat(username) {
    firebase.auth().signInAnonymously()
        .then((userCredential) => {
            currentUserId = userCredential.user.uid;
            currentUsername = username;

            // Save user to DB
            usersRef.child(currentUserId).set({
                username: currentUsername,
                status: "online"
            });

            // Hide name modal
            document.getElementById("name-modal").style.display = "none";

            // Remove user when they leave
            window.addEventListener("beforeunload", () => {
                usersRef.child(currentUserId).remove();
            });

            console.log("Logged in as:", currentUsername);
            loadUsers();
            loadMessages();
        })
        .catch((error) => console.error("Auth Error:", error));
}

// ✅ Update Online Users List
function loadUsers() {
    usersRef.on("value", (snapshot) => {
        const usersList = document.getElementById("users-list");
        usersList.innerHTML = ""; // Clear list

        snapshot.forEach((childSnapshot) => {
            const userData = childSnapshot.val();
            const userId = childSnapshot.key;

            if (userId !== currentUserId) { // Don't show self
                const li = document.createElement("li");
                li.textContent = userData.username;
                li.dataset.userid = userId;
                li.addEventListener("click", () => startPrivateChat(userId, userData.username));
                usersList.appendChild(li);
            }
        });
    });
}

// ✅ Function to Start Private Chat
function startPrivateChat(userId, username) {
    selectedUserId = userId;
    document.getElementById("chat-title").textContent = `💌 Chat with ${username}`;
    document.getElementById("back-to-public").style.display = "block";

    loadMessages(); // Load private chat messages
}

// ✅ Function to Load Messages (Public or Private)
function loadMessages() {
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML = ""; // Clear chat

    let ref;
    if (selectedUserId) {
        const chatId = [currentUserId, selectedUserId].sort().join("_");
        ref = db.ref(`chats/${chatId}/messages`);
    } else {
        ref = db.ref("messages");
    }

    ref.off("child_added"); // Remove previous listeners
    ref.on("child_added", (snapshot) => {
        const data = snapshot.val();
        const messageDiv = document.createElement("div");
        messageDiv.textContent = `${data.username}: ${data.text}`;
        messageDiv.classList.add("chat-message");
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    });
}

// ✅ Function to Send Messages
function sendMessage() {
    const messageInput = document.getElementById("message");
    const messageText = messageInput.value.trim();

    if (messageText !== "") {
        let ref;
        if (selectedUserId) {
            const chatId = [currentUserId, selectedUserId].sort().join("_");
            ref = db.ref(`chats/${chatId}/messages`);
        } else {
            ref = db.ref("messages");
        }

        ref.push({ username: currentUsername, text: messageText });
        messageInput.value = ""; // Clear input field
    }
}

// ✅ Go Back to Public Chat
document.getElementById("back-to-public").addEventListener("click", () => {
    selectedUserId = null;
    document.getElementById("chat-title").textContent = "💬 Love Chat 💖";
    document.getElementById("back-to-public").style.display = "none";
    loadMessages(); // Load public messages
});

// ✅ Event Listener for Send Button
document.getElementById("send-btn").addEventListener("click", sendMessage);

// ✅ Allow pressing "Enter" to send message
document.getElementById("message").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});
