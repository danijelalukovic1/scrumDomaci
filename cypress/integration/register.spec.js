/// <reference types = "Cypress" />

import data from "../fixtures/data.json";
import navigationForDashboard from "../fixtures/navigationForDashboard.json";
import register from "../fixtures/register.json";
import login from "../fixtures/login.json";

describe("Registration", () => {
    it("Visit", () => {
        cy.visit("/");
        cy.get(login.signUpLink).should('be.visible');
        cy.get(login.signUpLink).click();
        cy.get(navigationForDashboard.standardPack).first().click({force:true});
        cy.url().should("contain", "/sign-up");
    })
    it("Register without credentials", () => {
        cy.get(register.startYourFreeTrial).click();
        cy.url().should("contain", "/sign-up");
    })
    it("Register without email", () => {
        cy.get(register.inputEmail).clear();
        cy.get(register.inputPassword).clear().type(data.registerUser.password);
        cy.get(register.numberOfUsers).clear().type(data.registerUser.numOfUsers);
        cy.get(register.startYourFreeTrial).click();
        cy.url().should("contain", "/sign-up");
    })
    it("Register without password", () => {
        cy.get(register.inputEmail).clear().type(data.registerUser.email);
        cy.get(register.inputPassword).clear();
        cy.get(register.numberOfUsers).clear().type(data.registerUser.numOfUsers);
        cy.get(register.startYourFreeTrial).click();
        cy.url().should("contain", "/sign-up");
    })
    it("Register without number of users", () => {
        cy.get(register.inputEmail).clear().type(data.registerUser.email);
        cy.get(register.inputPassword).clear().type(data.registerUser.password);
        cy.get(register.numberOfUsers).clear();
        cy.get(register.startYourFreeTrial).click;
        cy.url().should("contain", "/sign-up");
    })
    it("Register user with email without @", () => {
        cy.get(register.inputEmail).clear().type(data.registerInvalidUser["emailWithout@"]);
        cy.get(register.inputPassword).clear().type(data.registerUser.password);
        cy.get(register.numberOfUsers).clear().type(data.registerUser.numOfUsers);
        cy.get(register.startYourFreeTrial).click;
        cy.url().should("contain", "/sign-up");
    })
    it("Register user with email without .", () => {
        cy.get(register.inputEmail).clear().type(data.registerInvalidUser["emailWithout."]);
        cy.get(register.inputPassword).clear().type(data.registerUser.password);
        cy.get(register.numberOfUsers).clear().type(data.registerUser.numOfUsers);
        cy.get(register.startYourFreeTrial).click();
        cy.url().should("contain", "/sign-up");
    });
    it("Register user with existing email", () => {
        cy.get(register.inputEmail).clear().type(data.user.email);
        cy.get(register.inputPassword).clear().type(data.registerUser.password);
        cy.get(register.numberOfUsers).clear().type(data.registerUser.numOfUsers);
        cy.get(register.startYourFreeTrial).click();
        cy.url().should("contain", "/sign-up");
    });
    it("Register user with password less than 5 characters", () => {
        cy.get(register.inputEmail).clear().type(data.registerUser.email);
        cy.get(register.inputPassword).clear().type(data.registerInvalidUser.passwordLessThan5Chars);
        cy.get(register.numberOfUsers).clear().type(data.registerUser.numOfUsers);
        cy.get(register.startYourFreeTrial).click();
        cy.url().should("contain", "/sign-up");
    });
    it("Register user with number of users less than 1", () => {
        cy.get(register.inputEmail).clear().type(data.registerUser.email);
        cy.get(register.inputPassword).clear().type(data.registerUser.password);
        cy.get(register.numberOfUsers).clear().type(data.registerInvalidUser.numOfUsersLessThan1);
        cy.get(register.startYourFreeTrial).click();
        cy.url().should("contain", "/sign-up");
    });
    it("Register user with number of users more than 10", () => {
        cy.get(register.inputEmail).clear().type(data.registerUser.email);
        cy.get(register.inputPassword).clear().type(data.registerUser.password);
        cy.get(register.numberOfUsers).clear().type(data.registerInvalidUser.numOfUsersMoreThan10);
        cy.get(register.startYourFreeTrial).click();
        cy.url().should("contain", "/sign-up");
    });
    it("Register user with number of users not an integer", () => {
        cy.get(register.inputEmail).clear().type(data.registerUser.email);
        cy.get(register.inputPassword).clear().type(data.registerUser.password);
        cy.get(register.numberOfUsers).clear().type(data.registerInvalidUser.numOfUsersNotInteger);
        cy.get(register.startYourFreeTrial).click();
        cy.url().should("contain", "/sign-up");
    });
    it("Register user with valid credentials", () => {
        cy.get(register.inputEmail).clear().type(data.registerUser.email);
        cy.get(register.inputPassword).clear().type(data.registerUser.password);
        cy.get(register.numberOfUsers).clear().type(data.registerUser.numOfUsers);
        cy.get(register.startYourFreeTrial).click();
    });
})
