import faker from 'faker'
import color from "../support/consoleColor"

module.exports = {
    get({
        token = "",
        boardId = ""
    }) {
        return cy.request({
            method: "GET",
            url: `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}`,
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
        boardId = "", 
        boardName = faker.name.crocodilia,
        statusCode = 200,
        testMessage = "",
        boardCode = "BCAA"
        
    }) {
        cy.request({
            failOnStatusCode: false,
            method: "PUT",
            url: `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}`,
            body: {
                name: boardName,
                code: boardCode,
                description: "test",
                task_unit: "points"

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
        boardName = faker.animal.crocodilia(),
        token = "",
        statusCode = 201,
        testMessage = "",
        organizationId,
        type = "scrum_board"
    }) {
        return cy.request({
            method: "POST",
            url: "https://cypress-api.vivifyscrum-stage.com/api/v2/boards",
            body: {
                organization_id: organizationId,
                type: type,
                name: boardName,
                team_members_board_id: null,
                configuration_board_id: null
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            console.log(response)
            typeof response.status !== "undefined" && response.status === statusCode
            ? color.log(`${testMessage} - Pass`, "success")
            : color.log(`${testMessage} - Fail - ${JSON.stringify(response)}`, "error");
            console.log(response)
            expect(response.status).to.eql(statusCode)
            return response.body
        })
    },
    
    delete({
        boardId = "",
        token = "",
        statusCode = 200,
        testMessage = ""
    }) {
        cy.request({
            failOnStatusCode: false,
            method: "DELETE",
            url: `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}`,
        
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

    getAllBoards({
        token = "",
        organizationId = ""
    }) {
        return cy.request({
            method: "GET",
            url: `https://cypress-api.vivifyscrum-stage.com/api/v2/organizations/${organizationId}/boards-data`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            expect(response.status).to.eql(200)
            return response.body
        })
    }
}