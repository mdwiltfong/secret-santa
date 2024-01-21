import { render, fireEvent } from "@testing-library/react";
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

  beforeEach(() => {
    const screen = render(
      <MemoryRouter initialEntries={["/signup"]}>
        <App />
      </MemoryRouter>
    );
    screen.getAllByRole("textbox").forEach((input) => {
      const inputElement = input as HTMLInputElement;
      inputs[inputElement.name] = input as HTMLInputElement;
    });
    const buttonElm = screen.getByRole("button");
    inputs.submitButton = buttonElm as HTMLButtonElement;
  });
  test("Password field must be at least 8 characters long", () => {
    fireEvent.change(inputs.firstName!, { target: { value: "John" } });
    fireEvent.change(inputs.lastName!, { target: { value: "Doe" } });
    fireEvent.change(inputs.email!, { target: { value: "test@email.com" } });
    fireEvent.click(inputs.submitButton!);
    expect(container.querySelectorAll("span").length).toBe(3);
  });
});
