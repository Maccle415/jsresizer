var fileInput = document.querySelector("#fileInput");
var imgEl = document.querySelector("#imgEl");
var setFormat = "";
var origFileName = "";
var usePerc = document.getElementById("percentage-yes");
var doNotUsePerc = document.getElementById("percentage-no");
var imageWidthPX = document.getElementById("imageWidthPX");
var imageHeightPX = document.getElementById("imageHeightPX");
var imageSizePerc = document.getElementById("imageSizePerc");
var closeWarning = document.getElementById("closeWarning");
var imageQual = document.getElementById("imageQuality");
var imageQualEl = document.getElementsByName("imageFormat");
var startProcessing = document.getElementById("startProcessing");
var loader = document.getElementById("loader");
var imageSelectedCountDisplay = document.getElementById("selectedImageCount");
var imageSelectedHolder = document.getElementById("selectedImageCountHolder");
var webpStyle = document.getElementsByClassName("formatWebpStyle")[0];
var autoDownload = true;
var selectFilesArray = [];
var outputFiles = [];
var selectedImageComponentHolder = document.getElementById("selectedImageComponentHolder");
var selectedImageComponent = document.getElementById("selectedImageComponent");
var selectedImageDelete = document.getElementsByClassName("delete-image");
var toggleAutoDownload = document.getElementById("toggleAutoDownload");
var manualDownloadContainer = document.getElementById("manualDownloadContainer");

var fileReaders = [];
var selectedImageCount = 0;

//disable percentage
imageSizePerc.disabled = true;

var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
var isFF = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

if (!isChrome && !isFF)
{
	var bWarning = document.getElementById("browserWarning");
	bWarning.style.visibility = "visible";
}

if (!isChrome) 
{
	webpStyle.style.visibility = "hidden";
}

function Main() {}
var main = new Main();
var files;
var filesLength;
var fileNames = [];
var deletedFileIndexes = [];

Main.prototype.inputFiles = function(argFiles)
{
	files = fileInput.files;	
	var size = [];//image size array
	filesLength = files.length;

	for (var i in files)
	{
		if (typeof files[i] == "object")
		{
			fileNames.push(files[i].name);

			var file = {
				"name" : files[i].name,
				"file" : window.URL.createObjectURL(files[i])
			};

			selectFilesArray.push(file);
		}
	}

	main.updateSelectedImageCounter();
	main.createSelectedImageComponent();

	$("html, body").animate({ scrollTop: document.body.scrollHeight }, 1000);
};

function deleteImageAtIndex(index) {
	deletedFileIndexes.push(index);
	selectFilesArray.splice(index, 1);
	
	// re-render
	main.updateSelectedImageCounter();
	main.createSelectedImageComponent();
}

Main.prototype.createSelectedImageComponent = function () 
{
	var innerHtml = "";
	var index = 0;

	selectedImageComponentHolder.innerHTML = innerHtml;
	selectedImageComponentHolder.style.display = "none";

	if (selectFilesArray.length > 0) 
	{
		for (selectedFileKey in selectFilesArray) 
		{
			var currentFile = selectFilesArray[selectedFileKey];
			var element = "<div class='col-md-3 image-component'>" +
							"<div class='col-md-12 image-holder'>" +
								"<i class='delete-image icon-cancel-circle' onclick='deleteImageAtIndex(" + index + ")'></i>" +
								"<img src='" + currentFile["file"] + "' class='image-size'/>" +
								"<input type='text' maxlength='25' class='file-name' value='" + currentFile["name"] + "' disabled>" +
							"</div>" +
						"</div>";
			
			innerHtml += element;
			index++;
		}

		selectedImageComponentHolder.innerHTML = innerHtml;
		selectedImageComponentHolder.style.display = "block";
	}
}

Main.prototype.createManualDownloadComponent = function() 
{
	var outputHTML = "";

	for (var i in outputFiles) {
		var element = "<div class='row border-below'>" +
							"<div class='col-md-3'>" +
								"<img src='" + outputFiles[i].file + "' class='manual-download-image-size'/>" +
							"</div>" +
							"<div class='col-md-6'>" +
								"<label class='manual-download-lable'>" + outputFiles[i].name + "</label>" +
							"</div>" +
							"<div class='col-md-3'>" +
								"<div class='col-md-5 manual-download-button'>" +
									"<a href='" + outputFiles[i].file + "' target='_blank'><label>View</label></a>" +
								"</div>" +
								"<div class='col-md-6 manual-download-button'>" +
									"<a href='" + outputFiles[i].file + "' target='_blank' download='" + outputFiles[i].name + "'><label>Download</label></a>" +
								"</div>" +
							"</div>" +
						"</div>";
		outputHTML += element;
	}

	manualDownloadContainer.innerHTML = outputHTML;

}

