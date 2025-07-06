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
    const scenarioName = scenario?.pickle?.name || 'Unnamed_scenario';
    console.log(`✅ Finished scenario: ${scenarioName}`);

    if (scenario.result?.status === 'FAILED') {
        const dirPath = path.resolve(__dirname, '../../screenshots');
        if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `${scenarioName.replace(/\s+/g, '_')}_${timestamp}.png`;
        const filepath = path.join(dirPath, filename);

        try {
            console.log('Saving screenshot to:', filepath);
            await browser.saveScreenshot(filepath);
            console.log(`📸 Screenshot saved: ${filepath}`);
        } catch (err) {
            console.error('❌ Screenshot failed to save:', err);
        }
    }
});
