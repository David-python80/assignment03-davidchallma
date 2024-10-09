import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { BillsPage } from './pages/bills-page';
import { BillEditPage } from './pages/billEdit.page';
import { ReservationsPage } from './pages/reservations-page';
import { ReservationCreatePage } from './pages/reservationCreate-page';

const username: any = process.env.TEST_USERNAME;
const password: any = process.env.TEST_PASSWORD;

const BASE_URL = 'http://localhost:3000';

test.describe('Backends Tests', () => {
  let tokenValue: string;

  test.beforeAll('Test case LogInGetToken', async ({ request }) => {
    const respToken = await request.post(`${BASE_URL}/login`, {
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
test.describe('FrontEnd tests', () => {

  test('Test 5 - Create a new reservation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const reservationsPage = new ReservationsPage(page);
    const reservationCreatePage = new ReservationCreatePage(page);

    await loginPage.goto();
    await loginPage.performLogin(username, password);

    await dashboardPage.goToReservationView();
    await expect(reservationsPage.createReservationButton).toBeVisible();
    const reservationsBeforeCreate = await reservationsPage.reservationElements.count();

    await reservationsPage.goToCreateReservation();
    await expect(reservationCreatePage.pageHeading).toBeVisible();
    await expect(reservationCreatePage.saveButton).toBeVisible();
    await expect(reservationCreatePage.startDateField).toBeEmpty();
    await expect(reservationCreatePage.endDateField).toBeEmpty();

    await reservationCreatePage.createNewReservation();
    await expect(reservationsPage.backButton).toBeVisible();
    const reservationsAfterCreate = await reservationsPage.reservationElements.count();
    expect(reservationsAfterCreate - reservationsBeforeCreate).toEqual(1);
  })

  test('Test 7 - Edit a bill', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const billsPage = new BillsPage(page);
    const billEditPage = new BillEditPage(page);

    await loginPage.goto();
    await loginPage.performLogin(username, password);

    await dashboardPage.goToBillsView();
    const firstBillBeforeEdit = await billsPage.firstBillInList.allTextContents();

    await billsPage.goToEditBill();
    await expect(billEditPage.pageHeading).toBeVisible();
    await expect(page.url()).toContain(billEditPage.pageUrl);
    await billEditPage.editBill();

    await expect(billsPage.backButton).toBeVisible();
    const firstBillAfterEdit = await billsPage.firstBillInList.allTextContents();
    await expect(firstBillAfterEdit).not.toBe(firstBillBeforeEdit);
    await expect(billsPage.createBillButton).toBeVisible();
  });
})