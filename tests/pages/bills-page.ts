import { type Locator, type Page } from '@playwright/test';
import { config } from 'dotenv';
config();
export class BillsPage {
    readonly page: Page;
    readonly pageUrl: String;
    readonly pageHeading: Locator;
    readonly createBillButton: Locator;
    readonly billElements: Locator;
    readonly firstBillInList: Locator;
    readonly billOptionsButton: Locator;
    readonly editBillButton: Locator;
    readonly deleteBillButton: Locator;
    readonly backButton: Locator;

constructor(page: Page){
    this.page = page;
    this.pageUrl = (`${process.env.BASE_URL}/bills`);
    this.pageHeading = page.getByText('Bills', {exact: true});
    this.createBillButton = page.getByRole('link', { name: 'Create Bill' });
    this.billElements = page.locator('#app > div > div.bills > div.card.bill');
    this.firstBillInList = page.locator('#app > div > div.bills > div:nth-child(1)');
    this.billOptionsButton = page.getByRole('img').first();
    this.editBillButton = page.getByText('Edit');
    this.deleteBillButton = page.getByText('Delete');
    this.backButton = page.getByRole('link', { name: 'Back' });
};

async goToEditBill(){
    await this.billOptionsButton.click();
    await this.editBillButton.click();
};

async deleteBill(){
    await this.billOptionsButton.click();
    await this.deleteBillButton.click();
};

async goBackFromBillsView(){
    await this.backButton.click();
};
};