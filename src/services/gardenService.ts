
import { db } from '@/lib/firebase';
import { collection, doc, getDoc, updateDoc, setDoc, onSnapshot, query, where } from 'firebase/firestore';
import { auth } from '@/lib/firebase';

export interface GardenItem {
  id: string;
  type: "flower" | "tree" | "plant";
  x: number;
  y: number;
  size: number;
  color: string;
  growth: number;
  createdAt: Date;
  lastWatered: Date;
}

export interface GardenStats {
  plantsGrowing: number;
  daysActive: number;
  missionsCompleted: number;
  lastVisited: Date;
}

export const initializeGarden = async (userId: string) => {
  const gardenRef = doc(db, 'gardens', userId);
  const gardenDoc = await getDoc(gardenRef);
  
  if (!gardenDoc.exists()) {
    const initialStats: GardenStats = {
      plantsGrowing: 0,
      daysActive: 1,
      missionsCompleted: 0,
      lastVisited: new Date()
    };
    
    await setDoc(gardenRef, initialStats);
  }
};

export const getGardenStats = async (userId: string): Promise<GardenStats> => {
  const gardenRef = doc(db, 'gardens', userId);
  const gardenDoc = await getDoc(gardenRef);
  
  if (!gardenDoc.exists()) {
    await initializeGarden(userId);
    return {
      plantsGrowing: 0,
      daysActive: 1,
      missionsCompleted: 0,
      lastVisited: new Date()
    };
  }
  
  return gardenDoc.data() as GardenStats;
};

export const getGardenItems = (userId: string, callback: (items: GardenItem[]) => void) => {
  const itemsRef = collection(db, 'gardens', userId, 'items');
  const q = query(itemsRef);
  
  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
      createdAt: doc.data().createdAt.toDate(),
      lastWatered: doc.data().lastWatered.toDate()
    })) as GardenItem[];
    
    callback(items);
  });
};

export const addGardenItem = async (userId: string, type: "flower" | "tree" | "plant") => {
  const itemsRef = collection(db, 'gardens', userId, 'items');
  const gardenRef = doc(db, 'gardens', userId);
  
  const newItem: Omit<GardenItem, 'id'> = {
    type,
    x: Math.random() * 80 + 10, // Random position between 10-90%
    y: Math.random() * 60 + 20, // Random position between 20-80%
    size: type === 'tree' ? 80 : type === 'flower' ? 40 : 35,
    color: getRandomColor(),
    growth: 0,
    createdAt: new Date(),
    lastWatered: new Date()
  };
  
  await setDoc(doc(itemsRef), newItem);
  
  // Update stats
  const stats = await getGardenStats(userId);
  await updateDoc(gardenRef, {
    plantsGrowing: stats.plantsGrowing + 1,
    lastVisited: new Date()
  });
};

const getRandomColor = () => {
  const colors = [
    '#D1DEBD', // sage
    '#A6C36F', // moss
    '#89CFF0', // water
    '#E6CCBE', // clay
    '#B4D6C1', // mint
    '#F7D1BA', // peach
    '#C8A2C8', // lilac
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
