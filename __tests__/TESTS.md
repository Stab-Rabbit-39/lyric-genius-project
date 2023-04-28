Before testing:
    Add a .env file in the root directory with the following:
        OPENAI_API_KEY=<your key here>
        TEST_LOGIN_EMAIL=<your existing email addr here>
        TEST_LOGIN_PASSWORD=<your existing pw here>

To test the backend:
    npx jest __tests__/backend.test.js

To test the frontend:
    npx jest __tests__/puppeteer.test.js

    Be careful of api limits!