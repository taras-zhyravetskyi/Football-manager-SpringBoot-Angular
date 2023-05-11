import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from 'src/app/service/team.service';
import { Team } from 'src/app/model/team';
import {Location} from "@angular/common";

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.scss']
})
export class EditTeamComponent {
  team!: Team;

  constructor(
    private teamService: TeamService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getTeam()
  }

  getTeam(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.teamService.getTeamById(id).subscribe((team: Team) => {
      this.team = team;
    });
  }

  updateTeam(): void {
    if (this.team) {
      this.teamService.updateTeam(this.team, this.team.id).subscribe(() => {
        console.log('Team updated:', this.team);
        this.router.navigate(['/teams', this.team.id]);
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
