import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { NotificationSnackbarService } from 'src/app/services/notification-snackbar/notification-snackbar.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';

interface Food {
  image: string;
  title: string;
  description?: string;
  weight: number;
  ingredients: string[];
  expandNutricional: boolean;
  nutricional: Nutricional;
  price: number;
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
  foodTypeFilter: string;

  searchFormGroup: FormGroup;

  foodCards: Food[] = [];
  filteredFoodCards: Observable<Food[]>;

  columnHeaders: string[] = ['name', 'baseValue', 'baseValueCalculated'];
  nutricionalNames: string[] = ['Energy Value (kcal)', 'Energy Value (kJ)', 'Fat (g)', '   of which saturates (g)', 'Carbohydrate (g)', '    of which sugars (g)', 'Fiber (g)', 'Protein (g)', 'Sodium (g)']
  dataSource: MatTableDataSource<any>;

  tableData: any[] = [];

  constructor(private fb: FormBuilder, private loadingService: LoadingService, private shoppingCartService: ShoppingCartService, private activatedRoute: ActivatedRoute, private productService: ProductService, private notificationService: NotificationSnackbarService) { }

  ngOnInit(): void {
    this.foodTypeFilter = this.activatedRoute.snapshot.paramMap.get('type');
    this.createSearchFormGroup();
    this.queryData();
    this.filteredFoodCards = this.searchFormGroup.get('search').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  /**
   * Initializes search form group
   */
  createSearchFormGroup(): void {
    this.searchFormGroup = this.fb.group({
      search: ['']
    })
  }

  /**
   * Queries data from database
   */
  queryData(): void {
    this.productService.getProductsByType(this.foodTypeFilter).subscribe(data => {
      this.loadingService.showLoadingSpinner();
      setTimeout(() => {
        if (data && data.success) {
          this.loadingService.stopLoadingSpinner();
          this.foodCards = data.data;
          this.formatData();
        } else {
          this.loadingService.stopLoadingSpinner();
          this.foodCards = [];
          this.dataLoaded = true;
          this.notificationService.showError(data.message);
        }
      }, 2000)
    })
  }

  /**
   * Simulates data formatting from DB
   */
  formatData(): void {
    this.foodCards.every(x => x.expandNutricional = false)
    var index = 0;
    this.tableData[index] = [];
    this.foodCards.forEach((element, index) => {
      this.tableData[index] = [];
      for (var key of Object.keys(element.nutricional)) {
        const value = element.nutricional[key];
        this.tableData[index].push({ name: key, baseValue: value, baseValueCalculated: value * (element.weight / 100) })
      }
    });
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataLoaded = true;
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
    const temp: Cart = { image: c.image, name: c.title, quantity: 1, price: c.price };
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
