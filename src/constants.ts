import { ServiceItem } from './types';

export const BARBERSHOP_NAME = 'Barbearia do Vitor';
export const BARBERSHOP_TAGLINE = 'Seu estilo. Seu horário. Sua barbearia.';
export const BARBERSHOP_SUBTITLE = 'Escolha um ou mais serviços e reserve seu horário em poucos segundos.';

export const LOGO_URL = 'https://i.postimg.cc/DfqB3jNB/39D2C935-6F5E-46C5-9DBE-985C605F50B9.png';

export const WHATSAPP_PHONE = '5534997661001';
export const WHATSAPP_SHORT_LINK = 'https://wa.link/etvn9y';

export const CAROUSEL_IMAGES = [
  'https://i.postimg.cc/m2YqV2RC/IMG-6442.jpg',
  'https://i.postimg.cc/c4RjT4ZQ/IMG-6443.jpg',
  'https://i.postimg.cc/Yq6V8qkQ/IMG-6444.jpg',
  'https://i.postimg.cc/rF1bgFcG/IMG-6445.jpg',
  'https://i.postimg.cc/8PR3wPDb/IMG-6446.jpg',
  'https://i.postimg.cc/sg3LLdD5/IMG-6447.jpg',
  'https://i.postimg.cc/nhnWWbcv/IMG-6448.jpg',
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'corte',
    name: 'Corte',
    category: 'Cabelo',
    price: 30.0,
    description: 'Corte degradê, social ou moderno com finalização profissional',
    durationMinutes: 45,
    iconType: 'haircut',
  },
  {
    id: 'barba',
    name: 'Barba',
    category: 'Barba',
    price: 20.0,
    description: 'Desenho preciso, toalha quente e hidratação com óleos nobres',
    durationMinutes: 45,
    iconType: 'beard',
  },
  {
    id: 'corte-barba',
    name: 'Corte + Barba',
    category: 'Combo Especial',
    originalPrice: 50.0,
    price: 47.5,
    discountBadge: '5% DE DESCONTO',
    description: 'Combo completo de alinhamento de cabelo e barba com desconto',
    durationMinutes: 45,
    iconType: 'combo',
  },
  {
    id: 'sobrancelha',
    name: 'Sobrancelha',
    category: 'Acabamento',
    price: 15.0,
    description: 'Alinhamento navalhado e limpeza simétrica do olhar',
    durationMinutes: 30,
    iconType: 'eyebrow',
  },
  {
    id: 'selagem',
    name: 'Selagem',
    category: 'Tratamento',
    price: 100.0,
    description: 'Alinhamento capilar térmico, brilho extremo e redução de volume',
    durationMinutes: 90,
    iconType: 'straightening',
  },
];

// Business hours: 08:00 to 19:00 with 45-min intervals
export const BUSINESS_TIME_SLOTS = [
  '08:00',
  '08:45',
  '09:30',
  '10:15',
  '11:00',
  '11:45',
  '12:30',
  '13:15',
  '14:00',
  '14:45',
  '15:30',
  '16:15',
  '17:00',
  '17:45',
  '18:30',
];

export function formatCurrencyBRL(val: number): string {
  return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatDateBR(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}

export function calculateServicesSummary(services: ServiceItem[]): {
  totalPrice: number;
  totalDurationMinutes: number;
  formattedNames: string;
} {
  if (!services || services.length === 0) {
    return { totalPrice: 0, totalDurationMinutes: 0, formattedNames: '' };
  }

  const totalPrice = services.reduce((acc, curr) => acc + curr.price, 0);
  const totalDurationMinutes = services.reduce((acc, curr) => acc + curr.durationMinutes, 0);
  const formattedNames = services.map((s) => s.name).join(' + ');

  return {
    totalPrice,
    totalDurationMinutes,
    formattedNames,
  };
}

export function buildWhatsAppMessage(params: {
  customerName: string;
  serviceName: string;
  services?: ServiceItem[];
  date: string;
  time: string;
  price: number;
  totalDurationMinutes?: number;
}): string {
  const formattedDate = formatDateBR(params.date);
  const formattedPrice = formatCurrencyBRL(params.price);
  const durationText = params.totalDurationMinutes ? `\n⏱️ Duração: ~${params.totalDurationMinutes} min` : '';

  return (
    `Olá, Barbearia do Vitor! 👋\n\n` +
    `Acabei de realizar meu agendamento pelo site.\n\n` +
    `👤 Nome: ${params.customerName}\n` +
    `✂️ Serviço(s): ${params.serviceName}\n` +
    `📅 Data: ${formattedDate}\n` +
    `⏰ Horário: ${params.time}` +
    `${durationText}\n` +
    `💰 Valor: ${formattedPrice}\n\n` +
    `Meu horário foi reservado pelo sistema. Até lá!`
  );
}

export function buildWhatsAppUrl(message: string): string {
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`;
}
