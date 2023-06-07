import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/service/team.service';
import { Team } from 'src/app/model/team';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  teams: Team[] = [];
  displayedColumns: string[] = ['id', 'name', 'country', 'city', 'actions'];


  constructor(private teamService: TeamService) { }

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

  scrollToAddTeam(): void {
    const element = document.getElementById('add-team');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
