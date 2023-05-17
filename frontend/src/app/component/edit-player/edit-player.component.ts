import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from 'src/app/service/player.service';
import { Player } from 'src/app/model/player';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {
  player!: Player;
  startDate!: Date;

  constructor(
    private playerService: PlayerService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getPlayer();
  }

  getPlayer(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.playerService.getPlayerById(id).subscribe((player: Player) => {
      this.player = player;
    });
  }

  updatePlayer(): void {
    const startDate = new Date(this.startDate);
    const currentDate = new Date();
    const monthsOfExperience = this.calculateMonthsDifference(startDate, currentDate);
    this.player.monthsOfExperience = monthsOfExperience;

    if (this.player) {
      this.playerService.updatePlayer(this.player, this.player.id).subscribe(() => {
        console.log('Player updated:', this.player);
        this.router.navigate(['/players', this.player.id]);
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  private calculateMonthsDifference(date1: Date, date2: Date): number {
    const yearsDifference = date2.getFullYear() - date1.getFullYear();
    const monthsDifference = date2.getMonth() - date1.getMonth();
    return yearsDifference * 12 + monthsDifference;
  }
}
