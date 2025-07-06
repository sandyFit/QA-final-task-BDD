const { Before, After } = require('@wdio/cucumber-framework');
const fs = require('fs');
const path = require('path');

// 🔹 Before Hook — runs before each scenario
Before(async function (scenario) {
    const scenarioName = scenario?.pickle?.name || 'Unnamed scenario';
    console.log(`🎬 Starting scenario: ${scenarioName}`);
    await browser.reloadSession();
});


// 🔹 After Hook — runs after each scenario
After(async function (scenario) {
    const scenarioName = scenario?.pickle?.name || 'Unnamed scenario';
    console.log(`✅ Finished scenario: ${scenarioName}`);

    if (scenario.result?.status === 'FAILED') {
        const filename = scenarioName.replace(/\s+/g, '_') + '.png';
        const filepath = path.join('./screenshots', filename);
        if (!fs.existsSync('./screenshots')) fs.mkdirSync('./screenshots');
        await browser.saveScreenshot(filepath);
        console.log(`📸 Screenshot saved: ${filepath}`);
    }
});
