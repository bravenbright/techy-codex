async function createPost() {
  const name = document.getElementById("post-name-input").value;
  const content = document.getElementById("post-content-input").value;
  try {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        content: content,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create post.");
    } else {
      const data = await response.json();
      window.location.replace("/post?id=" + data.post_id);
    }
  } catch (error) {
    alert(error);
  }
}
