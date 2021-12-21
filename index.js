const puppeteer = require('puppeteer')

const createPdf=async (html) => {
  // launch a new chrome instance
  try{
    console.log(html)
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox'],
        executablePath: 'google-chrome-stable'
    })
    // create a new page
    const page = await browser.newPage()
    // set your html as the pages content

    await page.setContent(html, {
        waitUntil: 'domcontentloaded'
    })
    // create a pdf buffer
    const pdfBuffer = await page.pdf({
        format: 'A4'
    })
    // close the browser
    await browser.close()
    return pdfBuffer.toString('base64')
    }
    catch(ex){
        console.log(ex);
    }
}

(async () => {
    console.log(await createPdf('<div>Test</div>'))
 })();
