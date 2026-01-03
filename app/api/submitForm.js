// pages/api/submitForm.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, name, phone } = req.body;

    if (!email || !name || !phone) {
      return res.status(400).json({ error: 'Email, Name, and Phone are required!' });
    }

    try {
      // SheetDB API URL with your sheet ID
      const sheetDBUrl = 'https://sheetdb.io/api/v1/57p7ftu2vp7n0';

      // Prepare data to be sent
      const data = {
        data: [
          {
            Email: email,
            Name: name,
            Phone: phone,
          },
        ],
      };

      // Send data to SheetDB via POST
      const response = await fetch(sheetDBUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Log the response to check for HTML (error page)
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error from SheetDB:', errorText);
        return res.status(500).json({ error: 'Failed to submit form. Please try again later.' });
      }

      // If the response is JSON, parse it
      const responseData = await response.json();
      console.log('Form data successfully submitted:', responseData);

      return res.status(200).json({ message: 'Form submitted successfully!' });
    } catch (error) {
      console.error('Error during form submission:', error);
      return res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
