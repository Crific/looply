export default function SignupPage() {
  return (
    <main>
      <h1>Sign Up</h1>

      <form>
        <div>
          <label>Name</label>
          <input name="name" type="text" />
        </div>

        <div>
          <label>Email</label>
          <input name="email" type="email" />
        </div>

        <div>
          <label>Password</label>
          <input name="password" type="password" />
        </div>

        <div>
          <label>Confirm Password</label>
          <input name="confirm" type="password" />
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </main>
  );
}