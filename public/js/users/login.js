async function login() {
  const user = document.getElementById("user-login-input").value;
  const password = document.getElementById("password-login-input").value;
  try {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user,
        password: password,
      }),
    });
    if (!response.ok) {
      throw new Error("Login failed.");
    }
  } catch (error) {
    alert(error);
  }
  window.location.reload();
}
