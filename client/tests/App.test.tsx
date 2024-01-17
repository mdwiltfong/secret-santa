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
    DaysTillChristmasUtil: () => 0,
  };
});
/**
 * @vitest-environment jsdom
 */
describe("App.tsx tests", () => {
  afterEach(() => {
    DaysTillChristmasUtil;
    cleanup();
  });
  test("renders without crashing", () => {
    const respone = DaysTillChristmasUtil();
    console.log("DaysTilChristmasUtil:", respone);
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
  test("Renders 12 months till christmas", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Home />
      </MemoryRouter>
    );
  });
});
