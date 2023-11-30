import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterHorario'
})
export class FilterHorarioPipe implements PipeTransform {

  transform(value: any, args: any, clases: any[], usuarios: any[], grupos: any): any {
    let resultPost = [];
    for (let post of value) {
      const idiomaMatches = post.idioma.toLowerCase().includes(args.toLowerCase());
      const maestroMatches = this.obtenerNombreMaestro(post.id_grupo, clases, usuarios).toLowerCase().includes(args.toLowerCase());
      const grupoMatches = this.obtenerNombreGrupo(post.id_grupo, grupos).toLowerCase().includes(args.toLowerCase());
      if (idiomaMatches || maestroMatches||grupoMatches) {
        resultPost.push(post);
      }
    }
    return resultPost;
  }

  obtenerNombreMaestro(idGrupo: number, clases: any[], usuarios: any[]): string {
    const clase = clases.find(c => c.id_grupo === idGrupo);
    
    if (clase) {
      const idMaestro = clase.id_maestro;
      const usuario = usuarios.find(u => u.id_user === idMaestro);
      
      return usuario ? usuario.first_nameU : '';
    }

    return '';
  }

  obtenerNombreGrupo(idGrupo: number , grupos:any[]): string {
    const grupo = grupos.find(g => g.id_grupo ===idGrupo);

    return grupo ? `${grupo.nombre_grupo}` : 'Grupo no encontrado';
    
  }
  /*
  transform(value: any, args: any): any {
    
    let resultPost = [];
    for(let post of value) {
      if(post.idioma.toLowerCase().indexOf(args.toLowerCase())>-1||post.first_nameU.toLowerCase().indexOf(args.toLowerCase())>-1){
        resultPost.push(post);
      } 
      
    }
    return resultPost;
  }
  */

/*
  transform(horarios: Horario[] | null, users: string): Horario[] | null {
    if (!horarios || !users) {
      return horarios;
    }

    return horarios.filter(horarios => horarios.users && horarios.users.first_nameU.toLowerCase().includes(users.toLowerCase()));
  }


transform(horarios: any[], nombreMaestro: string, grupos: any[], maestros: any[]): any[] {
  if (!horarios || !nombreMaestro || !grupos || !maestros) {
    return horarios;
  }

  return horarios.filter(horario => {
    const idGrupo = horario.id_grupo;

    // Buscar el grupo correspondiente al id del grupo en los horarios
    const grupo = grupos&& grupos.find(grupo => grupo.id_grupo === idGrupo);

    if (grupo) {
      // Obtener el id del maestro desde el grupo
      const idMaestro = grupo.id_maestro;

      // Buscar el maestro correspondiente al id del maestro en los maestros
      const maestro = maestros && maestros.find(maestro => maestro.id_user === idMaestro);

      // Verificar si el nombre del maestro coincide
      return maestro && maestro.first_nameU.toLowerCase().includes(nombreMaestro.toLowerCase());
    }

    return false;
  });
}
*/
}
