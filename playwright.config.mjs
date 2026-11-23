import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir:'./tests',
  testMatch:'*.spec.mjs',
  timeout:60000,
  retries:1,
  reporter:[['list'],['html',{open:'never'}]],
  use:{baseURL:'http://127.0.0.1:4173',trace:'retain-on-failure',screenshot:'only-on-failure'},
  projects:[
    {name:'chromium-mobile',use:{...devices['Pixel 7']}},
    {name:'chromium-desktop',use:{...devices['Desktop Chrome']}},
  ],
  webServer:{command:'npx http-server . -p 4173 -a 127.0.0.1 -s',url:'http://127.0.0.1:4173/index.html',reuseExistingServer:!process.env.CI,timeout:30000}
});
