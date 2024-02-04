import homePage from "./page-model";

fixture`End to End Tests for Secret Santa Project`.page`http://localhost:3002`;

// Tests
test("Loads NavBar", async (t) => {
  await t.expect(homePage.getNavBar().getHomeLink().exists).ok();
  await t.expect(homePage.getNavBar().getOrganizeLink().exists).ok();
  await t.expect(homePage.getNavBar().getLogInLink().exists).ok();
});
test("Loads Christmas Box", async (t) => {
  await t.expect(homePage.getChristmasBox().exists).ok();
});

test.skip("Cookie is present for logged in users", async (t) => {
  const cookie = await homePage.getCookies("token");
  await t.expect(cookie).ok();
});
