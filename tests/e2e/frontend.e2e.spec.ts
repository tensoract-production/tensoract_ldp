import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('can load homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page).toHaveURL('http://localhost:3000/vi')
    await expect(page).toHaveTitle(/Tensoract/)
    const heading = page.locator('h1').first()
    await expect(heading).toContainText('Xây dựng sản phẩm công nghệ')
    await expect(page.locator('main section')).toHaveCount(10)
  })
})
