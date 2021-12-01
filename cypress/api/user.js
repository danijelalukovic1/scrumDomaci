import color from '../support/consoleColor'

module.exports = {
    login({
        email = "daninani@gmail.com",
        password = "Test1234!",
        statusCode = 200,
        testMessage = ""
    }) {
        return cy.request({
            failOnStatusCode: false,
            method : "POST",
            url: "https://cypress-api.vivifyscrum-stage.com/api/v2/login",
            body: {
                email: email, 
                password: password
            }
        }).then((response) => {
            typeof response.status !== "undefined" && response.status === statusCode
            ? color.log(`${testMessage} - Pass`, "success")
            : color.log(`${testMessage} - Fail - ${JSON.stringify(response)}`, "error");
            expect(response.status).to.eql(statusCode)
            return response.body.token
        })
    }
}