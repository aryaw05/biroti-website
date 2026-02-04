import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Camera, Mail } from 'lucide-react';

export default function ProfileHeader() {
    return (
        <Card className="mx-auto w-full">
            <CardContent>
                <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
                    <div className="relative">
                        <div className="rounded-full bg-gray-500 p-10" />
                        <Button
                            size="icon"
                            variant="outline"
                            className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full"
                        >
                            <Camera />
                        </Button>
                    </div>
                    <div className="flex-1 space-y-2">
                        <div className="flex flex-col gap-2 md:flex-row md:items-center">
                            <h1 className="text-2xl font-bold">John Doe</h1>
                            <Badge variant="secondary">Admin</Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Mail className="size-4" />
                                john.doe@example.com
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar className="size-4" />
                                Joined March 2023
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
