import faker from 'faker'
import color from "../support/consoleColor"

module.exports = {
    get({token = ""}) {
        return cy.request({
            method: "GET",
            url: "https://cypress-api.vivifyscrum-stage.com/api/v2/organizations-data",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            expect(response.status).to.eql(200)
            return response.body
        })
    },

    getMyOrganizations({token = ""}) {
        return cy.request({
            method: "GET",
            url: "https://cypress-api.vivifyscrum-stage.com/api/v2/my-organizations",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            expect(response.status).to.eql(200)
            return response.body
        })
    },
    put({
        token = "", 
        orgId = "", 
        orgName = faker.name.crocodilia,
        statusCode = 200,
        testMessage = ""
    }) {
        cy.request({
            method: "PUT",
            url: `https://cypress-api.vivifyscrum-stage.com/api/v2/organizations/${orgId}`,
            body: {
                name: orgName,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            typeof response.status !== "undefined" && response.status === statusCode
            ? color.log(`${testMessage} - Pass`, "success")
            : color.log(`${testMessage} - Fail - ${JSON.stringify(response)}`, "error");
            console.log(response)
            expect(response.status).to.eql(statusCode)
        })
    },

    post({
        orgName = faker.animal.crocodilia(),
        token = "",
        statusCode = 200,
        testMessage = ""
    }) {
        return cy.request({
            method: "POST",
            url: "https://cypress-api.vivifyscrum-stage.com/api/v2/organizations",
            body: {
                name: orgName,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            typeof response.status !== "undefined" && response.status === statusCode
            ? color.log(`${testMessage} - Pass`, "success")
            : color.log(`${testMessage} - Fail - ${JSON.stringify(response)}`, "error");
            console.log(response)
            expect(response.status).to.eql(statusCode)
            return response.body
        })
    },
    delete({
        orgId = "",
        token = "",
        statusCode = 201,
        testMessage = "",
        password = "Test1234!"
    }) {
        cy.request({
            failOnStatusCode: false,
            method: "POST",
            url: `https://cypress-api.vivifyscrum-stage.com/api/v2/organizations/${orgId}`,
            body: {
                passwordOrEmail: password,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            typeof response.status !== "undefined" && response.status === statusCode
            ? color.log(`${testMessage} - Pass`, "success")
            : color.log(`${testMessage} - Fail - ${JSON.stringify(response)}`, "error");
            console.log(response)
            expect(response.status).to.eql(statusCode)
        })
    }
}