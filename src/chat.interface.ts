import { IOffer } from './order.interface';
import { ISellerGig } from './gig.interface';
import { ISellerDocument } from './seller.interface';

export interface IConversation {
  id: string;
  conversationId: string;
  senderUsername: string;
  receiverUsername: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IMessage {
  id?: string;
  conversationId?: string;
  body?: string;
  url?: string;
  file?: string;
  fileType?: string;
  fileSize?: string;
  fileName?: string;
  gigId?: string;
  sellerId?: string;
  buyerId?: string;
  senderUsername?: string;
  senderPicture?: string;
  receiverUsername?: string;
  receiverPicture?: string;
  isRead?: boolean;
  hasOffer?: boolean;
  offer?: IOffer;
  hasConversationId?: boolean;
  createdAt?: Date | string;
}

export interface IMessageDetails {
  sender?: string;
  offerLink?: string;
  amount?: string;
  buyerUsername?: string;
  sellerUsername?: string;
  title?: string;
  description?: string;
  deliveryDays?: string;
  template?: string;
}

export interface IChatBoxProps {
  seller: IChatSellerProps;
  buyer: IChatBuyerProps
  gigId: string;
  onClose: () => void;
}

export interface IChatSellerProps {
  id: string;
  username: string;
  profilePicture: string;
  responseTime: number;
}

export interface IChatBuyerProps {
  id: string;
  username: string;
  profilePicture: string;
}

export interface IChatMessageProps {
  message: IMessage;
  seller?: ISellerDocument;
  gig?: ISellerGig;
}
