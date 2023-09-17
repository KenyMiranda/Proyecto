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
            yield database_1.default.query("INSERT INTO users SET ?", [req.body]);
            /*
            delete req.body.id_rol;
            delete req.body.password;
            await db.query(
              "INSERT INTO  alumnos (first_name_A, last_name_A, last_name2_A, telephone_A, email_A) SELECT first_nameU , last_nameU,last_nameU2,telephoneU,email from users where id_rol = 1",[req.body]);
            console.log(req.body);
              */ '';
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
