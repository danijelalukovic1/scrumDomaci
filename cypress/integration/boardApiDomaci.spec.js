import userApi from "../api/user"
import boardApi from "../api/board"
import organizationApi from "../api/organization"

describe('01 - Api testing', () => {

    let userToken;
    let organizationId;
    let boardId;
    let boardCode;
    let allBoards;

    before(() => {
        userApi.login({
            testMessage : "Login before other tests"
        }).then((token) => {
            userToken = token
            organizationApi.getMyOrganizations({
                token: userToken,
            }).then((organizations) => {
                organizationId = organizations[0].id;
            })
        });
    });

    after(() => {
        boardApi.getAllBoards({
                token : userToken,
                organizationId : organizationId
            }).then((boards) => {
                allBoards = boards
            });
        allBoards.forEach((el) =>
        boardApi.delete({
            token: userToken,
            boardId: el.id,
            testMessage: "All boards deleted successfully"
        })
        );
    });
    
    it("01 - create board", () => {
        boardApi.post({
            organizationId: organizationId,
            token: userToken,
            testMessage: "02 - Create board"
        }).then((boardObject) => {
            boardId = boardObject.id
        });
    });

    it("02 - Get board", () => {
        boardApi.get({ token: userToken, boardId: boardId }).then((res) => {
          boardCode = res.code;
        });
      });

      it("03 - Update board name", () => {
        boardApi.put({
            boardCode: boardCode,
            token: userToken,
            boardId: boardId,
            boardName: 'Novi title za board',
            testMessage: "test message"
        });
    }); 

    it("04 - Get all boards", () => {
        boardApi.get({ token: userToken, organizationId: organizationId }).then((res) => {
          boardCode = res.code;
        }).then((response) => {
            allBoards = response
            console.log(response)
        })
      });


    // it('delete board', () => {
    //     boardApi.delete({
    //         token: userToken, 
    //         boardId: boardId
    //     });
    // });
})
