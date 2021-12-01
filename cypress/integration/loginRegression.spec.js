import userApi from "../api/user"

describe('Api testing', () => {
    let userToken
    before(() => {
        userApi.login({testMessage : "Login before other tests"}).then((token) => {
            userToken = token
        })
    })
    it("wrong email without @", () => {
        userApi.login({email:"dsfdlkas.com", testMessage: "02 wrong email without @", statusCode: 401})
    })
    it("wrong email without com", () => {
        userApi.login({email:"dsfdlka@fds", testMessage: "03 wrong email without com", statusCode: 401})
    })
    it("wrong email with space infront", () => {
        userApi.login({email:"@.com", testMessage: "04 wrong email with space infront", statusCode: 401})
    })
    it("wrong password", () => {
        userApi.login({password:"dsfdlkadsm", testMessage: "05 wrong password", statusCode: 401})
    })
})