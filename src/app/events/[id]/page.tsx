import { EventCommandCenter } from "../../../components/events/EventCommandCenter";

interface EventPageProps {
  params: {
    id: string;
  };
}

export default function EventPage({ params }: EventPageProps) {
  return <EventCommandCenter eventId={params.id} />;
}
