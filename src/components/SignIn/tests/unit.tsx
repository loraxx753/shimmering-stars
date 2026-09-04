/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import { SignIn } from "..";

describe("<SignIn />", () => {
  test("default providers are google and github", () => {
    render(<SignIn />);
    expect(
      screen.getByRole("button", { name: "Continue with Google" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Continue with GitHub" })
    ).toBeInTheDocument();
  });

  test("continue with google calls onProviderSelect", () => {
    const onProviderSelect = jest.fn();
    render(<SignIn onProviderSelect={onProviderSelect} />);
    fireEvent.click(
      screen.getByRole("button", { name: "Continue with Google" })
    );
    expect(onProviderSelect).toHaveBeenCalledWith("google");
  });

  test("continue with github calls onProviderSelect", () => {
    const onProviderSelect = jest.fn();
    render(<SignIn onProviderSelect={onProviderSelect} />);
    fireEvent.click(
      screen.getByRole("button", { name: "Continue with GitHub" })
    );
    expect(onProviderSelect).toHaveBeenCalledWith("github");
  });

  test("wix equivalent exposes every named provider", () => {
    render(
      <SignIn
        providers={[
          "google",
          "github",
          "apple",
          "facebook",
          "microsoft",
          "email",
        ]}
      />
    );
    expect(
      screen.getByRole("button", { name: "Continue with Google" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Continue with GitHub" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Continue with Apple" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Continue with Facebook" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Continue with Microsoft" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Continue with email" })
    ).toBeInTheDocument();
  });
});
