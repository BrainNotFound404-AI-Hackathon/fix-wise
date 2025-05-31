import { NavBar, SearchBar, Tag } from "antd-mobile"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { LocationOutline, ClockCircleOutline } from 'antd-mobile-icons'

// Mock work order data
const mockWorkOrders = [
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

export function WorkOrderList() {
    const [searchValue, setSearchValue] = useState('')
    const [workOrders, setWorkOrders] = useState(mockWorkOrders)
    const navigate = useNavigate()
  
    const handleSearch = (value: string) => {
      setSearchValue(value)
      const filtered = mockWorkOrders.filter(order => 
        order.elevatorId.toLowerCase().includes(value.toLowerCase()) ||
        order.location.toLowerCase().includes(value.toLowerCase())
      )
      setWorkOrders(filtered)
    }
  
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-blue-50 pb-4">
        <NavBar back={null} className="bg-white shadow-sm sticky top-0 z-10 text-lg font-semibold">Elevator Maintenance</NavBar>
        <div className="px-4 py-2 bg-white">
          <SearchBar
            placeholder='Search elevator ID or location'
            value={searchValue}
            onChange={handleSearch}
            showCancelButton
            cancelText="Cancel"
            className="rounded-lg"
          />
        </div>
        <div className="px-2 pt-2 space-y-4">
          {workOrders.map(order => (
            <div
              key={order.id}
              onClick={() => navigate(`/workorder/${order.id}`)}
              className="bg-white rounded-2xl shadow-md px-4 py-3 flex flex-col gap-2 active:bg-blue-50 transition-all border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-800 text-base tracking-wide">{order.elevatorId}</span>
                  <span className="text-xs text-gray-400">{order.id}</span>
                </div>
                <div className="flex gap-1.5">
                  <Tag color={order.priority === 'High' ? 'danger' : 'warning'} className="text-xs px-2 py-0.5 rounded-md">
                    {order.priority}
                  </Tag>
                  <Tag color="primary" className="text-xs px-2 py-0.5 rounded-md">{order.status}</Tag>
                </div>
              </div>
              <div className="border-t border-dashed border-gray-200 my-1" />
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <LocationOutline className="text-gray-400 text-base" />
                <span>{order.location}</span>
              </div>
              <div className="text-sm text-gray-800 leading-snug">
                {order.description}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <ClockCircleOutline className="text-gray-400 text-base" />
                <span>{order.createTime}</span>
              </div>
            </div>
          ))}
          {workOrders.length === 0 && (
            <div className="text-center text-gray-400 py-10 text-sm">No work orders found.</div>
          )}
        </div>
      </div>
    )
  }