Main.prototype.drawToCanvas = function(imgSrc, fileName)
{
	var cvs = document.getElementById('canvasImage');
	var ctx = cvs.getContext('2d');
	var img = new Image;
	img.onload = function()
	{
		var imgSize = main.calcImageSize(img);

		img.width = imgSize[0];
		img.height = imgSize[1];

		cvs.width = img.width;
		cvs.height = img.height;
	  	ctx.drawImage(img,0,0); // Or at whatever offset you like
	  	main.rotateImage("180", cvs, ctx, img, fileName)
	};
	img.src = imgSrc;
};

Main.prototype.rotationType = function() 
{
	var rotation = document.getElementsByName("rotation");

	for (var i in rotation)
	{
		if (typeof rotation[i] == "object")
		{
			if (rotation[i].checked)
			{
				return rotation[i].value;
			}
		}
	}
}

Main.prototype.rotateImage = function(rotationType, cvs, ctx, img, fileName)
{
	rotationType = main.rotationType();

	var cvs2 = document.getElementById('canvasImage');
	ctx.clearRect(0, 0, cvs.width, cvs.height);
	cvs = null;

	switch(rotationType)
	{
		case "none":
			cvs2.width = img.width;
			cvs2.height = img.height;
			ctx.rotate(0 * Math.PI / 180);
			ctx.drawImage(img, 0, 0, img.width, img.height);
			break;
		case "90CW":
			cvs2.width = img.height;
			cvs2.height = img.width;
			ctx.rotate(90 * Math.PI / 180);
			ctx.drawImage(img, 0, -img.height, img.width, img.height);
			break;
		case "180":
			cvs2.width = img.width;
			cvs2.height = img.height;
			ctx.rotate(180 * Math.PI / 180);
			ctx.drawImage(img, -img.width, -img.height, img.width, img.height);
			break;
		case "90CCW":
			cvs2.width = img.height;
			cvs2.height = img.width;
			ctx.rotate(270 * Math.PI / 180);
			ctx.drawImage(img, -img.width, 0, img.width, img.height);
			break;
		default: 
			break;
	}

	main.download(cvs2, fileName, false);
};

Main.prototype.calcImageSize = function(image)
{
	imageWidthPXVal = imageWidthPX.value;
	imageHeightPXVal = imageHeightPX.value;
	imageSizePercVal = imageSizePerc.value;
	
	var resizeType = "px";

	if (usePerc.checked)
	{
		resizeType = "perc";
	}

	if (resizeType == "px")
	{
		//if one side is not set then scale proportionally
		if (imageHeightPXVal == 0 || imageHeightPXVal.length == 0)
		{
			var origWidth = image.width;
			var propSize = imageWidthPXVal / origWidth;

			imageHeightPXVal = Math.floor(image.height * propSize);
		}

		if (imageWidthPXVal == 0 || imageWidthPXVal.length == 0)
		{
			var origHeight = image.height;
			var propSize = imageHeightPXVal / origHeight;

			imageWidthPXVal = Math.floor(image.width * propSize);
		}

		if ((imageWidthPXVal == 0 || imageWidthPXVal.length == 0) && (imageHeightPXVal == 0 || imageHeightPXVal.length == 0))
		{
			imageWidthPXVal = image.width;
			imageHeightPXVal = image.height;
		}

		return [imageWidthPXVal, imageHeightPXVal];
	}
	else 
	{
		if (!imageSizePercVal) 
		{
			imageSizePercVal = 100;
		}

		image.width = Math.floor((image.width * imageSizePercVal) / 100);
		image.height = Math.floor((image.height * imageSizePercVal) / 100);
	}

	return [image.width, image.height];
};

Main.prototype.download = function(canvas, fileName, isInitial)
{
	var jpg = document.getElementById("formatJpg");
	var png = document.getElementById("formatPng");
	var tiff = document.getElementById("formatTiff");
	var gif = document.getElementById("formatGif");
	var webp = document.getElementById("formatWebp");
	var format = "image/jpeg";//default
	var quality = document.getElementById("imageQuality").value / 100;

	if (jpg.checked)
	{
		setFormat = "jpg";
		format = jpg.value;
	}
	if (png.checked)
	{
		setFormat = "png"
		format = png.value;
	}

	if (tiff.checked)
	{
		setFormat = "tiff"
		format = tiff.value;
	}

	if (gif.checked)
	{
		setFormat = "gif"
		format = gif.value;
	}

	if (webp.checked)
	{
		setFormat = "webp"
		format = webp.value;
	}

	canvas.toBlob(main.createDownloadLink(fileName), format, quality);
};

Main.prototype.usingOutputName = function() 
{
	if (document.getElementById("outputFileName").value.length == 0)
	{
		return true;
	}

	return false;
}

var fileCounter = 0;

