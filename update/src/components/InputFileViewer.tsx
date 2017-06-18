import * as React from "react";
import { File, Files } from "./FileSelector";
import { InputFile } from "./InputFile";

export interface FileDisplayable
{
	file: File;
	deleted: Boolean;
	view: Boolean;
	handleDelete(file: FileDisplayable): void; // TODO: Remove, this needs to be moved to a more suitable location
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

	componentWillReceiveProps(nextProps: FilesDisplayable) 
	{
		console.log("Next props: ", nextProps);
	}

	handleDelete(file: FileDisplayable)
	{
		file.handleDelete(file); // TODO: This does not make sense. Will be updated when FileDisplayable interface is sorted out
	}

	handleView()
	{
		// TODO: Open the image in a new tab
	}

	render()
	{
		return <div>
			{ this.props.filesDisplayable.map((object, index) =>
				<InputFile file={ object.file } 
					deleted={ object.deleted } 
					view={ object.view } 
					handleDelete={ (e) => this.handleDelete }
					key={ index }
				/>
			)}
		</div>;
	}
}