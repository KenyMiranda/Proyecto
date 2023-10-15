import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterHorario'
})
export class FilterHorarioPipe implements PipeTransform {

  transform(value: any, args: any): any {
    
    let resultPost = [];
    for(let post of value) {
      if(post.idioma.toLowerCase().indexOf(args.toLowerCase())>-1){
        resultPost.push(post);
      } 
      
    }
    return resultPost;
  }

}
