
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function RefundPolicyPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8 bg-background">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Refund Policy</CardTitle>
          <CardDescription>Last updated: {new Date().toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 prose prose-neutral dark:prose-invert max-w-none">
            <section>
                <h2 className="text-xl font-semibold">Our Service Model</h2>
                <p>
                    GenoUI is currently offered as a free service. All core features, including AI component generation and community publishing, are available to all users without any charge.
                </p>
            </section>
            <section>
                <h2 className="text-xl font-semibold">Payments and Refunds</h2>
                <p>
                    As GenoUI is a free service, we do not process any payments from our users for access to the application. Therefore, there are no charges to be refunded.
                </p>
            </section>
             <section>
                <h2 className="text-xl font-semibold">Sponsorships and Donations</h2>
                <p>
                    We may offer options for users to support the project through voluntary sponsorships or donations (e.g., via GitHub Sponsors). These contributions are considered gifts to support the ongoing development and maintenance of GenoUI. As such, sponsorships and donations are non-refundable. We are incredibly grateful for any support you choose to provide.
                </p>
            </section>
             <section>
                <h2 className="text-xl font-semibold">Future Changes</h2>
                <p>
                    Should GenoUI introduce paid subscription plans in the future, this refund policy will be updated accordingly. All users will be notified of any changes to our pricing structure and associated policies.
                </p>
            </section>
             <section>
                <h2 className="text-xl font-semibold">Contact Us</h2>
                <p>If you have any questions about our refund policy, please do not hesitate to contact us.</p>
            </section>
        </CardContent>
      </Card>
    </main>
  );
}
