
export interface Ticket {
    id: string;                // 工单ID
    elevator_id: string;        // 电梯ID
    location: string;          // 电梯位置
    description: string;       // 故障描述
    status: 'Pending' | 'Closed' | string; // 工单状态
    priority: 'High' | 'Medium' | 'Low' | string; // 优先级
    create_time: string;        // 创建时间
    close_time?: string;        // 关闭时间（已关闭工单）
    solution?: string;         // 解决方案（维修操作录入/AI建议/人工填写）
    result?: string;           // 维修结果（人工填写）
    images?: string[];         // 相关图片URL数组
    ai_suggestion?: string;     // AI生成的重点排查建议
}
