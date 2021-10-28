/// <reference types = "Cypress" />

import login from "../fixtures/login.json";
import data from "../fixtures/data.json";
import organisation from "../fixtures/organisation.json";

describe("Organisation", () => {
    it("Create", () => {
        cy.visit("/", { timeout: 30000 });
        cy.get(login.inputEmail).clear().type(data.user.email);
        cy.get(login.inputPassword).clear().type(data.user.password);
        cy.get(login.logInButton).click();
        cy.get(organisation.newOrganization.addNew).click();
        cy.get(organisation.newOrganization.organizationNameInput).type(data.organization.name);
        cy.get(organisation.newOrganization.nextButton).click();
        cy.get(organisation.newOrganization.nextButton).click();
        cy.get(organisation.newOrganization.boardCreatedOKButton).click();
        cy.url().should("contain", "/organizations")
    });
    it("delete", () => {
        cy.get(organisation.organizationSidebar.configuration).click();
        cy.get(organisation.organizationInfo.deleteOrganization.deleteClick).click();
        cy.get(organisation.organizationInfo.deleteOrganization.passwordInput).type(data.user.password);
        cy.get(organisation.organizationInfo.deleteOrganization.saveButton).click();
        cy.url().should("not.contain", "/organizations")
    });
})
