import { type Locator, type Page } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    readonly pageUrl: String;
    readonly pageHeading: Locator;
    readonly welcomeMessageUser: Locator;
    readonly logoutButton: Locator;
    readonly roomsViewButton: Locator;
    readonly clientsViewButton: Locator;
    readonly billsViewButton: Locator;
    readonly reservationsViewButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageUrl = (`${process.env.BASE_URL}/`);
        this.pageHeading = page.getByRole('heading', { name: 'Tester Hotel Overview' });
        this.welcomeMessageUser = page.locator('#app > header > div > div > span.username');
        this.logoutButton = page.getByRole('button', { name: 'Logout' });
        this.roomsViewButton = page.locator('#app > div > div > div > a[href="/rooms"]');
        this.clientsViewButton = page.locator('#app > div > div > div > a[href="/clients"]');
        this.billsViewButton = page.locator('#app > div > div > div > a[href="/bills"]');
        this.reservationsViewButton = page.locator('#app > div > div > div > a[href="/reservations"]');
    };
    
    async goToRoomView() {
        await this.roomsViewButton.click();
    };

    async goToClientView() {
        await this.clientsViewButton.click();
    };

    async goToBillsView() {
        await this.billsViewButton.click();
    };

    async goToReservationView() {
        await this.reservationsViewButton.click();
    };

    async performLogout() {
        await this.logoutButton.click();
    };
};