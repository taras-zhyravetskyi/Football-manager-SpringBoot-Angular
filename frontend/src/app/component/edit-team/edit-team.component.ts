import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from 'src/app/service/team.service';
import { Team } from 'src/app/model/team';
import { Location } from "@angular/common";
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.scss']
})
export class EditTeamComponent {
  teamForm = this.fb.group({
    name: ['', Validators.required],
    country: ['', Validators.required],
    city: ['', Validators.required],
    commissionRate: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
    accountBalance: ['', [Validators.required, Validators.min(0)]],
  });

  constructor(
    private teamService: TeamService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.getTeam()
  }

  getTeam(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.teamService.getTeamById(id).subscribe((team: Team) => {
      this.teamForm.setValue({
        name: team.name,
        country: team.country,
        city: team.city,
        commissionRate: team.commissionRate.toString(),
        accountBalance: team.accountBalance.toString()
      });
    });
  }

  updateTeam(): void {
    const formValues = this.teamForm.value;
    if (formValues.name && formValues.country && formValues.city && formValues.commissionRate && formValues.accountBalance) {
      const team: Team = {
        name: formValues.name,
        country: formValues.country,
        city: formValues.city,
        commissionRate: Number(formValues.commissionRate),
        accountBalance: Number(formValues.accountBalance),
        id: Number(this.route.snapshot.paramMap.get('id')),
        players: []
      };
      this.teamService.updateTeam(team, team.id).subscribe(() => {
        console.log('Team updated:', team);
        this.router.navigate(['/teams', team.id]);
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
