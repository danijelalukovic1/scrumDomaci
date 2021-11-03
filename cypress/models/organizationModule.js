import organisation from "../fixtures/organisation.json"
import data from "../fixtures/data.json"

module.exports = {
    get newOrg() {
        return cy.get("div.vs-c-list > .vs-c-list__item > .vs-c-list__btn > span")
    },
    get addNewOrganisation() {
        return cy.get(".vs-c-my-organization--add-new")
    },
    get newOrganisationInput() {
        return cy.get("input[name='name']")
    },
    get nextButton() {
        return cy.get("button[name='next_btn']")
    },
    get boardCreatedOKButton() {
        return cy.get(".vs-c-modal--features-button > .vs-c-btn")
    },

    get configuration() {
        return cy.get("li:nth-of-type(8) .vs-c-site-logo")
    },

    get deleteOrganisationClick() {
        return cy.get(".vs-c-btn--warning")
    },

    get deletePasswordInput() {
        return cy.get("input[type='password']")
    },

    get deleteSaveButton() {
        return cy.get("button[name='save-btn']")
    },

    createOrganisation({newOrganisationName = data.organization.name}) {
        cy.intercept('POST', "**/api/v2/organizations").as("create");
        this.newOrg.should('be.visible').click().then(() => {
            cy.wait(500);
            this.addNewOrganisation.click();
            this.newOrganisationInput.should('be.visible').type(newOrganisationName);
            this.nextButton.should('be.visible').click();
            this.nextButton.should('be.visible').click();
            this.boardCreatedOKButton.should('be.visible').click();
        });
        cy.wait('@create').then((intercept) => {
            expect(intercept.response.statusCode).to.eql(200);
        });
    },

    deleteOrganisation({deletePasswordInput = data.user.password}) {
        cy.intercept('POST', "**/api/v2/organizations/**").as('delete');
        this.configuration.should('be.visible').click();
        this.deleteOrganisationClick.click();
        this.deletePasswordInput.should('be.visible').type(deletePasswordInput);
        this.deleteSaveButton.should('be.visible').click();
        cy.wait('@delete').then((intercept) => {
        });
    }
};