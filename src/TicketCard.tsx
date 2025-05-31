import { LocationOutline, ClockCircleOutline } from 'antd-mobile-icons';
import { Tag } from 'antd-mobile';

export interface TicketCardProps {
  ticketOverview: {
    id: string;
    elevator_id: string;
    location: string;
    description: string;
    status: string;
    priority: string;
    create_time: string;
  };
  onClick?: () => void;
}

export function TicketCard({ ticketOverview: ticket, onClick }: TicketCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-md px-4 py-3 flex flex-col gap-2 active:bg-blue-50 transition-all border border-gray-100 cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-800 text-base tracking-wide">{ticket.elevator_id}</span>
          <span className="text-xs text-gray-400">{ticket.id}</span>
        </div>
        <div className="flex gap-1.5">
          <Tag color={ticket.priority === 'High' ? 'danger' : 'warning'} className="text-xs px-2 py-0.5 rounded-md">
            {ticket.priority}
          </Tag>
          <Tag color="primary" className="text-xs px-2 py-0.5 rounded-md">{ticket.status}</Tag>
        </div>
      </div>
      <div className="border-t border-dashed border-gray-200 my-1" />
      <div className="flex items-center gap-1 text-sm text-gray-600">
        <LocationOutline className="text-gray-400 text-base" />
        <span>{ticket.location}</span>
      </div>
      <div className="text-sm text-gray-800 leading-snug">
        {ticket.description}
      </div>
      <div className="flex items-center gap-1 text-xs text-gray-400">
        <ClockCircleOutline className="text-gray-400 text-base" />
        <span>{ticket.create_time}</span>
      </div>
    </div>
  );
} 