import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemServiceService {
  private baseUrl = 'http://localhost:8080/api/item';
  constructor(private http: HttpClient) {}

  getAllItem(
    currentPage: number,
    pageSize: number,
    name: string
  ): Observable<any[]> {
    let params = new HttpParams()
      .set('pageNumber', currentPage)
      .set('pageSize', pageSize)
      .set('name', name);

    return this.http.get<any[]>(`${this.baseUrl}`, { params });
  }

  addItem(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  detailItem(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  editItem(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  masterItems(): Observable<any> {
    return this.http.get(`${this.baseUrl}/master`);
  }
}
