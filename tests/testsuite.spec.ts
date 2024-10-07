import { test, expect } from '@playwright/test';

test.describe('Backends Tests', ()=> {
  test('has title', async ({ request }) => {
    const response = await request.get('http://localhost:3000/posts');
    expect(response.ok()).toBeTruthy();
    
  
    // Expect a title "to contain" a substring.
    // await expect(page).toHaveTitle(/Playwright/);
  });
  
})


// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
