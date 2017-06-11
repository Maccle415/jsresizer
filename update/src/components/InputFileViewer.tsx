import * as React from "react";
import { File, Files } from "./FileSelector";
import { InputFile } from "./InputFile";

export interface FileDisplayable
{
	file: File;
	deleted: Boolean;
	view: Boolean
	handleDelete(file: FileDisplayable): void;
}

export interface FilesDisplayable
{
	filesDisplayable : FileDisplayable[];
}

export class InputFileViewer extends React.Component<FilesDisplayable, undefined>
{
	constructor(props: FilesDisplayable) 
	{
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleView = this.handleView.bind(this);
	}

	handleDelete()
	{
		console.log("TEST TEST");
		// TODO: Remove image from files and re-render
	}

	handleView()
	{
		// TODO: Open the image in a new tab
	}

	render()
	{
		return <div>
			{ this.props.filesDisplayable.map((object, index) =>
				<InputFile file={ object.file } deleted={ object.deleted } view={ object.view } handleDelete={ this.handleDelete } key={ index } />
			)}
		</div>;
	}
}