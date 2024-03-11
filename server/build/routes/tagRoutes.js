"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tagControllers_1 = __importDefault(require("../controllers/tagControllers"));
const router = (0, express_1.Router)();
router.post('/', tagControllers_1.default.createTag);
router.get('/check/:name', tagControllers_1.default.checkTagExists);
router.get('/parent', tagControllers_1.default.getParentTags);
router.get('/course/:name', tagControllers_1.default.getTagIdByName);
exports.default = router;
