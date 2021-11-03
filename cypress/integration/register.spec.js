/// <reference types = "Cypress" />

import data from "../fixtures/data.json";
import navigationForDashboard from "../fixtures/navigationForDashboard.json";
import login from "../fixtures/login.json";

import registrationModule from "../models/registrationModule";
import loginModule from "../models/loginModule";

describe("Registration", () => {

    beforeEach(() => {
        cy.visit("/", { timeout: 30000} );
        cy.get(login.signUpLink).should('be.visible').click();
        cy.get(navigationForDashboard.starterPack).first().click({force:true});
    })

    // it("Register without credentials", () => {
    //     cy.get(register.startYourFreeTrial).click();
    //     cy.url().should("contain", "/sign-up");
    // })

    it("Register without email", () => {
        registrationModule.register({email: ""});
    })
    it("Register without password", () => {
        registrationModule.register({password: ""});
    })
    it("Register without number of users", () => {
        registrationModule.register({numberOfUsers: ""});
    })
    it("Register user with email without @", () => {
        registrationModule.register({email: data.registerInvalidUser["emailWithout@"]});
    })
    it("Register user with email without .", () => {
        registrationModule.register({email: data.registerInvalidUser["emailWithout."]});
    });
    it("Register user with existing email", () => {
        registrationModule.register({email: data.user.email});
    });
    it("Register user with password less than 5 characters", () => {
        registrationModule.register({password: data.registerInvalidUser.passwordLessThan5Chars});
    });
    it("Register user with number of users less than 1", () => {
        registrationModule.register({password: data.registerInvalidUser.numOfUsersLessThan1});
    });
    it("Register user with number of users more than 10", () => {
        registrationModule.register({password: data.registerInvalidUser.numOfUsersMoreThan10});
    });
    it("Register user with valid credentials", () => {
        registrationModule.register({});
    });

    after(() => {
        loginModule.logout();
    });
});
