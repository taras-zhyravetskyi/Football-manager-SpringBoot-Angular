import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PlayerService } from 'src/app/service/player.service';
import { TeamService } from "../../service/team.service";
import { Team } from "../../model/team";
import {Player} from "../../model/player";

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent {
  teams: Team[] = [];

  @Output() playerAdded = new EventEmitter();

  playerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    age: ['', [Validators.required, Validators.min(14)]],
    startDate: ['', Validators.required],
    teamId: ['']
  });

  constructor(private playerService: PlayerService,
              private teamService: TeamService,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadTeams();
  }

  addPlayer(): void {
    if (this.playerForm.invalid) {
      console.log('Invalid player data');
      return;
    }

    const startDate = this.playerForm.value.startDate
      ? new Date(this.playerForm.value.startDate)
      : new Date();
    const currentDate = new Date();
    const monthsOfExperience = this.calculateMonthsDifference(startDate, currentDate);

    const player: Player = {
      id: 0,
      name: this.playerForm.value.name || '',
      age: Number(this.playerForm.value.age) || 0,
      monthsOfExperience: monthsOfExperience || 0,
      teamId: Number(this.playerForm.value.teamId) || 0,
      teamName: ''
    };


    this.playerService.createPlayer(player).subscribe({
      next: () => {
        console.log('New player created:');
        this.playerAdded.emit();
        this.playerForm.reset();
      },
      error: (error) => {
        console.log('Error creating player:', error);
      }
    });
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
