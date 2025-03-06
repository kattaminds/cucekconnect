
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Doubt, Answer } from '@/types';
import { HelpCircle, MessageCircle, Search, Calendar, ThumbsUp, User } from 'lucide-react';

// Mock data for doubts
const mockDoubts: Doubt[] = [
  {
    id: '1',
    title: 'Understanding Newton\'s Third Law',
    description: 'Can someone explain Newton\'s Third Law in simple terms? I\'m struggling to understand the concept of equal and opposite reactions.',
    subject: 'Physics',
    course: 'PHY101',
    createdAt: '2023-10-12T09:30:00Z',
    anonymous: true,
    resolved: false,
    answers: [
      {
        id: 'a1',
        content: 'Newton\'s Third Law states that for every action, there is an equal and opposite reaction. This means that when one object exerts a force on another object, the second object exerts an equal force in the opposite direction on the first object.',
        createdAt: '2023-10-12T10:15:00Z',
        createdBy: 'Dr. Smith',
        isInstructor: true
      }
    ]
  },
  {
    id: '2',
    title: 'Difference between Arrays and Linked Lists',
    description: 'What are the key differences between arrays and linked lists in terms of memory allocation and performance?',
    subject: 'Computer Science',
    course: 'CS101',
    createdAt: '2023-10-10T14:20:00Z',
    anonymous: false,
    resolved: true,
    answers: [
      {
        id: 'a2',
        content: 'Arrays allocate memory in a contiguous block while linked lists allocate memory for each node separately. Arrays have O(1) access time but linked lists have O(n) access time. Linked lists are better for insertions and deletions.',
        createdAt: '2023-10-10T15:45:00Z',
        createdBy: 'Jane Smith',
        isInstructor: false
      },
      {
        id: 'a3',
        content: 'To add to the previous answer, arrays have a fixed size in many languages, while linked lists can grow dynamically. Arrays are better for random access, while linked lists are better for sequential access.',
        createdAt: '2023-10-10T16:30:00Z',
        createdBy: 'Prof. Johnson',
        isInstructor: true
      }
    ]
  }
];

