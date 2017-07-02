import * as React from "react";
import { File, Files } from "./FileSelector";
import { FileDisplayable } from "./InputFileViewer";

export class InputFile extends React.Component<FileDisplayable, undefined>
{
	constructor(props: FileDisplayable)
	{
		super(props);
		this.delete = this.delete.bind(this);
	}

	delete()
	{
		this.props.handleDelete(this.props);
	}

	render() 
	{
		return <div>
			<div>{ this.props.file.blob }</div>
			<div>{ this.props.file.name }</div>
			<div onClick={ this.delete }>Delete</div>
		</div>;
	}
}