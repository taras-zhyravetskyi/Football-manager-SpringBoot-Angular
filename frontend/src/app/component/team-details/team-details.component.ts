import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from 'src/app/service/team.service';
import { Location } from "@angular/common";
import { Team } from 'src/app/model/team';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent implements OnInit {
  teamId!: number;
  team!: Team;

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
      this.getTeamDetails();
  }

  getTeamDetails(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.teamService.getTeamById(id).subscribe(team => this.team = team);
  }

  goBack(): void {
    this.location.back();
  }
}
