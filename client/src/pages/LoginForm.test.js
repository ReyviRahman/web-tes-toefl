import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import LoginForm from "./LoginForm";

it("User berhasil login menggunakan username dan password", async () => {
  const submit = jest.fn();
  render(<LoginForm submit={submit} />);

  const usernameField = screen.getByLabelText(/username/i);
  const passwordField = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole("button", { name: /submit/i });

  await userEvent.type(usernameField, "nupet");
  await userEvent.type(passwordField, "123456");
  await userEvent.click(submitButton);

  expect(submit).toHaveBeenCalledWith({
    username: "nupet",
    password: "123456",
  });
});
