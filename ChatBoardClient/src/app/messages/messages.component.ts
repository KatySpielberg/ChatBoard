import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  newMessage = '';
  messages: any[] = [];

  constructor(
    private messageService: MessageService,
    private cdRef: ChangeDetectorRef
  ) {}

    /**
   * Initializes component and subscribes to message stream
   * Инициализация компонента и подписка на поток сообщений
   */
  ngOnInit(): void {
    this.messageService.connectToHub();
    this.messageService.loadMessages();

    this.messageService.messages$.subscribe(data => {
      console.log('Updated messages from SignalR:', data);
      this.messages = data;
      this.cdRef.detectChanges();  // Force UI update / Принудительно обновляем DOM
    });
  }

   /**
   * Send message using service
   * Отправка сообщения через сервис
   */
  send(): void {
    if (!this.newMessage.trim()) return;

    this.messageService.sendMessage(this.newMessage).subscribe(() => {
      console.log('Message sent:', this.newMessage);
      this.newMessage = '';
    });
  }

  delete(id: number): void {
    this.messageService.deleteMessage(id).subscribe(() => {
      console.log('Message deleted id:', id);
      this.messages = this.messages.filter(m => m.id !== id);
    });
  }
}
