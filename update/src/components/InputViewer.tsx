import * as React from "react";
import * as Inputs from "../interface/InputInterface";

export class InputViewer extends React.Component<Inputs.GenericInput, undefined>
{
	constructor(prop: Inputs.GenericInput)
	{
		super(prop);
		console.log(prop);
	}
	
	render()
	{
		let resize = Inputs.InputBuilder.resize(this.props);
		let rotate = Inputs.InputBuilder.rotate(this.props);
		let output = Inputs.InputBuilder.output(this.props);
		return <div>
			{ resize }
			{ rotate }
			{ output }
		</div>;
	}
}