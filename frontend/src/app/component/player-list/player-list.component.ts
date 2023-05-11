import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/service/player.service';
import { Player } from 'src/app/model/player';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {
  players: Player[] = [];

  constructor(
    private playerService: PlayerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getPlayers();
  }

  getPlayers(): void {
    this.playerService.getPlayers().subscribe((data: Player[]) => {
      this.players = data;
    });
  }

  deletePlayer(id: number): void {
    this.playerService.deletePlayer(id).subscribe(() => {
      this.getPlayers();
    });
  }
}
