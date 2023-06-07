import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {TeamCreationDto} from '../../model/team-creation-dto';
import { TeamService } from '../../service/team.service';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent implements OnInit {
  @Output() teamAdded = new EventEmitter();

  teamForm = this.fb.group({
    name: ['', Validators.required],
    country: ['', Validators.required],
    city: ['', Validators.required],
    commissionRate: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
    accountBalance: [0, [Validators.required, Validators.min(0)]],
  });

  constructor(private teamService: TeamService,
              private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  addTeam(): void {
    if (this.teamForm.valid) {
      const teamData: TeamCreationDto = {
        name: this.teamForm.get('name')?.value ?? '',
        country: this.teamForm.get('country')?.value ?? '',
        city: this.teamForm.get('city')?.value ?? '',
        commissionRate: this.teamForm.get('commissionRate')?.value ?? 0,
        accountBalance: this.teamForm.get('accountBalance')?.value ?? 0,
      };

      this.teamService.createTeam(teamData).subscribe({
        next: (response) => {
          console.log('New team created:', response);
          this.teamAdded.emit();
          this.teamForm.reset();
        },
        error: (error) => {
          console.log('Error creating team:', error);
        }
      });
    } else {
      console.log('Invalid team data');
    }
  }
}
