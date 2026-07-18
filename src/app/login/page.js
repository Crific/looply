export default function LoginPage() {
  return (
    <main>
      <h1>Login</h1>

      <form>
        <div>
          <label>Email</label>
          <input name="email" type="email" />
        </div>

        <div>
          <label>Password</label>
          <input name="password" type="password" />
        </div>

        <button type="submit">Login</button>
      </form>
    </main>
  );
}