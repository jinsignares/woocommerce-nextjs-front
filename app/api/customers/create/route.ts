import { poster } from '@/lib/fetch';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const bodyObject = await JSON.parse(body);

    const wooReq = await poster(
      '/wp-json/wc/v3/customers',
      { ...bodyObject },
      'POST',
    );

    const wooRes = await wooReq.json();

    if (wooRes.code === 'registration-error-email-exists') {
      return NextResponse.json(
        {
          message: 'An account is already registered with this email address.',
        },
        { status: 400 },
      );
    } else if (wooRes.code === 'registration-error-username-exists') {
      return NextResponse.json(
        {
          message:
            'An account is already registered with this username. Please choose another.',
        },
        { status: 400 },
      );
    } else {
      return NextResponse.json({ message: `Success` }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }), { status: 500 };
  }
}
