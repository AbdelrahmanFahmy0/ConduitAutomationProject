import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? undefined : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html", { open: 'on-failure' }], ["allure-playwright"]], // Use both HTML and Allure reporters
  /* Global setup to perform actions before all tests */
  globalSetup: require.resolve('./tests/Utilities/setup/global-setup.ts'),
  /* The timeout for each test */
  timeout: 60 * 1000,
  /* The timeout for each expect assertion */
  expect: {
    timeout: 10000
  },
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://conduit.bondaracademy.com',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    /* always take screenshot */
    screenshot: 'on',
    /* record vodeo only when test fails */
    video: 'retain-on-failure',
    /* run tests in headed mode */
    headless: true,
    /* set test ID attribute*/
    testIdAttribute: 'id',
    /* storage state path to use for saving all cookies, local storage, session storage */
    storageState: 'storage-state.json'
  },

  /* Configure projects for major browsers */
  projects: [
    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
