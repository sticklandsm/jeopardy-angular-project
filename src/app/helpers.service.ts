import { Injectable } from '@angular/core';
import request from 'superagent';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  constructor() {}

  async getJeopardyGame() {
    try {
      const response = await request.get('http://localhost:8999/');
      return response.body;
    } catch (error) {
      console.error(error);
    }
  }
}
