const BasePage = require("./basePage");

/**
 * Login Page Object Class
 * Contains all elements and actions specific to the Swag Labs login page
 */
class LoginPage extends BasePage {
    constructor() {
        super("https://www.saucedemo.com/");
        this.selectors = {
            usernameInput: "#user-name",
            passwordInput: "#password",
            loginButton: "#login-button",
            errorMessage: "[data-test='error']",
            credentialsContainer: "#login_credentials",
            passwordContainer: ".login_password"
        };
    }

    /**
     * Navigate to the login page
     */
    async open() {
        super.open(this.url);
    }

    /**
     * Enter username in the username input
     * @param {string} username 
     */
    async enterUsername(username) {
        console.log(`Username: ${username}`);
        await $(this.selectors.usernameInput).setValue(username);
    }

    /**
     * Enter password in the password input
     * @param {string} password 
     */
    async enterPassword(password) {
        console.log(`Password: ${password}`);
        await $(this.selectors.passwordInput).setValue(password);
    }

    /**
     * Click the login button
     */
    async clickLoginButton() {
        await $(this.selectors.loginButton).click();
    }

    /**
     * Get the current value of username field
     * @returns {string} - Current username value
     */
    async getUsernameValue() {
        return await this.getElementAttribute(this.selectors.usernameInput, 'value');
    }

    /**
     * Get the current value of password field
     * @returns {string} - Current password value
     */
    async getPasswordValue() {
        return await this.getElementAttribute(this.selectors.passwordInput, 'value');
    }

    /**
     * Check if username field is empty
     * @returns {boolean} - True if username field is empty
     */
    async isUsernameInputEmpty() {
        const value = await this.getUsernameValue();
        const isEmpty = value === '';
        console.log(`👤 Username field empty: ${isEmpty}`);
        return isEmpty;
    }

    /**
     * Check if password field is empty
     * @returns {boolean} - True if password field is empty
     */
    async isPasswordInputEmpty() {
        const value = await this.getPasswordValue();
        const isEmpty = value === '';
        console.log(`🔐 Password field empty: ${isEmpty}`);
        return isEmpty;
    }

    
    /**
  * Clear the username input - Simple and reliable approach
  */
    async clearUsername() {
        const usernameField = await $(this.selectors.usernameInput);
        await usernameField.waitForDisplayed();
        await usernameField.click();

        // Select all text and delete it
        await browser.keys(['Control', 'a']);
        await browser.keys('Delete');

        console.log("🧹 Username field cleared");
    }

    /**
     * Clear the password input - Simple and reliable approach
     */
    async clearPassword() {
        const passwordField = await $(this.selectors.passwordInput);
        await passwordField.waitForDisplayed();
        await passwordField.click();

        // Select all text and delete it
        await browser.keys(['Control', 'a']);
        await browser.keys('Delete');

        console.log("🧹 Password field cleared");
    }

    /**
     * Clear all inputs
     */
    async clearAllInputs() {
        await this.clearUsername();
        await this.clearPassword();
    }

    /**
     * Get the current error message text
     * @returns {string} Error message shown below the form
     */
    async getErrorMessage() {
        const errorMessage = await $(this.selectors.errorMessage).getText();
        console.log(`Error message: "${errorMessage}"`);
        return errorMessage;
    }
    
    /**
     * Check if error message is displayed
     * @returns {boolean} - True if error message is displayed
     */
    async isErrorMessageDisplayed() {
        const isDisplayed = await $(this.selectors.errorMessage).isDisplayed();
        console.log(`Error message displayed: ${isDisplayed}`);
        return isDisplayed;
    }

    /**
     * Check if the error message contains the expected message
     * @param {string} expectedMessage - The partial or full message to compare
     * @returns {boolean}
     */
    async errorContainsExpectedMessage(expectedMessage) {
        const actualMessage = await this.getErrorMessage();
        return actualMessage.trim().toLowerCase().includes(expectedMessage.trim().toLowerCase());
    }

    /**
     * Get available usernames from the page (for reference)
     * @returns {string[]} - Array of accepted usernames
     */
    async getAcceptedUsernames() {
        try {
            const credentialsText = await $(this.selectors.credentialsContainer).getText();
            console.log('Available usernames retrieved from page');
            return credentialsText.split('\n').filter(line => line && !line.includes('Accepted'));
        } catch (error) {
            console.log('⚠️ Could not retrieve usernames from page, using default list');
            return ['standard_user', 'locked_out_user', 'problem_user', 'performance_glitch_user'];
        }
    }

    /**
     * Perform complete login action
     * @param {string|null} username - Username to use for login
     * @param {string|null} password - Password to use for login
     */
    async login(username, password) {
        if (username !== null) await this.enterUsername(username);
        if (password !== null) await this.enterPassword(password);
        await this.clickLoginButton();
    }
}

module.exports = new LoginPage();
