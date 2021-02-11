import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';

interface Food {
  image: string;
  title: string;
  description?: string;
  weight: number;
  ingredients: string[];
  expandNutricional: boolean;
  nutricional: Nutricional;
}

interface Nutricional {
  energyValueKCAL: number;
  energyValueKJ: number;
  fat: number;
  fatSaturates: number;
  carbohydrate: number;
  sugar: number;
  fiber: number;
  protein: number;
  sodium: number;
}

interface Cart {
  image?: string,
  name: string,
  price: number,
  quantity: number
}

@Component({
  selector: 'app-food-info',
  templateUrl: './food-info.component.html',
  styleUrls: ['./food-info.component.css']
})
export class FoodInfoComponent implements OnInit {

  dataLoaded: boolean = false;

  searchFormGroup: FormGroup;

  foodCards: Food[] = [];
  filteredFoodCards: Observable<Food[]>;

  columnHeaders: string[] = ['name', 'baseValue', 'baseValueCalculated'];
  nutricionalNames: string[] = ['Energy Value (kcal)', 'Energy Value (kJ)', 'Fat (g)', '   of which saturates (g)', 'Carbohydrate (g)', '    of which sugars (g)', 'Fiber (g)', 'Protein (g)', 'Sodium (g)']
  dataSource: MatTableDataSource<any>;

  tableData: any[] = [];

  constructor(private fb: FormBuilder, private loadingService: LoadingService, private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.formatData();
    this.loadingService.showLoadingSpinner();
    setTimeout(() => {
      this.loadingService.stopLoadingSpinner();
      this.dataLoaded = true;
    }, 1)
    this.searchFormGroup = this.fb.group({
      search: ['']
    })
    this.filteredFoodCards = this.searchFormGroup.get('search').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  /**
   * Simulates data formatting from DB
   */
  formatData(): void {
    const f1: Food = {
      image: "https://static.eattasty.com/cloudinary/eattasty/image/upload/q_auto/v1577911805/web_809_fswyha.jpg",
      title: "Tomato Soup",
      description: "Tomato Soup with Hard Boiled Egg",
      weight: 250,
      ingredients: ["Basil", "Black Pepper", "Caster Sugar", "Chopped Tomato", "Eggs", "Extra Virgin Olive Oil", "Galic", "Onion", "Salt"], nutricional: {
        energyValueKCAL: 40,
        energyValueKJ: 168,
        fat: 1.9,
        fatSaturates: 0.5,
        carbohydrate: 3.5,
        sugar: 3.1,
        fiber: 1.9,
        protein: 1.4,
        sodium: 1.0
      },
      expandNutricional: false,
    }

    const f2: Food = {
      image: "https://static.eattasty.com/cloudinary/eattasty/image/upload/q_auto/v1577911805/web_809_fswyha.jpg",
      title: "Tomato Soup",
      description: "Tomato Soup with Hard Boiled Egg",
      weight: 250,
      ingredients: ["Basil", "Black Pepper", "Caster Sugar", "Chopped Tomato", "Eggs", "Extra Virgin Olive Oil", "Galic", "Onion", "Salt"], nutricional: {
        energyValueKCAL: 40,
        energyValueKJ: 168,
        fat: 1.9,
        fatSaturates: 0.5,
        carbohydrate: 3.5,
        sugar: 3.1,
        fiber: 1.9,
        protein: 1.4,
        sodium: 1.0
      },
      expandNutricional: false,
    }

    const f3: Food = {
      image: "https://static.eattasty.com/cloudinary/eattasty/image/upload/q_auto/v1577911805/web_809_fswyha.jpg",
      title: "Tomato Soup",
      description: "Tomato Soup with Hard Boiled Egg",
      weight: 250,
      ingredients: ["Basil", "Black Pepper", "Caster Sugar", "Chopped Tomato", "Eggs", "Extra Virgin Olive Oil", "Galic", "Onion", "Salt"], nutricional: {
        energyValueKCAL: 40,
        energyValueKJ: 168,
        fat: 1.9,
        fatSaturates: 0.5,
        carbohydrate: 3.5,
        sugar: 3.1,
        fiber: 1.9,
        protein: 1.4,
        sodium: 1.0
      },
      expandNutricional: false,
    }

    const f4: Food = {
      image: "https://static.eattasty.com/cloudinary/eattasty/image/upload/q_auto/v1577911805/web_809_fswyha.jpg",
      title: "Tomato Soup",
      description: "Tomato Soup with Hard Boiled Egg",
      weight: 250,
      ingredients: ["Basil", "Black Pepper", "Caster Sugar", "Chopped Tomato", "Eggs", "Extra Virgin Olive Oil", "Galic", "Onion", "Salt"], nutricional: {
        energyValueKCAL: 40,
        energyValueKJ: 168,
        fat: 1.9,
        fatSaturates: 0.5,
        carbohydrate: 3.5,
        sugar: 3.1,
        fiber: 1.9,
        protein: 1.4,
        sodium: 1.0
      },
      expandNutricional: false,
    }

    this.foodCards.push(f1)
    var index = 0;
    this.tableData[index] = [];
    for (var key of Object.keys(f1.nutricional)) {
      const value = f1.nutricional[key];
      this.tableData[index].push({ name: key, baseValue: value, baseValueCalculated: value * (f1.weight / 100) })
    }
    this.foodCards.push(f2)
    index++;
    this.tableData[index] = [];
    for (var key of Object.keys(f2.nutricional)) {
      const value = f2.nutricional[key];
      this.tableData[index].push({ name: key, baseValue: value, baseValueCalculated: value * (f2.weight / 100) })
    }
    this.foodCards.push(f3)
    index++;
    this.tableData[index] = [];
    for (var key of Object.keys(f3.nutricional)) {
      const value = f3.nutricional[key];
      this.tableData[index].push({ name: key, baseValue: value, baseValueCalculated: value * (f3.weight / 100) })
    }
    this.foodCards.push(f4)
    index++;
    this.tableData[index] = [];
    for (var key of Object.keys(f4.nutricional)) {
      const value = f4.nutricional[key];
      this.tableData[index].push({ name: key, baseValue: value, baseValueCalculated: value * (f4.weight / 100) })
    }
    this.dataSource = new MatTableDataSource(this.tableData);
  }

  /**
   * Expand card triggered event
   * @param c - specific card selected
   */
  expandNutricional(c: Food): void {
    c.expandNutricional = !c.expandNutricional;
  }

  /**
   * Adds a product to the shopping cart
   * @param c - element selected
   */
  addToCart(c: Food): void {
    const temp: Cart = { image: c.image, name: c.title, quantity: 1, price: 5 };
    this.shoppingCartService.addProduct(temp);
  }

  /**
 * Food filter, based on title or ingredients
 * @param value - filter value
 */
  private _filter(value: any): Food[] {
    if (value && !value.title) {
      const filterValue = value.toLowerCase();
      return this.foodCards.filter(option => option.title.toLocaleLowerCase().includes(filterValue) || option.ingredients.some(v => v.toLocaleLowerCase().indexOf(filterValue) > -1));
    } else {
      return this.foodCards;
    }
  }
}
