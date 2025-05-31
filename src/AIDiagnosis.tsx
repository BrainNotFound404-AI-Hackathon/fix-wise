import { useParams, useNavigate } from "react-router-dom";
import { NavBar, Button, Divider } from "antd-mobile";
import { Sender } from "@ant-design/x";
import { getClosedWorkOrderById } from "./MaintenanceHistory";
import { App } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

const mockSimilarTickets = [
  {
    id: "WO-2024-004",
    summary: "Elevator door stuck, replaced sensor",
    result: "Sensor replacement solved the problem.",
  },
  {
    id: "WO-2024-001",
    summary: "Door could not close, checked motor wiring",
    result: "Reconnected loose wire, door works.",
  },
];

const mockManual = `
Troubleshooting Steps for Elevator Door Issues:
1. Check door sensor for dust or damage.
2. Inspect door motor and wiring.
3. Refer to section 4.2 in the manual for advanced diagnostics.
`;

export default function AIDiagnosis() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const order = id ? getClosedWorkOrderById(id) : null;
  const { message } = App.useApp();
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-blue-50 pb-4 flex flex-col">
      <NavBar
        back="Back"
        onBack={() => navigate(-1)}
        className="bg-white shadow-sm sticky top-0 z-10 text-lg font-semibold"
      >
        AI Diagnosis
      </NavBar>
      <div className="p-4 flex-1 flex flex-col">
        <div className="bg-white rounded-2xl shadow-md px-4 py-4 mb-4">
          <div className="font-semibold text-blue-700 mb-2">
            Similar Tickets
          </div>
          <div className="space-y-2 mb-2">
            {mockSimilarTickets.map((t) => (
              <div
                key={t.id}
                className="bg-blue-50 rounded px-3 py-2 cursor-pointer hover:bg-blue-100 active:bg-blue-200 transition"
                onClick={() => navigate(`/closed/${t.id}`)}
              >
                <div className="text-xs text-gray-500 mb-1 underline">
                  {t.id}
                </div>
                <div className="text-sm text-gray-800">{t.summary}</div>
                <div className="text-xs text-green-700 mt-1">{t.result}</div>
              </div>
            ))}
          </div>
          <Divider>Manual Guidance</Divider>
          <div className="bg-gray-50 rounded px-3 py-2 text-sm text-gray-700 whitespace-pre-line">
            {mockManual}
          </div>
        </div>
        <div className="border-t border-dashed border-gray-200 my-4" />
        <div className="mt-auto flex justify-end pb-6">
          <button 
            className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 active:bg-green-200 transition-colors shadow"
            onClick={() => {
              message.success("问题已标记为已解决！");
            }}
          >
            <CheckCircleOutlined className="text-lg" />
            <span className="font-medium">Mark as resolved</span>
          </button>
        </div>
        <div className="mt-auto">
          <Sender
            onSubmit={() => {
              message.success("Send message successfully!");
            }}
            allowSpeech
          />
        </div>
      </div>
    </div>
  );
}
