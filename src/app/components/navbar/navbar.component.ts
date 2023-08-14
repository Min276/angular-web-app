import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    navLinks = [
       {
         title: "Home",
         link: "/"
       },
       {
        title: "About Us",
        link: "/about-us",
       },
       {
        title: "Our Services",
        link: "/our-services"
       },
       {
        title: "Contact Us",
        link: "/contact-us"
       }
    ]

    constructor(private router: Router) {}

    // Function to check if a route is currently active
    isRouteActive(route: string): boolean {
      return this.router.isActive(route, true);
    }
}
