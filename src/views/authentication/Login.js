import React from "react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row,
    Col,
} from "reactstrap";
import img3 from "../../assets/images/slide.png";
import img4 from "../../assets/images/headerlogo.png";
import img1 from "../../assets/images/logo-icon.png";
import img2 from "../../assets/images/background/login-register.jpg";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthenticationService } from "../../jwt/_services";
const sidebarBackground = {
    backgroundImage: "url(" + img3 + ")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom center",
};

const Login = (props) => {
    return (
        <div className="">
            {/*--------------------------------------------------------------------------------*/}
            {/*Login Cards*/}
            {/*--------------------------------------------------------------------------------*/}
            <div
                className="auth-wrapper d-flex no-block justify-content-center align-items-center"
                style={sidebarBackground}
            >
                <div className="auth-box on-sidebar">
                    <div id="loginform">
                        <div className="logo">
                            <span className="db">
                                <img src={img4} alt="logo" width="65px" />
                            </span>
                            <h5 className="font-medium mb-3">
                                Sign In to Admin
                            </h5>
                            {/* <div className="alert alert-success">Username: test & Password: test</div> */}
                        </div>
                        <Row>
                            <Col xs="12">
                                <Formik
                                    initialValues={{
                                        username: "",
                                        password: "",
                                    }}
                                    validationSchema={Yup.object().shape({
                                        username: Yup.string().required(
                                            "Username is required"
                                        ),
                                        password: Yup.string().required(
                                            "Password is required"
                                        ),
                                    })}
                                    onSubmit={(
                                        { username, password },
                                        { setStatus, setSubmitting }
                                    ) => {
                                        setStatus();
                                        AuthenticationService.login(
                                            username,
                                            password
                                        ).then(
                                            (user) => {
                                                const { from } = props.location
                                                    .state || {
                                                    from: { pathname: "/" },
                                                };
                                                props.history.push(from);
                                            },
                                            (error) => {
                                                setSubmitting(false);
                                                setStatus(error);
                                            }
                                        );
                                    }}
                                    render={({
                                        errors,
                                        status,
                                        touched,
                                        isSubmitting,
                                    }) => (
                                        <Form className="mt-3" id="loginform">
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ti-user"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>

                                                <Field
                                                    name="username"
                                                    type="text"
                                                    className={
                                                        "form-control" +
                                                        (errors.username &&
                                                        touched.username
                                                            ? " is-invalid"
                                                            : "")
                                                    }
                                                />
                                                <ErrorMessage
                                                    name="username"
                                                    component="div"
                                                    className="invalid-feedback"
                                                />
                                            </InputGroup>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ti-pencil"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Field
                                                    name="password"
                                                    type="password"
                                                    className={
                                                        "form-control" +
                                                        (errors.password &&
                                                        touched.password
                                                            ? " is-invalid"
                                                            : "")
                                                    }
                                                />
                                                <ErrorMessage
                                                    name="password"
                                                    component="div"
                                                    className="invalid-feedback"
                                                />
                                            </InputGroup>

                                            <Row className="mb-3">
                                                <Col xs="12">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-block btn-primary"
                                                        disabled={isSubmitting}
                                                    >
                                                        Login
                                                    </button>
                                                </Col>
                                            </Row>

                                            {status && (
                                                <div
                                                    className={
                                                        "alert alert-danger"
                                                    }
                                                >
                                                    {status}
                                                </div>
                                            )}
                                        </Form>
                                    )}
                                />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
