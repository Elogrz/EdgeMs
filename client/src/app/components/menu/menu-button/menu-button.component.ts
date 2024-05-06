import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu-button',
  standalone: true,
    imports: [
        ButtonModule
    ],
  templateUrl: './menu-button.component.html',
  styleUrl: './menu-button.component.scss'
})
export class MenuButtonComponent implements OnInit{

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  goToMenu() {
    this.router.navigateByUrl('product-list');
  }

}
