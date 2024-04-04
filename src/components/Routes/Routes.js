import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from '.../Auth/SignIn/SignIn';

const Routes = () => {

    const deployRoutes = () => {

        return (
            <Router>
                <Switch>
                    <Route path="/login" component={SignIn} />
                </Switch>
            </Router>
        );
    }

    return (
        <div>
            {deployRoutes()}
        </div>
    );
}

export default Routes;