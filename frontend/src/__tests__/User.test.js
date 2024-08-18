/// JS file to test the components related to User

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

jest.mock("../LoginPage.jsx", () => {
    return function MockLoginPage() {
        return (
            <div data-testid = "LoginPage"> LoginPage component </div>
        );
    }
});

jest.mock("../RegisterPage.jsx", () => {
    return function MockRegisterPage() {
        return (
            <div data-testid = "RegisterPage"> RegisterPage component </div>
        );
    }
});

jest.mock("../DashboardPage.jsx", () => {
    return function MockDashboardPage() {
        return (
            <div data-testid = "DashboardPage"> DashboardPage component </div>
        );
    }
});

jest.mock("../SettingsPage.jsx", () => {
    return function MockSettingsPage() {
        return (
            <div data-testid = "SettingsPage"> SettingsPage component </div>
        );
    }
});

jest.mock("../ErrorPage.jsx", () => {
    return function MockErrorPage() {
        return (
            <div data-testid = "ErrorPage"> ErrorPage component </div>
        );
    }
});


/// Tests for the mocked components

it ("should successfully test the mocked components relating to User", (done) => {
    let { container } = render(<MemoryRouter initialEntries = {["/login"]}> <App/> </MemoryRouter>);
    let getByTestId = within(container).getByTestId;
    expect(getByTestId("LoginPage")).toBeInTheDocument();

    ({ container } = render(<MemoryRouter initialEntries = {["/logout"]}> <App/> </MemoryRouter>));
    getByTestId = within(container).getByTestId;
    expect(getByTestId("LoginPage")).toBeInTheDocument();

    ({ container } = render(<MemoryRouter initialEntries = {["/register"]}> <App/> </MemoryRouter>));
    getByTestId = within(container).getByTestId;
    expect(getByTestId("RegisterPage")).toBeInTheDocument();

    ({ container } = render(<MemoryRouter initialEntries = {["/dashboard"]}> <App/> </MemoryRouter>));
    getByTestId = within(container).getByTestId;
    expect(getByTestId("DashboardPage")).toBeInTheDocument();

    ({ container } = render(<MemoryRouter initialEntries = {["/"]}> <App/> </MemoryRouter>));
    getByTestId = within(container).getByTestId;
    expect(getByTestId("DashboardPage")).toBeInTheDocument();

    ({ container } = render(<MemoryRouter initialEntries = {["/settings"]}> <App/> </MemoryRouter>));
    getByTestId = within(container).getByTestId;
    expect(getByTestId("SettingsPage")).toBeInTheDocument();

    ({ container } = render(<MemoryRouter initialEntries = {["/*"]}> <App/> </MemoryRouter>));
    getByTestId = within(container).getByTestId;
    expect(getByTestId("ErrorPage")).toBeInTheDocument();

    done();
});
