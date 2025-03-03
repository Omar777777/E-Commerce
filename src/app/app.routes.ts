import { Routes } from '@angular/router';
import { AuthComponent } from './core/layouts/auth/auth.component';
import { UserComponent } from './core/layouts/user/user.component';
import { LoginComponent } from './core/auth/components/login/login.component';
import { RegisterComponent } from './core/auth/components/register/register.component';
import { HomeComponent } from './feature/home/components/home/home.component';
import { ProductListComponent } from './feature/product/components/product-list/product-list.component';
import { ProductDetailesComponent } from './feature/product/components/product-detailes/product-detailes.component';
import { loginfirstGuard } from './core/gurads/loginfirst.guard';
import { loggedinGuard } from './core/gurads/loggedin.guard';
import { CartListComponent } from './feature/cart/components/cart-list/cart-list.component';
import { OrderComponent } from './feature/order/components/order/order.component';
import { AllorderscheckedoutComponent } from './feature/order/components/allorderscheckedout/allorderscheckedout.component';
import { ForgetpasswordComponent } from './core/auth/components/forgetpassword/forgetpassword.component';
import { VerifyCodeComponent } from './core/auth/components/verify-code/verify-code.component';
import { ResertPasswordComponent } from './core/auth/components/resert-password/resert-password.component';
import { BrandsComponent } from './feature/brands/components/brands/brands.component';
import { CategoryListComponent } from './feature/categories/components/category-list/category-list.component';
import { WishListComponent } from './feature/whishlist/components/wish-list/wish-list.component';



export const routes: Routes = [
    {
        path: "", component: AuthComponent, canActivate:[loggedinGuard], children: [
            {path:"", redirectTo:"login", pathMatch:"full"},
            { path: "login", component: LoginComponent },
            { path: "register", component: RegisterComponent },
            { path: 'forget-password', component: ForgetpasswordComponent },
            { path: 'verify-code', component: VerifyCodeComponent },
            {path:'reset-password', component:ResertPasswordComponent},

        ]
    },
    {
        path: "", component: UserComponent, canActivate: [loginfirstGuard], children: [
            { path: "", redirectTo: "home", pathMatch: "full" },
            { path: "home", component: HomeComponent },
            { path: "product", component: ProductListComponent },
            { path: "product-detailes/:id", component: ProductDetailesComponent },
            { path: "cart", component: CartListComponent },
            { path: "checkout/:id", component: OrderComponent },
            { path: "/#/allorders", component: AllorderscheckedoutComponent },
            { path: "brand", component: BrandsComponent },
            { path: "category", component: CategoryListComponent },
            {path: "wishlist", component:WishListComponent}
            
            
        ]
    }
];
