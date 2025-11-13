const { executablePath } = require("puppeteer");
process.env.CHROME_BIN = executablePath();

module.exports = function (config) {
    config.set({
        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: "ChromeHeadless",
                flags: [
                    "--no-sandbox",
                    "--disable-setuid-sandbox",
                    "--disable-gpu",
                    "--disable-dev-shm-usage",
                    "--no-zygote",
                    "--single-process",
                ],
            },
        },
        browsers: ["ChromeHeadlessNoSandbox"],
    });
};
