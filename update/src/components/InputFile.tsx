import * as React from "react";
import { File, Files } from "./FileSelector";
import { FileDisplayable } from "./InputFileViewer";

export class InputFile extends React.Component<FileDisplayable, undefined>
{
	constructor(props: FileDisplayable)
	{
		super(props);
	}

	render() 
	{
		return <div>
			<div>{ this.props.file.blob }</div>
			<div>{ this.props.file.name }</div>
			<button onClick={ (e) => this.props.handleDelete }>Delete</button>
		</div>;
	}
}