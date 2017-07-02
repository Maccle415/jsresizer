import { FileDisplayable, FilesDisplayable } from "../components/InputFileViewer";

export class FileHandler
{
	static delete(file: FileDisplayable, fromFiles:FilesDisplayable): FilesDisplayable
	{
		let fileIndex = fromFiles.filesDisplayable.indexOf(file);
		fromFiles.filesDisplayable.splice(fileIndex, 1);

		return fromFiles;
	}
}