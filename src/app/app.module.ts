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

@NgModule({
  declarations: [
    AppComponent,
    JeopardyBoardComponent,
    JeopardyCategoryComponent,
    JeopardyCardComponent,
    SplashScreenComponent,
    OpenCloseComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
