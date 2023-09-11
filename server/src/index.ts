import express, { Application } from "express";
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from "./routes/indexRoutes";
import userRoutes from "./routes/userRoutes";
import alumnoRoutes from "./routes/alumnoRoutes";
import maestroRoutes from "./routes/maestroRoutes";
import adminRoutes from "./routes/adminRoutes";

class Server {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    config(): void {
        this.app.set("port", process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended : true }));
    }

    routes(): void { 
        this.app.use('/',indexRoutes); 
        this.app.use('/user',userRoutes);
        this.app.use('/alumno',alumnoRoutes);
        this.app.use('/maestro',maestroRoutes);
        this.app.use('/admin',adminRoutes);
    }

    start(): void {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port", this.app.get("port"));
        });
    }
}

const server = new Server();
server.start();
