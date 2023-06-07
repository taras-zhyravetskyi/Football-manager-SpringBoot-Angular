import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TeamListComponent} from "./component/team-list/team-list.component";
import {TeamDetailsComponent} from "./component/team-details/team-details.component";
import {EditTeamComponent} from "./component/edit-team/edit-team.component";
import {PlayerListComponent} from "./component/player-list/player-list.component";
import {EditPlayerComponent} from "./component/edit-player/edit-player.component";
import {PlayerDetailsComponent} from "./component/player-details/player-details.component";
import {AddTeamComponent} from "./component/add-team/add-team.component";
import {AddPlayerComponent} from "./component/add-player/add-player.component";

const routes: Routes = [
  { path: 'teams', component: TeamListComponent },
  { path: 'teams/:id', component: TeamDetailsComponent },
  { path: 'teams/:id/editing', component: EditTeamComponent },
  { path: 'teams/add', component: AddTeamComponent },
  { path: 'players', component: PlayerListComponent },
  { path: 'players/:id', component: PlayerDetailsComponent },
  { path: 'players/:id/editing', component: EditPlayerComponent },
  { path: 'players/add', component: AddPlayerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
