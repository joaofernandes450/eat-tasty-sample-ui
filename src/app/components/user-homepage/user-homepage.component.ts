import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { RestaurantsService } from 'src/app/services/restaurants/restaurants.service';

@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.css']
})
export class UserHomepageComponent implements OnInit {

  orderOptions: string[] = ['Alphabetic'];
  foodTags: string[] = ['Fish', 'Meat', 'Vegan'];

  restaurantsLoaded: boolean = false;
  restaurants: any[] = [];

  constructor(private breakpointObserver: BreakpointObserver, private restaurantService: RestaurantsService) { }

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Soups', rows: 1, cols: 4, link: '/app/food/soup', image: '/assets/soup.jpg', description: 'A freshly made soup to start your meal!' },
          { title: 'Main Dishes', rows: 1, cols: 4, link: '/app/food/dish', image: '/assets/dish.jpg', description: 'The main course, full of fresh and tasty ingredients!' },
          { title: 'Desserts', rows: 1, cols: 4, link: '/app/food/dessert', image: '/assets/dessert.jpg', description: 'The best combination of sweet and flavours! ' },
          { title: 'Drinks', rows: 1, cols: 4, link: '/app/food/drink', image: '/assets/drinks.jpg', description: 'A fresh beverage to accompany during lunch or dinner ' },
        ];
      }

      return [
        { title: 'Soups', cols: 1, rows: 1, link: '/app/food/soup', image: '/assets/soup.jpg', description: 'A freshly made soup to start your meal!' },
        { title: 'Main Dishes', cols: 1, rows: 1, link: '/app/food/dish', image: '/assets/dish.jpg', description: 'The main course, full of fresh and tasty ingredients!' },
        { title: 'Desserts', cols: 1, rows: 1, link: '/app/food/dessert', image: '/assets/dessert.jpg', description: 'The best combination of sweet and flavours!' },
        { title: 'Drinks', cols: 1, rows: 1, link: '/app/food/drink', image: '/assets/drinks.jpg', description: 'A cool beverage to accompany during lunch or dinner ' },
      ];
    })
  );

  ngOnInit(): void {
    this.restaurantService.getRestaurants().subscribe(response => {
      if (response && response.success) {
        this.restaurants = response.data;
      }
    })
  }

}
