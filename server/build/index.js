"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const alumnoRoutes_1 = __importDefault(require("./routes/alumnoRoutes"));
const maestroRoutes_1 = __importDefault(require("./routes/maestroRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const horarioRoutes_1 = __importDefault(require("./routes/horarioRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set("port", process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/user', userRoutes_1.default);
        this.app.use('/alumno', alumnoRoutes_1.default);
        this.app.use('/maestro', maestroRoutes_1.default);
        this.app.use('/admin', adminRoutes_1.default);
        this.app.use('/horario', horarioRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port", this.app.get("port"));
        });
    }
}
const server = new Server();
server.start();
