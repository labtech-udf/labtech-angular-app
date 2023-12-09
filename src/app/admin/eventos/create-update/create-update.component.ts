import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { EventoDTO } from '../../../../interfaces/EventoDTO';
import { EventosService } from '../../../../services/eventos.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-create-update',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './create-update.component.html',
  styleUrl: './create-update.component.scss'
})
export class CreateUpdateComponent implements OnInit {
  form!: FormGroup;
  evento!: any;
  skeleton: boolean = false;
  loading: boolean = false;
  photo: File | null = null;
  imageUrl: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: EventosService,
  ) {
    this.constructForm();
  }
  async ngOnInit(): Promise<void> {
    this.skeleton = true;
    await this.load();
    this.skeleton = false;
  }

  constructForm() {
    this.form = new FormGroup({
      name: new FormControl(null),
      nameCard: new FormControl(null),
      photo: new FormControl([]),
      description: new FormControl(null),
      dateHora: new FormControl(null),
      address: new FormControl(null),
      cor: new FormControl(null),
    })
  }

  async load(): Promise<void> {
    this.route.queryParams.subscribe(async (params) => {
      const id = params['id'];
      const type = params['type'];
      if (id) {
        (await this.service.getByIds(id)).subscribe(data => {
          this.evento = data;
          console.log(data);
          this.form.patchValue(data);
        })
      }
    });
  }

  save() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false
    }, 2000);
  }

  navigation(rota: string) {
    this.router.navigate([rota]);
  }

  createPhoto(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];

    if (file) {
      this.photo = file;
      const url = URL.createObjectURL(file);
      this.imageUrl = url;
    }
  }
}
