import userApi from "../api/user"
import organizationApi from "../api/organization"

describe('01 - Api testing', () => {

    let userToken
    let organizationId
    let allOrganizations

    before(() => {
        userApi.login({
            testMessage : "Login before other tests"
        }).then((token) => {
            userToken = token
        });
    });

    // after('05 - delete all organizations', () => {
    //     console.log(allOrganizations)
    //     organizationApi.get({token:userToken}).then((allOrg)=>{
    //             allOrg.forEach((organization)=>{
    //                  organizationApi.delete({token:userToken, orgId:organization.id})
    //                      });
    //         });
    // });

    it("02 - create organization", () => {
        organizationApi.post({
            token: userToken,
            testMessage: "02 - Create organization"
        }).then((organizationObject) => {
            organizationId = organizationObject.id
        });
    });

    // it('03 - delete organization', () => {
    //     organizationApi.delete({
    //         token: userToken, 
    //         orgId: organizationId
    //     });
    // });

    it('04 - get all organizations', () => {
        organizationApi.get({
            token : userToken
        }).then((allOrgs) => {
            allOrganizations = allOrgs
        });
    });

    it("05 - update organization name", () => {
        organizationApi.put({
            token: userToken,
            orgId: organizationId,
            orgName: 'Nova organizacija'
        });
    });      
});