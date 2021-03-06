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
exports.logoutRequest = exports.registerRequest = exports.loginRequest = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var User_1 = __importDefault(require("../model/User"));
var saltRounds = 10;
var loginRequest = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var credentials, user, validPassword, token, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                credentials = req.body;
                return [4, User_1.default.findOne({ username: credentials.username })];
            case 1:
                user = _a.sent();
                if (user == null)
                    throw new Error("User not found");
                return [4, bcrypt_1.default.compare(credentials.password, user.password)];
            case 2:
                validPassword = _a.sent();
                if (!validPassword)
                    throw new Error("Invalid Password");
                token = assigningTokens(user, res);
                res.json({ message: 'Succesfully logged in', auth: true, id: user._id, acessToken: token[0], refreshToken: token[1] });
                return [3, 4];
            case 3:
                error_1 = _a.sent();
                res.status(401).json({ message: error_1.message });
                return [3, 4];
            case 4:
                ;
                return [2];
        }
    });
}); };
exports.loginRequest = loginRequest;
var registerRequest = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var credentials, usernameExist, emailExists, salt, hashedPassword, user, token, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                credentials = req.body;
                return [4, User_1.default.findOne({ username: credentials.username })];
            case 1:
                usernameExist = _a.sent();
                if (usernameExist)
                    throw new Error("Username is already used");
                return [4, User_1.default.findOne({ email: credentials.email })];
            case 2:
                emailExists = _a.sent();
                if (emailExists)
                    throw new Error("Email is already used");
                return [4, bcrypt_1.default.genSalt(saltRounds)];
            case 3:
                salt = _a.sent();
                return [4, bcrypt_1.default.hash(credentials.password, salt)];
            case 4:
                hashedPassword = _a.sent();
                user = new User_1.default({
                    username: credentials.username,
                    email: credentials.email,
                    password: hashedPassword
                });
                return [4, user.save()];
            case 5:
                _a.sent();
                token = assigningTokens(user, res);
                res.json({ message: 'Thank your for signing up', auth: true, id: user._id, acessToken: token[0], refreshToken: token[1] });
                return [3, 7];
            case 6:
                error_2 = _a.sent();
                res.status(400).json({ message: error_2.message });
                return [3, 7];
            case 7:
                ;
                return [2];
        }
    });
}); };
exports.registerRequest = registerRequest;
var logoutRequest = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.clearCookie('authorization');
        res.clearCookie('refreshToken');
        res.clearCookie('id');
        res.status(200).json({ message: 'Logged Out' });
        return [2];
    });
}); };
exports.logoutRequest = logoutRequest;
var assigningTokens = function (user, response) {
    var accessSecretToken = "" + process.env.ACCESS_TOKEN_SECRET;
    var refreshSecretToken = "" + process.env.REFRESH_TOKEN_SECRET;
    var newAccessToken = jsonwebtoken_1.default.sign({ user_id: user._id }, accessSecretToken, { expiresIn: '30s' });
    var newRefreshToken = jsonwebtoken_1.default.sign({ user_id: user._id }, refreshSecretToken, { expiresIn: '1day' });
    response.cookie('authorization', newAccessToken, { httpOnly: true, secure: true });
    response.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true });
    response.cookie('id', user.id, { httpOnly: true, secure: true });
    return [newAccessToken, newRefreshToken];
};
