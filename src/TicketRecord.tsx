import { useParams, useNavigate } from "react-router-dom";
import { NavBar, ImageUploader } from "antd-mobile";
import { useEffect, useState } from "react";
import { App } from "antd";
import { TicketCard } from "./TicketCard";
import { PrimaryNavButton } from "./PrimaryNavButton";
import type { Ticket } from "./model";
import api from "./api";

export default function TicketRecord() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [fileList, setFileList] = useState<any[]>([]);
  // 获取工单信息（可根据实际数据源调整）
  const [solution, setSolution] = useState("");
  const [ticket, setTicket] = useState<Ticket | null>(null);
  useEffect(() => {
    api.get(`/tickets/${id}`).then(response => {
      setTicket(response.data);
    });
  }, [id]);
  return (  
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-blue-50 pb-4 flex flex-col">
      <NavBar back="Back" onBack={() => navigate(-1)} className="bg-white shadow-sm sticky top-0 z-10 text-lg font-semibold">
        Ticket Record
      </NavBar>
      <div className="p-4 flex-1 flex flex-col gap-4">
        {/* 顶部工单信息 */}
        <div className="mb-2">
          {ticket ? (
            <TicketCard
              ticketOverview={{
                ...ticket,
                location: (ticket as any).location || '',
                priority: (ticket as any).priority || '',
                elevator_id: (ticket as any).elevator_id || '',
                create_time: (ticket as any).create_time || '',
              }}
            />
          ) : (
            <div className="text-gray-400">Work order not found.</div>
          )}
        </div>
        {/* 图片上传 */}
        <div className="bg-white rounded-2xl shadow-md px-4 py-4 mb-2">
          <div className="font-semibold text-blue-700 mb-2 text-base">Upload Images</div>
          <ImageUploader
            value={fileList}
            onChange={setFileList}
            upload={async file => {
              await new Promise(r => setTimeout(r, 500));
              return { url: URL.createObjectURL(file) };
            }}
            multiple
            maxCount={2}
            className="!flex !gap-3 [&_.adm-image-uploader-cell]:!border-2 [&_.adm-image-uploader-cell]:!border-dashed [&_.adm-image-uploader-cell]:!border-gray-300 [&_.adm-image-uploader-cell]:!rounded-lg [&_.adm-image-uploader-cell]:!bg-gray-50 [&_.adm-image-uploader-cell]:!w-[80px] [&_.adm-image-uploader-cell]:!h-[80px] [&_.adm-image-uploader-cell]:!flex [&_.adm-image-uploader-cell]:!items-center [&_.adm-image-uploader-cell]:!justify-center"
          />
        </div>
        {/* 解决方案 */}
        <div className="bg-white rounded-2xl shadow-md px-4 py-4 mb-2 flex-1 flex flex-col">
          <div className="font-semibold text-blue-700 mb-2 text-base">Brief Solution</div>
          <textarea
            className="w-full h-32 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:border-blue-500 text-base"
            placeholder="Please input your solution..."
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
          />
        </div>
        {/* 生成报告按钮 */}
        <PrimaryNavButton 
          text="Generate Report" 
          onClick={() => navigate(`/report-preview/${id}`, { state: { solution, fileList } })} 
        />
      </div>
    </div>
  );
}

