import * as React from "react";

export interface GenericInput
{
	handleChange(): void;
}

export interface GenericInputs
{
	inputs: GenericInput[];
}

export interface TextInput extends GenericInput
{
    label: string;
}

export interface RadioInput extends GenericInput
{
	label: string;
	value: string;
	columns: number;
}

export interface RadioInputs 
{
	radioInputs: RadioInput[];
}

export class RadioGroup extends React.Component<RadioInputs, undefined>
{
	constructor(props: RadioInputs)
	{
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange()
	{
		// handle delete
	}

	render()
	{
		return <div>
			{ /*
				this.props.radioInputs.map((object, index) => 
					// Input
				)
				*/
			}
		</div>;
	}
}

export class InputBuilder extends React.Component<GenericInputs, undefined>
{
	constructor(props: GenericInputs)
	{
		super(props);
	}

	render()
	{
		return <div>
			{ /*
				this.props.inputs.map((object, index) =>
					//
				)
				*/
			}
		</div>;
	}
}