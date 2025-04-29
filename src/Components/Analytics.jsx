import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Circle, CheckCircle, MessageSquare } from 'lucide-react';
import '../Pages/Analytics.css'; // Import your CSS file for styling
const chartData = [
    { name: 'Week 1', Chats: 10 },
    { name: 'Week 2', Chats: 15 },
    { name: 'Week 3', Chats: 8 },
    { name: 'Week 4', Chats: 12 },
    { name: 'Week 5', Chats: 20 },
    { name: 'Week 6', Chats: 13 },
    { name: 'Week 7', Chats: 18 },
    { name: 'Week 8', Chats: 22 },
    { name: 'Week 9', Chats: 17 },
    { name: 'Week 10', Chats: 25 },
];

// Custom tooltip component for the chart
const CustomTooltipComponent = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="tooltip-container">
                <p className="tooltip-title">{`${label}`}</p>
                <p className="tooltip-value">{`Chats: ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

const Analytics = () => {
    const [averageReplyTime, setAverageReplyTime] = useState(0);
    const [resolvedTicketsPercentage, setResolvedTicketsPercentage] = useState(80);
    const [totalChats, setTotalChats] = useState(122);
    const missedChatsRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            setTimeout(() => {
                setAverageReplyTime(10);
            }, 500);
        };
        fetchData();
    }, []);

    const calculateMissedChats = () => {
        const missedChatWeeks = chartData.filter(week => week.Chats < 12);
        return missedChatWeeks.length;
    };
    const missedChats = calculateMissedChats();

    return (
        <div className="analytics-container">
            <div className="container">
                <h1 className="section-title-white text-3xl font-bold">Analytics</h1>

                <div className="bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-800">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="section-title-green text-xl font-semibold flex items-center gap-2">
                            <MessageSquare className="w-5 h-5" />
                            Missed Chats
                        </h2>
                        <div
                            ref={missedChatsRef}
                            className={`missed-chats ${missedChats > 0 ? "missed-chats-red" : "missed-chats-gray"}`}
                        >
                            {missedChats}
                        </div>
                    </div>

                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart
                            data={chartData}
                            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                            <XAxis
                                dataKey="name"
                                stroke="#9ca3af"
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#9ca3af"
                                tickLine={false}
                                axisLine={false}
                            />
                            <Tooltip content={<CustomTooltipComponent />} />
                            <Legend wrapperStyle={{ color: '#9ca3af' }} />
                            <Line
  type="monotone"
  dataKey="Chats"
  stroke="#34d399"
  strokeWidth={3}
  activeDot={{
    r: 8,
    stroke: '#34d399',
    strokeWidth: 3,
    fill: '#fff',
  }}
  isAnimationActive={false}  // Disable animation to see if it resolves the issue
/>

                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-800">
                    <h2 className="section-title-white text-xl font-semibold mb-4">Average Reply Time</h2>
                    <p className="text-gray-400">
                        For highest customer satisfaction rates, you should aim to reply to an incoming
                        customer&apos;s message in 15 seconds or less. Quick responses will get you more
                        conversations, help you earn customers&apos; trust, and make more sales.
                    </p>
                    <div className="text-3xl font-bold text-green-400 mt-2">
                        {averageReplyTime} secs
                    </div>
                </div>

                <div className="bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-800 flex items-center justify-between">
                    <div>
                        <h2 className="section-title-white text-xl font-semibold">Resolved Tickets</h2>
                        <p className="text-gray-400">
                            A callback system on a website, as well as proactive invitations, help to attract
                            even more customers. A separate round button for ordering a call with a small
                            animation helps to motivate more customers to make calls.
                        </p>
                    </div>
                    <div className="text-3xl font-bold text-green-400 flex items-center gap-2">
                        <CheckCircle className="w-8 h-8" />
                        {resolvedTicketsPercentage}%
                    </div>
                </div>

                <div className="bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-800">
                    <h2 className="section-title-white text-xl font-semibold mb-2">Total Chats</h2>
                    <p className="text-gray-400 text-sm">
                        This metric shows the total number of chats for all channels for the selected
                        period.
                    </p>
                    <div className="total-chats mt-4">
                        {totalChats} Chats
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
