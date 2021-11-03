/// <reference types = "Cypress" />

import data from "../fixtures/data.json";
import loginModule from "../models/loginModule";

describe("First cypress block", () => {

    beforeEach(() => {
        cy.visit("/", { timeout: 30000} );
    })
  
    it('login with wrong email', () => {
        loginModule.login({email: data.invalidUser.email})
        cy.url().should("contain", "/login");
    })
    // it("Login without credentials", () => {
    //     loginModule.login({})
    //     cy.url().should("contain", "/login");
    // });

    it("Login without email", () => {
        loginModule.login({email: ""});
        cy.url().should("contain", "/login");
    });
    it("Login without password", () => {
        loginModule.login({password: ""});
        cy.url().should("contain", "/login");
    });
    it("Login with invalid email", () => {
        loginModule.login({email: data.registerInvalidUser["emailWithout."]});
        cy.url().should("contain", "/login");
    });
    it("Login with invalid password", () => {
        loginModule.login({password: data.registerInvalidUser.passwordLessThan5Chars});
        cy.url().should("contain", "/login");
    });
    it("Login valid login", () => {
        loginModule.login({});
        cy.url().should("not.contain", "/login");
    });

    after(() => {
        loginModule.logout();
    })

})
