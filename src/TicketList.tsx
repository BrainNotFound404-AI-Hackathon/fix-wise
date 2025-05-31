import { NavBar, SearchBar } from "antd-mobile"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { TicketCard } from './TicketCard'
import api from "./api"

const mockTickets = [
    {
      id: 'WO-2024-001',
      elevatorId: 'EL-001',
      location: 'Tech Park Building A',
      description: 'Elevator door cannot close properly',
      status: 'Pending',
      priority: 'High',
      createTime: '2024-03-20 10:30',
    },
    {
      id: 'WO-2024-002',
      elevatorId: 'EL-002',
      location: 'Tech Park Building B',
      description: 'Unusual noise during elevator operation',
      status: 'Pending',
      priority: 'Medium',
      createTime: '2024-03-20 09:15',
    },
    {
      id: 'WO-2024-003',
      elevatorId: 'EL-003',
      location: 'Tech Park Building C',
      description: 'Elevator buttons not responding',
      status: 'Pending',
      priority: 'High',
      createTime: '2024-03-20 08:45',
    },
  ]

export function TicketList() {
    const [searchValue, setSearchValue] = useState('')
    const fetchTickets = async () => {
      try {
        const response = await api.get('/tickets')
        setTickets(response.data)
      } catch (error) {
        console.error('获取工单列表失败:', error)
      }
    }
    useEffect(() => {
      fetchTickets()
    }, [])
    const [tickets, setTickets] = useState(mockTickets)
    const navigate = useNavigate()
  
    const handleSearch = (value: string) => {
      setSearchValue(value)
      const filtered = mockTickets.filter(ticket => 
        ticket.elevatorId.toLowerCase().includes(value.toLowerCase()) ||
        ticket.location.toLowerCase().includes(value.toLowerCase())
      )
      setTickets(filtered)
    }
  
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-blue-50 pb-4">
        <NavBar back={null} className="bg-white shadow-sm sticky top-0 z-10 text-lg font-semibold">Elevator Maintenance</NavBar>
        <div className="px-4 py-3 bg-white border-b border-gray-100">
          <SearchBar
            placeholder='Search elevator ID or location'
            value={searchValue}
            onChange={handleSearch}
            showCancelButton
            cancelText="Cancel"
            className="rounded-full"
            style={{
              '--height': '40px',
              '--padding-left': '16px',
              '--background': '#f8fafc',
              '--border-radius': '20px',
              '--placeholder-color': '#94a3b8',
              '--border': '1px solid #e2e8f0',
              '--border-active': '1px solid #3b82f6',
              '--color': '#1e293b',
              '--font-size': '14px',
            } as any}
          />
        </div>
        <div className="px-2 pt-2 space-y-4 mx-2">
          {tickets.map(ticket => (
            <TicketCard
              key={ticket.id}
              ticketOverview={ticket}
              onClick={() => navigate(`/ticket/${ticket.id}`)}
            />
          ))}
          {tickets.length === 0 && (
            <div className="text-center text-gray-400 py-10 text-sm">No tickets found.</div>
          )}
        </div>
      </div>
    )
  }