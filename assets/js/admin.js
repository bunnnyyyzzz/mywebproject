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

  // Save post locally (simulate download)
  const blob = new Blob([htmlContent], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();

  // Update posts.json locally (simulate download)
  const postsJson = localStorage.getItem("posts") ? JSON.parse(localStorage.getItem("posts")) : [];
  postsJson.push({ title, file: filename, date });
  localStorage.setItem("posts", JSON.stringify(postsJson));

  const postsBlob = new Blob([JSON.stringify(postsJson, null, 2)], { type: "application/json" });
  const postsLink = document.createElement("a");
  postsLink.href = URL.createObjectURL(postsBlob);
  postsLink.download = "posts.json";
  postsLink.click();

  status.textContent = `Post "${title}" generated! Download HTML and posts.json and upload to your site.`;
}
