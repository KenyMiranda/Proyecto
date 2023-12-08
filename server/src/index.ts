import express, { Application } from "express";
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from "./routes/indexRoutes";
import userRoutes from "./routes/userRoutes";
import alumnoRoutes from "./routes/alumnoRoutes";
import maestroRoutes from "./routes/maestroRoutes";
import adminRoutes from "./routes/adminRoutes";
import horarioRoutes from "./routes/horarioRoutes";
import calificacionRoutes from "./routes/calificacionRoutes";
import claseRoutes from "./routes/claseRoutes";
import grupoRoutes from "./routes/grupoRoutes";
import claseHorarioRoutes from "./routes/clasesHorariosRoutes";
import alumnoGrupoRoutes from "./routes/alumnosGruposRoutes";
import validateToken from "./routes/validateToken";

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
        this.app.use('/horario',horarioRoutes);
        this.app.use('/calificacion',calificacionRoutes);
        this.app.use('/clase',claseRoutes);
        this.app.use('/grupo',grupoRoutes);
        this.app.use('/claseHorario',claseHorarioRoutes);
        this.app.use('/alumnoGrupo',alumnoGrupoRoutes);
        
    }

    start(): void {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port", this.app.get("port"))
        });
    }
}

const server = new Server();
server.start();
