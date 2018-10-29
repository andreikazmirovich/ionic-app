import { NgModule } from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [NavBarComponent],
	imports: [
		IonicModule.forRoot(NavBarComponent)
	],
	exports: [NavBarComponent]
})
export class ComponentsModule { }
