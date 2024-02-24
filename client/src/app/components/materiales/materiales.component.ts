import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Grupo } from 'src/app/models/grupos';
import { AlumnoGruposService } from 'src/app/services/alumnoGrupos/alumno-grupos.service';
import { AuthService } from 'src/app/services/auth.service';
import { ClasesHorariosService } from 'src/app/services/clasesHorarios/clases-horarios.service';
import { MaestrosService } from 'src/app/services/maestros/maestros.service';
import { MaterialesServicesService } from 'src/app/services/materiales/materiales-services.service';
import Swal from 'sweetalert2';
import JSZip from 'jszip';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.css'],
})
export class MaterialesComponent {
  @ViewChild('singleInput', { static: false })
  singleInput!: ElementRef;
  arrayClases: any = [];
  arrayMaestros: any = [];
  arrayAlumnos: any = [];
  arrayFiles: any = [];
  files: any;
  filesSelected: boolean = false;
  id: number = 0;
  idU: any = this.authService.getIdFromToken();
  rol = this.authService.getRoleFromToken();
  click: boolean = false;
  agregarGrupo: boolean = false;
  idGrupo: any;
  isAdmin = this.authService.isAdmin();
  isMaestro = this.authService.isMaestro();
  isAlumno = this.authService.isAlumno();
  nombreUsuario = this.authService.getNameFromToken();
  grupo: Grupo = {
    nombre_grupo: '',
    fecha_inicio: '',
    fecha_final: '',
  };
  constructor(
    private clasesHorarioService: ClasesHorariosService,
    private router: Router,
    private authService: AuthService,
    private maestroService: MaestrosService,
    private alumnoGrupoService: AlumnoGruposService,
    private materialService: MaterialesServicesService
  ) {}

  ngOnInit() {
    this.getClases();
    this.getMaestro();
    this.materialService.getFiles().subscribe((files) => {
      this.arrayFiles = files;
    });
  }

  logout(): void {
    this.authService.removeToken(); // Elimina el token al cerrar sesión
    this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
  }

  getClases() {
    if (this.rol == '1') {
      this.alumnoGrupoService.getClases(this.idU).subscribe(
        (res) => {
          this.arrayClases = res;
          console.log(this.arrayClases[0]);
        },

        (err) => console.error(err)
      );
    } else if (this.rol == '2') {
      this.clasesHorarioService.getClaseHorario(this.idU).subscribe(
        (res) => {
          this.arrayClases = res;
          console.log(this.arrayClases[0]);
        },

        (err) => console.error(err)
      );
    } else {
      this.clasesHorarioService.getClasesHorarios().subscribe(
        (res) => {
          this.arrayClases = res;
          console.log(this.arrayClases[0]);
        },
        (err) => console.error(err)
      );
    }
  }

  selectFiles(event: any) {
    this.filesSelected = event.target.files.length > 0 || this.arrayFiles.length > 0;
    if (this.filesSelected) {
      this.files = event.target.files;
      console.log(this.files);
    }
  }
  
  onSubmitFiles() {
    if (!this.filesSelected) {
      return;
    }

    if (this.files.length === 0) {
      return;
    }
  
    const formData = new FormData();
  
    for (let i = 0; i < this.files.length; i++) {
      formData.append('files', this.files[i]);
    }
  
    this.materialService.postFiles(formData).subscribe(
      (res: any) => {
        console.log(res.paths);
        this.singleInput.nativeElement.value = "";
        this.arrayFiles = this.arrayFiles.concat(res.paths); // Concatenar las nuevas rutas con las existentes
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getFileUrl(filename: string): string {
    // Reemplaza con la URL de tu servidor y la ruta hacia los archivos
    return `http://localhost:3000/uploads/${filename}`;
  }

  getMaestro() {
    this.maestroService.getMaestros().subscribe(
      (res) => {
        this.arrayMaestros = res;
        console.log(this.arrayMaestros[0]);
      },
      (err) => console.error(err)
    );
  }

  obtenerNombreMaestro(idMaestro: number): string {
    // Encuentra la clase correspondiente al id_grupo
    //const clase = this.arrayClases[0].find((c: {id_grupo:number})=> c.id_grupo === idGrupo);

    // Si se encuentra la clase, encuentra el maestro correspondiente al id_maestro

    const maestro = this.arrayMaestros[0].find(
      (m: { id_user: number }) => m.id_user === idMaestro
    );
    return maestro
      ? `${maestro.first_nameU} ${maestro.last_nameU}`
      : 'Maestro no encontrado';
  }

  obtenerNombreMaestro2(idMaestro: number): string {
    // Encuentra la clase correspondiente al id_grupo
    //const clase = this.arrayClases[0].find((c: {id_grupo:number})=> c.id_grupo === idGrupo);

    // Si se encuentra la clase, encuentra el maestro correspondiente al id_maestro

    const maestro = this.arrayMaestros[0].find(
      (m: { id_user: number }) => m.id_user === idMaestro
    );
    return maestro
      ? `${maestro.first_nameU} ${maestro.last_nameU}`
      : 'Maestro no encontrado';
  }

  deleteFile(filename: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres borrar este archivo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrarlo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Llamada para eliminar el archivo
        this.materialService.deleteFile(filename).subscribe({
          next: () => {
            // Eliminar el archivo del array de archivos en la interfaz de usuario
            this.arrayFiles = this.arrayFiles.filter(
              (file: string) => file !== filename
            );
            Swal.fire(
              '¡Borrado!',
              'El archivo ha sido borrado correctamente.',
              'success'
            );
          },
          error: (err: any) => {
            console.error(err);
            Swal.fire(
              'Error',
              'Hubo un problema al intentar borrar el archivo.',
              'error'
            );
          },
        });
      }
    });
  }

  async downloadAllFiles() {
    const zip = new JSZip();
    const folder = zip.folder('archivos');
    for (const file of this.arrayFiles) {
      const response = await fetch(this.getFileUrl(file));
      const blob = await response.blob();
      folder?.file(file, blob);
    }
    zip.generateAsync({ type: 'blob' }).then((content) => {
      const url = window.URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'todos_los_archivos.zip';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
