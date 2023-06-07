import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  displayedColumns: string[] = ['id', 'name', 'age', 'monthsOfExperience', 'teamName', 'actions'];

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

  scrollToAddPlayer(): void {
    const element = document.getElementById('add-player');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
