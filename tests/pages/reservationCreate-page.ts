import { type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { config } from 'dotenv';
config();

const locale = 'sv-SE';

export class ReservationCreatePage {
    readonly page: Page;
    readonly pageHeading: Locator;
    readonly startDateField: Locator;
    readonly endDateField: Locator;
    readonly clientSelect: Locator;
    readonly roomSelect: Locator;
    readonly billSelect: Locator;
    readonly saveButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageHeading = page.getByText('New Reservation');
        this.startDateField = page.locator('div').filter({ hasText: /^Start \(Format YYYY-MM-DD\)$/ }).getByPlaceholder('YYYY-MM-DD');
        this.endDateField = page.locator('div').filter({ hasText: /^End \(Format YYYY-MM-DD\)$/ }).getByPlaceholder('YYYY-MM-DD');
        this.clientSelect = page.locator('#app > div > div:nth-child(2) > div:nth-child(3) > select');
        this.roomSelect = page.locator('#app > div > div:nth-child(2) > div:nth-child(4) > select');
        this.billSelect = page.locator('#app > div > div:nth-child(2) > div:nth-child(5) > select');
        this.saveButton = page.getByText('Save');
    };
    
    async createNewReservation() {
        const randomStartDate = faker.date.soon({ days: 365});
        const randomEndDate = faker.date.soon({ days: 10, refDate: randomStartDate});
        await this.startDateField.fill(randomStartDate.toLocaleDateString(locale));
        await this.endDateField.fill(randomEndDate.toLocaleDateString(locale));

        const clientOptions = await this.clientSelect.locator('option').allInnerTexts();
        const numberOfClientOptions = clientOptions.length;
        const randomClient = faker.number.int({ min: 1, max: (numberOfClientOptions-1)});
        await this.clientSelect.selectOption(clientOptions[randomClient]);

        const roomOptions = await this.roomSelect.locator('option').allInnerTexts();
        const numberOfRoomOptions = roomOptions.length;
        const randomRoom = faker.number.int({ min: 1, max: (numberOfRoomOptions-1)});
        await this.roomSelect.selectOption(roomOptions[randomRoom]);

        const billOptions = await this.billSelect.locator('option').allInnerTexts();
        const numberOfBillOptions = billOptions.length;
        const randomBill = faker.number.int({ min: 1, max: (numberOfBillOptions-1)});
        await this.billSelect.selectOption(billOptions[randomBill]);
        
        await this.saveButton.click();
    };
};