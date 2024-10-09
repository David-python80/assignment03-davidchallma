import { test, expect } from '@playwright/test';
const BASE_URL = 'http://localhost:3000';

test.describe('Backends Tests', () => {
  let tokenValue: string;

  test.beforeAll('Test case LogInGetToken', async ({ request }) => {
    const respToken = await request.post(`${BASE_URL}/api/login`, {
      data: {
        username: "tester02", // Ensure this username is correct
        password: "sppm7qncqmVft5uECkwjLcLdEJGzM3Cw" // Ensure this password is correct
      }
    });

    // Check if the response is OK before accessing the token
    if (!respToken.ok()) {
      const errorText = await respToken.text(); // Get the response as text
      console.error('Login failed:', errorText); // Log the error message
      throw new Error(`Login failed with status ${respToken.status()}: ${errorText}`); // Throw an error to stop the tests
    }

    // Safe to access token after verifying response
    tokenValue = (await respToken.json()).token;
    expect(tokenValue).toBeTruthy(); // Ensure that we received a token
  });

  test('Test case 01 - Get all rooms', async ({ request }) => {
    const respRooms = await request.get(`${BASE_URL}/api/rooms`, {
      headers: {
        "X-user-auth": JSON.stringify({
          username: "tester02", // This should match the login username
          token: tokenValue // Token from successful login
        })
      },
    });

    // Check if the response is OK
    if (!respRooms.ok()) {
      const errorText = await respRooms.text(); // Get the response as text
      console.error('Error response from /rooms:', errorText); // Log the error message
      expect(respRooms.ok()).toBeTruthy(); // This will fail the test if not OK
    }

    // Only parse JSON if the response is OK
    const rooms = await respRooms.json(); 
    console.log(rooms);
    expect(respRooms.ok()).toBeTruthy(); // Ensure response is OK
    expect(respRooms.status()).toBe(200); // Verify that status is 200
  });
  test('Test case 02 - Create Room', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/room/new`, {
      headers: {
        'X-user-auth': JSON.stringify({
          username: 'tester02',
          token: tokenValue
        }),
        'Content-Type': 'application/json'
      },
      data: {
        features: ['balcony'],
        category: 'double',
        number: '2',
        floor: '2',
        available: true,
        price: 2525
      }
    });


  });
})