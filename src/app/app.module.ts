import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JeopardyBoardComponent } from './jeopardy-board/jeopardy-board.component';
import { JeopardyCategoryComponent } from './jeopardy-category/jeopardy-category.component';
import { JeopardyCardComponent } from './jeopardy-card/jeopardy-card.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { OpenCloseComponent } from './open-close/open-close.component';
import { Ng2FittextModule } from 'ng2-fittext';
import { MaximizeDirective } from './maximize.directive';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    JeopardyBoardComponent,
    JeopardyCategoryComponent,
    JeopardyCardComponent,
    SplashScreenComponent,
    OpenCloseComponent,
    MaximizeDirective,
    HomeComponent,
    GameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    Ng2FittextModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
