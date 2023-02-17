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
import "react-table/react-table.css";
import { CommentService } from "../../jwt/_services/Comment.service";

const Comment = () => {
    const [comments, setComments] = useState([]);
    const [modal, setModal] = useState(false);
    const [edit, setEdit] = useState(false);
    const [commentId, setCommentId] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await CommentService.getAllComments();

            setComments(result);
        };

        fetchData();
    }, []);

    const toggle = () => {
        setModal(!modal);
    };

    const openDialog = (commentId) => {
        setCommentId(commentId);
        setModal(true);
    };

    const deleteComment = async () => {
        const result = await CommentService.deleteComment(commentId);
        const filteredArticles = comments.filter(
            (comment) => comment.id != commentId
        );
        setComments(filteredArticles);
        setCommentId(false);
        setModal(false);
    };

    return (
        <>
            <Modal isOpen={modal} toggle={toggle.bind(null)}>
                <ModalHeader toggle={toggle.bind(null)}>Comment</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this comment?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={deleteComment}>
                        YES
                    </Button>
                    <Button color="secondary" onClick={toggle.bind(null)}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            <Card>
                <CardTitle className="mb-0 p-3 border-bottom bg-light">
                    <i className="mdi mdi-border-right mr-2"></i>Comments
                </CardTitle>
                <CardBody>
                    <ReactTable
                        columns={[
                            {
                                Header: "Author",
                                accessor: "author",
                            },
                            {
                                Header: "Message",
                                accessor: "message",
                            },

                            {
                                Header: "Actions",
                                accessor: "id",
                                id: "actions",
                                sortable: false,
                                filterable: false,
                                Cell: (props) => {
                                    console.log(props);
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
                                        </div>
                                    );
                                },
                            },
                        ]}
                        defaultPageSize={10}
                        showPaginationBottom={true}
                        className="-striped -highlight"
                        data={comments}
                        filterable
                    />
                </CardBody>
            </Card>
        </>
    );
};

export default Comment;
