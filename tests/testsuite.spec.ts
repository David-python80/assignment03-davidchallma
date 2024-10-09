import { test, expect } from '@playwright/test';
const BASE_URL = 'http://localhost:3000';
    
    test.describe('Backends Tests', () => {
    
      let tokenValue;
      test.beforeAll('Test case LogInGetToken', async ({ request }) => {
        const respToken = await request.post("http://localhost:3000/api/login", {
          data: {
            username: "tester01",
            password: "GteteqbQQgSr88SwNExUQv2ydb7xuf8c"
          }
        })
    
        tokenValue = (await respToken.json()).token;
    
      });
    
    
      test('Test case 01 - Get all rooms', async ({ request }) => {
        const respRooms = await request.get("http://localhost:3000/api/rooms", {
          headers: {
            "X-user-auth": JSON.stringify({
              username: "tester01",
              token: tokenValue
            })
          },
        });
        if (!respRooms.ok()) {
          const errorText = await respRooms.text(); // Get the response as text
          console.error('Error response:', errorText); // Log the error message
          expect(respRooms.ok()).toBeTruthy(); // This will fail the test if not OK
          return; // Exit if response is not OK
        }
    
        const rooms = await respRooms.json(); // Parse JSON only if response is OK
        console.log(rooms);
        expect(respRooms.ok()).toBeTruthy();  // Check if the response is OK
        expect(respRooms.status()).toBe(200); // Verify if the status is 200
    
      })
    
    
      test('Test case 02 - Create Room', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/api/room/new`, {
          headers: {
            'X-user-auth': JSON.stringify({
              username: 'tester01',
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