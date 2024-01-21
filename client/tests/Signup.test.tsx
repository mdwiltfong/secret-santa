import { render, fireEvent } from "@testing-library/react";
import "@testing-library/dom";
import App from "../src/App";
import React from "react";
import { describe, test, expect, beforeAll } from "vitest";
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
