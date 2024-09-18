import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../../customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerListService {
  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) {}

  getAllCustomer(
    currentPage: number,
    pageSize: number,
    name: string
  ): Observable<Customer[]> {
    let params = new HttpParams()
      .set('pageNumber', currentPage)
      .set('pageSize', pageSize)
      .set('name', name);

    return this.http.get<any[]>(`${this.baseUrl}/customer`, { params });
  }

  addCustomer(data: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/customer`, data);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/customer/${id}`);
  }

  detailCustomer(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/customer/${id}`);
  }

  editCustomer(id: number, data: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/customer/${id}`, data);
  }
}
