import React, { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    CardTitle,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import ReactTable from "react-table";
import { ArticleService } from "../../jwt/_services/Article.service";
import "react-table/react-table.css";
import { Link } from "react-router-dom";

// import { v4 as uuidv4 } from "uuid";

const Dashboard = (id) => {
    const [articles, setArticles] = useState([]);
    const [modal, setModal] = useState(false);
    const [edit, setEdit] = useState(false);
    const [articleId, setArticleId] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await ArticleService.getAllArticles();

            setArticles(result);
        };

        fetchData();
    }, []);

    const toggle = () => {
        setModal(!modal);
    };

    const openDialog = (articleId) => {
        setArticleId(articleId);
        setModal(true);
    };

    const deleteArticle = async () => {
        const result = await ArticleService.deleteArticle(articleId);
        const filteredArticles = articles.filter(
            (article) => article.id != articleId
        );
        setArticles(filteredArticles);
        setArticleId(false);
        setModal(false);
    };

    return (
        <>
            <Modal isOpen={modal} toggle={toggle.bind(null)}>
                <ModalHeader toggle={toggle.bind(null)}>
                    Modal title
                </ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this article?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={deleteArticle}>
                        YES
                    </Button>
                    <Button color="secondary" onClick={toggle.bind(null)}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            <Card>
                <CardTitle className="mb-0 p-3 border-bottom bg-light">
                    <i className="mdi mdi-border-right mr-2"></i>Articles
                </CardTitle>
                <CardBody>
                    <ReactTable
                        columns={[
                            {
                                Header: "Title",
                                accessor: "title",
                            },
                            {
                                Header: "Description",
                                accessor: "description",
                                Cell: ({ value }) => {
                                    return (
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: value,
                                            }}
                                        />
                                    );
                                },
                            },
                            {
                                Header: "Actions",
                                accessor: "id",
                                id: "actions",
                                sortable: false,
                                filterable: false,
                                Cell: (props) => {
                                    //console.log(props);
                                    return (
                                        <div className="text-center">
                                            {/* use this button to remove the data row */}
                                            <Button
                                                onClick={() => {
                                                    openDialog(props.value);
                                                }}
                                                className="ml-1"
                                                color="danger"
                                                size="sm"
                                                round="true"
                                                icon="true"
                                            >
                                                <i className="fa fa-times" />
                                            </Button>
                                            <Link
                                                to={`/edit_article/${props.value}`}
                                            >
                                                <Button
                                                    className="ml-1"
                                                    color="primary"
                                                    size="sm"
                                                    round="true"
                                                    icon="true"
                                                >
                                                    <i className="far fa-edit"></i>
                                                </Button>
                                            </Link>
                                        </div>
                                    );
                                },
                            },
                        ]}
                        defaultPageSize={10}
                        showPaginationBottom={true}
                        className="-striped -highlight"
                        data={articles}
                        filterable
                    />
                </CardBody>
            </Card>
        </>
    );
};

export default Dashboard;
