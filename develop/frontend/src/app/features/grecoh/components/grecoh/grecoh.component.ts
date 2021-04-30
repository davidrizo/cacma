import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {GrecohState} from '../../store/state/grecoh.state';
import {Store} from '@ngrx/store';
import {GetCollaborators} from '../../store/actions/grecoh.actions';
import {selectCollaborators} from '../../store/selectors/grecoh.selector';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../../auth/auth.service';
import {Collaborator} from '../../model/collaborator';

@Component({
  selector: 'app-grecoh',
  templateUrl: './grecoh.component.html',
  styleUrls: ['./grecoh.component.css']
})
export class GrecohComponent implements OnInit, OnDestroy {
  private collaboratorsSubscription: Subscription;
  private authSubscription: Subscription;
  private userEMail: string;
  private collaborators: Collaborator[];
  isCollaborator: boolean;

  constructor(private store: Store<GrecohState>, private authService: AuthService) {

  }

  ngOnInit() {
    this.store.dispatch(new GetCollaborators());
    this.authSubscription = this.authService.userProfile$.subscribe(next => {
      if (next) {
        this.userEMail = next.email;
        this.updateIsCollaborator();
      }
    });

    this.collaboratorsSubscription = this.store.select(selectCollaborators).subscribe(next => {
      if (next) {
        this.collaborators = next;
        this.updateIsCollaborator();
      }
    });
  }

  private updateIsCollaborator() {
    if (this.userEMail && this.collaborators) {
      this.isCollaborator = this.collaborators.find(collaborator => collaborator.email === this.userEMail) !== undefined;
    }
  }

  ngOnDestroy(): void {
    this.collaboratorsSubscription.unsubscribe();
  }

}
