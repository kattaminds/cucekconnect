
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { 
  Building, 
  StudyGroup, 
  Doubt, 
  FoodVendor, 
  IncidentReport, 
  EmergencyAlert, 
  LibraryBook,
  Answer
} from '@/types';
import { mockData } from '@/utils/mockData';
import { toast } from 'sonner';

type AppContextType = {
  buildings: Building[];
  studyGroups: StudyGroup[];
  doubts: Doubt[];
  foodVendors: FoodVendor[];
  incidentReports: IncidentReport[];
  emergencyAlerts: EmergencyAlert[];
  books: LibraryBook[];
  userId: string;
  userName: string;
  addStudyGroup: (group: Omit<StudyGroup, 'id' | 'createdBy' | 'members'>) => void;
  joinStudyGroup: (groupId: string) => void;
  leaveStudyGroup: (groupId: string) => void;
  addDoubt: (doubt: Omit<Doubt, 'id' | 'createdAt' | 'answers' | 'resolved'>) => void;
  addAnswer: (doubtId: string, content: string) => void;
  resolveDoubt: (doubtId: string) => void;
  orderFood: (vendorId: string, items: { itemId: string, quantity: number }[]) => void;
  reportIncident: (incident: Omit<IncidentReport, 'id' | 'dateTime' | 'status'>) => void;
  searchBooks: (query: string) => LibraryBook[];
  reserveBook: (bookId: string) => void;
  returnBook: (bookId: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state with mock data
  const [buildings, setBuildings] = useState<Building[]>(mockData.buildings);
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>(mockData.studyGroups);
  const [doubts, setDoubts] = useState<Doubt[]>(mockData.doubts);
  const [foodVendors, setFoodVendors] = useState<FoodVendor[]>(mockData.foodVendors);
  const [incidentReports, setIncidentReports] = useState<IncidentReport[]>(mockData.incidentReports);
  const [emergencyAlerts, setEmergencyAlerts] = useState<EmergencyAlert[]>(mockData.emergencyAlerts);
  const [books, setBooks] = useState<LibraryBook[]>(mockData.books);
  
  // Mock user info (in a real app, this would come from authentication)
  const userId = "user-1";
  const userName = "John Student";
  
  // Emergency alert simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // 1% chance of new emergency alert every 30 seconds
      if (Math.random() < 0.01) {
        const newAlert: EmergencyAlert = {
          id: `alert-${Date.now()}`,
          title: "Weather Advisory",
          description: "Heavy rain expected in the next few hours. Be prepared for potential flooding in low-lying areas.",
          type: "weather",
          severity: "warning",
          dateTime: new Date().toISOString(),
          affectedAreas: ["North Campus", "Student Housing"],
          instructions: "Stay indoors if possible. Avoid basement areas."
        };
        
        setEmergencyAlerts(prev => [newAlert, ...prev]);
        
        toast.warning(newAlert.title, {
          description: newAlert.description,
          duration: 10000,
        });
      }
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Study group functions
  const addStudyGroup = (group: Omit<StudyGroup, 'id' | 'createdBy' | 'members'>) => {
    const newGroup: StudyGroup = {
      ...group,
      id: `group-${Date.now()}`,
      createdBy: userId,
      members: [userId],
      currentParticipants: 1,
    };
    
    setStudyGroups(prev => [...prev, newGroup]);
    toast.success("Study group created!", {
      description: `Your group "${newGroup.name}" has been created.`,
    });
  };
  
  const joinStudyGroup = (groupId: string) => {
    setStudyGroups(prev => 
      prev.map(group => {
        if (group.id === groupId && !group.members.includes(userId) && group.currentParticipants < group.maxParticipants) {
          toast.success("Joined study group", {
            description: `You've joined "${group.name}".`,
          });
          return {
            ...group,
            members: [...group.members, userId],
            currentParticipants: group.currentParticipants + 1,
          };
        }
        return group;
      })
    );
  };
  
  const leaveStudyGroup = (groupId: string) => {
    setStudyGroups(prev => 
      prev.map(group => {
        if (group.id === groupId && group.members.includes(userId)) {
          toast.info("Left study group", {
            description: `You've left "${group.name}".`,
          });
          return {
            ...group,
            members: group.members.filter(id => id !== userId),
            currentParticipants: group.currentParticipants - 1,
          };
        }
        return group;
      })
    );
  };
  
  // Doubt functions
  const addDoubt = (doubt: Omit<Doubt, 'id' | 'createdAt' | 'answers' | 'resolved'>) => {
    const newDoubt: Doubt = {
      ...doubt,
      id: `doubt-${Date.now()}`,
      createdAt: new Date().toISOString(),
      answers: [],
      resolved: false,
    };
    
    setDoubts(prev => [newDoubt, ...prev]);
    toast.success("Question posted", {
      description: "Your question has been posted anonymously.",
    });
  };
  
  const addAnswer = (doubtId: string, content: string) => {
    setDoubts(prev => 
      prev.map(doubt => {
        if (doubt.id === doubtId) {
          const newAnswer: Answer = {
            id: `answer-${Date.now()}`,
            content,
            createdAt: new Date().toISOString(),
            createdBy: userId,
            isInstructor: false,
          };
          
          toast.success("Answer posted", {
            description: "Your answer has been added to the question.",
          });
          
          return {
            ...doubt,
            answers: [...doubt.answers, newAnswer],
          };
        }
        return doubt;
      })
    );
  };
  
  const resolveDoubt = (doubtId: string) => {
    setDoubts(prev => 
      prev.map(doubt => {
        if (doubt.id === doubtId) {
          toast.success("Question resolved", {
            description: "The question has been marked as resolved.",
          });
          return {
            ...doubt,
            resolved: true,
          };
        }
        return doubt;
      })
    );
  };
  
  // Food ordering
  const orderFood = (vendorId: string, items: { itemId: string, quantity: number }[]) => {
    // Find the vendor
    const vendor = foodVendors.find(v => v.id === vendorId);
    
    if (vendor) {
      // Calculate total
      let total = 0;
      const orderedItems = items.map(item => {
        const menuItem = vendor.menu.find(m => m.id === item.itemId);
        if (menuItem) {
          total += menuItem.price * item.quantity;
          return {
            name: menuItem.name,
            price: menuItem.price,
            quantity: item.quantity,
          };
        }
        return null;
      }).filter(Boolean);
      
      toast.success("Order placed successfully!", {
        description: `Your order from ${vendor.name} for $${total.toFixed(2)} has been placed.`,
        duration: 5000,
      });
    }
  };
  
  // Incident reporting
  const reportIncident = (incident: Omit<IncidentReport, 'id' | 'dateTime' | 'status'>) => {
    const newIncident: IncidentReport = {
      ...incident,
      id: `incident-${Date.now()}`,
      dateTime: new Date().toISOString(),
      status: 'pending',
    };
    
    setIncidentReports(prev => [newIncident, ...prev]);
    toast.success("Incident reported", {
      description: "Your report has been submitted and will be reviewed.",
    });
  };
  
  // Library functions
  const searchBooks = (query: string) => {
    if (!query) return [];
    
    const lowerQuery = query.toLowerCase();
    return books.filter(book => 
      book.title.toLowerCase().includes(lowerQuery) || 
      book.author.toLowerCase().includes(lowerQuery) ||
      book.category.toLowerCase().includes(lowerQuery)
    );
  };
  
  const reserveBook = (bookId: string) => {
    setBooks(prev => 
      prev.map(book => {
        if (book.id === bookId && book.isAvailable) {
          toast.success("Book reserved", {
            description: `"${book.title}" has been reserved for you.`,
          });
          
          // Set due date to 14 days from now
          const dueDate = new Date();
          dueDate.setDate(dueDate.getDate() + 14);
          
          return {
            ...book,
            isAvailable: false,
            dueDate: dueDate.toISOString(),
          };
        }
        return book;
      })
    );
  };
  
  const returnBook = (bookId: string) => {
    setBooks(prev => 
      prev.map(book => {
        if (book.id === bookId && !book.isAvailable) {
          toast.success("Book returned", {
            description: `"${book.title}" has been returned successfully.`,
          });
          
          return {
            ...book,
            isAvailable: true,
            dueDate: undefined,
          };
        }
        return book;
      })
    );
  };

  const value = {
    buildings,
    studyGroups,
    doubts,
    foodVendors,
    incidentReports,
    emergencyAlerts,
    books,
    userId,
    userName,
    addStudyGroup,
    joinStudyGroup,
    leaveStudyGroup,
    addDoubt,
    addAnswer,
    resolveDoubt,
    orderFood,
    reportIncident,
    searchBooks,
    reserveBook,
    returnBook,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
