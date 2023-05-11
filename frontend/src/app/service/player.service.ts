import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from "../model/player";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUrl = 'http://localhost:8080/players';

  constructor(private http: HttpClient) {}

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.apiUrl);
  }

  getPlayerById(id: number): Observable<Player> {
    return this.http.get<Player>(`${this.apiUrl}/${id}`);
  }

  createPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(this.apiUrl, player);
  }

  updatePlayer(player: Player, id: number): Observable<Player> {
    return this.http.put<Player>(`${this.apiUrl}/${id}`, player);
  }

  deletePlayer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  transferPlayer(playerId: number, toTeamId: number): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/transfer/${playerId}/${toTeamId}`);
  }
}
