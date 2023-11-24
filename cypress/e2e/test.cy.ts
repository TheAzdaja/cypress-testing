/* @owner: srdjan.stojanovic@yahoo.com*/

import { itemData, site, testAccountData, testUserData } from "../fixtures/test";
import { addItemToCard, cardPage, fillSignUpForm, homePage, ifUserExistsCheck, incorrectLogIn, logIn, navBar, searchItem, singUpPage, userLoggedInCheck } from "../pages/test";


export { };

context('Cypress test', () => {
    beforeEach('Got to the test page', () => {
        cy.visit(site.url);
    });

    it('User: Register as a new user and login', () => {
        homePage.signUp().click();
        incorrectLogIn(testUserData.email, testUserData.wrongPassword)
        singUpPage.registerLink().click();
        fillSignUpForm(
            testUserData.firstName,
            testUserData.lastName,
            testUserData.dateOfBirth,
            testUserData.address,
            testUserData.zip,
            testUserData.city,
            testUserData.state,
            testUserData.country,
            testUserData.phone,
            testUserData.email,
            testUserData.password
        );
        singUpPage.register().click();
        ifUserExistsCheck();
        userLoggedInCheck();
    });

    it('Search: Search and filter for products', () => {
        homePage.hammerCheckBox().click();
        homePage.productName().should('have.length', 7);
        searchItem(itemData.thorHammer);
    });

    it('Cart: Add at least 2 different products from different categories to the cart', () => {
        searchItem(itemData.thorHammer);
        addItemToCard(0);
        navBar.categoriesButton().click();
        navBar.powerToolsButton().click();
        addItemToCard(1);
    });

    it('Checkout: Checkout and make payment', () => {
        addItemToCard(0);
        navBar.cartButton().click();
        cardPage.proceedButton1().click();
        logIn(testUserData.email, testUserData.password);
        cardPage.proceedButton2().click();
        cardPage.proceedButton3().click();
        cardPage.selectPaymentMethod().select('1: Bank Transfer');
        cardPage.accountName().type(testAccountData.accountName);
        cardPage.accountNumber().type(testAccountData.accountNumber);
        cardPage.parchesButton().click();
        cardPage.successMsg().should('be.visible');
        cardPage.parchesButton().click();
        cardPage.invoiceNumber().should('be.visible');
    });
});
