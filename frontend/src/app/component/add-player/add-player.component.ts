import { Component, EventEmitter, Output } from '@angular/core';
import { Player } from 'src/app/model/player';
import { PlayerService } from 'src/app/service/player.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent {
  player!: Player;

  @Output() playerAdded = new EventEmitter();

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.resetForm();
  }

  addPlayer(): void {
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
}

