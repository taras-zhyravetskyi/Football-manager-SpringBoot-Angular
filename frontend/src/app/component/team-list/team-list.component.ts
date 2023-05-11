import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService } from 'src/app/service/team.service';
import { Team } from 'src/app/model/team';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  teams: Team[] = [];

  constructor(private teamService: TeamService, private router: Router) { }

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams(): void {
    this.teamService.getTeams().subscribe((data: Team[]) => {
      this.teams = data;
    });
  }

  deleteTeam(id: number): void {
    this.teamService.deleteTeam(id).subscribe(() => {
      this.getTeams();
    });
  }

  viewTeamDetails(id: number): void {
    this.router.navigate(['/teams', id]);
  }
}
