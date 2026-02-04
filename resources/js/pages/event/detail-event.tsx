import EventTimeline from '@/components/template/event/detail-page/timeline';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import EventLayout from '@/layouts/event/event-layout';
import { CalendarDays, MapPin } from 'lucide-react';

export default function EventPage() {
    const eventData = {
        title: 'Web Development Summit 2025',
        date: 'March 15-17, 2025',
        location: 'Jakarta Convention Center',
        category: 'Technology',
        attendees: 1200,
        image: '/placeholder.svg?key=v2mqv',
        description:
            'Join us for the most anticipated Web Development Summit of the year! This three-day event brings together industry leaders, developers, and tech enthusiasts to explore the latest trends in web development, AI integration, and cloud technologies.',
        highlights: [
            'Keynote speeches from industry leaders',
            'Hands-on workshops and training sessions',
            'Networking opportunities with 1000+ developers',
            'Product launches and technology showcases',
            'Career development and recruitment opportunities',
        ],
    };

    const timelineEvents = [
        {
            time: '08:00 AM',
            title: 'Registration & Coffee',
            description: 'Check-in and welcome breakfast',
        },
        {
            time: '09:00 AM',
            title: 'Opening Keynote',
            description:
                'Industry insights and trends for 2025 by tech leaders',
        },
        {
            time: '10:30 AM',
            title: 'Workshop Track 1',
            description:
                'Choose from: React Mastery, Next.js 15 Deep Dive, or Web3 Development',
        },
        {
            time: '12:00 PM',
            title: 'Lunch & Networking',
            description: 'Casual lunch with fellow developers and sponsors',
        },
        {
            time: '01:30 PM',
            title: 'Workshop Track 2',
            description:
                'Database optimization, API design patterns, or DevOps best practices',
        },
        {
            time: '03:00 PM',
            title: 'Panel Discussion',
            description: 'Q&A with speakers and industry experts',
        },
        {
            time: '04:30 PM',
            title: 'Closing Remarks & Networking',
            description: 'Final thoughts and evening mixer',
        },
    ];

    return (
        <EventLayout>
            <main className="min-h-screen bg-background py-10 lg:py-24">
                {/* Main Content */}
                <section className="container mx-auto flex flex-col gap-10 px-4 py-12 md:flex-row">
                    <div className="mx-auto w-full md:max-w-3/4">
                        <div>
                            <Badge className="mb-4 w-fit">
                                {eventData.category}
                            </Badge>
                            <h1 className="mb-4 max-w-3xl text-4xl font-bold md:text-5xl">
                                {eventData.title}
                            </h1>
                        </div>
                        <div className="space-y-10">
                            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <Card>
                                    <CardContent>
                                        <div className="flex items-center gap-3">
                                            <CalendarDays
                                                className="text-primary"
                                                size={24}
                                            />
                                            <div>
                                                <p className="text-sm text-muted-foreground">
                                                    Date & Time
                                                </p>
                                                <p className="font-semibold">
                                                    {eventData.date}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent>
                                        <div className="flex items-center gap-3">
                                            <MapPin
                                                className="text-primary"
                                                size={24}
                                            />
                                            <div>
                                                <p className="text-sm text-muted-foreground">
                                                    Location
                                                </p>
                                                <p className="font-semibold">
                                                    {eventData.location}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div>
                                <h1>About This Event</h1>
                                <p className="text-lg leading-relaxed">
                                    {eventData.description}
                                </p>
                            </div>

                            {/* Timeline */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Event Timeline</CardTitle>
                                    <CardDescription>
                                        Day 1 Schedule - March 15, 2025
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <EventTimeline events={timelineEvents} />
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div>
                        <Card className="sticky top-4 w-full">
                            <CardHeader>
                                <CardTitle>Register Now</CardTitle>
                                <CardDescription>
                                    Limited seats available
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">
                                        Join 1000+ developers and industry
                                        professionals
                                    </p>
                                    <div className="space-y-2 pt-4">
                                        <Button className="w-full">
                                            Register Now
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                        >
                                            Learn More
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </main>
        </EventLayout>
    );
}
