import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.scss',
  providers: [DatePipe]
})
export class HomeAdminComponent implements OnInit {
  imageNames = [
    'welcome-1.svg',
    'welcome-2.svg',
    'welcome-3.svg',
    'welcome-4.svg',
    'welcome-5.svg'
  ];
  randomImageUrl: string | undefined;

  constructor() { }

  ngOnInit(): void {
    const randomImage = this.imageNames[Math.floor(Math.random() * this.imageNames.length)];
    this.randomImageUrl = `assets/home/${randomImage}`;
  }

}

