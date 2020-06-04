import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users/users.component';
import { UserCardComponent } from './user-card/user-card.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProfileServiceCardComponent } from './profile-service-card/profile-service-card.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MessageFormComponent } from './message-form/message-form.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserCardComponent,
    UserProfileComponent,
    ProfileServiceCardComponent,
    MessageFormComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class UsersModule {}
