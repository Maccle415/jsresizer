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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
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
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super.call(this) || this;
        _this.inputFiles = _this.inputFiles.bind(_this);
        return _this;
    }
    // This will set the current input file state
    App.prototype.inputFiles = function (files) {
        this.setState({
            inputFiles: files
        });
    };
    App.prototype.createDisplayableFile = function () {
        var displayableFiles;
        for (var x = 0; x < this.state.inputFiles.files.length; x++) {
            var displayableFile = {
                file: this.state.inputFiles.files[x],
                deleted: false,
                view: false,
                handleDelete: null
            };
            displayableFiles.filesDisplayable.push(displayableFile);
        }
        this.setState(function (prevState, props) { return ({
            displayableFiles: displayableFiles
        }); });
    };
    App.prototype.render = function () {
        return React.createElement("div", null,
            React.createElement(FileSelector_1.FileSelector, { handleFileSelect: this.inputFiles }),
            React.createElement(InputFileViewer_1.InputFileViewer, { filesDisplayable: this.state.displayableFiles }));
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
        this.props.handleFileSelect(this.createFileArrayWith(selectorFiles));
    };
    FileSelector.prototype.createFileArrayWith = function (selectorFiles) {
        var filesArray = [];
        var files;
        for (var selectorFileKey in selectorFiles) {
            var key = parseInt(selectorFileKey);
            if (!isNaN(key)) {
                var uploadedFile = {
                    name: selectorFiles[selectorFileKey].name,
                    blob: window.URL.createObjectURL(selectorFiles[selectorFileKey])
                };
                files.files.push(uploadedFile);
            }
        }
        return files;
    };
    FileSelector.prototype.render = function () {
        var _this = this;
        return React.createElement("div", null,
            React.createElement("input", { type: "file", onChange: function (e) { return _this.handleChange(e.target.files); } }));
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
        var _this = _super.call(this, props) || this;
        _this.delete = _this.delete.bind(_this);
        return _this;
    }
    InputFile.prototype.delete = function () {
        this.props.handleDelete(this.props);
    };
    InputFile.prototype.render = function () {
        return React.createElement("div", null,
            React.createElement("div", null, this.props.file.blob),
            React.createElement("div", null, this.props.file.name),
            React.createElement("div", { onClick: this.delete }, "Delete"));
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
    InputFileViewer.prototype.handleDelete = function () {
        console.log("TEST TEST");
        // TODO: Remove image from files and re-render
    };
    InputFileViewer.prototype.handleView = function () {
        // TODO: Open the image in a new tab
    };
    InputFileViewer.prototype.render = function () {
        var _this = this;
        return React.createElement("div", null, this.props.filesDisplayable.map(function (object, index) {
            return React.createElement(InputFile_1.InputFile, { file: object.file, deleted: object.deleted, view: object.view, handleDelete: _this.handleDelete, key: index });
        }));
    };
    return InputFileViewer;
}(React.Component));
exports.InputFileViewer = InputFileViewer;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(2);
var App_1 = __webpack_require__(1);
ReactDOM.render(React.createElement("div", null,
    React.createElement(App_1.App, null)), document.getElementById("app"));


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map