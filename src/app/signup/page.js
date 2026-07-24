"use client";

export default function SignupPage() {
  async function handleSubmit(event) {
    // Stop the form from refreshing the page
    event.preventDefault();

    // Read the values entered into the signup form
    const formData = new FormData(event.currentTarget);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirm = formData.get("confirm");

    // Send the signup information to the backend route
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirm,
      }),
    });

    // Convert the backend response into a JavaScript object
    const data = await response.json();

    console.log(data);
  }

  return (

    // Basic signup implementation ** WIP**
    <main>
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input name="name" type="text" required />
        </div>

        <div>
          <label>Email</label>
          <input name="email" type="email" required />
        </div>

        <div>
          <label>Password</label>
          <input name="password" type="password" required />
        </div>

        <div>
          <label>Confirm Password</label>
          <input name="confirm" type="password" required />
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </main>
  );
}