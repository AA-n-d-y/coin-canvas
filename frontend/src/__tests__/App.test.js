/// JS file to test the app component

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { render, screen, cleanup } from "@testing-library/react";
import App from "../App";


/// Tests

// Testing the App component
describe ("App", function() {
    
    it('renders the App component successfully', function(done) {
        render(
            <BrowserRouter>
                <App/>
            </BrowserRouter>);
        expect(true).toBe(true);
        done();     
    });

});
