import data from "../fixtures/data.json"

module.exports = {
    get inputEmail() {
        return cy.get("input[type='email']")
    },
    get inputPassword() {
        return cy.get("input[type='password']")
    },
    get numberOfUsers() {
        return cy.get("input[name='number_of_users']")
    },
    get checkboxTerms() {
        return cy.get(".vs-c-checkbox-check")
    },
    get startYourFreeTrial() {
        return cy.get("button[type='submit']")
    },

    register({email = data.registerUser.email, password = data.registerUser.password, numberOfUsers = data.registerUser.numOfUsers }) {
        if(email == "") {
            this.inputPassword.should('be.visible').type(password);
            this.numberOfUsers.should('be.visible').type(numberOfUsers);
            this.checkboxTerms.should('be.visible').click();
            this.startYourFreeTrial.should('be.visible').click();
        } else if(password == "") {
            this.inputEmail.should('be.visible').type(email);
            this.numberOfUsers.should('be.visible').type(numberOfUsers);
            this.checkboxTerms.should('be.visible').click();
            this.startYourFreeTrial.should('be.visible').click();
        } else if(numberOfUsers == "") {
            this.inputEmail.should('be.visible').type(email);
            this.inputPassword.should('be.visible').type(password);
            this.checkboxTerms.should('be.visible').click();
            this.startYourFreeTrial.should('be.visible').click();
        } else {
            cy.intercept('POST', "**/api/v2/register").as("register");
            this.inputEmail.should('be.visible').type(email);
            this.inputPassword.should('be.visible').type(password);
            this.numberOfUsers.should('be.visible').type(numberOfUsers);
            // this.checkboxTerms.should('be.visible').click()
            this.startYourFreeTrial.should('be.visible').click();
            if (email == data.registerUser.email && password == data.registerUser.password && this.numberOfUsers == data.registerUser.numOfUsers) {
                cy.wait('@register').then((intercept) => {
                    expect(intercept.response.statusCode).to.eql(200);
                });
            };
        };
    }
};