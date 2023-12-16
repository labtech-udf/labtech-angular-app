import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { EventosService } from '../../../../services/eventos.service';
import { ButtonModule } from 'primeng/button';
import { EventoDTO } from '../../../../interfaces/EventoDTO';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { NgxColorsModule, validColorValidator } from 'ngx-colors';

@Component({
  selector: 'app-create-update',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextareaModule,
    InputTextModule,
    CalendarModule,
    NgxColorsModule
  ],
  templateUrl: './create-update.component.html',
  styleUrl: './create-update.component.scss'
})
export class CreateUpdateComponent implements OnInit {
  form!: FormGroup;
  evento!: any;
  skeleton: boolean = false;
  loading: boolean = false;
  photo!: any;
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
      id: new FormControl(null),
      name: new FormControl(null),
      nameCard: new FormControl(null),
      photo: new FormControl(null),
      description: new FormControl(null),
      dateHora: new FormControl(null),
      address: new FormControl(null),
      cor: new FormControl(null, validColorValidator()),
    })
  }

  async load(): Promise<void> {
    this.route.queryParams.subscribe(async (params) => {
      const id = params['id'];
      if (id) {
        (await this.service.getByIds(id)).subscribe(async data => {
          if (data) {
            this.evento = data;
            console.error(data);
            await this.setForm(data);
            if (data.dateHora === null) {
              this.form.get('dateHora')?.setValue(new Date());
            }
            this.getData();
          }
        })
      }else{
        this.form.get('dateHora')?.setValue(new Date());
      }
    });
  }
  setForm(data: any) {
    this.form.patchValue(data);
    if (data?.photo?.id) {
      const url = 'http://localhost:8180/arquivo/' + data?.photo?.id + '/download';
      this.imageUrl = url;
    }
  }

  async save() {
    // this.loading = true;
    // console.error(this.form.valid)
    // if (this.form.valid) {
    //   if (this.evento?.id) {
        await this.update()
    //   } else {
        // await this.create;
    //   }
    // } else {
    //   console.error('Formulário inválido. Certifique-se de preencher todos os campos necessários.');
    //   this.loading = false;
    // }
  }
  async create() {
    console.error(this.form.value)
    const eventoData = this.form.value as EventoDTO;
    // eventoData.dateHora = "";
    console.error(eventoData)
    this.service.createEvento(eventoData, this.photo).subscribe(
      (response) => {
        this.loading = false;
        console.log('Evento criado com sucesso!', response);
      },
      (error) => {
        console.error('Erro ao criar evento:', error);
      },
      () => {
        this.loading = false;
      }
    );
  }
  async update() {
    const eventoData = this.form.value as EventoDTO;
    console.error(this.form.valid)
    this.service.createEvento(eventoData, this.photo).subscribe(
      (response) => {
        this.loading = false;
        console.log('Evento criado com sucesso!', response);
      },
      (error) => {
        console.error('Erro ao criar evento:', error);
      },
      () => {
        this.loading = false;
      }
    );
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
  getData() {
    var data = new Date(this.form?.value?.dateHora);
    var dia = data.getDate();
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();
    return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
  }
  getHora() {
    var data = new Date(this.form?.value?.dateHora);
    var horas = data.getHours();
    var minutos = data.getMinutes();
    return ` ${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`
  }
}

