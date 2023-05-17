import { Component, EventEmitter, Output } from '@angular/core';
import { Player } from 'src/app/model/player';
import { PlayerService } from 'src/app/service/player.service';
import {TeamService} from "../../service/team.service";
import {Team} from "../../model/team";

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent {
  player!: Player;
  startDate!: Date;
  teams: Team[] = [];

  @Output() playerAdded = new EventEmitter();

  constructor(private playerService: PlayerService,
              private teamService: TeamService) {}

  ngOnInit(): void {
    this.resetForm();
    this.loadTeams();
  }

  addPlayer(): void {
    const startDate = new Date(this.startDate);
    const currentDate = new Date();
    const monthsOfExperience = this.calculateMonthsDifference(startDate, currentDate);
    this.player.monthsOfExperience = monthsOfExperience;

    if (this.player && this.player.name && this.player.age && this.player.monthsOfExperience) {
      this.playerService.createPlayer(this.player).subscribe({
        next: () => {
          console.log('New player created:');
          this.playerAdded.emit();
          this.resetForm();
        },
        error: (error) => {
          console.log('Error creating player:', error);
        }
      });
    } else {
      console.log('Invalid player data');
    }
  }

  resetForm(): void {
    this.player = {
      id: 0,
      name: '',
      age: 0,
      monthsOfExperience: 0,
      teamId: 0,
      teamName: ''
    };
  }

  private calculateMonthsDifference(date1: Date, date2: Date): number {
    const yearsDifference = date2.getFullYear() - date1.getFullYear();
    const monthsDifference = date2.getMonth() - date1.getMonth();
    return yearsDifference * 12 + monthsDifference;
  }

  loadTeams(): void {
    this.teamService.getTeams().subscribe((teams) => {
      this.teams = teams;
    });
  }
}