const DoubtSolving = () => {
  const [doubts, setDoubts] = useState<Doubt[]>(mockDoubts);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newDoubt, setNewDoubt] = useState<Partial<Doubt>>({
    title: '',
    description: '',
    subject: '',
    course: '',
    anonymous: true
  });
  const [selectedDoubt, setSelectedDoubt] = useState<Doubt | null>(null);
  const [newAnswer, setNewAnswer] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewDoubt(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setNewDoubt(prev => ({
      ...prev,
      anonymous: checked
    }));
  };

  const handleCreateDoubt = () => {
    // In a real app, this would be an API call
    const newDoubtItem: Doubt = {
      id: `${Date.now()}`,
      title: newDoubt.title || '',
      description: newDoubt.description || '',
      subject: newDoubt.subject || '',
      course: newDoubt.course || '',
      createdAt: new Date().toISOString(),
      anonymous: newDoubt.anonymous || false,
      resolved: false,
      answers: []
    };
    
    setDoubts(prev => [newDoubtItem, ...prev]);
    setNewDoubt({
      title: '',
      description: '',
      subject: '',
      course: '',
      anonymous: true
    });
    setIsCreateDialogOpen(false);
    toast.success('Your doubt has been posted!');
  };

  const handleSubmitAnswer = (doubtId: string) => {
    // In a real app, this would be an API call
    if (!newAnswer.trim()) return;

    const answer: Answer = {
      id: `a${Date.now()}`,
      content: newAnswer,
      createdAt: new Date().toISOString(),
      createdBy: 'Current User',
      isInstructor: false
    };

    setDoubts(prev => 
      prev.map(doubt => 
        doubt.id === doubtId
          ? { ...doubt, answers: [...doubt.answers, answer] }
          : doubt
      )
    );

    setNewAnswer('');
    toast.success('Your answer has been posted!');
  };

  const filteredDoubts = doubts.filter(doubt => 
    doubt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doubt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doubt.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doubt.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold">Doubt Solving</h1>
            <p className="text-muted-foreground mt-2">
              Ask questions and get answers from peers and instructors
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search questions..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Ask a Question
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Ask a Question</DialogTitle>
                  <DialogDescription>
                    You can ask your question anonymously or with your identity
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">Title</Label>
                    <Input 
                      id="title" 
                      name="title"
                      value={newDoubt.title} 
                      onChange={handleInputChange} 
                      className="col-span-3" 
                      placeholder="Brief title of your question"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="subject" className="text-right">Subject</Label>
                    <Input 
                      id="subject" 
                      name="subject"
                      value={newDoubt.subject} 
                      onChange={handleInputChange} 
                      className="col-span-3" 
                      placeholder="e.g., Physics, Mathematics"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="course" className="text-right">Course</Label>
                    <Input 
                      id="course" 
                      name="course"
                      value={newDoubt.course} 
                      onChange={handleInputChange} 
                      className="col-span-3" 
                      placeholder="e.g., PHY101, MATH201"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="description" className="text-right pt-2">Question</Label>
                    <Textarea 
                      id="description" 
                      name="description"
                      value={newDoubt.description} 
                      onChange={handleInputChange} 
                      className="col-span-3 min-h-[100px]" 
                      placeholder="Explain your question in detail..."
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="anonymous" className="text-right">Anonymous</Label>
                    <div className="flex items-center space-x-2 col-span-3">
                      <Switch 
                        id="anonymous"
                        checked={newDoubt.anonymous}
                        onCheckedChange={handleSwitchChange}
                      />
                      <Label htmlFor="anonymous" className="text-sm text-muted-foreground">
                        {newDoubt.anonymous ? 'Your identity will be hidden' : 'Your name will be visible'}
                      </Label>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" onClick={handleCreateDoubt}>Post Question</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {selectedDoubt ? (
          <div className="space-y-6">
            <Button variant="ghost" onClick={() => setSelectedDoubt(null)}>
              ← Back to Questions
            </Button>
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{selectedDoubt.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <span>{selectedDoubt.subject} - {selectedDoubt.course}</span>
                      <span className="inline-flex items-center border-l border-border pl-2 ml-2">
                        <Calendar className="h-3 w-3 mr-1" /> 
                        {new Date(selectedDoubt.createdAt).toLocaleDateString()}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex items-center">
                    {selectedDoubt.resolved && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        Resolved
                      </span>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-2 text-primary">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="font-medium">
                        {selectedDoubt.anonymous ? 'Anonymous Student' : 'John Doe'}
                      </span>
                    </div>
                    <p className="mt-2">{selectedDoubt.description}</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-medium text-lg mb-4">
                    {selectedDoubt.answers.length} {selectedDoubt.answers.length === 1 ? 'Answer' : 'Answers'}
                  </h3>
                  <div className="space-y-6">
                    {selectedDoubt.answers.map((answer) => (
                      <div key={answer.id} className="flex items-start gap-3">
                        <div className={`rounded-full p-2 ${answer.isInstructor ? 'bg-blue-100 text-blue-800' : 'bg-muted'}`}>
                          <User className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <span className="font-medium">
                              {answer.createdBy}
                            </span>
                            {answer.isInstructor && (
                              <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                                Instructor
                              </span>
                            )}
                            <span className="text-xs text-muted-foreground ml-2">
                              {new Date(answer.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <p className="mt-2">{answer.content}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <ThumbsUp className="h-4 w-4 mr-1" /> Helpful
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col border-t p-4">
                <Textarea 
                  placeholder="Write your answer..." 
                  className="min-h-[100px]"
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                  <Button onClick={() => handleSubmitAnswer(selectedDoubt.id)} disabled={!newAnswer.trim()}>
                    Post Answer
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDoubts.map(doubt => (
              <Card key={doubt.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between">
                    <CardTitle className="text-lg">{doubt.title}</CardTitle>
                    {doubt.resolved && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        Resolved
                      </span>
                    )}
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <span>{doubt.subject} - {doubt.course}</span>
                    <span className="inline-flex items-center border-l border-border pl-2 ml-2">
                      <Calendar className="h-3 w-3 mr-1" /> 
                      {new Date(doubt.createdAt).toLocaleDateString()}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="text-sm line-clamp-2">{doubt.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between border-t bg-muted/10 pt-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    <span>{doubt.answers.length} {doubt.answers.length === 1 ? 'answer' : 'answers'}</span>
                  </div>
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedDoubt(doubt)}
                  >
                    View Question
                  </Button>
                </CardFooter>
              </Card>
            ))}
            {filteredDoubts.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <HelpCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No questions found</h3>
                <p className="text-muted-foreground mt-1">
                  {searchQuery ? 'Try a different search query' : 'Be the first to ask a question!'}
                </p>
                {searchQuery && (
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setSearchQuery('')}
                  >
                    Clear Search
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DoubtSolving;
