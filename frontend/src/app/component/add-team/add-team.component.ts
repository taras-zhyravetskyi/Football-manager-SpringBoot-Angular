import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TeamCreationDto} from '../../model/team-creation-dto';
import { TeamService } from '../../service/team.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent implements OnInit {
  team!: TeamCreationDto;
  @Output() teamAdded = new EventEmitter();

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  addTeam(): void {
    if (
      this.team &&
      this.team.name &&
      this.team.country &&
      this.team.city &&
      this.team.commissionRate &&
      this.team.accountBalance
    ) {
      this.teamService.createTeam(this.team).subscribe({
        next: (response) => {
          console.log('New team created:', response);
          this.teamAdded.emit();
          this.resetForm();
        },
        error: (error) => {
          console.log('Error creating team:', error);
        }
      });
    } else {
      console.log('Invalid team data');
    }
  }

  resetForm(): void {
    this.team = {
      name: '',
      country: '',
      city: '',
      commissionRate: 0,
      accountBalance: 0,
    };
  }
}
