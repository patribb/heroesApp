import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `]
})
export class AddComponent implements OnInit {

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  }

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  constructor(private heroesService: HeroesService,
    private actiavtedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) {
      return;
    }
    this.actiavtedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroeById(id))
      )
      .subscribe(heroe => this.heroe = heroe);
  }

  save() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      // Actualizar
      this.heroesService.updateHeroe(this.heroe)
        .subscribe(heroe => this.showSnackbar('Héroe actualizado'))
    } else {
      // Crear
      this.heroesService.addHeroe(this.heroe)
        .subscribe(heroe => {
          this.router.navigate(['/heroes/edit', heroe.id]);
          this.showSnackbar('Héroe creado')
        })
    }
  }

  deleteHeroe() {
    const dialog = this.dialog.open(ConfirmComponent, {
      width: '300px',
      data: this.heroe
    });
    dialog.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.heroesService.deleteHeroe(this.heroe.id!)
            .subscribe(res => {
              this.router.navigate(['/heroes']);
            })
        }
      }
    )

  }

  showSnackbar(mensaje: string) {
    this.snackBar.open(mensaje, 'ok!', {
      duration: 2500
    });
  }

}
