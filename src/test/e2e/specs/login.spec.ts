import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

test.describe('Logowanie', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await loginPage.navigate();
  });

  test('powinno zalogować użytkownika i przekierować do strony głównej', async ({
    page,
  }) => {
    await loginPage.login(process.env.E2E_USERNAME!, process.env.E2E_PASSWORD!);

    // Sprawdź czy nastąpiło przekierowanie do strony głównej
    await expect(page).toHaveURL('/');

    // Sprawdź czy przycisk wylogowania jest widoczny
    const logoutButton = page.locator('[data-e2e-id="desktop-logout-button"]');
    await expect(logoutButton).toBeVisible();
  });

  test('powinno wyświetlić błąd przy nieprawidłowych danych', async () => {
    await loginPage.login('nieprawidlowy@email.pl', 'nieprawidlowehaslo');

    const errorMessage = await loginPage.getErrorMessage();
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Nieprawidłowe dane logowania');
  });
});
