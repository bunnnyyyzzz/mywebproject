// CONFIG - replace these with your own GitHub repo info
const owner = "YOUR_GITHUB_USERNAME";
const repo = "YOUR_REPO_NAME";
const branch = "main";
const token = "YOUR_PERSONAL_ACCESS_TOKEN"; // Never expose in public production

async function submitPost() {
  const title = document.getElementById("title").value.trim();
  const date = document.getElementById("date").value;
  const content = document.getElementById("content").value.trim();
  const status = document.getElementById("status");

  if (!title || !date || !content) {
    status.textContent = "Please fill all fields.";
    return;
  }

  const slug = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
  const filename = `posts/${slug}.html`;

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

  try {
    // Create new post HTML
    await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filename}`, {
      method: "PUT",
      headers: {
        "Authorization": `token ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: `Add new post: ${title}`,
        content: btoa(htmlContent),
        branch: branch
      })
    });

    // Fetch posts.json
    const postsRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/posts.json`, {
      headers: { "Authorization": `token ${token}` }
    });
    const postsData = await postsRes.json();
    const postsJson = JSON.parse(atob(postsData.content));

    // Add new post entry
    postsJson.push({ title, file: filename, date });

    // Update posts.json
    await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/posts.json`, {
      method: "PUT",
      headers: { "Authorization": `token ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `Update posts.json with new post: ${title}`,
        content: btoa(JSON.stringify(postsJson, null, 2)),
        sha: postsData.sha,
        branch: branch
      })
    });

    status.textContent = "Post published successfully!";
  } catch (err) {
    console.error(err);
    status.textContent = "Error publishing post. Check console.";
  }
}
