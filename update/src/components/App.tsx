import * as React from "react";
import { Files, FileSelector } from "./FileSelector";
import { InputFileViewer, FileDisplayable, FilesDisplayable } from "./InputFileViewer";
import { FileHandler } from "../helpers/FileHandler";

export interface Settings
{
    width: number;
    height: number;
    isPercentage: boolean;
    percentage: number;
    rotation: number;
    outputName: string;
    format: string;
    quality: number;
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

    componentWillMount() 
    {
        // Set up initial state
        this.setState({
            inputFiles: null, 
            displayableFiles: [], 
            outputFiles: null, 
            settings: null
        });
    }

    // This will set the current input file state
    inputFiles(files: Files)
    {
        this.setState({
            inputFiles: files
        }, function() {
            this.createDisplayableFile();
        });
    }

    createDisplayableFile()
    {
        let displayableFiles: FilesDisplayable = { filesDisplayable: [] };

        for (let x = 0; x < this.state.inputFiles.files.length; x++) 
        {
            let displayableFile: FileDisplayable = {
                file: this.state.inputFiles.files[x],
                deleted: false, 
                view: false, 
                handleDelete: this.handleFileDelete
            }

            displayableFiles.filesDisplayable.push(displayableFile);
        }



        this.setState((prevState, props) => ({
            displayableFiles: displayableFiles.filesDisplayable
        }));
    }

    // Handle deleting of files from inputFiles
    handleFileDelete(file: FileDisplayable) 
    {
        let files = this.state.displayableFiles;
        var deleteIndex = 0;

        for (let fileIndex in files)
        {
            if (files[fileIndex] == file)
            {
                deleteIndex = parseInt(fileIndex);
            }
        }

        files.splice(deleteIndex, 1);

        this.setState((prevState, props) => ({
            displayableFiles: files
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