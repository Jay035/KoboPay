import { NextResponse } from 'next/server';

function generateRequestId() {
  // Format: YYYYMMDDHHII + random string (Required by VTpass)
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  
  const timestamp = `${yyyy}${mm}${dd}${hh}${min}`;
  const random = Math.floor(Math.random() * 1000000);
  
  return `${timestamp}${random}`;
}

export async function POST(request: Request) {
  try {
    const { request_id, serviceID, billersCode, variation_code, amount, phone } = await request.json();

    const requestId = request_id || generateRequestId();

    const response = await fetch(`${process.env.VTPASS_BASE_URL}/pay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.VTPASS_API_KEY!,
        'secret-key': process.env.VTPASS_SECRET_KEY!,
      },
      body: JSON.stringify({
        request_id: requestId,
        serviceID,
        billersCode,
        variation_code, // 'prepaid' or 'postpaid'
        amount,
        phone,
      }),
    });

    const data = await response.json();

    if (data.code === '000') {
      return NextResponse.json({ success: true, data: data });
    } else {
      // VTpass might return success but transaction status is 'pending'
      return NextResponse.json({ success: false, message: data.response_description || 'Transaction failed' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Payment processing failed' }, { status: 500 });
  }
}