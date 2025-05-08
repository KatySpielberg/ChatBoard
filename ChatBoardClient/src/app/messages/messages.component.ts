import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  newMessage = '';
  messages: any[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.connectToHub();
    this.messageService.loadMessages();
    this.messageService.messages$.subscribe(data => {
      this.messages = data;
    });
  }

  send(): void {
    if (!this.newMessage.trim()) return;
    this.messageService.sendMessage(this.newMessage).subscribe(() => {
      this.newMessage = '';
    });
  }

  delete(id: number): void {
    this.messageService.deleteMessage(id).subscribe(() => {
      this.messages = this.messages.filter(m => m.id !== id);
    });
  }
}