Main.prototype.createDownloadLink = function(imageName) 
{
	var anchor = document.createElement('a');
	var fileName = "";

	if (document.getElementById("outputFileName").value.length == 0)
	{
		fileName = imageName.substr(0, imageName.lastIndexOf('.'));
	}
	else
	{
		fileName = document.getElementById("outputFileName").value
	}
	
	return function(blob) 
	{
		var url = window.URL.createObjectURL(blob);
		var file = {
			"name" : (imageName == null) ? fileName : imageName,
			"file" : url
		};

		anchor.download = fileName + "." + setFormat;
		// dlLink.href = dataUrl;
		anchor.href = url;
		anchor.target = "_blank";
		anchor.title = "Download image";
		anchor.className = "download";
		anchor.style.visibility = "hidden";

		if (autoDownload)
		{
			document.body.appendChild(anchor);
			anchor.click();
		}
		else 
		{
			var file = {
				"name" : (imageName == null) ? fileName : imageName,
				"file" : url,
				"anchor" : anchor
			};
			outputFiles.push(file);
		}

		var totalFiles = (filesLength - 1) - deletedFileIndexes.length;

		if (totalFiles == fileCounter) {
			fileCounter = 0;
			loader.style.display = "none";
			main.reset();

			if (!autoDownload) {
				main.createManualDownloadComponent();
			}

			return;
		}

		fileCounter++;
	}
}

Main.prototype.updateSelectedImageCounter = function () 
{
	selectedImageCount = selectFilesArray.length;
	main.updateUIForSelectedImageCounter();
}

Main.prototype.updateUIForSelectedImageCounter = function() 
{
	if (selectedImageCount > 0) 
	{
		imageSelectedCountDisplay.innerText = selectedImageCount;
		imageSelectedHolder.style.display = "block";
	} 
	else 
	{
		imageSelectedHolder.style.display = "none";
	}
}

Main.prototype.reset = function() 
{
	fileInput.value = "";
	fileInput.files = null;
	fileNames = [];
	filesLength = fileNames.length;
	main.updateSelectedImageCounter();
}

fileInput.addEventListener("change", function(e)
{
	// create fake canvas image to break the download issue. 
	main.inputFiles();
});

usePerc.addEventListener("change", function() {
	toggleSizeFields();
});

doNotUsePerc.addEventListener('change', function() {
	toggleSizeFields();
});

function toggleSizeFields() {
	imageWidthPX.disabled = false;
	imageHeightPX.disabled = false;
	imageSizePerc.disabled = true;

	if (usePerc.checked)
	{
		imageWidthPX.disabled = true;
		imageHeightPX.disabled = true;
		imageSizePerc.disabled = false;
	}
}

startProcessing.addEventListener("click", function() {
	var rFunc = function(i)
	{
		var nextIterate = i + 1;
		if (typeof files[i] == "object")
		{
			origFileName = files[i].name;
			var reader = new FileReader();
			reader.onload = function(e)
		    {
				// if not deleted
				if (deletedFileIndexes.indexOf(i) == -1) {
					main.drawToCanvas(reader.result, fileNames[i]);
				}

				if (i < filesLength) 
				{
					rFunc(nextIterate);
				}
			};
			reader.readAsDataURL(files[i]);
		}
		if (i < filesLength)
		{
			rFunc(nextIterate);
		}
	}
	
	loader.style.display = "inline-block";
	// ga('send', 'event', 'Resizing', 'resize', 'resize images');
	// ga('send', 'event', 'OutputType', setFormat, 'output type');
	// ga('send', 'event', 'FileCount', filesLength, 'file count');
	// ga('send', 'event', 'Rotation', main.rotationType, 'rotation type');
	// ga('send', 'event', 'UsingOutputFileName', main.usingOutputName, 'using output name');
	// ga('send', 'event', 'Width', main.usingWidthPx, 'using output name');
	// ga('send', 'event', 'Height', main.usingHeigtPx, 'using output name');
	// ga('send', 'event', 'UsingPercentage', main.usingPercentage, 'using output name');
	rFunc(0);

	fileInput.value = "";//clear the file input to be able to use the same file
});

toggleAutoDownload.addEventListener("click", function() 
{
	autoDownload = !autoDownload;

	if (!autoDownload) {
		toggleAutoDownload.innerText = "Enable Auto Download"
		toggleAutoDownload.style.borderColor = "#60a7a2";
	} else {
		toggleAutoDownload.innerText = "Disable Auto Download"
		toggleAutoDownload.style.borderColor = "#909090";
	}
});

Main.prototype.usingWidthPx = function() 
{
	if (imageWidthPX.value.length > 0) 
	{
		return true;
	}

	return false;
}

Main.prototype.usingHeigtPx = function() 
{
	if (imageHeightPX.value.length > 0) 
	{
		return true;
	}

	return false;
}

Main.prototype.usingPercentage = function()
{
	if (usePerc.checked) 
	{
		return true
	}

	return false;
}

for (i in imageQualEl)
{
	if (typeof imageQualEl[i] == "object")
	{
		imageQualEl[i].onclick = function()
		{
			if (this.id == "formatJpg")
			{
				imageQual.disabled = false;
			}
			else if (this.id == "formatPng")
			{
				imageQual.disabled = true;
			}
		};
	}
}