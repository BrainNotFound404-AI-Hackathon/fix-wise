import { BrowserRouter, Routes, Route } from 'react-router-dom'
import WorkOrderDetail from './WorkOrderDetail'
import { WorkOrderList } from './WorkOrderList'
import ClosedWorkOrderDetail from './ClosedWorkOrderDetail'
import AIDiagnosis from './AIDiagnosis'
import WorkOrderRecord from './WorkOrderRecord'
import ReportPreview from './ReportPreview'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WorkOrderList />} />
        <Route path="/workorder/:id" element={<WorkOrderDetail />} />
        <Route path="/closed/:id" element={<ClosedWorkOrderDetail />} />
        <Route path="/ai-diagnosis/:id" element={<AIDiagnosis />} />
        <Route path="/workorder/:id/record" element={<WorkOrderRecord />} />
        <Route path="/report-preview" element={<ReportPreview />} />
      </Routes>
    </BrowserRouter>
  )
}
