## 🚀 Conduit Automation Project

Automated end-to-end testing for the **Conduit** web application 📰 (a real-world example app for articles, authentication, etc.).  
This project automates UI & API flows to ensure features work as expected across typical user journeys: signup, login, creating/editing/deleting articles, etc. ✅

---

## 📖 Project Description

This project automates testing for the **Conduit** application. It covers critical user flows such as:

- 👤 User registration and authentication
- 🌍 Browsing feed (global / user feed)   
- 📝 Creating, editing, deleting articles  
- 💬 Creating, deleting comments
- ⚠️ Negative scenarios: invalid data, unauthorized actions  

🎯 The goal is to ensure that the main functionalities work correctly, UI elements behave as intended, and APIs respond properly under normal and edge cases.

---

## 🧪 Built With

* [![Playwright][Playwright-logo]][Playwright-url]
* [![TypeScript][TypeScript-logo]][TypeScript-url]
* [![Node.js][Node-logo]][Node-url]
* [![Allure][Allure-logo]][Allure-url]

[Playwright-logo]: https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white
[Playwright-url]: https://playwright.dev/

[TypeScript-logo]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/

[Node-logo]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/

[Allure-logo]: https://img.shields.io/badge/Allure-1C1C1C?style=for-the-badge&logo=allure&logoColor=brightgreen
[Allure-url]: https://docs.qameta.io/allure/

---

## 🧩 Project Design:

* 🏗️ **Page Object Model (POM):** Clear separation of test logic and UI elements for better maintainability.  
* 🌍 **Global Setup:** Shared login/session state is handled through a global setup file to speed up tests.  
* 🪝 **Hooks:** Playwright hooks (`beforeAll`, `beforeEach`, `afterAll`, etc.) manage setup, teardown, and test lifecycle.  
* 🧩 **Fixtures:** Custom and built-in Playwright fixtures provide shared test context (browser, page, and test data).  
* 📑 **Data-Driven Approach:** Test data is managed through external JSON files for reusable and flexible scenarios.  
* 🔗 **API Calls:** Direct API requests are used for setup/teardown and validating scenarios alongside UI flows.  
* 🏷️ **Tags:** Playwright tags are used to categorize and selectively run test cases.  
* ⚡ **Parallel Execution:** Tests are executed in parallel across different contexts to reduce runtime.  
* 📜 **npm Scripts:** Custom scripts in `package.json` simplify running tests.  
* 📊 **Allure Reports:** Integrated with Playwright to generate detailed and user-friendly HTML reports.
* ⚙️ **Playwright Config:** Central configuration (`playwright.config.ts`) defines browsers, timeouts, retries, baseURL, and test options.  
* 🚀 **GitHub Actions:** Continuous integration setup to run tests automatically on push/pull request.  

---

## 📦 Prerequisites

* [![Node.js][Node-logo]][Node-url]
* [![VSCode][VSCode-logo]][VSCode-url]

[Node-logo]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/

[VSCode-logo]: https://img.shields.io/badge/VS%20Code-0078d7?style=for-the-badge&logo=visualstudiocode&logoColor=white
[VSCode-url]: https://code.visualstudio.com/

---

## ⚙️ Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/AbdelrahmanFahmy0/ConduitAutomationProject.git
   cd ConduitAutomationProject

2. Update playwright:
    ```bash
    npm install -D @playwright/test@latest

3. Install Playwright browsers:
    ```bash
    npx playwright install

---

## ▶️ How to Run

1. Run all tests:  
   ```bash
   npx playwright test

2. Run smoke tests:  
   ```bash
   npm run smoke

3. Run regression tests:  
   ```bash
   npm run regression

4. Run E2E test:  
   ```bash
   npm run e2e

--- 

## 📊 Reports
