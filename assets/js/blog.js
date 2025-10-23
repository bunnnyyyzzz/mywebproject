// === Password & Automatic Blog Post Listing ===
const correctPassword = "bunny123"; // CHANGE this to your preferred password
const postsList = document.getElementById("posts-list");
const loginSection = document.getElementById("login-section");
const loginError = document.getElementById("login-error");

function checkPassword() {
  const entered = document.getElementById("blog-password").value;
  if (entered === correctPassword) {
    loginSection.style.display = "none";
    postsList.style.display = "block";
    loadPosts();
  } else {
    loginError.textContent = "Incorrect password. Try again!";
  }
}

// Load posts from posts.json and display
async function loadPosts() {
  try {
    const response = await fetch('posts.json');
    const posts = await response.json();
    postsList.innerHTML = "";

    // Sort newest first
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Display each post
    posts.forEach(post => {
      const li = document.createElement("li");
      li.style.marginBottom = "15px";
      li.innerHTML = `
        <a href="${post.file}" style="color:#2b2030; text-decoration:none; font-weight:bold;">
          ${post.title}
        </a>
        <span style="color:#6e6170; font-size:0.9em;"> — ${post.date}</span>
      `;
      postsList.appendChild(li);
    });
  } catch (err) {
    postsList.innerHTML = "<li style='color:red;'>Error loading posts.</li>";
    console.error(err);
  }
}
