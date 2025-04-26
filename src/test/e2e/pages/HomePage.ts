import { Page } from '@playwright/test';

export class HomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('/');
  }

  async getHeader() {
    return this.page.locator('[data-e2e-id="header"]');
  }

  async getHeaderLogo() {
    return this.page.locator('[data-e2e-id="header-logo"]');
  }
}
