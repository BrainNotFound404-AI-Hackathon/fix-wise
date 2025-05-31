import { useParams, useNavigate } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import { ClockCircleOutline } from 'antd-mobile-icons'
import { getClosedWorkOrderById } from './MaintenanceHistory'

export default function ClosedWorkOrderDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const order = id ? getClosedWorkOrderById(id) : null

  if (!order) {
    return <div className="p-8 text-center text-gray-400">Work order not found.</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-blue-50 pb-4">
      <NavBar back="Back" onBack={() => navigate(-1)} className="bg-white shadow-sm sticky top-0 z-10 text-lg font-semibold">
        Closed Work Order
      </NavBar>
      <div className="p-4">
        <div className="bg-white rounded-2xl shadow-md px-4 py-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-gray-800 text-base tracking-wide">{order.id}</span>
            <span className="text-xs text-green-600 font-medium">Closed</span>
          </div>
          <div className="text-sm text-gray-800 mb-1">{order.description}</div>
          <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
            <ClockCircleOutline className="text-gray-400 text-base" />
            <span>{order.createTime} ~ {order.closeTime}</span>
          </div>
          <div className="border-t border-dashed border-gray-200 my-2" />
          <div className="mb-2">
            <div className="font-semibold text-gray-700 mb-1">Ticket</div>
            <div className="text-sm text-gray-800 whitespace-pre-line">{order.ticket}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-700 mb-1">Result</div>
            <div className="text-sm text-gray-800 whitespace-pre-line">{order.result}</div>
          </div>
        </div>
      </div>
    </div>
  )
} 