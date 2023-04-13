const { test, expect } = require('@playwright/test');

test.describe('My React Pomodoro Timer App', () => {
  test('should have the correct title', async ({page}) => {

    await page.goto('http://localhost:3000');
    const title = await page.title();

    expect(title).toBe('React App');
  });

  test('should have a clickable start button which then disappears', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const getStartedButton = page.getByRole('button', { name: 'Start' });
    
    await getStartedButton.click();
  
    await expect(getStartedButton).not.toBeVisible();
  });


});