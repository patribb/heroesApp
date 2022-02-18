import { Heroe } from '../interfaces/heroes.interfaces';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {

  transform(heroe: Heroe, ...args: unknown[]): string {
    
    if (!heroe.id && !heroe.alt_img) {
      return 'assets/no-image.png';
    } else if (heroe.alt_img) {
      return heroe.alt_img;
    } else {
      return `assets/heroes/${heroe.id}.jpg`;
    }
    // assets/heroes/dc-batman.jpg
  }

}
