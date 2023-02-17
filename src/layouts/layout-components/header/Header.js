/* eslint-disable */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
    Nav,
    NavItem,
    NavLink,
    Button,
    Navbar,
    NavbarBrand,
    Collapse,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledCarousel,
    Progress,
    ListGroup,
    ListGroupItem,
    Row,
    Col,
    Form,
    FormGroup,
    Input,
} from "reactstrap";
import * as data from "./Data";
import "./index.css";
import { AuthenticationService } from "../../../jwt/_services";

/*--------------------------------------------------------------------------------*/
/* Import images which are need for the HEADER                                    */
/*--------------------------------------------------------------------------------*/
import logodarkicon from "../../../assets/images/logo-icon.png";
import logolighticon from "../../../assets/images/logo-light-icon.png";
import logodarktext from "../../../assets/images/logo-text.png";
import logolighttext from "../../../assets/images/logo-light-text.png";
import profilephoto from "../../../assets/images/users/1.jpg";
import { useHistory } from "react-router-dom";
import img4 from "../../../assets/images/headerlogo.png";

export default () => {
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const [saidBar, setSaidBar] = useState(false);

    const settings = useSelector((state) => state.settings);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const showMobilemenu = () => {
        document
            .getElementById("main-wrapper")
            .classList.toggle("show-sidebar");
    };

    const sidebarHandler = () => {
        let element = document.getElementById("main-wrapper");
        switch (settings.activeSidebarType) {
            case "full":
            case "iconbar":
                element.classList.toggle("mini-sidebar");
                if (element.classList.contains("mini-sidebar")) {
                    element.setAttribute("data-sidebartype", "mini-sidebar");
                    setSaidBar(true);
                } else {
                    element.setAttribute(
                        "data-sidebartype",
                        settings.activeSidebarType
                    );
                    setSaidBar(false);
                }
                break;

            case "overlay":
            case "mini-sidebar":
                element.classList.toggle("full");
                if (element.classList.contains("full")) {
                    element.setAttribute("data-sidebartype", "full");
                } else {
                    element.setAttribute(
                        "data-sidebartype",
                        settings.activeSidebarType
                    );
                }
                break;
            default:
        }
    };

    return (
        <header
            className="topbar navbarbg"
            data-navbarbg={settings.activeNavbarBg}
        >
            <Navbar
                className={
                    "top-navbar " +
                    (settings.activeNavbarBg === "skin6"
                        ? "navbar-light"
                        : "navbar-dark")
                }
                expand="md"
            >
                <div
                    className="navbar-header"
                    id="logobg"
                    data-logobg={settings.activeLogoBg}
                >
                    {/*--------------------------------------------------------------------------------*/}
                    {/* Mobile View Toggler  [visible only after 768px screen]                         */}
                    {/*--------------------------------------------------------------------------------*/}
                    <span
                        className="nav-toggler d-block d-md-none"
                        onClick={showMobilemenu.bind(null)}
                    >
                        <i className="ti-menu ti-close" />
                    </span>
                    {/*--------------------------------------------------------------------------------*/}
                    {/* Logos Or Icon will be goes here for Light Layout && Dark Layout                */}
                    {/*--------------------------------------------------------------------------------*/}
                    <NavbarBrand href="/">
                        <b className="logo-icon">
                            <img
                                src={img4}
                                alt="homepage"
                                className="dark-logo"
                                width="65px"
                            />
                        </b>
                        <span className="logo-text" id="logoText">
                            Fight News
                        </span>
                    </NavbarBrand>
                    {/*--------------------------------------------------------------------------------*/}
                    {/* Mobile View Toggler  [visible only after 768px screen]                         */}
                    {/*--------------------------------------------------------------------------------*/}
                    <span
                        className="topbartoggler d-block d-md-none"
                        onClick={toggle.bind(null)}
                    >
                        <i className="ti-more" />
                    </span>
                </div>
                <Collapse
                    className="navbarbg"
                    isOpen={isOpen}
                    navbar
                    data-navbarbg={settings.activeNavbarBg}
                >
                    <Nav className="float-left" navbar>
                        <NavItem>
                            <NavLink
                                href="#"
                                className="d-none d-md-block"
                                onClick={sidebarHandler.bind(null)}
                            >
                                <i
                                    className={
                                        saidBar
                                            ? "icon-arrow-right-circle"
                                            : "icon-arrow-left-circle"
                                    }
                                ></i>
                            </NavLink>
                        </NavItem>
                        {/*--------------------------------------------------------------------------------*/}
                        {/* Start Notifications Dropdown                                                   */}
                        {/*--------------------------------------------------------------------------------*/}
                        {/*<UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                <i className="mdi mdi-message"></i>
                                <div className="notify">
                                    <span className="heartbit"></span>
                                    <span className="point"></span>
                                </div>
                            </DropdownToggle>
                           <DropdownMenu className="mailbox animated bounceInDown">
                                <ul className="list-style-none">
                                    <li>
                                        <div className="font-weight-medium border-bottom rounded-top py-3 px-4">
                                            Notifffffffffffications
                                        </div>
                                    </li>
                                    <li>
                                        <div className="message-center notifications">
                                            {/*<!-- Message -->
                                            {data.notifications.map(
                                                (notification, index) => {
                                                    return (
                                                        <a
                                                            href="#"
                                                            className="message-item d-flex align-items-center border-bottom px-3 py-2"
                                                            key={index}
                                                        >
                                                            <span
                                                                className={
                                                                    "btn rounded-circle btn-" +
                                                                    notification.iconbg
                                                                }
                                                            >
                                                                <i
                                                                    className={
                                                                        notification.iconclass
                                                                    }
                                                                />
                                                            </span>
                                                            <span className="w-75 d-inline-block v-middle pl-2">
                                                                <h5 className="message-title mb-0 mt-1">
                                                                    {
                                                                        notification.title
                                                                    }
                                                                </h5>
                                                                <span className="font-12 text-nowrap d-block text-muted text-truncate">
                                                                    {
                                                                        notification.desc
                                                                    }
                                                                </span>
                                                                <span className="font-12 text-nowrap d-block text-muted">
                                                                    {
                                                                        notification.time
                                                                    }
                                                                </span>
                                                            </span>
                                                        </a>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </li>
                                    <li>
                                        <a
                                            className="nav-link border-top text-center text-dark pt-3"
                                            href="#"
                                        >
                                            {" "}
                                            <strong>
                                                Check all notifications
                                            </strong>{" "}
                                            <i className="fa fa-angle-right"></i>{" "}
                                        </a>
                                    </li>
                                </ul>
                            </DropdownMenu>
                        </UncontrolledDropdown>*/}
                        {/*--------------------------------------------------------------------------------*/}
                        {/* End Notifications Dropdown                                                     */}
                        {/*--------------------------------------------------------------------------------*/}
                        {/*--------------------------------------------------------------------------------*/}
                        {/* Start Messages Dropdown                                                        */}
                        {/*--------------------------------------------------------------------------------*/}
                        {/* <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                <i className="mdi mdi-email"></i>
                                <div className="notify">
                                    <span className="heartbit"></span>
                                    <span className="point"></span>
                                </div>
                            </DropdownToggle>
                            <DropdownMenu className="mailbox animated bounceInDown">
                                <ul className="list-style-none">
                                    <li>
                                        <div className="font-weight-medium border-bottom rounded-top py-3 px-4">
                                            Messages
                                        </div>
                                    </li>
                                    <li>
                                        <div className="message-center message-body">
                                            {/*<!-- Message -->
                                            {data.messages.map(
                                                (message, index) => {
                                                    return (
                                                        <a
                                                            href="#"
                                                            className="message-item d-flex align-items-center border-bottom px-3 py-2"
                                                            key={index}
                                                        >
                                                            <span className="user-img position-relative d-inline-block">
                                                                <img
                                                                    src={
                                                                        message.image
                                                                    }
                                                                    alt="user"
                                                                    className="rounded-circle w-100"
                                                                />
                                                                <span
                                                                    className={
                                                                        "profile-status rounded-circle " +
                                                                        message.status
                                                                    }
                                                                ></span>
                                                            </span>
                                                            <div className="w-75 d-inline-block v-middle pl-2">
                                                                <h5 className="message-title mb-0 mt-1">
                                                                    {
                                                                        message.title
                                                                    }
                                                                </h5>
                                                                <span className="font-12 text-nowrap d-block text-muted text-truncate">
                                                                    {
                                                                        message.desc
                                                                    }
                                                                </span>
                                                                <span className="font-12 text-nowrap d-block text-muted">
                                                                    {
                                                                        message.time
                                                                    }
                                                                </span>
                                                            </div>
                                                        </a>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </li>
                                    <li>
                                        <a
                                            className="nav-link border-top text-center text-dark pt-3"
                                            href="#"
                                        >
                                            {" "}
                                            <b>See all e-Mails</b>{" "}
                                            <i className="fa fa-angle-right"></i>{" "}
                                        </a>
                                    </li>
                                </ul>
                            </DropdownMenu>
                        </UncontrolledDropdown>*/}
                        {/*--------------------------------------------------------------------------------*/}
                        {/* End Messages Dropdown                                                          */}
                        {/*--------------------------------------------------------------------------------*/}
                        {/*--------------------------------------------------------------------------------*/}
                        {/* Start Mega Menu Dropdown                                                       */}
                        {/*--------------------------------------------------------------------------------*/}
                        {/*<UncontrolledDropdown
                            nav
                            inNavbar
                            className="mega-dropdown"
                        >
                            <DropdownToggle nav>
                                {" "}
                                <i className="mdi mdi-view-grid"></i>
                            </DropdownToggle>
                            <DropdownMenu>
                                <Row>
                  
                                    <Col xs="12" sm="12" md="12" lg="3">
                                        <h5 className="mb-3 text-uppercase">
                                            Carousel
                                        </h5>
                                        <UncontrolledCarousel
                                            items={data.items}
                                        />
                                    </Col>
                                
                                    <Col xs="12" sm="12" md="12" lg="3">
                                        <h5 className="mb-3 text-uppercase">
                                            Progress
                                        </h5>
                                        <div className="d-flex no-block align-items-center mb-2">
                                            <span>Sales</span>
                                            <div className="ml-auto">
                                                <span className="text-primary">
                                                    <i className="mdi mdi-chart-areaspline" />
                                                </span>
                                            </div>
                                        </div>
                                        <Progress
                                            className="mb-3"
                                            animated
                                            value={2 * 5}
                                        />
                                        <div className="d-flex no-block align-items-center mb-2">
                                            <span>Marketing</span>
                                            <div className="ml-auto">
                                                <span className="text-success">
                                                    <i className="mdi mdi-chart-line" />
                                                </span>
                                            </div>
                                        </div>
                                        <Progress
                                            className="mb-3"
                                            animated
                                            color="success"
                                            value="25"
                                        />
                                        <div className="d-flex no-block align-items-center mb-2">
                                            <span>Accouting</span>
                                            <div className="ml-auto">
                                                <span className="text-danger">
                                                    <i className="mdi mdi-chart-arc" />
                                                </span>
                                            </div>
                                        </div>
                                        <Progress
                                            className="mb-3"
                                            animated
                                            color="danger"
                                            value={50}
                                        />
                                        <div className="d-flex no-block align-items-center mb-2">
                                            <span>Sales Ratio</span>
                                            <div className="ml-auto">
                                                <span className="text-warning">
                                                    <i className="mdi mdi-chart-pie" />
                                                </span>
                                            </div>
                                        </div>
                                        <Progress
                                            className="mb-3"
                                            animated
                                            color="warning"
                                            value={70}
                                        />
                                    </Col>
                             
                                    <Col xs="12" sm="12" md="12" lg="3">
                                        <h5 className="mb-3 text-uppercase">
                                            Contact Us
                                        </h5>
                                        <Form>
                                            <FormGroup>
                                                <Input
                                                    type="text"
                                                    name="name"
                                                    id="textname"
                                                    placeholder="Enter Name Here"
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Input
                                                    type="email"
                                                    name="email"
                                                    id="exampleEmail"
                                                    placeholder="Enter Email Here"
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Input
                                                    type="textarea"
                                                    name="text"
                                                    id="exampleText"
                                                    placeholder="Message"
                                                />
                                            </FormGroup>
                                            <Button color="primary">
                                                Submit
                                            </Button>
                                        </Form>
                                    </Col>
                           
                                    <Col xs="12" sm="12" md="12" lg="3">
                                        <h5 className="mb-3 text-uppercase">
                                            List Style
                                        </h5>
                                        <ListGroup flush>
                                            <ListGroupItem
                                                tag="a"
                                                href=""
                                                className="border-0 pl-0 text-dark pt-0"
                                            >
                                                <i className="fa fa-check text-success mr-2" />
                                                Cras justo odio
                                            </ListGroupItem>
                                            <ListGroupItem
                                                tag="a"
                                                href=""
                                                className="border-0 pl-0 text-dark pt-0"
                                            >
                                                <i className="fa fa-check text-success mr-2" />
                                                Dapibus ac facilisis in
                                            </ListGroupItem>
                                            <ListGroupItem
                                                tag="a"
                                                href=""
                                                className="border-0 pl-0 text-dark pt-0"
                                            >
                                                <i className="fa fa-check text-success mr-2" />
                                                Morbi leo risus
                                            </ListGroupItem>
                                            <ListGroupItem
                                                tag="a"
                                                href=""
                                                className="border-0 pl-0 text-dark pt-0"
                                            >
                                                <i className="fa fa-check text-success mr-2" />
                                                Porta ac consectetur ac
                                            </ListGroupItem>
                                            <ListGroupItem
                                                tag="a"
                                                href=""
                                                className="border-0 pl-0 text-dark pt-0"
                                            >
                                                <i className="fa fa-check text-success mr-2" />
                                                Vestibulum at eros
                                            </ListGroupItem>
                                        </ListGroup>
                                    </Col>
                                </Row>
                            </DropdownMenu>
                        </UncontrolledDropdown>*/}
                        {/*--------------------------------------------------------------------------------*/}
                        {/* End Mega Menu Dropdown                                                         */}
                        {/*--------------------------------------------------------------------------------*/}
                    </Nav>
                    <Nav className="ml-auto float-right" navbar>
                        {/*    <li className="nav-item search-box d-none d-md-block">
                            <form className="app-search mt-3 mr-2">
                                <input
                                    type="text"
                                    className="form-control rounded-pill"
                                    placeholder="Search for..."
                                />
                                <a className="srh-btn">
                                    <i className="ti-search"></i>
                                </a>
                            </form>
                        </li>*/}
                        {/*--------------------------------------------------------------------------------*/}
                        {/* Start Profile Dropdown                                                         */}
                        {/*--------------------------------------------------------------------------------*/}
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret className="pro-pic">
                                <img
                                    src={profilephoto}
                                    alt="user"
                                    className="rounded-circle"
                                    width="31"
                                />
                            </DropdownToggle>
                            <DropdownMenu
                                right
                                className="user-dd animated flipInY"
                            >
                                <div className="d-flex no-block align-items-center p-3 mb-2 border-bottom">
                                    <div className="">
                                        <img
                                            src={profilephoto}
                                            alt="user"
                                            className="rounded"
                                            width="80"
                                        />
                                    </div>
                                    <div className="ml-2">
                                        <h4 className="mb-0">Todd Bakke</h4>
                                        {/* <p className=" mb-0">varun@gmail.com</p> */}
                                        {/* <a
                                            href="#"
                                            className="btn btn-rounded btn-danger btn-sm"
                                        >
                                            View Profile
                                        </a> */}
                                    </div>
                                </div>
                                {/*  <DropdownItem>
                                    <i className="ti-user mr-1 ml-1" /> My
                                    Account
                                </DropdownItem>
                                <DropdownItem>
                                    <i className="ti-wallet mr-1 ml-1" /> My
                                    Balance
                                </DropdownItem>
                                <DropdownItem>
                                    <i className="ti-email mr-1 ml-1" /> Inbox
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    <i className="ti-settings mr-1 ml-1" />{" "}
                                    Account Settings
                                </DropdownItem>
                                <DropdownItem divider />*/}
                                <DropdownItem
                                    href="/pages/login"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        AuthenticationService.logout();
                                        history.push("/authentication/login");
                                    }}
                                >
                                    <i className="fa fa-power-off mr-1 ml-1" />{" "}
                                    Logout
                                </DropdownItem>
                                <DropdownItem divider />
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        {/*--------------------------------------------------------------------------------*/}
                        {/* End Profile Dropdown                                                           */}
                        {/*--------------------------------------------------------------------------------*/}
                        {/*--------------------------------------------------------------------------------*/}
                        {/* Start Create New Dropdown                                                      */}
                        {/*--------------------------------------------------------------------------------*/}
                        {/*  <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav>
                                <i className="flag-icon flag-icon-us"></i>
                            </DropdownToggle>
                            <DropdownMenu
                                right
                                className="animated bounceInDown"
                            >
                                <DropdownItem>
                                    <i className="flag-icon flag-icon-us"></i>{" "}
                                    English
                                </DropdownItem>
                                <DropdownItem>
                                    <i className="flag-icon flag-icon-fr"></i>{" "}
                                    French
                                </DropdownItem>
                                <DropdownItem>
                                    <i className="flag-icon flag-icon-es"></i>{" "}
                                    Spanish
                                </DropdownItem>
                                <DropdownItem>
                                    <i className="flag-icon flag-icon-de"></i>{" "}
                                    German
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>*/}
                        {/*--------------------------------------------------------------------------------*/}
                        {/* End Create New Dropdown                                                        */}
                        {/*--------------------------------------------------------------------------------*/}
                    </Nav>
                </Collapse>
            </Navbar>
        </header>
    );
};
