import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderServiceService {
  private baseUrl = 'http://localhost:8080/api/order';
  constructor(private http: HttpClient) {}

  getAllOrder(
    currentPage: number,
    pageSize: number,
    keyword: string
  ): Observable<any[]> {
    let params = new HttpParams()
      .set('pageNumber', currentPage)
      .set('pageSize', pageSize)
      .set('keyword', keyword);

    return this.http.get<any[]>(`${this.baseUrl}`, { params });
  }

  addOrder(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  detailOrder(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  editOrder(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  downloadReport(
    currentPage: number,
    pageSize: number,
    keyword: string
  ): Observable<HttpResponse<Blob>> {
    let params = new HttpParams()
      .set('pageNumber', currentPage)
      .set('pageSize', pageSize)
      .set('keyword', keyword);

    return this.http.get(`http://localhost:8080/api/report/pdf`, {
      params: params,
      observe: 'response',
      responseType: 'blob',
    });
  }
}
