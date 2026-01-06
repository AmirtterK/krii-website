// types/database.ts
export type ModerationStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'UNDER_REVIEW';
export type RequestStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED' | 'CANCELLED';
export type BookingStatus = 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface User {
  user_id: string;
  email: string;
  phone_number?: string;
  first_name?: string;
  last_name?: string;
  address?: string;
  profile_photo?: string;
  location_enabled: boolean;
  vacation_mode: boolean;
  created_at: string;
}

export interface Merchant {
  merchant_id: string;
  user_id: string;
  business_name: string;
  business_license?: string;
  verified_status: boolean;
  created_at: string;
}

export interface Category {
  category_id: string;
  name: string;
  icon?: string;
}

export interface Item {
  item_id: string;
  owner_id: string;
  merchant_id?: string;
  category_id?: string;
  title: string;
  description?: string;
  photos?: string[];
  status: ModerationStatus;
  average_rating: number;
  total_reviews: number;
  created_at: string;
}

export interface RentalRequest {
  request_id: string;
  item_id: string;
  borrower_id: string;
  owner_id: string;
  request_date: string;
  start_date: string;
  end_date: string;
  status: RequestStatus;
  pickup_location?: string;
  created_at: string;
}

export interface Booking {
  booking_id: string;
  request_id: string;
  confirmed_at: string;
  pickup_location?: string;
  start_time: string;
  return_time: string;
  status: BookingStatus;
  created_at: string;
}

export interface Rating {
  rating_id: string;
  item_id: string;
  booking_id: string;
  reviewer_id: string;
  stars: number;
  comment?: string;
  created_at: string;
}

export interface Conversation {
  conversation_id: string;
  request_id: string;
  participant_ids?: string[];
  last_message_at?: string;
  created_at: string;
}

export interface Message {
  message_id: string;
  conversation_id: string;
  sender_id: string;
  receiver_id: string;
  content?: string;
  timestamp: string;
  is_read: boolean;
}