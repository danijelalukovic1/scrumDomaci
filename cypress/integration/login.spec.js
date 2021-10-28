/// <reference types = "Cypress" />
import login from "../fixtures/login.json";
import data from "../fixtures/data.json";
import sidebar from "../fixtures/sidebar.json";
import account from "../fixtures/account.json";
import loggedInNavigation from "../fixtures/loggedInNavigation.json";

describe("First cypress block", () => {
    it("Visit Vivify Scrum", () => {
        cy.visit("/", { timeout: 30000} );
    })
    it("Login without credentials", () => {
        cy.get(login.inputEmail).clear();
        cy.get(login.inputPassword).clear();
        cy.get(login.logInButton).click();
        cy.url().should("contain", "/login");
    });
    it("Login without email", () => {
        cy.get(login.inputEmail).clear();
        cy.get(login.inputPassword).clear().type(data.user.password);
        cy.get(login.logInButton).click();
        cy.url().should("contain", "/login");
    });
    it("Login without password", () => {
        cy.get(login.inputEmail).clear().type(data.user.email);
        cy.get(login.inputPassword).clear();
        cy.get(login.logInButton).click();
        cy.url().should("contain", "/login");
    });
    it("Login with invalid email", () => {
        cy.get(login.inputEmail).clear().type(data.invalidUser.email);
        cy.get(login.inputPassword).clear().type(data.user.password);
        cy.url().should("contain", "/login");
    });
    it("Login with invalid password", () => {
        cy.get(login.inputEmail).clear().type(data.user.email);
        cy.get(login.inputPassword).clear().type(data.invalidUser.password);
        cy.url().should("contain", "/login");
    });
    it("Login valid login", () => {
        cy.get(login.inputEmail).clear().type(data.user.email);
        cy.get(login.inputPassword).clear().type(data.user.password);
        cy.get(login.logInButton).click();
        cy.url().should("not.contain", "/login");
    });
    it("Logout", () => {
        cy.get(sidebar.accountSettings).click();
        cy.get(account.accountSidebar.profile).click();
        cy.get(loggedInNavigation.accountNavigation.logoutButton).click();
        cy.url().should("contain", "/login");
    });
})