import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-http-error',
  standalone: true,
  imports: [],
  templateUrl: './page-http-error.component.html',
  styleUrl: './page-http-error.component.scss'
})
export class PageHttpErrorComponent implements OnInit {
  private route = inject(ActivatedRoute);
  type: any;
  message: any;

  ngOnInit() {
    this.route.queryParams.subscribe(p => {
      this.type = p['errorCode'];
      this.message = p['message'];
      console.log(p);
    })
  }

}
