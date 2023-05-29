import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from 'src/app/service/player.service';
import { Player } from 'src/app/model/player';
import { Location } from '@angular/common';
import { TeamService } from "../../service/team.service";
import { Team } from "../../model/team";

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss']
})
export class PlayerDetailsComponent implements OnInit {
  player!: Player;
  teams: Team[] = [];
  newTeamId!: number;

  constructor(
    private playerService: PlayerService,
    private teamService: TeamService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getPlayer();
    this.getTeams()
  }

  getPlayer(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.playerService.getPlayerById(id).subscribe((player: Player) => {
      this.player = player;
    });
  }

  getTeams(): void {
    this.teamService.getTeams().subscribe((data: Team[]) => {
      this.teams = data;
    });
  }

  getCareerStartDate(): Date {
    const currentDate = new Date();
    const careerStartDate = new Date(currentDate.setMonth(currentDate.getMonth() - this.player.monthsOfExperience));
    return careerStartDate;
  }

  goBack(): void {
    this.location.back();
  }

  transferPlayer(): void {
      this.playerService.transferPlayer(this.player.id, this.newTeamId).subscribe({
        next: (response) => {
          console.log(response);
          this.getPlayer(); //
        },
        error: (error) => {
          console.log(error);
        }
      });
  }
}
