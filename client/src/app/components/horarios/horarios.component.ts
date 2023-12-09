import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  
} from '@angular/core';
import { HorariosService } from 'src/app/services/horarios/horarios.service';
import { MaestrosService } from 'src/app/services/maestros/maestros.service';
import { ClasesService } from 'src/app/services/clases/clases.service';
import { GruposService } from 'src/app/services/grupos/grupos.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

// Importar sin definiciones de tipo
import * as XLSXStyle from 'xlsx-style';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css'],
})
export class HorariosComponent implements OnInit {
  @ViewChild('tabla', { static: false })
  tabla!: ElementRef;
  arrayHorarios: any = [];
  arrayMaestros: any = [];
  arrayClases: any = [];
  arrayGrupos: any = [];
  arrayDia: any = [];
  nombre: string = '';
  nombreM: string = '';
  idm1: number = 0;
  idm2: number = 0;
  filterPost = '';

  constructor(
    private horariosService: HorariosService,
    private maestrosService: MaestrosService,
    private clasesService: ClasesService,
    private gruposService: GruposService,
    private authService: AuthService,
    private router: Router
  ) {}
  id: any = this.authService.getIdFromToken();
  rol: any = this.authService.getRoleFromToken();
  public dia: boolean = true;
  isAdmin: boolean = false;
  ngOnInit() {
    this.obtenerHorarios();
    this.obtenerClases();
    this.obtenerMaestros();
    this.obtenerGrupos();
    this.isAdmin = this.authService.isAdmin();
  }

  obtenerClases() {
    let objeto: any = {};

    this.clasesService.getClases().subscribe(
      (res) => {
        this.arrayClases = res;
        console.log(this.arrayClases[0]);
      },

      (err) => console.error(err)
    );
  }
  obtenerMaestros() {
    let objeto: any = {};

    this.maestrosService.getMaestros().subscribe(
      (res) => {
        this.arrayMaestros = res;
        console.log(this.arrayMaestros[0]);

        /*
        for (let i = 0; i < this.arrayMaestros[0].length; i++) {
          objeto[i] = this.arrayMaestros[0][i];
          let nombre = objeto[i].first_nameU;
          this.idm2 = objeto[i].id_user;
          console.log(nombre);
          this.nombre = nombre;
        }
        */
      },

      (err) => console.error(err)
    );
  }

  obtenerHorarios() {
    if (this.rol == 2) {
      this.horariosService.getHorario(this.id).subscribe(
        (res) => {
          this.arrayHorarios = res;

          console.log(this.arrayHorarios[0]);
        },

        (err) => console.error(err)
      );
    } else if (this.rol == 3) {
      this.horariosService.getHorarios().subscribe(
        (res) => {
          this.arrayHorarios = res;

          console.log(this.arrayHorarios[0]);
        },

        (err) => console.error(err)
      );
    } else {this.router.navigate(['/alumnos']);} 
      
    
  }

  obtenerGrupos() {
    this.gruposService.getGrupos().subscribe(
      (res) => {
        this.arrayGrupos = res;

        console.log(this.arrayGrupos[0]);
      },

      (err) => console.error(err)
    );
  }

  exportarAExcel(): void {
    /*
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tabla.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Horario');
    XLSX.writeFile(wb, 'horario.xlsx');
    */
  }

  private obtenerDatosParaExportar(): any[][] {
    const datos: any[][] = [];

    // Recorrer las filas de la tabla
    for (let i = 0; i < this.tabla.nativeElement.rows.length; i++) {
      const fila: any[] = [];
      const celdas = this.tabla.nativeElement.rows[i].cells;

      // Recorrer las celdas de cada fila
      for (let j = 0; j < celdas.length; j++) {
        // Excluir celdas con botones (o cualquier otro criterio que desees)
        if (!celdas[j].querySelector('button')) {
          fila.push(celdas[j].innerText);
        }
      }

      // Agregar la fila al conjunto de datos si no está vacía
      if (fila.length > 0) {
        datos.push(fila);
      }
    }

    return datos;
  }

  obtenerGrupo(idGrupo: number): string {
    const grupo = this.arrayGrupos[0].find(
      (m: { id_grupo: number }) => m.id_grupo === idGrupo
    );
    return grupo ? `${grupo.nombre_grupo}` : 'Grupo no encontrado';
  }

  obtenerNombreMaestro(idGrupo: number): string {
    // Encuentra la clase correspondiente al id_grupo
    const clase = this.arrayClases[0].find(
      (c: { id_grupo: number }) => c.id_grupo === idGrupo
    );

    // Si se encuentra la clase, encuentra el maestro correspondiente al id_maestro
    if (clase) {
      const maestro = this.arrayMaestros[0].find(
        (m: { id_user: number }) => m.id_user === clase.id_maestro
      );
      return maestro
        ? `${maestro.first_nameU} ${maestro.last_nameU}`
        : 'Maestro no encontrado';
    }

    return 'Clase no encontrada';
  }

  obtenerNombreMaestro2(idGrupo: number): string {
    // Encuentra la clase correspondiente al id_grupo
    const clase = this.arrayClases[0].find(
      (c: { id_grupo: number }) => c.id_grupo === idGrupo
    );

    // Si se encuentra la clase, encuentra el maestro correspondiente al id_maestro
    if (clase) {
      const maestro = this.arrayMaestros[0].find(
        (m: { id_user: number }) => m.id_user === clase.id_maestro2
      );
      return maestro
        ? `${maestro.first_nameU} ${maestro.last_nameU}`
        : 'Maestro no encontrado';
    }

    return 'Clase no encontrada';
  }

  deleteHorario(id_horario: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.horariosService.deleteHorario(id_horario).subscribe(
          (res) => {
            console.log(res);
            this.obtenerHorarios();
          },
          (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: '<a href="#">Why do I have this issue?</a>',
            });
          }
        );
        Swal.fire({
          title: 'Deleted!',

          text: 'The user has been deleted.',
          icon: 'success',
        });
      }
    });
  }
}
