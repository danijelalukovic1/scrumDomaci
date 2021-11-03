/// <reference types = "Cypress" />

import loginModule from "../models/loginModule";
import organizationModule from "../models/organizationModule";

describe("Organisation", () => {
    before(() => {
        cy.visit("/", { timeout: 30000} );
        loginModule.login({});
    })
    it("Create", () => {
        organizationModule.createOrganisation({});
        cy.url().should("contain", "/organizations");
    });
    it("Delete", () => {
        organizationModule.deleteOrganisation({});
    });
});
