import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private hubConnection!: signalR.HubConnection;
  private messagesSource = new BehaviorSubject<any[]>([]);
  public messages$ = this.messagesSource.asObservable();

  private apiUrl = `${environment.apiUrl}/messages`;

  constructor(private http: HttpClient) {}

  connectToHub() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.hubUrl)
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start()
      .catch(err => console.error('SignalR error:', err));

    this.hubConnection.on('ReceiveMessage', (message) => {
      const current = this.messagesSource.value;
      this.messagesSource.next([...current, message]);
    });
  }

  loadMessages() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      this.messagesSource.next(data);
    });
  }

  sendMessage(text: string) {
    return this.http.post(this.apiUrl, { text });
  }

  deleteMessage(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
