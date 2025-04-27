
import { db } from '@/lib/firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  updateDoc, 
  setDoc, 
  onSnapshot, 
  query, 
  where, 
  serverTimestamp, 
  Timestamp,
  DocumentData
} from 'firebase/firestore';
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
  try {
    const gardenRef = doc(db, 'gardens', userId);
    const gardenDoc = await getDoc(gardenRef);
    
    if (!gardenDoc.exists()) {
      const initialStats = {
        plantsGrowing: 0,
        daysActive: 1,
        missionsCompleted: 0,
        lastVisited: serverTimestamp()
      };
      
      await setDoc(gardenRef, initialStats);
      console.log("Garden initialized successfully");
    }
    return true;
  } catch (error) {
    console.error("Error initializing garden:", error);
    return false;
  }
};

export const getGardenStats = async (userId: string): Promise<GardenStats | null> => {
  try {
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
    
    const data = gardenDoc.data();
    return {
      plantsGrowing: data.plantsGrowing || 0,
      daysActive: data.daysActive || 1,
      missionsCompleted: data.missionsCompleted || 0,
      lastVisited: data.lastVisited?.toDate() || new Date()
    };
  } catch (error) {
    console.error("Error fetching garden stats:", error);
    return null;
  }
};

export const getGardenItems = (userId: string, callback: (items: GardenItem[]) => void) => {
  if (!userId) {
    console.warn("No user ID provided for getGardenItems");
    callback([]);
    return () => {};
  }
  
  try {
    const itemsRef = collection(db, 'gardens', userId, 'items');
    const q = query(itemsRef);
    
    return onSnapshot(q, 
      (snapshot) => {
        const items = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            ...data,
            id: doc.id,
            createdAt: data.createdAt?.toDate() || new Date(),
            lastWatered: data.lastWatered?.toDate() || new Date()
          };
        }) as GardenItem[];
        
        callback(items);
      },
      (error) => {
        console.error("Error fetching garden items:", error);
        callback([]);
      }
    );
  } catch (error) {
    console.error("Error setting up garden items listener:", error);
    callback([]);
    return () => {};
  }
};

export const addGardenItem = async (userId: string, type: "flower" | "tree" | "plant") => {
  if (!userId) {
    console.error("No user ID provided for addGardenItem");
    throw new Error("User not authenticated");
  }
  
  try {
    const itemsRef = collection(db, 'gardens', userId, 'items');
    const gardenRef = doc(db, 'gardens', userId);
    
    const newItem = {
      type,
      x: Math.random() * 80 + 10, // Random position between 10-90%
      y: Math.random() * 60 + 20, // Random position between 20-80%
      size: type === 'tree' ? 80 : type === 'flower' ? 40 : 35,
      color: getRandomColor(),
      growth: 0,
      createdAt: serverTimestamp(),
      lastWatered: serverTimestamp()
    };
    
    const docRef = doc(itemsRef);
    await setDoc(docRef, newItem);
    
    // Update stats
    const gardenDoc = await getDoc(gardenRef);
    const stats = gardenDoc.exists() ? gardenDoc.data() : { plantsGrowing: 0 };
    
    await updateDoc(gardenRef, {
      plantsGrowing: (stats.plantsGrowing || 0) + 1,
      lastVisited: serverTimestamp()
    });
    
    return docRef.id;
  } catch (error) {
    console.error("Error adding garden item:", error);
    throw error;
  }
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
