import data from "../fixtures/data.json"
import account from "../fixtures/account.json"
import loggedInNavigation from "../fixtures/loggedInNavigation.json"

module.exports = {
    get forgotPasswordButton() {
        return cy.get("a[href='/forgot-password']");
    },
    get inputEmail() {
        return cy.get("input[type='email']");
    },
    get inputPassword() {
        return cy.get("input[type='password']");
    },
    get logInButton() {
        return cy.get("button[type='submit']");
    },

    get myProfile() {
        return cy.get(".el-dropdown-link")
    },

    get profile() {
        return cy.get("a[href='/account/settings']")
    },

    get logoutButton() {
        return cy.get(".vs-c-logout")
    },

    login({ email = data.user.email, password = data.user.password }) {
        if(email == "") {
            this.inputPassword.should("be.visible").type(password);
            this.logInButton.click();
        } else if (password == "") {
            this.inputEmail.should("be.visible").type(email);
            this.logInButton.click();
        } else {
             cy.intercept("POST", "**/api/v2/login").as("login");
              this.inputEmail.should("be.visible").type(email);
              this.inputPassword.should("be.visible").type(password);
              this.logInButton.click();
              if (email == data.user.email && password == data.user.password) {
              cy.wait("@login").then((intercept) => {
                  expect(intercept.response.statusCode).to.eql(200);
              });
              }
            }
    },

    logout() {
        cy.intercept('POST', "**/api/v2/logout").as('logout');
        cy.get(loggedInNavigation.accountNavigation.myProfile).should('be.visible').click({ multiple: true });
        cy.get(account.accountSidebar.profile).should('be.visible').click();
        cy.get(loggedInNavigation.accountNavigation.logoutButton).should('be.visible').click();
        cy.url().should("contain", "/login");
        cy.wait('@logout').then((intercept) => {
            expect(intercept.response.statusCode).to.eql(201);
        });
    }
}
