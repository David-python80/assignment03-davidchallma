import { type Locator, type Page} from '@playwright/test';
import { config } from 'dotenv';
config();

export class LoginPage {
    readonly page: Page;
    readonly pageUrl: String;
    readonly pageHeading: Locator;
    readonly usernameInputField: Locator; 
    readonly passwordInputField: Locator;
    readonly loginButton: Locator;
    readonly wrongCredetialsMessage: Locator;
  
    constructor(page: Page) {
      this.page = page;
      this.pageUrl = (`${process.env.BASE_URL}/login`);
      this.pageHeading = page.getByRole('heading', { name: 'Login' });
      this.usernameInputField = page.locator('input[type="text"]');
      this.passwordInputField = page.locator('input[type="password"]');
      this.loginButton = page.getByRole('button', { name: 'Login' });
      this.wrongCredetialsMessage = page.getByText('Bad username or password');
    };
  
    async goto() {
      await this.page.goto(`${process.env.BASE_URL}`);
    };
  
    async performLogin(username: string, password:string) {
      await this.usernameInputField.fill(username);
      await this.passwordInputField.fill(password);
      await this.loginButton.click();
    };
  };