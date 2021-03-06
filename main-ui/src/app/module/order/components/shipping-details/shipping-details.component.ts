import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/module/cart/services/cart.service';
import { Cart } from 'src/app/module/cart/components/models/cart';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Order } from 'src/app/core/model/order';
import { OrdersService } from '../../services/orders.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.scss'],
  providers: [MessageService]
})
export class ShippingDetailsComponent implements OnInit {
  public cartList: Cart[];
  public totalCost: number = 0;
  public order: Order = new Order();
  public orderForm: FormGroup;
  public date7: Date;
  public userName: string;
  constructor(
    private cartService: CartService,
    public formBuilder: FormBuilder,
    private orderService: OrdersService,
    private localStorageService: LocalStorageService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userName = localStorage.getItem('email');
    this.cartService.getCartItems(this.userName).subscribe(
      (res: Cart[]) => {
        this.cartList = res;
        res.forEach((cart: Cart) => {
          this.totalCost = this.totalCost + cart.price;
        })      
    });  
    this.orderForm = this.formBuilder.group({
       fname: new FormControl('', Validators.required),
       lname: new FormControl('', Validators.required),
       date: new FormControl('', Validators.required),
       mobile: new FormControl('', Validators.required),
       addressMain: new FormControl('', Validators.required),
       addressOptional: new FormControl('', Validators.required),
       country: new FormControl('INDIA', Validators.required),
       city: new FormControl('SITAMARHI', Validators.required),
       zip: new FormControl('', Validators.required)
    });
  }

  public submitOrder = () => {
    this.getShipDetails();
    this.cartService.getCartItems(this.order.customerId).subscribe(
      (res: Cart[]) => {
        res.forEach(element => {
           this.order.itemId = element.itemId;
           this.order.price = element.price
           this.createNewOrder();
           this.deleteFromCart(element.cartId);
        });
        window.location.reload();
        this.router.navigate(['profiles/orders']);
     });
  }

  public getShipDetails = () => {
    const username = this.localStorageService.getItem('email');
    this.order.customerId = username,
    this.order.shipName =  this.orderForm.controls.fname.value + this.orderForm.controls.lname.value;
    this.order.shipCountry = this.orderForm.controls.country.value;
    this.order.shipCity = this.orderForm.controls.city.value;
    this.order.mobile = this.orderForm.controls.mobile.value;
    this.order.shipAddressMain = this.orderForm.controls.addressMain.value;
    this.order.shipCountry = this.orderForm.controls.country.value;
    this.order.shipCity = this.orderForm.controls.city.value;
    this.order.shipPostalCode = this.orderForm.controls.zip.value;
    this.order.shipAddressOptional = this.orderForm.controls.addressOptional.value;
    this.order.deleverOn = this.orderForm.controls.date.value;
    const orderDate = new Date().toLocaleDateString();
    this.order.orderDate = orderDate;
  }

  public createNewOrder = () => {
    this.orderService.saveOrder(this.order).subscribe(
      (response: any) => {
        this.messageService.add({severity:'success', summary:'Order', detail: response});
          setTimeout (() => { 
          }, 1000);      
    });
  }
 
  public deleteFromCart = (id) => {
     this.cartService.removeItemFromCart(id).subscribe(
       (response: any) => {
     });
  }
  

}
