import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamListComponent } from './component/team-list/team-list.component';
import { AddTeamComponent } from './component/add-team/add-team.component';
import { EditTeamComponent } from './component/edit-team/edit-team.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TeamDetailsComponent } from './component/team-details/team-details.component';
import { PlayerListComponent } from './component/player-list/player-list.component';
import { AddPlayerComponent } from './component/add-player/add-player.component';
import { PlayerDetailsComponent } from './component/player-details/player-details.component';
import { EditPlayerComponent } from './component/edit-player/edit-player.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamListComponent,
    AddTeamComponent,
    EditTeamComponent,
    TeamDetailsComponent,
    PlayerListComponent,
    AddPlayerComponent,
    PlayerDetailsComponent,
    EditPlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
