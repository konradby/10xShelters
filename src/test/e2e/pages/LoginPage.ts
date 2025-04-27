import { Page } from '@playwright/test';

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('/login');
  }

  async getEmailInput() {
    return this.page.locator('[data-e2e-id="login-email"]');
  }

  async getPasswordInput() {
    return this.page.locator('[data-e2e-id="login-password"]');
  }

  async getLoginSubmitButton() {
    return this.page.locator('[data-e2e-id="login-submit"]');
  }

  async getErrorMessage() {
    return this.page.locator('[data-e2e-id="login-error"]');
  }

  async login(email: string, password: string) {
    const emailInput = await this.getEmailInput();
    const passwordInput = await this.getPasswordInput();
    const loginButton = await this.getLoginSubmitButton();

    await emailInput.fill(email);
    await passwordInput.fill(password);
    await loginButton.click();
  }
}
