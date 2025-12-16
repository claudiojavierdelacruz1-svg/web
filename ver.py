
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('file:///app/la-isla.html')
    page.screenshot(path='/home/jules/verification/verification.png')
    browser.close()
