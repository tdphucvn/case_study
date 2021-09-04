"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authentication_middleware_1 = __importDefault(require("../middleware/authentication.middleware"));
var notes_1 = require("../controllers/notes");
var router = express_1.default.Router();
router.use(authentication_middleware_1.default);
router.get('/getNotes', notes_1.getNotes);
router.post('/addNote', notes_1.addNote);
router.put('/editNote/:id', notes_1.editNote);
router.delete('/deleteNote/:id', notes_1.deleteNote);
exports.default = router;
