const LoginPage = require("./pages/loginPage");
const DashboardPage = require("./pages/dashboardPage");

/**
 * @param {string} name - Page name ('login' | 'dashboard')
 * @returns {LoginPage | DashboardPage} - The requested page object
 */
function pages(name) {
    const items = {
        login: LoginPage,
        dashboard: DashboardPage,
    }
    return items[name.toLowerCase()];
}

module.exports = {
    LoginPage,
    DashboardPage,
    pages
}
