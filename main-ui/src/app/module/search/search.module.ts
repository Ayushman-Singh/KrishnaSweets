import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { GlobalMobileSearchComponent } from './components/global-mobile-search/global-mobile-search.component';
import { GlobalDesktopSearchComponent } from './components/global-desktop-search/global-desktop-search.component';
import { GlobalSearchComponent } from './components/global-search/global-search.component';

@NgModule({
  declarations: [
    GlobalMobileSearchComponent, 
    GlobalDesktopSearchComponent, GlobalSearchComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule
  ]
})
export class SearchModule { }
