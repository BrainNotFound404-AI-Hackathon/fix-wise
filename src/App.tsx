import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TicketDetail from './TicketDetail'
import { TicketList } from './TicketList'
import ClosedTicketDetail from './ClosedTicketDetail'
import AIDiagnosis from './AIDiagnosis'
import TicketRecord from './TicketRecord'
import ReportPreview from './ReportPreview'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TicketList />} />
        <Route path="/workorder/:id" element={<TicketDetail />} />
        <Route path="/closed/:id" element={<ClosedTicketDetail />} />
        <Route path="/ai-diagnosis/:id" element={<AIDiagnosis />} />
        <Route path="/workorder/:id/record" element={<TicketRecord />} />
        <Route path="/report-preview" element={<ReportPreview />} />
      </Routes>
    </BrowserRouter>
  )
}
