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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield database_1.default.query("SELECT * FROM users");
            res.json(user);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield database_1.default.query("SELECT * FROM users WHERE id_user=?", [id]);
            res.json(user);
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = yield bcrypt_1.default.hash(req.body.password, 10);
            req.body.password = password;
            yield database_1.default.query("INSERT INTO users SET ?", [req.body]);
            let rol = req.body.id_rol;
            console.log(req.body);
            if (rol == 1) {
                req.body = {
                    first_name_A: req.body.first_nameU,
                    last_name_A: req.body.last_nameU,
                    last_name2_A: req.body.last_nameU2,
                    telephone_A: req.body.telephoneU,
                    email_A: req.body.email,
                };
                yield database_1.default.query("INSERT INTO alumnos SET ?", [req.body]);
            }
            else if (rol == 2) {
                req.body = {
                    first_name_M: req.body.first_nameU,
                    last_name_M: req.body.last_nameU,
                    last_name2_M: req.body.last_nameU2,
                    telephone_M: req.body.telephoneU,
                    email_M: req.body.email,
                };
                yield database_1.default.query("INSERT INTO maestros SET ?", [req.body]);
            }
            else {
                req.body = {
                    first_name_AD: req.body.first_nameU,
                    last_name_AD: req.body.last_nameU,
                    last_name2_AD: req.body.last_nameU2,
                    telephone_AD: req.body.telephoneU,
                    email_AD: req.body.email,
                };
                yield database_1.default.query("INSERT INTO admin SET ?", [req.body]);
            }
            res.json({ text: "User saved" });
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("DELETE FROM users WHERE id_user = ?", [id]);
            res.json({ text: "User deleted" });
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const datos = req.body;
            yield database_1.default.query("UPDATE users SET ? WHERE id_user = ?", [datos, id]);
            res.json({ message: "User updated" });
        });
    }
}
exports.userController = new UserController();
exports.default = exports.userController;
