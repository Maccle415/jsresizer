import * as React from "react";
import { InputFile } from "./InputFile";

///////////////////////////////////////////////////////
//
//  Interfaces
//
///////////////////////////////////////////////////////

export interface File
{
    name: string;
    blob: string;
}

export interface Files
{
    files : File[];
}

export interface FileSelectorProps
{
    handleFileSelect(files: Files): void;
}

///////////////////////////////////////////////////////
//
//  File Selector Class
//
///////////////////////////////////////////////////////

export class FileSelector extends React.Component<FileSelectorProps, undefined>
{
    constructor(props: FileSelectorProps)
    {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(selectorFiles: FileList)
    {
        this.props.handleFileSelect(this.createFileArrayWith(selectorFiles));
    }

    createFileArrayWith(selectorFiles: FileList): Files
    {
        let filesArray: File[] = [];
        let files: Files;

        for (let selectorFileKey in selectorFiles) 
        {
            let key = parseInt(selectorFileKey);

            if (!isNaN(key))
            {
                let uploadedFile: File = {
                    name: selectorFiles[selectorFileKey].name,
                    blob: window.URL.createObjectURL(selectorFiles[selectorFileKey])
                }
                files.files.push(uploadedFile);
            }
        }
        return files;
    }

    render ()
    {
        return <div>
            <input type="file" onChange={ (e) => this.handleChange(e.target.files) } />
        </div>;
    }
}