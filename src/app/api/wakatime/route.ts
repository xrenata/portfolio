
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
    const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY;

    if (!WAKATIME_API_KEY) {
        return NextResponse.json({ error: 'Wakatime API key not configured' }, { status: 500 });
    }

    try {
        const response = await fetch(
            'https://wakatime.com/api/v1/users/current/all_time_since_today',
            {
                headers: {
                    Authorization: `Basic ${Buffer.from(WAKATIME_API_KEY).toString('base64')}`,
                },
            }
        );

        if (!response.ok) {
            const response2 = await fetch(`https://wakatime.com/api/v1/users/current/all_time_since_today?api_key=${WAKATIME_API_KEY}`);

            if (!response2.ok) {
                return NextResponse.json({ error: 'Failed to fetch Wakatime data' }, { status: response2.status });
            }

            const data = await response2.json();
            return NextResponse.json(data);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
