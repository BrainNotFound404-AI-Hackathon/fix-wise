import { ClockCircleOutline } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom'

// mock 数据
const mockTickets = [
  {
    id: 'WO-2024-001',
    elevatorId: 'EL-001',
    description: 'Elevator door cannot close properly',
    status: 'Closed',
    createTime: '2024-03-10 10:30',
    closeTime: '2024-03-10 12:00',
    ticket: 'The elevator door was stuck and could not close.',
    result: 'Replaced the door sensor and tested successfully.'
  },
  {
    id: 'WO-2024-004',
    elevatorId: 'EL-001',
    description: 'Routine maintenance',
    status: 'Closed',
    createTime: '2024-02-15 09:00',
    closeTime: '2024-02-15 10:00',
    ticket: 'Quarterly routine maintenance.',
    result: 'Lubricated moving parts and checked all safety features.'
  },
  {
    id: 'WO-2024-002',
    elevatorId: 'EL-002',
    description: 'Unusual noise during elevator operation',
    status: 'Closed',
    createTime: '2024-03-01 09:15',
    closeTime: '2024-03-01 10:00',
    ticket: 'Customer reported strange noise when elevator was running.',
    result: 'Tightened loose pulley and noise disappeared.'
  },
]

export function getClosedWorkOrderById(id: string) {
  // TODO 使用真实ticket替换
  return mockTickets.find(o => o.id === id)
}

export function MaintenanceHistory({ elevatorId }: { elevatorId: string }) {
  const records = mockTickets.filter(
    o => o.elevatorId === elevatorId && o.status === 'Closed'
  )
  const navigate = useNavigate()

  if (records.length === 0) {
    return <div className="text-gray-400 text-sm py-2">No maintenance history.</div>
  }

  return (
    <div className="mt-6">
      <div className="font-semibold text-gray-700 mb-2">Maintenance History</div>
      <div className="space-y-3">
        {records.map(r => (
          <div
            key={r.id}
            className="bg-gray-50 rounded-lg px-3 py-2 shadow-sm cursor-pointer active:bg-blue-50"
            onClick={() => navigate(`/closed/${r.id}`)}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-500">{r.id}</span>
              <span className="text-xs text-green-600 font-medium">Closed</span>
            </div>
            <div className="text-sm text-gray-800 mb-1">{r.description}</div>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <ClockCircleOutline className="text-gray-400 text-base" />
              <span>{r.createTime} ~ {r.closeTime}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
