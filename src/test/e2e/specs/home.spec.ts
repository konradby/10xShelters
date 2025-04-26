import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Strona główna', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test('powinna wyświetlać nagłówek', async () => {
    const header = await homePage.getHeader();
    await expect(header).toBeVisible();
  });

  test('powinna wyświetlać logo w nagłówku', async () => {
    const logo = await homePage.getHeaderLogo();
    await expect(logo).toBeVisible();
  });
});
