require('dotenv').config();
const puppeteer = require('puppeteer-extra');
//const regeneratorRuntime = require("regenerator-runtime");
const fetch = require("puppeteer-fetch").default;
const APP = `http://localhost:${process.env.PORT || 3000}/`;


describe('Front-end Integration/Features', () => {
    let browser;
    let page;
  
    beforeAll(async () => {
      browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      page = await browser.newPage();
    });
  
    afterAll(() => {
      browser.close();
    });
  
    describe('Initial display', () => {
      it('loads successfully', async () => {
        // We navigate to the page at the beginning of each case so we have a
        // fresh start
        await page.goto(APP);
        // await page.waitForSelector('input[name="username"]');
        // const title = await page.$eval('input[name="username"]', el => el.innerHTML);
        // expect(title).toBe('MegaMarket Loyalty Cards');
      });
  
      it('displays a username field', async () => {
        await page.goto(APP);
        await page.waitForSelector('input[name="username"]');
        await page.focus('input[name="username"]');
        await page.keyboard.type(process.env.TEST_LOGIN_EMAIL);
        const inputValue = await page.$eval('input[name="username"]', el => el.value);
        expect(inputValue).toBe(process.env.TEST_LOGIN_EMAIL);
      });

      it('displays a password field', async () => {
        //await page.goto(APP);
        await page.waitForSelector('input[name="password"]');
        await page.focus('input[name="password"]');
        await page.keyboard.type(process.env.TEST_LOGIN_PASSWORD);
        const inputValue = await page.$eval('input[name="password"]', el => el.value);
        expect(inputValue).toBe(process.env.TEST_LOGIN_PASSWORD);
      });

      it('logs in', async () => {
        //await page.goto(APP);
        await page.waitForSelector('button[type="submit"]');
        await page.focus('button[type="submit"]');
        await page.click('button[type="submit"]');
        await page.waitForNavigation();
        //const loginButton = await page.$x("//button[contains(., 'Guess')]");
        const inputValue = await page.$eval('button[type="submit"]', el => el.textContent)
        expect(inputValue).toBe('Guess');
      });


    });
  
    describe('Play the game', () => {
        it('displays a place to guess', async () => {
            await page.waitForSelector('input[name="guess"]');
            await page.focus('input[name="guess"]');
            await page.keyboard.type('testing 123');
            const inputValue = await page.$eval('input[name="guess"]', el => el.value);
            expect(inputValue).toBe('testing 123');
            const box = await page.$('input[name="guess"]');
            box.type('');
          });
    

        it('generates lyrics', async () => {
    
          //const bodyHTML = await page.$eval('body', body => body.innerHTML);
          //console.log(bodyHTML);
          const paragraphElements = await page.$$('p');
            
          const lyricsHere = await paragraphElements[0].evaluate(node => node.textContent);
          expect(lyricsHere).toBe('Lyrics go here');

          const [button] = await page.$x("//button[contains(text(), 'Generate Lyrics')]");
          console.log(button);
          await button.click(); 

           // Set the delay time in seconds
          const delayTimeInSeconds = 2;
          // Use setTimeout to wait for the delay time
          await new Promise(resolve => setTimeout(resolve, delayTimeInSeconds * 1000));
          // Use page.waitForTimeout() to wait for any additional time needed
          await page.waitForTimeout(1000);

          //const bodyHTMLAfterClick = await page.$eval('body', body => body.innerHTML);
          //console.log(bodyHTMLAfterClick);

          let lyricsText = '';
          const spanElements = await page.$$('span');
          // Loop through the <p> elements and display their text content
          for (let i = 0; i < spanElements.length; i++) {
            const textContent = await spanElements[i].evaluate(node => node.textContent);
            lyricsText = lyricsText + textContent + '\n';
          }

          console.log(lyricsText);
          expect(lyricsText.length).toBeGreaterThan(0);            
            
        });

        it('can guess lyrics', async () => { 
          let lyricsText = '';
          const spanElements = await page.$$('span');
          // Loop through the <p> elements and display their text content
          for (let i = 0; i < spanElements.length; i++) {
            const textContent = await spanElements[i].evaluate(node => node.textContent);
            lyricsText = lyricsText + textContent + '\n';
          }

          const url = 'https://api.openai.com/v1/completions';
          const key = process.env.OPENAI_API_KEY;
          const body = {
            "model": "text-davinci-003",
            "prompt": ('What is the title of the song with the following lyrics? Please provide the answer as a key value pair, and no other text in your answer. The lyrics are: ' + lyricsText),
            "temperature": 0.7,
            "max_tokens": 256,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 0
          }

          
          let res = await fetch(url,{
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + key},
            body: JSON.stringify(body)
          })
          .then(response => response.json())
          .then (data => data);

          const delayTimeInSeconds = 2;
          // Use setTimeout to wait for the delay time
          //await new Promise(resolve => setTimeout(resolve, delayTimeInSeconds * 1000));

          const guessedSong = res.choices[0].text;
          console.log('Guessing that the song is ', guessedSong)
          expect(guessedSong.length).toBeGreaterThan(0);
          
          //put in the guess
          await page.waitForSelector('input[name="guess"]');
          await page.focus('input[name="guess"]');
          await page.keyboard.type(guessedSong);
          const inputValue = await page.$eval('input[name="guess"]', el => el.value);
          console.log('inputval is', inputValue);
          //expect(inputValue).toEqual(guessedSong);

          //submit the guess
          await page.waitForSelector('button[type="submit"]');
          await page.focus('button[type="submit"]');
          await page.click('button[type="submit"]');
  


        },20000);
    });
  
    
  });
  
  
