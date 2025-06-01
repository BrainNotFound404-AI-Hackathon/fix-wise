import { NavBar, SearchBar } from "antd-mobile"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { TicketCard } from './TicketCard'
import api from "./api"
import type { Ticket } from "./model"

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
    const [tickets, setTickets] = useState<Ticket[]>([])
    const navigate = useNavigate()
  
    const handleSearch = (value: string) => {
      setSearchValue(value)
      const filtered = tickets.filter(ticket => 
        ticket.elevator_id.toLowerCase().includes(value.toLowerCase()) ||
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
              ticketOverview={{
                ...ticket,
                elevator_id: ticket.elevator_id,
                create_time: ticket.create_time,
                status: ticket.status,
                priority: ticket.priority,
                description: ticket.description,
                location: ticket.location,
                id: ticket.id,
              }}
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