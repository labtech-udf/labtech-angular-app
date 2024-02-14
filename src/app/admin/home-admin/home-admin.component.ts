import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.scss',
  providers: [DatePipe]
})
export class HomeAdminComponent implements OnInit {
  private auth = inject(AuthService);
  imageNames = [
    'welcome-1.svg',
    'welcome-2.svg',
    'welcome-3.svg',
    'welcome-4.svg',
    'welcome-5.svg'
  ];
  randomImageUrl: string | undefined;
  msg = 'No mudou';
  constructor() { }

  ngOnInit(): void {
    const randomImage = this.imageNames[Math.floor(Math.random() * this.imageNames.length)];
    this.randomImageUrl = `assets/home/${randomImage}`;
    console.log("iniciou ")
    this.auth.getUser().subscribe((p) => {
      console.log(p);
      this.msg = p.message;
    })
  }

}

