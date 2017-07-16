/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var FileSelector_1 = __webpack_require__(3);
var InputFileViewer_1 = __webpack_require__(5);
var InputViewer_1 = __webpack_require__(6);
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super.call(this) || this;
        _this.inputFiles = _this.inputFiles.bind(_this);
        _this.handleFileDelete = _this.handleFileDelete.bind(_this);
        _this.handleSettingsChange = _this.handleSettingsChange.bind(_this);
        return _this;
    }
    App.prototype.componentWillMount = function () {
        // Set up initial state
        this.setState({
            inputFiles: null,
            displayableFiles: [],
            outputFiles: null,
            settings: null
        });
    };
    // This will set the current input file state
    App.prototype.inputFiles = function (files) {
        this.setState({
            inputFiles: files
        }, function () {
            this.createDisplayableFile();
        });
    };
    App.prototype.createDisplayableFile = function () {
        var displayableFiles = { filesDisplayable: [] };
        for (var x = 0; x < this.state.inputFiles.files.length; x++) {
            var displayableFile = {
                file: this.state.inputFiles.files[x],
                deleted: false,
                view: false,
                handleDelete: this.handleFileDelete
            };
            displayableFiles.filesDisplayable.push(displayableFile);
        }
        this.setState(function (prevState, props) { return ({
            displayableFiles: displayableFiles.filesDisplayable
        }); });
    };
    // Handle deleting of files from inputFiles
    App.prototype.handleFileDelete = function (file) {
        var files = this.state.displayableFiles;
        var deleteIndex = 0;
        for (var fileIndex in files) {
            if (files[fileIndex] == file) {
                deleteIndex = parseInt(fileIndex);
            }
        }
        files.splice(deleteIndex, 1);
        this.setState(function (prevState, props) { return ({
            displayableFiles: files
        }); });
    };
    App.prototype.handleSettingsChange = function (input) {
        console.log("Settings changed, APP");
    };
    App.prototype.render = function () {
        var _this = this;
        return React.createElement("div", null,
            React.createElement(FileSelector_1.FileSelector, { handleFileSelect: this.inputFiles }),
            React.createElement(InputFileViewer_1.InputFileViewer, { filesDisplayable: this.state.displayableFiles }),
            React.createElement(InputViewer_1.InputViewer, { handleChange: function (e) { return _this.handleSettingsChange; } }));
    };
    return App;
}(React.Component));
exports.App = App;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
///////////////////////////////////////////////////////
//
//  File Selector Class
//
///////////////////////////////////////////////////////
var FileSelector = (function (_super) {
    __extends(FileSelector, _super);
    function FileSelector(props) {
        var _this = _super.call(this, props) || this;
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }
    FileSelector.prototype.handleChange = function (selectorFiles) {
        var files = this.createFileArrayWith(selectorFiles);
        this.props.handleFileSelect(files);
    };
    FileSelector.prototype.createFileArrayWith = function (selectorFiles) {
        var filesArray = [];
        var files = { files: filesArray };
        for (var selectorFileKey in selectorFiles) {
            var key = parseInt(selectorFileKey);
            if (!isNaN(key)) {
                var uploadedFile = {
                    name: selectorFiles[selectorFileKey].name,
                    blob: window.URL.createObjectURL(selectorFiles[selectorFileKey])
                };
                filesArray.push(uploadedFile);
            }
        }
        files.files = filesArray;
        return files;
    };
    FileSelector.prototype.render = function () {
        var _this = this;
        return React.createElement("div", null,
            React.createElement("input", { type: "file", multiple: true, onChange: function (e) { return _this.handleChange(e.target.files); } }));
    };
    return FileSelector;
}(React.Component));
exports.FileSelector = FileSelector;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var InputFile = (function (_super) {
    __extends(InputFile, _super);
    function InputFile(props) {
        return _super.call(this, props) || this;
    }
    InputFile.prototype.render = function () {
        var _this = this;
        return React.createElement("div", null,
            React.createElement("div", null, this.props.file.blob),
            React.createElement("div", null, this.props.file.name),
            React.createElement("button", { onClick: function (e) { return _this.props.handleDelete; } }, "Delete"));
    };
    return InputFile;
}(React.Component));
exports.InputFile = InputFile;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var InputFile_1 = __webpack_require__(4);
var InputFileViewer = (function (_super) {
    __extends(InputFileViewer, _super);
    function InputFileViewer(props) {
        var _this = _super.call(this, props) || this;
        _this.handleDelete = _this.handleDelete.bind(_this);
        _this.handleView = _this.handleView.bind(_this);
        return _this;
    }
    InputFileViewer.prototype.componentWillReceiveProps = function (nextProps) {
        console.log("Next props: ", nextProps);
    };
    InputFileViewer.prototype.handleDelete = function (file) {
        console.log("test test test test test");
        // file.handleDelete(file); // TODO: This does not make sense. Will be updated when FileDisplayable interface is sorted out
    };
    InputFileViewer.prototype.handleView = function () {
        // TODO: Open the image in a new tab
    };
    InputFileViewer.prototype.render = function () {
        var _this = this;
        return React.createElement("div", null, this.props.filesDisplayable.map(function (object, index) {
            return React.createElement(InputFile_1.InputFile, { file: object.file, deleted: object.deleted, view: object.view, handleDelete: function (e) { return _this.handleDelete; }, key: index });
        }));
    };
    return InputFileViewer;
}(React.Component));
exports.InputFileViewer = InputFileViewer;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Inputs = __webpack_require__(8);
var InputViewer = (function (_super) {
    __extends(InputViewer, _super);
    function InputViewer(prop) {
        var _this = _super.call(this, prop) || this;
        console.log(prop);
        return _this;
    }
    InputViewer.prototype.render = function () {
        var resize = Inputs.InputBuilder.resize(this.props);
        var rotate = Inputs.InputBuilder.rotate(this.props);
        var output = Inputs.InputBuilder.output(this.props);
        return React.createElement("div", null,
            resize,
            rotate,
            output);
    };
    return InputViewer;
}(React.Component));
exports.InputViewer = InputViewer;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(2);
var App_1 = __webpack_require__(1);
ReactDOM.render(React.createElement("div", null,
    React.createElement(App_1.App, null)), document.getElementById("app"));


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var SettingsEnum;
(function (SettingsEnum) {
    SettingsEnum[SettingsEnum["width"] = 0] = "width";
    SettingsEnum[SettingsEnum["height"] = 1] = "height";
    SettingsEnum[SettingsEnum["isPercentage"] = 2] = "isPercentage";
    SettingsEnum[SettingsEnum["percentage"] = 3] = "percentage";
    SettingsEnum[SettingsEnum["rotation"] = 4] = "rotation";
    SettingsEnum[SettingsEnum["outputName"] = 5] = "outputName";
    SettingsEnum[SettingsEnum["format"] = 6] = "format";
    SettingsEnum[SettingsEnum["quality"] = 7] = "quality";
})(SettingsEnum = exports.SettingsEnum || (exports.SettingsEnum = {}));
var InputFactory = (function () {
    function InputFactory() {
    }
    // TODO: These need to be created as components
    InputFactory.labelTextInput = function (inputSettings) {
        return React.createElement("div", null,
            React.createElement("label", null, inputSettings.label),
            React.createElement("input", { type: "text", onChange: function (e) { return inputSettings.handleChange; }, key: inputSettings.forKey }));
    };
    InputFactory.textInput = function (inputSettings) {
        return React.createElement("div", null,
            React.createElement("input", { type: "text", onChange: function (e) { return inputSettings.handleChange; }, key: inputSettings.forKey }));
    };
    InputFactory.radioInput = function (inputSettings) {
        return React.createElement("div", null,
            React.createElement("input", { type: "radio", name: inputSettings.forGroup, onChange: function (e) { return inputSettings.handleChange; }, key: inputSettings.forKey }));
    };
    return InputFactory;
}());
exports.InputFactory = InputFactory;
var InputModel = (function () {
    function InputModel() {
    }
    // Text inputs
    InputModel.widthSettings = function (input) {
        return {
            label: "Width",
            forKey: SettingsEnum.width,
            handleChange: input.handleChange
        };
    };
    InputModel.heightSettings = function (input) {
        return {
            label: "Height",
            forKey: SettingsEnum.height,
            handleChange: input.handleChange
        };
    };
    InputModel.percentageSettings = function (input) {
        return {
            label: "Percentage",
            forKey: SettingsEnum.percentage,
            handleChange: input.handleChange
        };
    };
    InputModel.outputFileName = function (input) {
        return {
            label: "Output File Name",
            forKey: SettingsEnum.outputName,
            handleChange: input.handleChange
        };
    };
    // Number inputs
    InputModel.quality = function (input) {
        return {
            label: "Quality",
            forKey: SettingsEnum.quality,
            handleChange: input.handleChange
        };
    };
    // Radio
    InputModel.usePercentage = function (input) {
        return {
            label: "Do not use Percentage",
            forGroup: InputModel.sizePercentageGroup,
            handleChange: input.handleChange,
            forKey: SettingsEnum.isPercentage
        };
    };
    InputModel.doNotUsePercentage = function (input) {
        return {
            label: "Use Percentage",
            forGroup: InputModel.sizePercentageGroup,
            handleChange: input.handleChange,
            forKey: SettingsEnum.isPercentage
        };
    };
    InputModel.noRotation = function (input) {
        return {
            label: "No rotation",
            forGroup: InputModel.rotationGroup,
            handleChange: input.handleChange,
            forKey: SettingsEnum.rotation
        };
    };
    InputModel.cwRotation = function (input) {
        return {
            label: "90 CW",
            forGroup: InputModel.rotationGroup,
            handleChange: input.handleChange,
            forKey: SettingsEnum.rotation
        };
    };
    InputModel.upsideDownRotation = function (input) {
        return {
            label: "180",
            forGroup: InputModel.rotationGroup,
            handleChange: input.handleChange,
            forKey: SettingsEnum.rotation
        };
    };
    InputModel.ccwRotation = function (input) {
        return {
            label: "90 CCW",
            forGroup: InputModel.rotationGroup,
            handleChange: input.handleChange,
            forKey: SettingsEnum.rotation
        };
    };
    InputModel.jpgFormat = function (input) {
        return {
            label: "Use Percentage",
            forGroup: InputModel.fileTypeGroup,
            handleChange: input.handleChange,
            forKey: SettingsEnum.format
        };
    };
    InputModel.pngFormat = function (input) {
        return {
            label: "No rotation",
            forGroup: InputModel.fileTypeGroup,
            handleChange: input.handleChange,
            forKey: SettingsEnum.format
        };
    };
    InputModel.tiffFormat = function (input) {
        return {
            label: "90 CW",
            forGroup: InputModel.fileTypeGroup,
            handleChange: input.handleChange,
            forKey: SettingsEnum.format
        };
    };
    InputModel.gifFormat = function (input) {
        return {
            label: "180",
            forGroup: InputModel.fileTypeGroup,
            handleChange: input.handleChange,
            forKey: SettingsEnum.format
        };
    };
    InputModel.webpFormat = function (input) {
        return {
            label: "WebP",
            forGroup: InputModel.fileTypeGroup,
            handleChange: input.handleChange,
            forKey: SettingsEnum.format
        };
    };
    return InputModel;
}());
InputModel.sizePercentageGroup = "sizePercentageGroup";
InputModel.rotationGroup = "rotationGroup";
InputModel.fileTypeGroup = "fileTypeGroup";
exports.InputModel = InputModel;
var InputBuilder = (function () {
    function InputBuilder() {
    }
    InputBuilder.resize = function (input) {
        var width = InputFactory.labelTextInput(InputModel.widthSettings(input));
        var height = InputFactory.labelTextInput(InputModel.heightSettings(input));
        var percentageGroup = [
            InputFactory.radioInput(InputModel.doNotUsePercentage(input)),
            InputFactory.radioInput(InputModel.usePercentage(input))
        ];
        var percentage = InputFactory.labelTextInput(InputModel.percentageSettings(input));
        return [
            width,
            height,
            percentageGroup,
            percentage
        ];
    };
    InputBuilder.rotate = function (input) {
        var rotationGroup = [
            InputFactory.radioInput(InputModel.noRotation(input)),
            InputFactory.radioInput(InputModel.cwRotation(input)),
            InputFactory.radioInput(InputModel.upsideDownRotation(input)),
            InputFactory.radioInput(InputModel.ccwRotation(input))
        ];
        return rotationGroup;
    };
    InputBuilder.output = function (input) {
        var output = InputFactory.labelTextInput(InputModel.outputFileName(input));
        var formatGroup = [
            InputFactory.radioInput(InputModel.jpgFormat(input)),
            InputFactory.radioInput(InputModel.pngFormat(input)),
            InputFactory.radioInput(InputModel.tiffFormat(input)),
            InputFactory.radioInput(InputModel.gifFormat(input)),
            InputFactory.radioInput(InputModel.webpFormat(input))
        ];
        var quality = InputFactory.labelTextInput(InputModel.quality(input));
        return [
            output,
            formatGroup,
            quality
        ];
    };
    return InputBuilder;
}());
exports.InputBuilder = InputBuilder;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map