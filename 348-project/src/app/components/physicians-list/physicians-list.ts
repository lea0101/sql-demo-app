import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core/primitives/di';
import { Observable } from 'rxjs';
import { PhysicianService } from '../../services/physicians';

@Component({
  selector: 'app-physicians-list',
  imports: [],
  templateUrl: './physicians-list.html',
})
@Injectable({
  providedIn: 'root'
})
export class PhysicianList {
  http = inject(HttpClient);
  physicianService = inject(PhysicianService);

  getPhysiciansList(): Observable<Map<number, string>>
  {
    this.physicianService.httpClient = this.http;
    return this.physicianService.getNamesAndIds();
  }
}
