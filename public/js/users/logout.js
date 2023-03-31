async function logout() {
  try {
    const response = await fetch("/api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Logout failed.");
    }
  } catch (error) {
    alert(error);
  }
  window.location.replace("/");
}
