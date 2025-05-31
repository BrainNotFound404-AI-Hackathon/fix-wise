import { LocationOutline, ClockCircleOutline, FileOutline } from 'antd-mobile-icons'
import { Tag, NavBar } from 'antd-mobile'
import { useNavigate, useParams } from 'react-router-dom'
import { MaintenanceHistory } from './MaintenanceHistory'
import { PrimaryNavButton } from './PrimaryNavButton'
import { useEffect, useState } from 'react'
import api from './api'
import type { Ticket } from './model'

const mockTickets = [
  {
    id: 'WO-2024-001',
    elevatorId: 'EL-001',
    location: 'Tech Park Building A',
    description: 'Elevator door cannot close properly',
    status: 'Pending',
    priority: 'High',
    createTime: '2024-03-20 10:30',
    aiSuggestion: 'Check the door sensor and motor. Review the last 3 maintenance records. Refer to manual section 4.2 for door troubleshooting.'
  },
  {
    id: 'WO-2024-002',
    elevatorId: 'EL-002',
    location: 'Tech Park Building B',
    description: 'Unusual noise during elevator operation',
    status: 'Pending',
    priority: 'Medium',
    createTime: '2024-03-20 09:15',
    aiSuggestion: 'Inspect the pulley and lubrication. Check alarm history for similar issues. See manual section 5.1.'
  },
  {
    id: 'WO-2024-003',
    elevatorId: 'EL-003',
    location: 'Tech Park Building C',
    description: 'Elevator buttons not responding',
    status: 'Pending',
    priority: 'High',
    createTime: '2024-03-20 08:45',
    aiSuggestion: 'Test the control panel. Review last alarm logs. Refer to manual section 3.4.'
  },
]

export default function TicketDetail() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const fetchTicket = async () => {
    const response = await api.get(`/tickets/${id}`)
    setTicket(response.data)
  }
  useEffect(() => {
    fetchTicket()
  }, [])

  if (!ticket) {
    return <div className="p-8 text-center text-gray-400">Work order not found.</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-blue-50 pb-4">
      <NavBar back="Back" onBack={() => navigate(-1)} className="bg-white shadow-sm sticky top-0 z-10 text-lg font-semibold">
        Ticket Detail
      </NavBar>
      <div className="p-4">
        <div className="bg-white rounded-2xl shadow-md px-4 py-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-800 text-base tracking-wide">{ticket.elevatorId}</span>
              <span className="text-xs text-gray-400">{ticket.id}</span>
            </div>
            <div className="flex gap-1.5">
              <Tag color={ticket.priority === 'High' ? 'danger' : 'warning'} className="text-xs px-2 py-0.5 rounded-md">
                {ticket.priority}
              </Tag>
              <Tag color="primary" className="text-xs px-2 py-0.5 rounded-md">{ticket.status}</Tag>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
            <LocationOutline className="text-gray-400 text-base" />
            <span>{ticket.location}</span>
          </div>
          <div className="text-sm text-gray-800 mb-1">
            {ticket.description}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <ClockCircleOutline className="text-gray-400 text-base" />
            <span>{ticket.createTime}</span>
          </div>
        </div>
        {/* AI 建议区域 */}
        <div className="bg-blue-50 rounded-xl shadow-inner px-4 py-3 flex gap-2 items-start">
          <FileOutline className="text-blue-400 text-xl mt-0.5" />
          <div>
            <div className="font-semibold text-blue-700 mb-1">AI Suggestion</div>
            <div className="text-sm text-blue-900 leading-relaxed whitespace-pre-line">
              {ticket.aiSuggestion}
            </div>
          </div>
        </div>
        {/* 维修历史区域 */}
        <MaintenanceHistory elevatorId={ticket.elevatorId} />
        <div className="mt-8 flex flex-col gap-3 justify-center items-center">
          <PrimaryNavButton
            text="AI Troubleshooting"
            onClick={() => navigate(`/ai-diagnosis/${ticket.id}`)}
          />
          <button
            className="bg-green-600 text-white rounded-lg px-6 py-2 font-semibold shadow hover:bg-green-700 transition w-full"
            onClick={() => navigate(`/ticket/${ticket.id}/record`)}
          >
            Mark as Resolved
          </button>
        </div>
      </div>
    </div>
  )
} 