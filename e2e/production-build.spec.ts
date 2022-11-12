import { expect, test } from '@playwright/test'

test('renders homepage and its links are working', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/fastify-easy-react-ssr/)

  const aboutLink = page.getByRole('link', { name: 'About' })

  await aboutLink.click()

  await expect(page).toHaveURL(/about/)

  const notExistingLink = page.getByRole('link', { name: 'Not existing route' })

  await notExistingLink.click()

  await expect(page).toHaveURL(/not-found/)
})
