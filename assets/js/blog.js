// Automatically load blog posts
const postsList = document.getElementById("posts-list");

async function loadPosts() {
  try {
    const response = await fetch('posts.json');
    const posts = await response.json();
    postsList.innerHTML = "";

    // Sort newest first
    posts.sort((a,b) => new Date(b.date) - new Date(a.date));

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
  } catch(err) {
    postsList.innerHTML = "<li style='color:red;'>Error loading posts.</li>";
    console.error(err);
  }
}

window.addEventListener('DOMContentLoaded', loadPosts);
