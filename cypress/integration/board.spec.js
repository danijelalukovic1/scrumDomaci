/// <reference types = "Cypress" />

import login from "../fixtures/login.json";
import data from "../fixtures/data.json";
import board from "../fixtures/board.json";
import sidebar from "../fixtures/sidebar.json";
import account from "../fixtures/account.json";
import loggedInNavigation from "../fixtures/loggedInNavigation.json"

describe("Board", () => {
    
    before(() => {
        cy.intercept(
            'POST',
            'https://cypress-api.vivifyscrum-stage.com/api/v2/login'
        ).as('sucessfullLogin');

        cy.visit("/", { timeout: 30000 });
        cy.url().should("contains", "cypress.vivifyscrum-stage")
        cy.visit('/login')
        cy.get(login.inputEmail).clear().type(data.user.email);
        cy.get(login.inputPassword).clear().type(data.user.password);
        cy.get(login.logInButton).click();
        cy.url().should("not.contain", "/login");

        cy.wait('@sucessfullLogin').then((interception) => {
            expect(interception.response.statusCode).to.eq(200)
            expect(interception.response.body).to.be.a('Object')
        });
    });

    // beforeEach(() => {
    // })
    // afterEach(() => {    
    // })
    // ne znam sta da ubacim u beforeEach i afterEach

    it("Create board", () => {
        cy.get(board.newBoard.addNewBoard).last().click()
            .then(() => {
                cy.get(board.newBoard.boardTitle).type(data.board.title);
                cy.get(board.newBoard.nextButton).click();
                cy.get(board.newBoard.boardType.scrum).click();
                for (let i = 0; i < 4; i++) {
                    cy.get(board.newBoard.nextButton).should('be.visible').click();
                };
                cy.url().should("contain", "/boards");
                cy.get(board.newBoard.newBoardTitle).should('have.text', data.board.title);
            });
    });

    it("Adding new column", () => {
        cy.get(board.boardTasks.addColumn).type(data.board.column + "{enter}");
        cy.get('[data-cy=board-backlog] > span > div > .vs-c-site-logo')
            .children()
            .should('have.length', 1);
        cy.get(board.boardTasks.columns)
            .children().eq(0)
            .should('have.class', 'vs-c-col');
        cy.get(board.boardTasks.columnTitle).last().should('have.text', data.board.column);
    });

    it("Adding a story", () => {
        cy.get(board.boardTasks.addTask).click({force: true});
        cy.get(board.boardTasks.taskName).type(data.board.task + "{enter}");
        cy.get(board.boardTasks.newTask).last().should('have.text', data.board.task);
    });

    it("Editing story", () => {
        cy.get(board.boardTasks.createdTask).last().click();
        
        cy.get(board.boardTasks.taskTitle).click();
        cy.get(board.boardTasks.taskName).clear().type(data.board.task + "New");
        cy.get(board.boardTasks.saveTitle).click();
        cy.get(board.boardTasks.taskTitle).should('have.text', data.board.task + "New")
        
        cy.get(board.boardTasks.description).click();
        cy.get(board.boardTasks.descriptionText).type(data.board.description);
        cy.get(board.boardTasks.saveDescription).click();
        cy.get(board.boardTasks.descriptionNew).should('have.text', data.board.description);
        
        cy.get(board.boardTasks.comment).click().type(data.board.comment);
        cy.get(board.boardTasks.saveComment).click();
        cy.get(board.boardTasks.newComment).should('have.text', data.board.comment);
        
        cy.get(board.boardTasks.deleteComment).click({force: true});
        cy.get(board.boardInfo.boardDetails.deleteBoard.saveButton).click();
        cy.wait(2000);
        cy.get(board.boardTasks.deleteComment).should('not.exist');
    });

    it("Moving story to backlog", () => {
        cy.get(board.boardTasks.changeSprint).click();
        cy.get(board.boardTasks.backlog).should('exist');
        cy.get(board.boardTasks.backlog).click();
    });

    it("Delete story", () => {
        cy.get(board.boardTasks.taskOptions).click();
        cy.get(board.boardTasks.deleteOption).click();
        cy.get(board.boardInfo.boardDetails.deleteBoard.saveButton).should('exist');
        cy.get(board.boardInfo.boardDetails.deleteBoard.saveButton).click();
        cy.get(board.title).should('not.exist');
    });

    it("Delete board", () => {
        cy.get(board.boardSidebar.configuration).click();
        cy.get(board.boardInfo.boardDetails.deleteBoard.deleteBoardClick).should('exist');
        cy.get(board.boardInfo.boardDetails.deleteBoard.deleteBoardClick).click();
        cy.get(board.boardInfo.boardDetails.deleteBoard.saveButton).click();
        cy.get(board.newBoard.boardDeletedOKButton).click();
    });

    after(() => {
        cy.get(sidebar.accountSettings).click();
        cy.get(account.accountSidebar.profile).click();
        cy.get(loggedInNavigation.accountNavigation.logoutButton).should('be.visible');
        cy.get(loggedInNavigation.accountNavigation.logoutButton).click();
        cy.url().should("contain", "/login");
    });

});
