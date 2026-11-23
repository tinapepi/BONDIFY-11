import { test, expect } from '@playwright/test';
import { existsSync } from 'node:fs';

test('Bondify mobile visual smoke test', async ({ page }) => {
  test.skip(!existsSync('index.html'), 'Game HTML not yet committed to test branch');
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto('http://127.0.0.1:4173/index.html');
  await expect(page.locator('body')).not.toBeEmpty();
  await page.screenshot({path:'test-results/bondify-mobile.png',fullPage:true});
  const broken=await page.locator('img').evaluateAll(images=>images.filter(i=>i.complete && i.naturalWidth===0).map(i=>i.src));
  expect(broken).toEqual([]);
  expect(errors).toEqual([]);
});
