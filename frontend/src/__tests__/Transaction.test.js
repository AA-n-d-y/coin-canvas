/// JS file to test the components related to Transaction

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

jest.mock("../TransactionsPage.jsx", () => {
    return function MockTransactionsPage() {
        return (
            <div data-testid = "TransactionsPage"> TransactionsPage component </div>
        );
    }
});

jest.mock("../AddTransactions.jsx", () => {
    return function MockAddTransactions() {
        return (
            <div data-testid = "AddTransactions"> AddTransactions component </div>
        );
    }
});

jest.mock("../EditTransaction.jsx", () => {
    return function MockEditTransaction() {
        return (
            <div data-testid = "EditTransaction"> EditTransaction component </div>
        );
    }
});


/// Tests for the mocked components

it ("should successfully test the mocked components relating to Transaction", (done) => {
    let { container } = render(<MemoryRouter initialEntries = {["/transactions"]}> <App/> </MemoryRouter>);
    let getByTestId = within(container).getByTestId;
    expect(getByTestId("TransactionsPage")).toBeInTheDocument();

    ({ container } = render(<MemoryRouter initialEntries = {["/addTransactions"]}> <App/> </MemoryRouter>));
    getByTestId = within(container).getByTestId;
    expect(getByTestId("AddTransactions")).toBeInTheDocument();

    ({ container } = render(<MemoryRouter initialEntries = {["/editTransaction"]}> <App/> </MemoryRouter>));
    getByTestId = within(container).getByTestId;
    expect(getByTestId("EditTransaction")).toBeInTheDocument();

    done();
});
