import { useNavigate, useParams } from "react-router-dom";
import { NavBar, TextArea } from "antd-mobile";
import { useEffect, useState } from "react";
import { App } from "antd";
import { FileTextOutlined } from '@ant-design/icons';
import { PrimaryNavButton } from "./PrimaryNavButton";
import api from "./api";
import type { Ticket } from "./model";

const mockTicket: Ticket = {
  id: 'WO-2024-001',                // 工单ID
  elevator_id: 'EL-001',            // 电梯ID
  location: 'Tech Park Building A', // 电梯位置
  description: 'Elevator door cannot close properly', // 故障描述
  status: 'Pending',                // 工单状态
  priority: 'High',                 // 优先级
  create_time: '2024-03-20 10:30',  // 创建时间
  // close_time: '',                // 可选，已关闭工单时填写
  solution: 'Replaced the door sensor and tested successfully.', // 解决方案
  result: 'Elevator door now closes properly. No further issues detected.', // 维修结果
  // images: [],                    // 可选，相关图片URL数组
  // ai_suggestion: '',             // 可选，AI建议
};

export default function ReportPreview() {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [solution, setSolution] = useState(mockTicket.solution);
  const [result, setResult] = useState(mockTicket.result);
  const { id } = useParams<{ id: string }>();

  const [ticket, setTicket] = useState<Ticket | null>(mockTicket)

  const fetchTicket = async () => {
    const response = await api.get(`/tickets/${id}`)
    setTicket(response.data)
  }
  useEffect(() => {
    fetchTicket()
  }, [])

  useEffect(() => {
    const generateReport = async () => {
      try {
        const response = await api.post('/report/generation', {
          session_id: id,
          messages: []
        });
        setSolution(response.data.solutions);
        setResult(response.data.results);
      } catch (error) {
        console.error('生成报告失败:', error);
        message.error('Failed to generate a report');
      }
    };

    if (id) {
      generateReport();
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-blue-50 pb-6 flex flex-col">
      <NavBar back="Back" onBack={() => navigate(-1)} className="bg-white shadow-sm sticky top-0 z-10 text-lg font-semibold">
        Report Preview
      </NavBar>
      <div className="p-4 flex-1 flex flex-col gap-6">
        {/* 信息卡片 */}
        <div className="flex justify-center">
          <div className="bg-white rounded-xl shadow-md px-6 py-4 w-full max-w-md border border-blue-100 flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-1">
              <FileTextOutlined className="text-blue-500 text-xl" />
              <span className="font-bold text-gray-800 text-base tracking-wide">{ticket?.id}</span>
              <span className="text-xs text-gray-400">{ticket?.elevator_id}</span>
            </div>
            <div className="flex flex-col gap-1 text-sm text-gray-600">
              <div className="flex">
                <span className="inline-block min-w-[70px] text-gray-400">Location:</span>
                <span className="break-all">{ticket?.location}</span>
              </div>
              <div className="flex mt-1">
                <span className="inline-block min-w-[70px] text-gray-400">Time:</span>
                <span>{ticket?.create_time}</span>
              </div>
            </div>
          </div>
        </div>
        {/* 报告内容编辑区 */}
        <div className="bg-white rounded-2xl shadow-md px-5 py-5 flex-1 flex flex-col gap-6 border border-gray-100">
          <div>
            <div className="font-semibold text-blue-700 mb-1 text-base">Solution</div>
            <TextArea
              value={solution}
              onChange={setSolution}
              rows={3}
              className="text-base"
              maxLength={500}
              showCount
              placeholder="Describe your solution..."
            />
          </div>
          <div>
            <div className="font-semibold text-blue-700 mb-1 text-base">Result</div>
            <TextArea
              value={result}
              onChange={setResult}
              rows={3}
              className="text-base"
              maxLength={500}
              showCount
              placeholder="Describe the result..."
            />
          </div>
        </div>
        {/* 提交按钮 */}
        <PrimaryNavButton
          text="Confirm & Submit"
          onClick={() => {
            message.success("Report submitted!");
            api.put(`/tickets/${id}`);
            navigate(-1);
          }}
        />
      </div>
    </div>
  );
} 