import React, { useCallback, useState, useEffect } from "react";
//import axios from "../../configs/axios";
import { useForm, Controller } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDropzone } from "react-dropzone";
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
			ContentState.createFromBlockArray(convertFromHTML(props.value))
		)
	);
	const onEditorStateChange = (editorState) => {
		console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
		setEditorState(editorState);
		return props.onChange(
			draftToHtml(convertToRaw(editorState.getCurrentContent()))
		);
	};

	return (
		<React.Fragment>
			<div className="editor">
				<Editor
					defaultEditorState="<p>asdasd</p>"
					editorState={editorState}
					wrapperClassName="wysiwyg-wrapper"
					editorClassName="wysiwyg-editor"
					toolbarClassName="wysiwyg-toolbar"
					onEditorStateChange={onEditorStateChange}
				/>
			</div>
		</React.Fragment>
	);
};

const NewArticle = () => {
	const { register, handleSubmit, reset, errors, control } = useForm({
		defaultValues: {
			specifications: [{ field: "", value: "" }],
		},
	});
	const history = useHistory();
	const [files, setFiles] = useState([]);
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

	const onSubmit = (data) => {
		console.log(data);
		let formData = new FormData();
		if (acceptedFiles.length) {
			acceptedFiles.forEach((file) => {
				formData.append("files", file);
			});
		}

		formData.append("title", data.title);
		formData.append("description", data.description);
		formData.append("youtube", data.youtube);
		formData.append("isMain", data.isMain);
		fetch(`${process.env.REACT_APP_API_ENDPOINT}articles/upload`, {
			method: "POST",
			body: formData,
		})
			.then((response) => response.json())
			.then((result) => {
				history.push("/dashboard");
			})
			.catch((error) => console.log("error", error));
	};

	return (
		<div>
			<h2 className="">Create Article</h2>
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
					<Controller
						as={<WYSIWYGEditor />}
						name="description"
						control={control}
						rules={{ required: true }}
						defaultValue=""
					/>
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

				<Form.Group style={{"padding":"20px 0"}}>
					<Form.Label>YouTube Url</Form.Label>
					<Form.Control
						type="text"
						name="youtube"
						ref={register()}
					/>
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

export default NewArticle;
