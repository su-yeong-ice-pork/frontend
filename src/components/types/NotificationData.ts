export interface NotificationData {
  imageUrl: string;
  content?: string;
  sender: string;
  time: string;
  type: 'emoji' | 'text';
}
