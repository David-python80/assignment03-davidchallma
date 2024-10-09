import { type Locator, type Page } from '@playwright/test';

export class ReservationsPage {
    readonly page: Page;
    readonly pageUrl: String;
    readonly pageHeading: Locator;
    readonly createReservationButton: Locator;
    readonly reservationElements: Locator;
    readonly lastReservationInList: Locator;
    readonly reservationOptionsButton: Locator;
    readonly reservationDeleteButton: Locator;
    readonly backButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageUrl = (`${process.env.BASE_URL}/reservations`);
        this.pageHeading = page.getByText('Reservations', {exact: true});
        this.createReservationButton = page.getByRole('link', { name: 'Create Reservation' });
        this.reservationElements = page.locator('#app > div > div.reservations > div.card.reservation.card');
        this.lastReservationInList = page.locator('#app > div > div.reservations > div:last-child(1)');
        this.reservationOptionsButton = page.getByRole('img').first();
        this.reservationDeleteButton = page.getByText('Delete');
        this.backButton = page.getByRole('link', { name: 'Back' });
    };

    async goToCreateReservation() {
        await this.createReservationButton.click();
    };

    async goBackFromReservationsPage() {
        await this.backButton.click();
    };

    async deleteReservation(){
        await this.reservationOptionsButton.click();
        await this.reservationDeleteButton.click();
    };
};