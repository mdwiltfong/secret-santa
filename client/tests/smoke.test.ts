import { expect, test } from "vitest";

test("smoke test", () => {
  expect(true).toBe(true);
});


import { store, increment, decrement } from '../src/store';

// Smoke test to check if Redux is properly configured
test('Redux Smoke Test', () => {
  test('should increment and decrement the count', () => {
    // Dispatch actions to test reducer logic
    store.dispatch(increment());
    expect(store.getState().counter.count).toBe(1);

    store.dispatch(decrement());
    expect(store.getState().counter.count).toBe(0);
  });
});