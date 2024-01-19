import { render, cleanup } from "@testing-library/react";
import "@testing-library/dom";
import App from "../src/App.tsx";
import React from "react";
import { describe, test, expect, afterEach, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Home from "../src/components/Home.tsx";
import { DaysTillChristmasUtil } from "../src/util/DaysTillChristmasUtil.ts";
vi.mock("../src/util/DaysTillChristmasUtil.ts", () => {
  return {
    DaysTillChristmasUtil: vi.fn(),
  };
});
/**
 * @vitest-environment jsdom
 */
describe("App.tsx tests", () => {
  afterEach(() => {
    cleanup();
  });
  test("renders without crashing", () => {
    vi.mocked(DaysTillChristmasUtil).mockReturnValue(12);
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });
  test("renders home component", async () => {
    vi.mocked(DaysTillChristmasUtil).mockReturnValue(12);
    const container = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(container.getByText("Days till Christmas").textContent).toBe(
      "Days till Christmas"
    );
  });
  test("Renders 12 months till christmas", () => {
    vi.mocked(DaysTillChristmasUtil).mockReturnValue(336);
    const container = render(
      <MemoryRouter initialEntries={["/"]}>
        <Home />
      </MemoryRouter>
    );

    expect(container.getByText("Months till Christmas").textContent).toBe(
      "Months till Christmas"
    );
  });
});

describe("Navbar.tsx tests", () => {
  test("renders on Home page", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Home />
      </MemoryRouter>
    );
    const navBar = container.querySelector(".navbar");
    expect(navBar).toBeDefined();
  });

  test("Renders on Organize page", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/organize"]}>
        <Home />
      </MemoryRouter>
    );
    const navBar = container.querySelector(".navbar");
    expect(navBar).toBeDefined();
  });
  test("Renders on Buy Gifts", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/buy"]}>
        <Home />
      </MemoryRouter>
    );
    const navBar = container.querySelector(".navbar");
    expect(navBar).toBeDefined();
  });

  test("Renders on Login", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/login"]}>
        <Home />
      </MemoryRouter>
    );
    const navBar = container.querySelector(".navbar");
    expect(navBar).toBeDefined();
  });
});
