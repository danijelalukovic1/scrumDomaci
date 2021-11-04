import board from "../fixtures/board.json"
import data from "../fixtures/data.json"

module.exports = {
    get addNewBoard() {
        return cy.get("li[title='Add new Board']")
    },

    get boardTitle() {
        return cy.get("input[name='name']")
    },

    get boardType() {
        return cy.get("[name='type_scrum']")
    },

    get nextButton() {
        return cy.get("button[name='next_btn']")
    },

    get addColumn() {
        return cy.get(".vs-add-column-btn-gap")
    },

    get addTask() {
        return cy.get(".vs-c-col:nth-of-type(3) .vs-c-task-list button")
    },

    get taskName() {
        return cy.get("textarea[name='item_name']")
    },

    get enterTask() {
        return cy.get("#task-new > .vs-u-padding--sm")
    },

    get taskOptions() {
        return cy.get(".vs-c-item-share > .el-button > span")
    },

    get deleteOption() {
        return cy.get("li[name='delete-option']")
    },

    get deleteClick() {
        return cy.get("button[name='save-btn']")
    },

    get configuration() {
        return cy.get("[data-cy=board-configuration] > span > div > .vs-c-site-logo")
    },

    get deleteBoardClick() {
        return cy.get(".vs-c-btn--warning")
    },
  
    get yesDelete() {
        return cy.get('.vs-u-text--right > .el-button--success')
    },

    createBoard({boardTitle = data.board.title}) {
        cy.intercept('POST', "**/api/v2/boards").as("create");
        this.addNewBoard.should('be.visible').last().click().then(() => {
            this.boardTitle.should('be.visible').type(boardTitle);
            this.nextButton.should('be.visible').click();
            this.boardType.should('be.visible').click();
            for (let i = 0; i < 4; i++) {
                this.nextButton.should('be.visible').click();
            }
            cy.wait('@create').then((intercept) => {
                expect(intercept.response.statusCode).to.eql(201);
            });
        })
    },

    addCol({addColumn = data.board.column}) {
        this.addColumn.should('be.visible').type(addColumn + "{enter}");
    },

    addNewTask({addTask = data.board.task}) {
        this.addTask.click({force: true});
        this.taskName.should('be.visible').type(addTask + "{enter}");
    },

    deleteStory({}) {
        this.enterTask.should('be.visible').click();
        this.taskOptions.should('be.visible').click();
        this.deleteOption.should('be.visible').click().then(() => {
            cy.wait(500);
            this.deleteClick.click({force: true});
        })
    },

    deleteBoard({}) {
        this.configuration.should('be.visible').click();
        this.deleteBoardClick.click();
        this.yesDelete.click();
    }
}

