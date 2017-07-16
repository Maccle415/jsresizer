import * as React from "react";

export enum SettingsEnum 
{
    width = 0,
    height = 1,
    isPercentage = 2,
    percentage = 3,
    rotation = 4,
    outputName = 5,
    format = 6,
    quality = 7
}

export interface GenericInput
{
	handleChange(input: GenericInput): void;
}

export interface LabelTextInput extends GenericInput
{
	forKey: SettingsEnum;
	label: string;
}

export interface TextInput extends GenericInput
{
	forKey: SettingsEnum;
}

export interface RadioInput extends GenericInput
{
	label: string;
	forGroup: string;
	forKey: SettingsEnum;
}

export class InputFactory
{
	// TODO: These need to be created as components
	static labelTextInput(inputSettings: LabelTextInput)
	{
		return <div>
			<label>{ inputSettings.label }</label>
			<input type="text" onChange={ (e) => inputSettings.handleChange } key={ inputSettings.forKey }/>
		</div>;
	}

	static textInput(inputSettings: TextInput)
	{
		return <div>
			<input type="text" onChange={ (e) => inputSettings.handleChange } key={ inputSettings.forKey }/>
		</div>;
	}

	static radioInput(inputSettings: RadioInput)
	{
		return <div>
			<input type="radio" name={ inputSettings.forGroup } onChange={ (e) => inputSettings.handleChange } key={ inputSettings.forKey } />
		</div>;
	}
}

export class InputModel
{
	static sizePercentageGroup = "sizePercentageGroup";
	static rotationGroup = "rotationGroup";
	static fileTypeGroup = "fileTypeGroup";

	// Text inputs
	static widthSettings(input: GenericInput): LabelTextInput
	{
		return {
			label: "Width",
			forKey: SettingsEnum.width,
			handleChange: input.handleChange
		}
	}

	static heightSettings(input: GenericInput): LabelTextInput
	{
		return {
			label: "Height",
			forKey: SettingsEnum.height,
			handleChange: input.handleChange
		}
	}

	static percentageSettings(input: GenericInput): LabelTextInput
	{
		return {
			label: "Percentage",
			forKey: SettingsEnum.percentage,
			handleChange: input.handleChange
		}
	}

	static outputFileName(input: GenericInput): LabelTextInput
	{
		return {
			label: "Output File Name",
			forKey: SettingsEnum.outputName,
			handleChange: input.handleChange
		}
	}

	// Number inputs
	static quality(input: GenericInput): LabelTextInput
	{
		return {
			label: "Quality",
			forKey: SettingsEnum.quality,
			handleChange: input.handleChange
		}
	}

	// Radio
	static usePercentage(input: GenericInput): RadioInput 
	{
		return {
			label: "Do not use Percentage",
			forGroup: InputModel.sizePercentageGroup,
			handleChange: input.handleChange,
			forKey: SettingsEnum.isPercentage
		}
	}

	static doNotUsePercentage(input: GenericInput): RadioInput 
	{
		return {
			label: "Use Percentage",
			forGroup: InputModel.sizePercentageGroup,
			handleChange: input.handleChange,
			forKey: SettingsEnum.isPercentage
		}
	}

	static noRotation(input: GenericInput): RadioInput
	{
		return {
			label: "No rotation",
			forGroup: InputModel.rotationGroup,
			handleChange: input.handleChange,
			forKey: SettingsEnum.rotation
		}
	}

	static cwRotation(input: GenericInput): RadioInput 
	{
		return {
			label: "90 CW",
			forGroup: InputModel.rotationGroup,
			handleChange: input.handleChange,
			forKey: SettingsEnum.rotation
		}
	}

	static upsideDownRotation(input: GenericInput): RadioInput
	{
		return {
			label: "180",
			forGroup: InputModel.rotationGroup,
			handleChange: input.handleChange,
			forKey: SettingsEnum.rotation
		}
	}

	static ccwRotation(input: GenericInput): RadioInput
	{
		return {
			label: "90 CCW",
			forGroup: InputModel.rotationGroup,
			handleChange: input.handleChange,
			forKey: SettingsEnum.rotation
		}
	}

	static jpgFormat(input: GenericInput): RadioInput 
	{
		return {
			label: "Use Percentage",
			forGroup: InputModel.fileTypeGroup,
			handleChange: input.handleChange,
			forKey: SettingsEnum.format
		}
	}

	static pngFormat(input: GenericInput): RadioInput
	{
		return {
			label: "No rotation",
			forGroup: InputModel.fileTypeGroup,
			handleChange: input.handleChange,
			forKey: SettingsEnum.format
		}
	}

	static tiffFormat(input: GenericInput): RadioInput
	{
		return {
			label: "90 CW",
			forGroup: InputModel.fileTypeGroup,
			handleChange: input.handleChange,
			forKey: SettingsEnum.format
		}
	}

	static gifFormat(input: GenericInput): RadioInput
	{
		return {
			label: "180",
			forGroup: InputModel.fileTypeGroup,
			handleChange: input.handleChange,
			forKey: SettingsEnum.format
		}
	}

	static webpFormat(input: GenericInput): RadioInput 
	{
		return {
			label: "WebP",
			forGroup: InputModel.fileTypeGroup,
			handleChange: input.handleChange,
			forKey: SettingsEnum.format
		}
	}
}

export class InputBuilder
{
	static resize(input: GenericInput): [any]
	{
		let width = InputFactory.labelTextInput(InputModel.widthSettings(input));
		let height = InputFactory.labelTextInput(InputModel.heightSettings(input));
		let percentageGroup = [
			InputFactory.radioInput(InputModel.doNotUsePercentage(input)), 
			InputFactory.radioInput(InputModel.usePercentage(input))
		];
		let percentage = InputFactory.labelTextInput(InputModel.percentageSettings(input));

		return [
			width, 
			height, 
			percentageGroup, 
			percentage
		]
	}

	static rotate(input: GenericInput): any
	{
		let rotationGroup = [
			InputFactory.radioInput(InputModel.noRotation(input)),
			InputFactory.radioInput(InputModel.cwRotation(input)),
			InputFactory.radioInput(InputModel.upsideDownRotation(input)),
			InputFactory.radioInput(InputModel.ccwRotation(input))
		];

		return rotationGroup
	}

	static output(input: GenericInput): [any]
	{
		let output = InputFactory.labelTextInput(InputModel.outputFileName(input));
		let formatGroup = [
			InputFactory.radioInput(InputModel.jpgFormat(input)),
			InputFactory.radioInput(InputModel.pngFormat(input)),
			InputFactory.radioInput(InputModel.tiffFormat(input)),
			InputFactory.radioInput(InputModel.gifFormat(input)),
			InputFactory.radioInput(InputModel.webpFormat(input))
		];
		let quality = InputFactory.labelTextInput(InputModel.quality(input));

		return [
			output, 
			formatGroup, 
			quality
		]
	}
}