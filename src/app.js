import React from "react";
import indexRoutes from "./routes/";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./redux/Store";
import { History } from "./jwt/_helpers";
import { PrivateRoute } from "./routes/PrivateRoutes";
import BlankLayout from "./layouts/BlankLayout";
import EditArticle from "./views/pages/EditArticle";
const App = () => {
    //console.log(indexRoutes);
    //const [currentUser, SetcurrentUser] = useState(null);
    return (
        <Provider store={configureStore()}>
            <Router history={History}>
                <Switch>
                    <Route
                        exact
                        path="/authentication/login"
                        component={BlankLayout}
                    />
                    {/* <Route
                        exact
                        path="/edit_article/:id"
                        component={EditArticle}
                    /> */}

                    {indexRoutes.map((prop, key) => {
                        return (
                            <PrivateRoute
                                path={prop.path}
                                key={key}
                                component={prop.component}
                            />
                        );
                    })}
                </Switch>
            </Router>
        </Provider>
    );
};
export default App;
