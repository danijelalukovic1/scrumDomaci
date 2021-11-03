/// <reference types = "Cypress" />

import data from "../fixtures/data.json";
import board from "../fixtures/board.json";

import loginModule from "../models/loginModule"
import boardModule from "../models/boardModule"

describe("Board", () => {
    
    before(() => {
        cy.visit("/", { timeout: 30000} );
        loginModule.login({});
    });

    it("Create board", () => {
        boardModule.createBoard({});
        cy.url().should("contain", "/boards");
        cy.get(board.newBoard.newBoardTitle).should('have.text', data.board.title);
    });

    it("Adding new column", () => {
        boardModule.addCol({});
        cy.get('[data-cy=board-backlog] > span > div > .vs-c-site-logo')
            .children()
            .should('have.length', 1);
        cy.get(board.boardTasks.columns)
            .children().eq(0)
            .should('have.class', 'vs-c-col');
        cy.get(board.boardTasks.columnTitle).last().should('have.text', data.board.column);
    });

    it("Adding a story", () => {
        boardModule.addNewTask({});
        cy.get(board.boardTasks.newTask).last().should('have.text', data.board.task);
    });

    it("Delete story", () => {
        boardModule.deleteStory({});
        cy.get(board.title).should('not.exist');
    });

      it("Delete board", () => {
        boardModule.deleteBoard({});
        cy.wait(500);
    });

    // it("Editing story", () => {
    //     cy.get(board.boardTasks.createdTask).last().click();
        
    //     cy.get(board.boardTasks.taskTitle).click();
    //     cy.get(board.boardTasks.taskName).clear().type(data.board.task + "New");
    //     cy.get(board.boardTasks.saveTitle).click();
    //     cy.get(board.boardTasks.taskTitle).should('have.text', data.board.task + "New")
        
    //     cy.get(board.boardTasks.description).click();
    //     cy.get(board.boardTasks.descriptionText).type(data.board.description);
    //     cy.get(board.boardTasks.saveDescription).click();
    //     cy.get(board.boardTasks.descriptionNew).should('have.text', data.board.description);
        
    //     cy.get(board.boardTasks.comment).click().type(data.board.comment);
    //     cy.get(board.boardTasks.saveComment).click();
    //     cy.get(board.boardTasks.newComment).should('have.text', data.board.comment);
        
    //     cy.get(board.boardTasks.deleteComment).click({force: true});
    //     cy.get(board.boardInfo.boardDetails.deleteBoard.saveButton).click();
    //     cy.wait(2000);
    //     cy.get(board.boardTasks.deleteComment).should('not.exist');
    // });

    // it("Moving story to backlog", () => {
    //     cy.get(board.boardTasks.changeSprint).click();
    //     cy.get(board.boardTasks.backlog).should('exist');
    //     cy.get(board.boardTasks.backlog).click();
    // });

});
