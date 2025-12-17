import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { meterNo, serviceID, type } = await request.json();

    const response = await fetch(`${process.env.VTPASS_BASE_URL}/merchant-verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.VTPASS_API_KEY!,
        'secret-key': process.env.VTPASS_SECRET_KEY!,
      },
      body: JSON.stringify({
        billersCode: meterNo,
        serviceID: serviceID,
        type: type, // 'prepaid' or 'postpaid'
      }),
    });

    const data = await response.json();

    if (data.code === '000') {
      return NextResponse.json({ success: true, data: data.content });
    } else {
      return NextResponse.json({ success: false, message: data.response_description || 'Verification failed' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}