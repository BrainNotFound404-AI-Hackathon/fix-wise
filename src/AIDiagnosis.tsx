import { useParams, useNavigate } from "react-router-dom";
import { NavBar, Divider } from "antd-mobile";
import {Bubble, Sender, useXAgent, useXChat} from "@ant-design/x";
import {App, type GetProp} from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import {useEffect, useState} from "react";
import type { Ticket } from "./model";
import api from "./api";

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

type OutputType = string;
type InputType = { message: string };

const roles: GetProp<typeof Bubble.List, 'roles'> = {
  ai: {
    placement: 'start',
    typing: { step: 5, interval: 20 },
    style: {
      maxWidth: 600,
    },
  },
  local: {
    placement: 'end',
  },
  welcome: {
    variant: 'borderless',
  }
};

export default function AIDiagnosis() {
  const {id} = useParams<{ id: string }>();
  const [value, setValue] = useState<string>('');
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  useEffect(() => {
    if (id) {
       api.get(`/tickets/${id}`).then(response => {
      console.log(response.data)
      setTicket(response.data)
      })
    }
  }, [id])

  const {message} = App.useApp();

  const [agent] = useXAgent<string, InputType, OutputType>({
    request: ({message}, {onUpdate, onSuccess, onError}) => {
      const request = {
        session_id: ticket?.id,
        message: message
      }
      fetch('http://localhost:8000/lang_chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      }).then(response => {
        if (!response.ok || !response.body) {
          const err = new Error(`HTTP error! status: ${response.status}`)
          onError(err)
          throw err;
        }
        const decoder = new TextDecoder("utf-8")

        const reader = response.body.getReader();
        const stream = new ReadableStream({
          start(controller) {
            function push() {
              const chunks: OutputType[] = []
              reader.read().then(({ done, value }) => {
                if (done) {
                  onSuccess(chunks)
                  controller.close();
                  return;
                }
                const chunk = decoder.decode(value, {stream: true})
                onUpdate(chunk);
                chunks.push(chunk);
                controller.enqueue(value);
                push();
              }).catch(err => {
                console.error('Error reading the stream:', err);
                controller.error(err);
              });
            }
            push();
          }
        });

        return new Response(stream).text()
      })
    },
  });

  const {onRequest, messages} = useXChat({
    agent,
    requestPlaceholder: 'Waiting...',
    requestFallback: 'Please try again later.',
  });

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
        <div className="flex flex-grow flex-col overflow-y-scroll flex-flow h-0">
          <Bubble.List
            roles={roles}
            items={[
              {
                key: 'top-message',
                role: 'welcome',
                content: (
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
                ),
              },
              ...messages.map(({id, message, status}) => ({
                key: id,
                loading: status === 'loading',
                role: status === 'local' ? 'local' : 'ai',
                content: message,
              }))
            ]}
          >
          </Bubble.List>
        </div>
        <div className="border-t border-dashed border-gray-200 my-4"/>
        <div className="mt-auto flex justify-end pb-6">
          <button
            className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 active:bg-green-200 transition-colors shadow"
            onClick={() => {
              navigate(`/ticket/${id}/record`);
            }}
          >
            <CheckCircleOutlined className="text-lg"/>
            <span className="font-medium">Mark as resolved</span>
          </button>
        </div>
        <div className="mt-auto">
          <Sender
            loading={agent.isRequesting()}
            value={value}
            onChange={(v) => {
              setValue(v)
            }}
            onSubmit={(nextContent) => {
              onRequest(nextContent)
              setValue('');
              message.success("Send message successfully!");
            }}
            onCancel={() => {

            }}
            allowSpeech
          />
        </div>
      </div>
    </div>
  );
}
