import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../model/team';
import {TeamCreationDto} from "../model/team-creation-dto";
import { environment} from "../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private readonly apiUrl = environment.apiUrlHost + '/teams';

  constructor(private http: HttpClient) {}

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.apiUrl);
  }

  getTeamById(id: number): Observable<Team> {
    return this.http.get<Team>(`${this.apiUrl}/${id}`);
  }

  createTeam(team: TeamCreationDto): Observable<TeamCreationDto> {
    return this.http.post<Team>(this.apiUrl, team);
  }

  updateTeam(team: Team, id: number): Observable<Team> {
    return this.http.put<Team>(`${this.apiUrl}/${id}`, team);
  }

  deleteTeam(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
