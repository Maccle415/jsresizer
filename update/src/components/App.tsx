import * as React from "react";
import { Files, FileSelector } from "./FileSelector";
import { InputFileViewer, FileDisplayable, FilesDisplayable } from "./InputFileViewer";

export interface Settings
{
    width: number;
    height: number;
}

export interface AppStructure
{
    inputFiles: Files;
    displayableFiles: FileDisplayable[];
    outputFiles: Files;
    settings: any;
}

export class App extends React.Component<undefined, AppStructure>
{
    constructor()
    {
        super();
        this.inputFiles = this.inputFiles.bind(this);
    }

    // This will set the current input file state
    inputFiles(files: Files)
    {
        this.setState({
            inputFiles: files
        })
    }

    createDisplayableFile()
    {
        let displayableFiles: FilesDisplayable;
        for (let x = 0; x < this.state.inputFiles.files.length; x++) 
        {
            let displayableFile: FileDisplayable = {
                file: this.state.inputFiles.files[x],
                deleted: false, 
                view: false, 
                handleDelete: null
            }

            displayableFiles.filesDisplayable.push(displayableFile);
        }

        this.setState((prevState, props) => ({
            displayableFiles: displayableFiles
        }));
    }

    render ()
    {
        return <div>
            <FileSelector handleFileSelect={ this.inputFiles }/>
            <InputFileViewer filesDisplayable={ this.state.displayableFiles } />
        </div>;
    }
}