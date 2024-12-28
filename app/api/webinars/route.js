const webinars = [
    {
      id: '1',
      title: 'Web Development Trends',
      description: 'Explore the latest web development technologies and trends.',
      date: '2024-01-20',
      price: 499,
      speaker: 'John Doe',
      speakerBio: 'A senior web developer with over 10 years of experience.',
      live: false, // Indicates if the webinar is live or not
      url: 'https://example.com/webinar-1', // URL to the webinar page
    },
    {
      id: '2',
      title: 'Next.js Masterclass',
      description: 'Master Next.js for building full-stack applications.',
      date: '2024-01-20',
      price: 599,
      speaker: 'Jane Smith',
      speakerBio: 'An expert in Next.js and React, teaching full-stack development.',
      live: true, // Ongoing live webinar
      url: 'https://example.com/webinar-2',
    },
    {
      id: '3',
      title: 'React for Beginners',
      description: 'A beginner-friendly webinar to learn React basics.',
      date: '2024-02-10',
      price: 399,
      speaker: 'Mike Johnson',
      speakerBio: 'A passionate educator and frontend developer.',
      live: false, // Not live
      url: 'https://example.com/webinar-3',
    },
    {
      id: '4',
      title: 'AI and Machine Learning',
      description: 'Dive into the world of AI and ML with industry experts.',
      date: '2024-03-05',
      price: 799,
      speaker: 'Sara Lee',
      speakerBio: 'An AI specialist with a Ph.D. in Machine Learning.',
      live: true, // Ongoing live webinar
      url: 'https://example.com/webinar-4',
    },
    {
      id: '5',
      title: 'Building Scalable Applications with Node.js',
      description: 'Learn how to build scalable applications with Node.js.',
      date: '2024-04-12',
      price: 699,
      speaker: 'David Williams',
      speakerBio: 'A backend developer with a focus on scalable systems.',
      live: false, // Not live
      url: 'https://example.com/webinar-5',
    },
  ];
  
  export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
  
    if (id) {
      const webinar = webinars.find((web) => web.id === id);
      return new Response(JSON.stringify(webinar), { status: 200 });
    }
  
    return new Response(JSON.stringify(webinars), { status: 200 });
  }
  