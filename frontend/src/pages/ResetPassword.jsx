import React from "react";

const ResetPassword = () => {
  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ResetPassword;
