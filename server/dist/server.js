"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: '.env' });
}
;
var PORT = process.env.PORT || 5000;
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use((0, cors_1.default)({ credentials: true, origin: 'http://localhost:3000' }));
var noteRoutes_1 = __importDefault(require("./routes/noteRoutes"));
var authenticationRoutes_1 = __importDefault(require("./routes/authenticationRoutes"));
app.use('/api/v1/note', noteRoutes_1.default);
app.use('/api/v1/authentication', authenticationRoutes_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, 'build')));
app.get('/*', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, 'build', 'index.html'));
});
var uri = "" + process.env.DB_CONNECTION;
mongoose_1.default.connect(uri).then(function () {
    app.listen(PORT, function () { return console.log("Server is running on PORT " + PORT); });
}).catch(function (err) {
    console.log('Access denied');
    console.error(err);
});
