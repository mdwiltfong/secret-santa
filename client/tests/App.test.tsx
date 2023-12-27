import { render, cleanup } from "@testing-library/react";
import "@testing-library/dom";
import App from "../src/App.tsx";
import React from "react";
import { describe, test, expect, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";

/**
 * @vitest-environment jsdom
 */
describe("App.tsx tests", () => {
  afterEach(cleanup);
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });
  test("renders home component", async () => {
    const container = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(container.getByText("Days until Secret Santa Reveal")).toBeTruthy();
  });
});
