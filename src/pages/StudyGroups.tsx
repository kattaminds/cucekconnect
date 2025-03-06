
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Users, Calendar, BookOpen, MapPin } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { StudyGroup } from '@/types';
import { toast } from 'sonner';

// Mock data for study groups
const mockStudyGroups: StudyGroup[] = [
  {
    id: '1',
    name: 'Calculus Study Group',
    description: 'Preparing for the midterm examination',
    subject: 'Mathematics',
    course: 'MATH101',
    dateTime: '2023-10-15T14:00:00',
    location: 'Library, Room 202',
    maxParticipants: 10,
    currentParticipants: 4,
    createdBy: 'John Doe',
    members: ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown']
  },
  {
    id: '2',
    name: 'Programming Concepts',
    description: 'Working on data structures and algorithms',
    subject: 'Computer Science',
    course: 'CS202',
    dateTime: '2023-10-16T15:30:00',
    location: 'Computer Lab 3',
    maxParticipants: 8,
    currentParticipants: 6,
    createdBy: 'Alice Johnson',
    members: ['Alice Johnson', 'Bob Brown', 'Carol White', 'Dave Green', 'Eve Black', 'Frank Blue']
  }
];

const StudyGroups = () => {
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>(mockStudyGroups);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newGroup, setNewGroup] = useState<Partial<StudyGroup>>({
    name: '',
    description: '',
    subject: '',
    course: '',
    dateTime: '',
    location: '',
    maxParticipants: 10
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewGroup(prev => ({
      ...prev,
      [name]: name === 'maxParticipants' ? Number(value) : value
    }));
  };

  const handleCreateGroup = () => {
    // In a real app, this would be an API call
    const newStudyGroup: StudyGroup = {
      id: `${Date.now()}`,
      name: newGroup.name || '',
      description: newGroup.description || '',
      subject: newGroup.subject || '',
      course: newGroup.course || '',
      dateTime: newGroup.dateTime || new Date().toISOString(),
      location: newGroup.location || '',
      maxParticipants: newGroup.maxParticipants || 10,
      currentParticipants: 1,
      createdBy: 'Current User',
      members: ['Current User']
    };
    
    setStudyGroups(prev => [...prev, newStudyGroup]);
    setNewGroup({
      name: '',
      description: '',
      subject: '',
      course: '',
      dateTime: '',
      location: '',
      maxParticipants: 10
    });
    setIsCreateDialogOpen(false);
    toast.success('Study group created successfully!');
  };

  const handleJoinGroup = (groupId: string) => {
    // In a real app, this would be an API call
    setStudyGroups(prev => 
      prev.map(group => 
        group.id === groupId && group.currentParticipants < group.maxParticipants
          ? { 
              ...group, 
              currentParticipants: group.currentParticipants + 1,
              members: [...group.members, 'Current User']
            }
          : group
      )
    );
    toast.success('You have joined the study group!');
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Study Groups</h1>
            <p className="text-muted-foreground mt-2">
              Join or create study groups to collaborate with your peers
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Group
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create a new study group</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new study group. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input 
                    id="name" 
                    name="name"
                    value={newGroup.name} 
                    onChange={handleInputChange} 
                    className="col-span-3" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subject" className="text-right">Subject</Label>
                  <Input 
                    id="subject" 
                    name="subject"
                    value={newGroup.subject} 
                    onChange={handleInputChange} 
                    className="col-span-3" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="course" className="text-right">Course</Label>
                  <Input 
                    id="course" 
                    name="course"
                    value={newGroup.course} 
                    onChange={handleInputChange} 
                    className="col-span-3" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">Description</Label>
                  <Input 
                    id="description" 
                    name="description"
                    value={newGroup.description} 
                    onChange={handleInputChange} 
                    className="col-span-3" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dateTime" className="text-right">Date & Time</Label>
                  <Input 
                    id="dateTime" 
                    name="dateTime"
                    type="datetime-local"
                    value={newGroup.dateTime} 
                    onChange={handleInputChange} 
                    className="col-span-3" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">Location</Label>
                  <Input 
                    id="location" 
                    name="location"
                    value={newGroup.location} 
                    onChange={handleInputChange} 
                    className="col-span-3" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="maxParticipants" className="text-right">Max Participants</Label>
                  <Input 
                    id="maxParticipants" 
                    name="maxParticipants"
                    type="number"
                    min="2"
                    max="50"
                    value={newGroup.maxParticipants} 
                    onChange={handleInputChange} 
                    className="col-span-3" 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" onClick={handleCreateGroup}>Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studyGroups.map(group => (
            <Card key={group.id} className="overflow-hidden">
              <CardHeader className="bg-primary/5">
                <CardTitle>{group.name}</CardTitle>
                <CardDescription>{group.subject} - {group.course}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-sm">{group.description}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>
                      {new Date(group.dateTime).toLocaleDateString()} at {new Date(group.dateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{group.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{group.currentParticipants} of {group.maxParticipants} participants</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t bg-muted/10 p-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {}}
                >
                  View Details
                </Button>
                <Button 
                  size="sm"
                  disabled={group.currentParticipants >= group.maxParticipants || group.members.includes('Current User')}
                  onClick={() => handleJoinGroup(group.id)}
                >
                  {group.members.includes('Current User') ? 'Joined' : 'Join Group'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default StudyGroups;
