import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDocFromServer,
  collection,
  query,
  where,
  onSnapshot,
  runTransaction,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase App
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore using the configured database ID
export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Connection test helper per guidelines
export async function testFirebaseConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'publicAvailability', 'connection-test-check'));
    return true;
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    if (errorMsg.includes('the client is offline')) {
      console.warn('Firebase client appears offline:', errorMsg);
      return false;
    }
    // Document not existing or permission on check doc is normal for initial connection
    return true;
  }
}

export interface AppointmentData {
  customerName: string;
  customerPhone: string;
  serviceId: string;
  serviceName: string;
  services?: { id: string; name: string; price: number }[];
  totalDurationMinutes?: number;
  price: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  slotKey: string; // YYYY-MM-DD_HH-mm
}

export class SlotAlreadyBookedError extends Error {
  constructor(message = 'Ops! Esse horário acabou de ser reservado. Escolha outro horário disponível.') {
    super(message);
    this.name = 'SlotAlreadyBookedError';
  }
}

/**
 * Real-time listener for public availability on a specific date.
 * Does NOT expose client personal information (PII).
 */
export function listenToDayAvailability(
  dateStr: string,
  onUpdate: (takenSlotKeys: Set<string>) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  const publicRef = collection(db, 'publicAvailability');
  const q = query(publicRef, where('date', '==', dateStr));

  return onSnapshot(
    q,
    (snapshot) => {
      const taken = new Set<string>();
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.status === 'reserved') {
          taken.add(docSnap.id);
        }
      });
      onUpdate(taken);
    },
    (err) => {
      console.error('Erro ao escutar disponibilidade:', err);
      if (onError) onError(err);
    }
  );
}

/**
 * Atomic reservation to strictly avoid double-booking for the same date & time slot.
 */
export async function bookSlotAtomically(appointment: AppointmentData): Promise<{ appointmentId: string }> {
  const slotKey = appointment.slotKey;
  const publicSlotRef = doc(db, 'publicAvailability', slotKey);
  const appointmentRef = doc(db, 'appointments', slotKey);

  await runTransaction(db, async (transaction) => {
    // 1. Check if public slot is already taken
    const publicDoc = await transaction.get(publicSlotRef);
    if (publicDoc.exists()) {
      const data = publicDoc.data();
      if (data?.status === 'reserved') {
        throw new SlotAlreadyBookedError();
      }
    }

    // 2. Mark public slot as reserved (safe public availability flag, zero personal data)
    transaction.set(publicSlotRef, {
      slotKey: slotKey,
      date: appointment.date,
      time: appointment.time,
      status: 'reserved',
      reservedAt: serverTimestamp(),
    });

    // 3. Save full appointment with customer details in private collection
    transaction.set(appointmentRef, {
      appointmentId: slotKey,
      customerName: appointment.customerName.trim(),
      customerPhone: appointment.customerPhone.trim(),
      serviceId: appointment.serviceId,
      serviceName: appointment.serviceName,
      services: appointment.services || [],
      totalDurationMinutes: appointment.totalDurationMinutes || 45,
      price: appointment.price,
      date: appointment.date,
      time: appointment.time,
      slotKey: slotKey,
      status: 'confirmed',
      createdAt: serverTimestamp(),
    });
  });

  return { appointmentId: slotKey };
}
