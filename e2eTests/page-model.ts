import { Selector, t } from "testcafe";
abstract class BasePageObject {
  public async click(selector: Selector) {
    await t.click(selector);
  }
  public async getCookies(cookieKeyValue: string) {
    return await t.getCookies(cookieKeyValue);
  }
}

class NavBar extends BasePageObject {
  private homeLink: Selector;
  private organizeLink: Selector;
  private logIn: Selector;
  constructor() {
    super();
    this.homeLink = Selector("a").withText("Secret Santa");
    this.organizeLink = Selector("a").withText("Organize");
    this.logIn = Selector("a").withText("Log in");
  }
  public getHomeLink() {
    return this.homeLink;
  }
  public getOrganizeLink() {
    return this.organizeLink;
  }
  public getLogInLink() {
    return this.logIn;
  }
}

class HomePage extends BasePageObject {
  private navBar: NavBar;
  private christmasBox: Selector;

  constructor() {
    super();
    this.navBar = new NavBar();
    this.christmasBox = Selector(".christmas-box");
  }
  public getNavBar() {
    return this.navBar;
  }
  public getChristmasBox() {
    return this.christmasBox;
  }
}
const homePage = new HomePage();
export default homePage;
