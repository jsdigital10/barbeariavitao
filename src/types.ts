export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  originalPrice?: number;
  price: number;
  discountBadge?: string;
  description: string;
  durationMinutes: number;
  iconType: 'haircut' | 'beard' | 'combo' | 'eyebrow' | 'straightening';
}

export interface BookingState {
  step: 1 | 2 | 3 | 4 | 5;
  selectedServices: ServiceItem[];
  selectedDate: string; // YYYY-MM-DD
  selectedTime: string; // HH:mm
  customerName: string;
  customerPhone: string;
  isSubmitting: boolean;
  errorMessage: string | null;
  confirmedAppointment: ConfirmedBooking | null;
}

export interface ConfirmedBooking {
  appointmentId: string;
  serviceName: string; // Formatted combined string or single
  services: ServiceItem[];
  price: number;
  totalDurationMinutes: number;
  date: string;
  formattedDate: string;
  time: string;
  customerName: string;
  customerPhone: string;
  whatsappUrl: string;
}

export interface TimeSlot {
  time: string;
  slotKey: string;
  isTaken: boolean;
  isPast: boolean;
  isSelectable: boolean;
}
