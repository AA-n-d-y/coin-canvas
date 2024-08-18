/// JS file to test the components related to Task

import React from "react";
import { BrowserRouter, Routes, Route, MemoryRouter } from "react-router-dom";
import { render, screen, cleanup } from "@testing-library/react";
import { within } from '@testing-library/dom';
import App from "../App";


// Cleanup
afterEach(() => {
    cleanup();
})


/// Mocking the components

jest.mock("../TasksPage.jsx", () => {
    return function MockTasksPage() {
        return (
            <div data-testid = "TasksPage"> TasksPage component </div>
        );
    }
});

jest.mock("../AddTasks.jsx", () => {
    return function MockAddTasks() {
        return (
            <div data-testid = "AddTasks"> AddTasks component </div>
        );
    }
});

jest.mock("../EditTask.jsx", () => {
    return function MockEditTask() {
        return (
            <div data-testid = "EditTask"> EditTask component </div>
        );
    }
});


/// Tests for the mocked components

it ("should successfully test the mocked components relating to Task", (done) => {
    let { container } = render(<MemoryRouter initialEntries = {["/tasks"]}> <App/> </MemoryRouter>);
    let getByTestId = within(container).getByTestId;
    expect(getByTestId("TasksPage")).toBeInTheDocument();

    ({ container } = render(<MemoryRouter initialEntries = {["/addTasks"]}> <App/> </MemoryRouter>));
    getByTestId = within(container).getByTestId;
    expect(getByTestId("AddTasks")).toBeInTheDocument();

    ({ container } = render(<MemoryRouter initialEntries = {["/editTask"]}> <App/> </MemoryRouter>));
    getByTestId = within(container).getByTestId;
    expect(getByTestId("EditTask")).toBeInTheDocument();

    done();
});
