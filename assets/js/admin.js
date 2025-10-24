function publishPost() {
  const title = document.getElementById("title").value.trim();
  const date = document.getElementById("date").value;
  const content = document.getElementById("content").value.trim();
  const status = document.getElementById("status");

  if (!title || !date || !content) {
    status.textContent = "Please fill in all fields.";
    return;
  }

  // Generate slug
  const slug = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
  const filename = `posts/${slug}.html`;

  // Create post HTML content
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} | Bunny’s Fantasy Blog</title>
<link rel="stylesheet" href="../assets/css/style.css">
</head>
<body class="soft-bg">
<header class="topbar">
  <div class="brand">Bunny’s Fantasy Blog</div>
  <nav class="nav">
    <a href="../index.html">Home</a>
    <a href="../about.html">About Me</a>
    <a href="../Blog.html">Blog</a>
    <a href="../contact.html">Contact</a>
  </nav>
</header>
<main class="container post-page">
  <article class="post">
    <h1 class="post-title">${title}</h1>
    <p class="post-meta">${date}</p>
    <p>${content.replace(/\n/g,"</p><p>")}</p>
  </article>
</main>
<footer class="site-footer" style="margin-top:50px; text-align:center; color:#6e6170;">
<p>© 2025 Bunny’s Fantasy Blog | Written with heart and moonlight</p>
</footer>
</body>
</html>
`;

  // Download new post HTML
  const blob = new Blob([htmlContent], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();

  // Load existing posts from localStorage
  let postsJson = [];
  if (localStorage.getItem("posts")) {
    postsJson = JSON.parse(localStorage.getItem("posts"));
  }

  // Append new post
  postsJson.push({ title, file: filename, date });
  localStorage.setItem("posts", JSON.stringify(postsJson));

  // Download updated posts.json
  const postsBlob = new Blob([JSON.stringify(postsJson, null, 2)], { type: "application/json" });
  const postsLink = document.createElement("a");
  postsLink.href = URL.createObjectURL(postsBlob);
  postsLink.download = "posts.json";
  postsLink.click();

  status.textContent = `Post "${title}" generated! Old posts are preserved. Download HTML and posts.json and upload to your site.`;
}
