"use client";

interface TimelineEvent {
  time: string;
  title: string;
  description: string;
}

export default function EventTimeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="space-y-8">
      {events.map((event, index) => (
        <div key={index} className="flex gap-6">
          <div className="relative flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-background">
              <div className="h-3 w-3 rounded-full bg-primary" />
            </div>
            {index !== events.length - 1 && (
              <div
                className="mt-4 w-0.5 bg-border"
                style={{ height: "120px" }}
              />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 pt-1">
            <time className="text-sm font-semibold text-primary">
              {event.time}
            </time>
            <h3 className="mt-2 text-lg font-semibold text-foreground">
              {event.title}
            </h3>
            <p className="mt-1 text-foreground/70">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
