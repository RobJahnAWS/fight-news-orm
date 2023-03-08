import React, { useCallback, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import Axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { ArticleService } from "../../jwt/_services/Article.service";
import {
	EditorState,
	convertToRaw,
	ContentState,
	convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const WYSIWYGEditor = (props) => {
	const [editorState, setEditorState] = useState(
		EditorState.createWithContent(
			ContentState.createFromBlockArray(
				convertFromHTML(props.value || "")
			)
		)
	);
	const onEditorStateChange = (editorState) => {
		setEditorState(editorState);
		return props.onChange(
			draftToHtml(convertToRaw(editorState.getCurrentContent()))
		);
	};

	return (
		<div className="editor">
			<Editor
				editorState={editorState}
				wrapperClassName="wysiwyg-wrapper"
				editorClassName="wysiwyg-editor"
				toolbarClassName="wysiwyg-toolbar"
				onEditorStateChange={onEditorStateChange}
			/>
		</div>
	);
};

const EditArticle = () => {
	const { register, handleSubmit, reset, errors, control } = useForm({});
	const [files, setFiles] = useState([]);
	const { id } = useParams();
	const history = useHistory();
	const [data, setData] = useState(false);
	const onDrop = useCallback((acceptedFiles) => {
		// Do something with the files
		setFiles(
			acceptedFiles.map((file) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file),
				})
			)
		);
	}, []);

	const {
		getRootProps,
		getInputProps,
		isDragActive,
		acceptedFiles,
		inputRef,
	} = useDropzone({
		accept: "image/*",
		onDrop,
	});

	const thumbs = files.map((file) => (
		<div className="dz-thumb" key={file.name}>
			<div className="dz-thumb-inner">
				<img src={file.preview} className="dz-img" alt={file.name} />
			</div>
		</div>
	));

	useEffect(() => {
		const loadArticle = async () => {
			const result = await Axios.get(
				`${process.env.REACT_APP_API_ENDPOINT}articles/by-id/${id}`, {headers: {"ngrok-skip-browser-warning": "any"}}
			);
			reset(result.data);
			setData(result.data);
		};
		loadArticle();
	}, []);

	const onSubmit = async (data) => {
		console.log(data);
		await ArticleService.editArticle(id, {
			id,
			title: data.title,
			description: data.description,
			isMain: data.isMain,
		});

		history.push("/dashboard");
	};

	return (
		<div>
			<h2 className="">Edit Article</h2>
			<hr className="divider-green" />
			<form onSubmit={handleSubmit(onSubmit)}>
				<Form.Group>
					<Form.Label>Title</Form.Label>
					<Form.Control
						ref={register({ required: true })}
						type="text"
						name="title"
						isInvalid={errors.title}
					/>
				</Form.Group>

				<Form.Group>
					<Form.Label>Description</Form.Label>
					{/* <Form.Control
                        ref={register({ required: true })}
                        as="textarea"
                        name="description"
                        isInvalid={errors.description}
                        rows="6"
                    /> */}
					{data && (
						<Controller
							name="description"
							control={control}
							render={({ onChange, value }) => {
								return (
									<WYSIWYGEditor
										onChange={onChange}
										value={value}
									/>
								);
							}}
							// as={<WYSIWYGEditor />}

							rules={{ required: true }}
						/>
					)}
				</Form.Group>

				<Form.Group controlId="formBasicCheckbox">
					<Form.Check
						type="checkbox"
						label="It is Main Article"
						name="isMain"
						ref={register()}
					/>
				</Form.Group>

				<Form.Group>
					<div {...getRootProps({ className: "dropzone" })}>
						<input {...getInputProps()} />
						{isDragActive ? (
							<p className="my-1">Drop the files here ...</p>
						) : (
							<p className="my-1">
								Drag 'n' drop some files here, or click to
								select files
							</p>
						)}
					</div>
				</Form.Group>

				<Form.Group>
					<aside className="thumb-container">{thumbs}</aside>
				</Form.Group>

				<Button variant="success" type="submit">
					SAVE
				</Button>
			</form>
		</div>
	);
};

export default EditArticle;
