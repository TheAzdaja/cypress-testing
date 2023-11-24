import { testUserData } from "../fixtures/test";

export const homePage = {
    signUp: () => cy.get('[data-test="nav-sign-in"]'),
    hammerCheckBox: () => cy.contains('label', ' Hammer'),
    searchBar: () => cy.get('[data-test="search-query"]'),
    searchButton: () => cy.get('[data-test="search-submit"]'),
    clearSearch: () => cy.get('[data-test="search-reset"]'),
    productName: () => cy.get('[data-test="product-name"]')
};

export const singUpPage = {
    signUp: () => cy.get('[data-test="nav-sign-in"]'),
    registerLink: () => cy.get('[data-test="register-link"]'),
    firstName: () => cy.get('[data-test="first-name"]'),
    lastName: () => cy.get('[data-test="last-name"]'),
    dateOfBirth: () => cy.get('[data-test="dob"]'),
    address: () => cy.get('[data-test="address"]'),
    postcode: () => cy.get('[data-test="postcode"]'),
    city: () => cy.get('[data-test="city"]'),
    state: () => cy.get('[data-test="state"]'),
    country: () => cy.get('[data-test="country"]'),
    phone: () => cy.get('[data-test="phone"]'),
    email: () => cy.get('[data-test="email"]'),
    password: () => cy.get('[data-test="password"]'),
    register: () => cy.get('[data-test="register-submit"]'),
    logIn: () => cy.get('[data-test="login-submit"]'),
    errorMessage: () => cy.get('[data-test="register-error"]'),
    errorEmailMessage: () => cy.get('[data-test="email-error"]'),
    errorPasswordMessage: () => cy.get('[data-test="password-error"]'),
    loginErrorMessage: () => cy.get('[data-test="login-error"]'),
};

export const productPage = {
    addToCard: () => cy.get('[data-test="add-to-cart"]'),
    addQuantity: () => cy.get('[data-test="increase-quantity"]'),
    productTitle: () => cy.get('[data-test="product-name"]'),
};

export const userPage = {
    titlePage: () => cy.contains('[data-test="page-title"]', 'My account'),
    favorites: () => cy.get('[data-test="nav-favorites"]'),
    profile: () => cy.get('[data-test="nav-profile"]'),
    invoices: () => cy.get('[data-test="nav-invoices"]'),
    messages: () => cy.get('[data-test="nav-messages"]'),
}

export const navBar = {
    homeButton: () => cy.get('[data-test="nav-home"]'),
    powerToolsButton: () => cy.get('[data-test="nav-power-tools"]'),
    categoriesButton: () => cy.get('[data-test="nav-categories"]'),
    cartButton: () => cy.get('[data-test="nav-cart"]'),
    userMenuButton: () => cy.get('[data-test="nav-user-menu"]'),
    myInvoicesButton: () => cy.get('[data-test="nav-my-invoices"]'),
}

export const cardPage = {
    proceedButton1: () => cy.get('[data-test="proceed-1"]'),
    proceedButton2: () => cy.get('[data-test="proceed-2"]'),
    proceedButton3: () => cy.get('[data-test="proceed-3"]'),
    selectPaymentMethod: () => cy.get('[data-test="payment-method"]'),
    accountName: () => cy.get('[data-test="account-name"]'),
    accountNumber: () => cy.get('[data-test="account-number"]'),
    parchesButton: () => cy.get('[ data-test="finish"]'),
    successMsg: () => cy.contains('div', 'Payment was successful'),
    invoiceNumber: () => cy.contains('div', 'Thanks for your order! Your invoice number is'),
}
export function fillSignUpForm(
    name: string,
    surname: string,
    dob: string,
    address: string,
    zip: string,
    city: string,
    state: string,
    country: string,
    phone: string,
    email: string,
    password: string) {
    singUpPage.firstName().type(name);
    singUpPage.lastName().type(surname);
    singUpPage.dateOfBirth().type(dob);
    singUpPage.address().type(address);
    singUpPage.postcode().type(zip);
    singUpPage.city().type(city);
    singUpPage.state().type(state);
    singUpPage.country().select(country);
    singUpPage.phone().type(phone);
    singUpPage.email().type(email);
    singUpPage.password().type(password);
}

export function ifUserExistsCheck() {
    cy.url().then((url) => {
        if (url.includes('https://practicesoftwaretesting.com/#/auth/login')) {
            logIn(testUserData.email, testUserData.password)
        } else {
            // If registration was successful, Cypress will automatically follow the redirect to the login page
            cy.visit('https://practicesoftwaretesting.com/#/auth/login');
            logIn(testUserData.email, testUserData.password)
        }
    });
}


export function logIn(email: string, password: string) {
    singUpPage.email().type(email);
    singUpPage.password().type(password);
    singUpPage.logIn().click();
}

export function incorrectLogIn(email: string, wrongPassword: string) {
    singUpPage.logIn().click();
    singUpPage.errorEmailMessage().should('be.visible');
    singUpPage.errorPasswordMessage().should('be.visible');
    singUpPage.email().type(email);
    singUpPage.password().type(wrongPassword);
    singUpPage.logIn().click();
    singUpPage.loginErrorMessage().should('be.visible');
    singUpPage.email().clear();
    singUpPage.password().clear();
}

export function userLoggedInCheck() {
    userPage.titlePage().should('be.visible');
    userPage.favorites().should('be.visible');
    userPage.profile().should('be.visible');
    userPage.invoices().should('be.visible');
    userPage.messages().should('be.visible');
}

export function addItemToCard(itemNumber: number) {
    homePage.productName().eq(itemNumber).click();
    productPage.productTitle().should('be.visible');
    productPage.addQuantity().click();
    productPage.addToCard().click();
}

export function searchItem(item: string) {
    homePage.searchBar().type(item);
    homePage.searchButton().click();
    cy.wait(200);
    homePage.productName().should('contain', item);
}

