// app/api/webinars/route.js
const webinars = [
  {
    id: "1",
    title: "Web Development Trends",
    description: "Explore the latest web development technologies and trends.",
    date: "2024-01-20",
    price: 499,
    speaker: "John Doe",
    speakerBio: "A senior web developer with over 10 years of experience.",
    live: false,
    url: "https://example.com/webinar-1",
  },
  {
    id: "2",
    title: "Next.js Masterclass",
    description: "Master Next.js for building full-stack applications.",
    date: "2024-01-20",
    price: 599,
    speaker: "Jane Smith",
    speakerBio: "An expert in Next.js and React, teaching full-stack development.",
    live: true,
    url: "https://example.com/webinar-2",
  },
  {
    id: "3",
    title: "React for Beginners",
    description: "A beginner-friendly webinar to learn React basics.",
    date: "2024-02-10",
    price: 399,
    speaker: "Mike Johnson",
    speakerBio: "A passionate educator and frontend developer.",
    live: false,
    url: "https://example.com/webinar-3",
  },
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const webinar = webinars.find((w) => w.id === id);
    return new Response(JSON.stringify(webinar), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(webinars), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
