import homePage from "./page-model";

fixture`A set of examples that illustrate how to use TestCafe API`
  .page`http://localhost:3002/`;

// Tests
test("Loads NavBar", async (t) => {
  await t.expect(homePage.getNavBar().getHomeLink().exists).ok();
  await t.expect(homePage.getNavBar().getOrganizeLink().exists).ok();
  await t.expect(homePage.getNavBar().getLogInLink().exists).ok();
});
test("Loads Christmas Box", async (t) => {
  await t.expect(homePage.getChristmasBox().exists).ok();
});
