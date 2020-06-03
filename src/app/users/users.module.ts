import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users/users.component';
import { UserCardComponent } from './user-card/user-card.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProfileServiceCardComponent } from './profile-service-card/profile-service-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UsersComponent,
    UserCardComponent,
    UserProfileComponent,
    ProfileServiceCardComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class UsersModule {}
