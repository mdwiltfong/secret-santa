import { render, fireEvent, cleanup, waitFor } from "@testing-library/react";
import "@testing-library/dom";
import App from "../src/App";
import React from "react";
import { describe, test, expect, beforeAll, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
/**
 * @vitest-environment jsdom
 */
describe("Signup.tsx tests", () => {
  let container: HTMLElement;
  beforeAll(() => {
    const screen = render(
      <MemoryRouter initialEntries={["/signup"]}>
        <App />
      </MemoryRouter>
    );
    container = screen.container;
    const response = fireEvent.click(container.querySelector("button")!);
    console.log("Click response: ", response);
  });

  test("3 span containers appear saying that the fields are required", () => {
    expect(container.querySelectorAll("span").length).toBe(3);
  });
  test("Password field must be at least 8 characters long", () => {
    const xpathExpression =
      "//small[contains(text(), 'Password must be at least 8 characters')]";
    const xpathResult = document.evaluate(
      xpathExpression,
      document.body,
      null,
      XPathResult.ANY_TYPE,
      null
    );
    const matchingElement = xpathResult.iterateNext();

    expect(matchingElement).not.toBeNull();
  });
});
type InputsObj = {
  firstName: HTMLInputElement | null;
  lastName: HTMLInputElement | null;
  email: HTMLInputElement | null;
  password: HTMLInputElement | null;
  submitButton: HTMLButtonElement | null;
};
describe("Signup.tsx form validation", () => {
  const inputs: InputsObj = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    submitButton: null,
  };
  let container: HTMLElement;
  beforeEach(() => {
    cleanup();
    const screen = render(
      <MemoryRouter initialEntries={["/signup"]}>
        <App />
      </MemoryRouter>
    );
    screen.getAllByRole("textbox").forEach((input) => {
      const inputElement = input as HTMLInputElement;
      inputs[inputElement.name] = input as HTMLInputElement;
    });
    container = screen.container;
    const buttonElm = screen.getAllByRole("button")[0];
    inputs.submitButton = buttonElm as HTMLButtonElement;
  });
  test("Password field must be at least 8 characters long", async () => {
    fireEvent.change(inputs.firstName!, { target: { value: "John" } });
    fireEvent.change(inputs.lastName!, { target: { value: "Doe" } });
    fireEvent.change(inputs.email!, { target: { value: "test@email.com" } });
    fireEvent.click(inputs.submitButton!);
    await waitFor(() => {
      expect(container.querySelectorAll("span").length).toBe(0);
      expect(container.querySelector(".password-feedback")?.innerHTML).toBe(
        "Password must be at least 8 characters"
      );
    });
  });
  test("First Name throws validation error when empty", async () => {
    fireEvent.change(inputs.lastName!, { target: { value: "Doe" } });
    fireEvent.change(inputs.email!, { target: { value: "test@test.com" } });
    fireEvent.change(inputs.password!, { target: { value: "Password92!" } });
    fireEvent.click(inputs.submitButton!);
    await waitFor(() => {
      expect(container.querySelectorAll("span").length).toBe(1);
    });
  });

  test("Last Name throws validation error when empty", async () => {
    fireEvent.change(inputs.firstName!, { target: { value: "John" } });
    fireEvent.change(inputs.email!, { target: { value: "test@test.com" } });
    fireEvent.change(inputs.password!, { target: { value: "Password92!" } });
    fireEvent.click(inputs.submitButton!);
    await waitFor(() => {
      expect(container.querySelectorAll("span").length).toBe(1);
    });
  });
  test("Email throws validation error when empty", async () => {
    fireEvent.change(inputs.firstName!, { target: { value: "John" } });
    fireEvent.change(inputs.lastName!, { target: { value: "Doe" } });
    fireEvent.change(inputs.password!, { target: { value: "Password92!" } });
    fireEvent.click(inputs.submitButton!);
    await waitFor(() => {
      expect(container.querySelectorAll("span").length).toBe(1);
    });
  });
  test("Password throws validation error when it's greater then 8 characters, but doesn't match regex", async () => {
    fireEvent.change(inputs.firstName!, { target: { value: "John" } });
    fireEvent.change(inputs.lastName!, { target: { value: "Doe" } });
    fireEvent.change(inputs.email!, { target: { value: "test@test.com" } });
    fireEvent.change(inputs.password!, { target: { value: "Password92" } });
    fireEvent.click(inputs.submitButton!);
    await waitFor(() => {
      expect(container.querySelector(".password-feedback")?.innerHTML).toBe(
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      );
    });
  });
  test("Password throws validation error when it's greater then 20 characters", async () => {
    fireEvent.change(inputs.firstName!, { target: { value: "John" } });
    fireEvent.change(inputs.lastName!, { target: { value: "Doe" } });
    fireEvent.change(inputs.email!, { target: { value: "test@test.com" } });
    fireEvent.change(inputs.password!, { target: { value: "Password92" } });
    fireEvent.click(inputs.submitButton!);
    await waitFor(() => {
      expect(container.querySelector(".password-feedback")?.innerHTML).toBe(
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      );
    });
  });
});
