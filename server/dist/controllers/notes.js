"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.editNote = exports.addNote = exports.getNotes = void 0;
var Note_1 = __importDefault(require("../model/Note"));
var getNotes = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, id, notes, newAccessToken, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = req.decoded.user;
                id = user._id;
                return [4, Note_1.default.find({ user: id }).sort({ date: -1 })];
            case 1:
                notes = _a.sent();
                newAccessToken = req.accessToken;
                if (newAccessToken) {
                    res.send({ notes: notes, newAccessToken: newAccessToken });
                    return [2];
                }
                res.send({ notes: notes, newAccessToken: null });
                return [3, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                res.status(500).send({ message: new Error('Something went wrong') });
                return [3, 3];
            case 3:
                ;
                return [2];
        }
    });
}); };
exports.getNotes = getNotes;
var addNote = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, id, _a, title, content, preview, newNote, savedNote, accessToken, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                user = req.decoded.user;
                id = user._id;
                _a = req.body, title = _a.title, content = _a.content, preview = _a.preview;
                newNote = new Note_1.default({
                    title: title,
                    preview: preview,
                    content: content,
                    date: new Date(),
                    user: id,
                });
                return [4, newNote.save()];
            case 1:
                savedNote = _b.sent();
                accessToken = req.accessToken;
                if (!accessToken) {
                    res.json({ message: 'Note added', savedNote: savedNote });
                    return [2];
                }
                res.json({ message: 'Note added', savedNote: savedNote, accessToken: accessToken });
                return [3, 3];
            case 2:
                error_2 = _b.sent();
                console.error(error_2);
                res.status(500).json({ err: 'Something went wrong' });
                return [3, 3];
            case 3:
                ;
                return [2];
        }
    });
}); };
exports.addNote = addNote;
var editNote = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, title, preview, content, note, accessToken, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                id = req.params.id;
                _a = req.body, title = _a.title, preview = _a.preview, content = _a.content;
                return [4, Note_1.default.findById(id)];
            case 1:
                note = _b.sent();
                if (note === null)
                    throw new Error('Note does note exist.');
                note.title = title;
                note.preview = preview;
                note.content = content;
                note.date = new Date();
                return [4, note.save()];
            case 2:
                _b.sent();
                accessToken = req.accessToken;
                if (!accessToken) {
                    res.json({ message: 'Succesfully updated', note: note });
                    return [2];
                }
                res.json({ message: 'Succesfully updated', note: note, accessToken: accessToken });
                return [3, 4];
            case 3:
                error_3 = _b.sent();
                console.log(error_3);
                res.status(400).json({ message: 'Note is not in the database' });
                return [3, 4];
            case 4:
                ;
                return [2];
        }
    });
}); };
exports.editNote = editNote;
var deleteNote = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var accessToken, id, note, deletedNote, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                accessToken = req.accessToken;
                id = req.params.id;
                return [4, Note_1.default.findById(id)];
            case 1:
                note = _a.sent();
                if (note === null)
                    throw new Error('Note does not exist.');
                return [4, note.remove()];
            case 2:
                deletedNote = _a.sent();
                if (!accessToken) {
                    res.json({ message: 'Succesfully deleted', deletedNote: deletedNote });
                    return [2];
                }
                res.json({ message: 'Succesfully deleted', deletedNote: deletedNote, accessToken: accessToken });
                return [3, 4];
            case 3:
                error_4 = _a.sent();
                console.log(error_4);
                res.status(400).json({ message: error_4 });
                return [3, 4];
            case 4:
                ;
                return [2];
        }
    });
}); };
exports.deleteNote = deleteNote;
