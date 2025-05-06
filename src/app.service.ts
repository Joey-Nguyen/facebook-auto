import { Injectable, OnModuleInit } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService implements OnModuleInit {
  private readonly USER_ACCESS_TOKEN = ['EAAPvnnOouEABO381PVjEGdOknw8Gbe60ZChAJfxZAbQ3ZBfLU6mZBVZBQeaUe2EXPCgy2hBdJmUzKs14DXCWcnnerSVnyY2bbpPyjoKByigevZBDX4WKC2VBlXMnNEEOzLXT3ZCdQoYo6XOifLzx9zanGZCQdkfceEeoJD5CVQIZCcNZA7INgJ4bau3PLI',
  'EAAbRb9ZAmZCNgBOwHb7SbD1SBbmXy58sOpEaPPPQZAvDhaZBQDIhBJJgH0HP3KjZAKom09OuNwfRXJeBALXSOMr7h00xmbqn3blZAFO79N6bTkvc8gOqdFOF16NHu3sJH0gQZA1C8od3upQyLKOiB1x0MPZBg1EJYQtv5fdIJlD5w7ldsxrRp6IOBaB2'
  ];
  private readonly POST_ID = '122121813488793397';
  private readonly COMMENT_TEXT = [
    "Great post! Thanks for sharing this.",
    "Really helpful content, appreciate it!",
    "Love this! Keep it up.",
    "This is exactly what I needed today.",
    "Well explained, thanks a lot!",
    "Awesome! Looking forward to more.",
    "Very informative and easy to follow.",
    "Wow, this is brilliant work!",
    "You're doing a great job!",
    "Keep posting more like this.",
    "This made my day, thank you!",
    "Such a valuable insight, wow!",
    "Totally agree with your points!",
    "Love your perspective on this!",
    "Simple yet powerful message.",
    "Thanks, I learned something new!",
    "Clarity and depth, great combo!",
    "Fantastic write-up, keep going!",
    "I enjoyed reading this a lot!",
    "Great thoughts put into words.",
    "This deserves more attention!",
    "You've nailed it here!",
    "Really well written, kudos!",
    "Nice one! Appreciate the effort.",
    "I’m saving this for later!",
    "Short but impactful, love it.",
    "Great insight, thanks for this.",
    "Nice and straight to the point.",
    "Solid points. Well put!",
    "This content is gold!",
    "Perfect timing, thank you!",
    "Loved every bit of this!",
    "Definitely worth a share!",
    "Clear and concise. Great job!",
    "You're absolutely right!",
    "Couldn't agree more!",
    "Nice breakdown of the topic.",
    "Top-notch post right here.",
    "This is super helpful!",
    "I resonate with this a lot.",
    "A must-read post!",
    "So true and relevant.",
    "Absolutely loved this!",
    "Big thumbs up for this.",
    "Insightful and to the point.",
    "This was eye-opening!",
    "Keep shining with content!",
    "Good read, thank you!",
    "Excellent take on this!",
    "Your content never disappoints.",
    "This is next-level stuff!"
  ];
  private readonly INTERVAL_MS = 2000;
  private pageAccessToken: string;

  async onModuleInit() {
    await this.getPageAccessToken();
    if (!this.pageAccessToken) {
      console.error('Không lấy được Page Access Token');
      return;
    }

    setInterval(() => {
      this.commentOnPost();
    }, 10000);
  }

  getHello(): string {
    return 'Hello World!';
  }

  private getRandomToken(): string {
    const index = Math.floor(Math.random() * this.USER_ACCESS_TOKEN.length);
    return this.USER_ACCESS_TOKEN[index];
  }

  private async getPageAccessToken(): Promise<void> {
    try {
      const token = this.getRandomToken();
      const response = await axios.get(
        `https://graph.facebook.com/v19.0/me/accounts?access_token=${token}`, // Use the random token here
      );

      if (response.data.data.length === 0) {
        console.error('Không tìm thấy Page');
        return;
      }

      this.pageAccessToken = response.data.data[0].access_token;
      console.log('Đã lấy được Page Access Token');
    } catch (error) {
      console.error('Lỗi lấy Page Access Token:', error.response?.data || error.message);
    }
  }

  getRandomComment(): string {
    return this.COMMENT_TEXT[Math.floor(Math.random() * this.COMMENT_TEXT.length)];
  }

  private async commentOnPost(): Promise<void> {
    try {
      const response = await axios.post(
        `https://graph.facebook.com/v19.0/${this.POST_ID}/comments`,
        {
          message: this.getRandomComment(),
          access_token: this.pageAccessToken,
        },
      );

      console.log('Đã comment:', response.data.id);
    } catch (error) {
      console.error('Lỗi khi comment:', error.response?.data || error.message);
    }
  }
}
