// app/api/submitForm/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Parse JSON from the request body
    const { email, name, phone } = await req.json();

    // Validate the input
    if (!email || !name || !phone) {
      return NextResponse.json(
        { error: 'Email, Name, and Phone are required!' },
        { status: 400 }
      );
    }

    const sheetDBUrl = 'https://sheetdb.io/api/v1/57p7ftu2vp7n0'; // Correct SheetDB URL

    const data = {
      data: [
        {
          Email: email,
          Name: name,
          Phone: phone,
        },
      ],
    };

    // Send data to SheetDB API
    const response = await fetch(sheetDBUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Check if the response is valid
    const responseText = await response.text(); // Read the response as text first
    if (!response.ok) {
      console.error('Error from SheetDB:', responseText);
      return NextResponse.json(
        { error: 'Failed to submit form. Please try again later.' },
        { status: 500 }
      );
    }

    // Attempt to parse the response as JSON
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      console.error('Error parsing response from SheetDB:', e);
      return NextResponse.json(
        { error: 'Unexpected response format. Please try again later.' },
        { status: 500 }
      );
    }

    // Successfully submitted
    return NextResponse.json({ message: 'Form submitted successfully!' });

  } catch (error) {
    console.error('Error during form submission:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
