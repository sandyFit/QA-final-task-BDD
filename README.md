# ✅ Test Automation with JavaScript – Final Task: BDD Test Suite

## 🧭 Overview

This project automates login functionality testing for [SauceDemo](https://www.saucedemo.com/) using **WebDriverIO v9** and JavaScript. It focuses on validating key login flows using **Behavior Driven Development (BDD)** with the **Page Object Model (POM)**.

---

## 📋 Test Scenarios

### 🧪 UC-1: Login with Empty Credentials
- **Goal**: Validate error message when both fields are empty
- **Steps**:
  1. Go to [SauceDemo](https://www.saucedemo.com/)
  2. Enter credentials and clear them
  3. Click Login
  4. Expect error: `"Username is required"`

### 🧪 UC-2: Login with Username Only
- **Goal**: Validate error when password is missing
- **Steps**:
  1. Enter valid username
  2. Clear the password
  3. Click Login
  4. Expect error: `"Password is required"`

### 🧪 UC-3: Login with Valid Credentials
- **Goal**: Ensure login succeeds with correct credentials
- **Steps**:
  1. Enter a valid username from the accepted list
  2. Enter password `"secret_sauce"`
  3. Click Login
  4. Expect page title: `"Swag Labs"`

---

## ⚙️ Technical Stack

| Category           | Tool/Framework                  |
|--------------------|----------------------------------|
| Framework          | WebDriverIO v9                  |
| Test Runner        | Cucumber                        |
| Language           | JavaScript (CommonJS)           |
| Pattern            | Page Object Model (POM)         |
| Assertions         | WDIO's `expect` (built-in)      |
| Browsers           | Chrome, Microsoft Edge          |
| Logging            | WDIO Logger + Custom Console    |
| Reporting          | Allure (optional, see below)    |

---

## 📂 Project Structure

```plaintext
├── allure-report/
├── allure-results/
├── screenshots/
├── src/
│ ├── config/
│ │ └── wdio.conf.js
│ ├── features/
│ │ ├── login.feature
│ ├── pages/
│ │ ├── basePage.js
│ │ ├── dashboardPage.js
│ │ └── loginPage.js
│ ├── step-definitions/
│ │ └── action.steps.js
│ │ └── hooks.js
│ │ └── validation.steps.js
├── package.json
└── README.md
```

---

## How to Run Tests

### Prerequisites
- Node.js v16+  
- Chrome and Edge browsers installed 
- Allure CLI (optional, for reports): https://docs.qameta.io/allure/

### NPM Scripts

```json
"scripts": {
  "wdio": "wdio run src/config/wdio.conf.js"
}
```

### Install Dependencies
```bash
npm install
```

### Run all tests (default config)
```bash
npm run wdio
```


## Test Credentials

**Valid usernames:**

- `standard_user`
- `locked_out_user`
- `problem_user`
- `performance_glitch_user`
- `error_user`
- `visual_user`

**Password:** `secret_sauce`

---

## How to Trigger Screenshot Capture on Failure

To verify that screenshots are correctly taken when a test fails:

1. Open the file `src/features/login.feature`.
2. Modify one of the expected error messages **intentionally**, for example:
   ```gherkin
   Then I should see the error message "Wrong message"

---

##  Allure Reporting (Optional)
```bash
allure generate allure-results --clean -o allure-report
allure open allure-report
```

## Logging & Reporting

- Test logs via console.log (default Node.js output)
- Screenshots captured on failure (if implemented)
- Console output (default)
- HTML and JSON reports can be added later for CI/CD

---

## Best Practices Used

- Page Object Pattern for maintainability  
- Clear separation of test logic and selectors  
- DRY principles for reusability  
- Clean, modular structure for scalability

---

## Troubleshooting Tips

| Issue                    | Solution                                              |
|--------------------------|-------------------------------------------------------|
| Browser won't launch     | Ensure Chrome and Edge are installed and matches the driver    |
| Element not found        | Verify CSS selectors and element wait conditions     |
| Test too slow or fails   | Increase timeout values in `wdio.conf.js`            |
| Edge not supported       | Add Selenium Standalone and Edge capabilities        |

---


