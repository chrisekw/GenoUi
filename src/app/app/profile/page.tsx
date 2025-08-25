
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ProfilePage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid w-full max-w-6xl gap-2">
            <h1 className="text-3xl font-semibold">Profile</h1>
        </div>
        <div className="grid w-full max-w-6xl items-start gap-6">
            <Card>
                <CardHeader>
                <CardTitle>Your Information</CardTitle>
                <CardDescription>
                    This is your profile information. (This is a mock page)
                </CardDescription>
                </CardHeader>
                <CardContent>
                <form className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="first-name">First name</Label>
                        <Input id="first-name" defaultValue="Geno" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="last-name">Last name</Label>
                        <Input id="last-name" defaultValue="UI" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="user@example.com" disabled />
                    </div>
                    <Button type="submit" disabled>Save Changes</Button>
                </form>
                </CardContent>
            </Card>
        </div>
    </main>
  )
}
