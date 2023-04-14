const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000');
});

test.describe('My React Pomodoro Timer App', () => {
  test('should have the correct title', async ({page}) => {

    const title = await page.title();

    expect(title).toBe('React App');
  });

  test('should have a clickable start button which then disappears', async ({ page }) => {
    const getStartedButton = page.getByRole('button', { name: 'Start' });
    
    await getStartedButton.click();
  
    await expect(getStartedButton).not.toBeVisible();
  });

  test('should change the main message after clicking start, stop, and reset buttons', async ({ page }) => {
    const mainMessageElement = await page.locator('h2')
    await expect(mainMessageElement).toHaveText('Let the countdown begin!');

    const getStartedButton = page.getByRole('button', { name: 'Start' });
    await getStartedButton.click();

    await expect(mainMessageElement).toHaveText('Clock is running');

    const stopButton = page.getByRole('button', { name: 'Stop' });
    await stopButton.click();

    await expect(mainMessageElement).toHaveText('Keep it up');

    const resetButton = page.getByRole('button', { name: 'Reset' });
    await resetButton.click();

    await expect(mainMessageElement).toHaveText('Another round');
  });

  test('timer should start ticking after clicking start button', async ({ page }) => {
    test.setTimeout(70000);
    await page.waitForSelector('.timer');
    const timerSpans = await page.$$('.timer span');
    const initialTimerValueMinutes= timerSpans[0]?.textContent();
    const initialTimerValueSeconds = timerSpans[2]?.textContent();

    const getStartedButton = page.getByRole('button', { name: 'Start' });
    await getStartedButton.click();
    await page.waitForTimeout(65000);

    const finalTimerValueMinutes = await timerSpans[0]?.textContent();
    const finalTimerValueSeconds = await timerSpans[2]?.textContent();
    expect(finalTimerValueMinutes).not.toBe(initialTimerValueMinutes);
    expect(finalTimerValueSeconds).not.toBe(initialTimerValueSeconds);
  });

});