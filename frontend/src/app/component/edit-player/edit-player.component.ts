import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from 'src/app/service/player.service';
import { Player } from 'src/app/model/player';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss'],
})
export class EditPlayerComponent implements OnInit {
  playerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    age: ['', [Validators.required, Validators.min(14), Validators.pattern('^[0-9]*$')]],
    startDate: ['', Validators.required],
    teamId: ['', Validators.pattern('^[0-9]*$')],
  });

  constructor(
    private playerService: PlayerService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getPlayer();
  }

  getPlayer(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.playerService.getPlayerById(id).subscribe((player: Player) => {
      const startDate = this.calculateStartDate(player.monthsOfExperience);
      this.playerForm.setValue({
        name: player.name,
        age: player.age.toString(),
        startDate: startDate,
        teamId: player.teamId.toString(),
      });
    });
  }

  updatePlayer(): void {
    if (this.playerForm.invalid) {
      console.log('Invalid player data');
      return;
    }

    const startDateValue = this.playerForm.value.startDate;
    const startDate = startDateValue ? new Date(startDateValue) : new Date();
    const currentDate = new Date();
    const monthsOfExperience = this.calculateMonthsDifference(startDate, currentDate);

    const player: Player = {
      id: Number(this.route.snapshot.paramMap.get('id')),
      name: this.playerForm.value.name || '',
      age: Number(this.playerForm.value.age) || 0,
      monthsOfExperience: monthsOfExperience || 0,
      teamId: Number(this.playerForm.value.teamId) || 0,
      teamName: '',
    };

    this.playerService.updatePlayer(player, player.id).subscribe(() => {
      console.log('Player updated:', player);
      this.router.navigate(['/players', player.id]);
    });
  }

  goBack(): void {
    this.location.back();
  }

  private calculateMonthsDifference(date1: Date, date2: Date): number {
    const yearsDifference = date2.getFullYear() - date1.getFullYear();
    const monthsDifference = date2.getMonth() - date1.getMonth();
    return yearsDifference * 12 + monthsDifference;
  }

  private calculateStartDate(monthsOfExperience: number): string {
    const currentDate = new Date();
    const yearsOfExperience = Math.floor(monthsOfExperience / 12);
    const monthsRemainder = monthsOfExperience % 12;

    const startYear = currentDate.getFullYear() - yearsOfExperience;
    const startMonth = currentDate.getMonth() - monthsRemainder;

    let startDate = new Date();
    startDate.setFullYear(startYear);
    startDate.setMonth(startMonth);

    return startDate.toISOString().split('T')[0];
  }
}
