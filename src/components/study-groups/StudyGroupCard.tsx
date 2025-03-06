
import { StudyGroup } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, Users, MapPin } from "lucide-react";
import { formatDistanceToNow, format, parseISO } from "date-fns";
import { useApp } from "@/context/AppContext";

interface StudyGroupCardProps {
  group: StudyGroup;
}

export function StudyGroupCard({ group }: StudyGroupCardProps) {
  const { userId, joinStudyGroup, leaveStudyGroup } = useApp();
  
  const isUserMember = group.members.includes(userId);
  const isFull = group.currentParticipants >= group.maxParticipants;
  const isUpcoming = new Date(group.dateTime) > new Date();
  const isPast = new Date(group.dateTime) < new Date();
  
  const formattedDate = format(parseISO(group.dateTime), "MMM d, yyyy");
  const formattedTime = format(parseISO(group.dateTime), "h:mm a");
  const timeFromNow = formatDistanceToNow(parseISO(group.dateTime), { addSuffix: true });
  
  const handleJoinLeave = () => {
    if (isUserMember) {
      leaveStudyGroup(group.id);
    } else {
      joinStudyGroup(group.id);
    }
  };
  
  return (
    <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-1">
          <Badge variant={isPast ? "outline" : (isUpcoming ? "default" : "secondary")}>
            {isPast ? "Past" : (isUpcoming ? "Upcoming" : "In Progress")}
          </Badge>
          <Badge variant="outline">{group.subject}</Badge>
        </div>
        <CardTitle className="line-clamp-1">{group.name}</CardTitle>
      </CardHeader>
      
      <CardContent className="pb-3 space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{group.description}</p>
        
        <div className="grid gap-2">
          <div className="flex items-center text-sm">
            <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{formattedDate}</span>
            <span className="text-xs text-muted-foreground ml-2">({timeFromNow})</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{formattedTime}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="truncate">{group.location}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{group.currentParticipants} / {group.maxParticipants} participants</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        {isPast ? (
          <Button variant="outline" className="w-full" disabled>
            Session Ended
          </Button>
        ) : (
          <Button
            variant={isUserMember ? "outline" : "default"}
            className="w-full"
            onClick={handleJoinLeave}
            disabled={!isUserMember && isFull}
          >
            {isUserMember
              ? "Leave Group"
              : isFull
              ? "Group Full"
              : "Join Group"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
