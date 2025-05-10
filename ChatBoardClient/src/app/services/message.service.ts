import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MessageService {

  // Stream of messages for UI to subscribe to
  // Поток сообщений, на который подписывается UI
  private messagesSource = new BehaviorSubject<any[]>([]);
  public messages$ = this.messagesSource.asObservable();

  private hubConnection!: signalR.HubConnection;
  private apiUrl = `${environment.apiUrl}/messages`;

  constructor(private http: HttpClient) {}

    /**
   * Connects to SignalR hub
   * Подключение к SignalR хабу
   */
  connectToHub() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.hubUrl)
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR connected!'))
      .catch(err => console.error('SignalR connection error:', err));

    // Receive messages from server
    // Получение сообщений от сервера
    this.hubConnection.on('ReceiveMessage', (message) => {
      console.log('Received from SignalR: ', message);
      const current = this.messagesSource.value;
      this.messagesSource.next([...current, message]);
    });
  }

  /**
   * Fetch messages from REST API
   * Получение сообщений через REST API
   */
  loadMessages() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      this.messagesSource.next(data);
    });
  }

  /**
   * Send new message to server
   * Отправка нового сообщения на сервер
   */
  sendMessage(text: string) {
    return this.http.post(this.apiUrl, { text }).pipe(
      catchError(error => {
        console.error('Error sending message:', error);
        return throwError(error);
      })
    );
  }

  /**
   * Delete message by ID
   * Удаление сообщения по ID
   */
  deleteMessage(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}