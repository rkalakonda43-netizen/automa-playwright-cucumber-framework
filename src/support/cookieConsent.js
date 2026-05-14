const CONSENT_OVERLAY_SELECTORS = [
    '.fc-consent-root',
    '.fc-dialog-overlay',
    '.fc-ab-root',
    '[aria-label="Privacy"]',
    'iframe[title="Advertisement"]',
    'ins.adsbygoogle',
    '[id^="aswift_"]',
];

async function dismissCookiePopup(page) {
    const acceptButtons = [
        page.getByRole('button', { name: /consent|accept|agree|allow/i }).first(),
        page.locator('button:has-text("Consent")').first(),
        page.locator('button:has-text("Accept")').first(),
        page.locator('button:has-text("Agree")').first(),
    ];

    for (const button of acceptButtons) {
        try {
            if (await button.isVisible({ timeout: 750 })) {
                await button.click({ timeout: 1500 });
                return;
            }
        } catch (error) {
            // The popup is timing-sensitive; try the next known option.
        }
    }

    await page.locator(CONSENT_OVERLAY_SELECTORS.join(',')).evaluateAll(elements => {
        elements.forEach(element => element.remove());
    });
}

async function installCookiePopupHandler(page) {
    await page.route('**/*', route => {
        const url = route.request().url();

        if (/doubleclick|googlesyndication|googleadservices|pagead2/.test(url)) {
            return route.abort();
        }

        return route.continue();
    });

    await page.addInitScript(selectors => {
        const removeConsentOverlays = () => {
            document.querySelectorAll(selectors.join(',')).forEach(element => element.remove());
        };

        new MutationObserver(removeConsentOverlays).observe(document.documentElement, {
            childList: true,
            subtree: true,
        });

        removeConsentOverlays();
    }, CONSENT_OVERLAY_SELECTORS);

    if (typeof page.addLocatorHandler === 'function') {
        await page.addLocatorHandler(page.locator(CONSENT_OVERLAY_SELECTORS.join(',')).first(), async () => {
            await dismissCookiePopup(page);
        });
    }
}

module.exports = {
    dismissCookiePopup,
    installCookiePopupHandler,
};
