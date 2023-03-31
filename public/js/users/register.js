async function register() {
  const username = document.getElementById("username-register-input").value;
  const email = document.getElementById("email-register-input").value;
  const password = document.getElementById("password-register-input").value;
  const errorMessage = document.getElementById("error-message");

  try {
    const response = await fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      errorMessage.innerText = data.message.join("\n");
    }
  } catch (error) {
    alert(error);
  }
  window.location.replace("/");
}
