import { EmailProvider } from "./providers";

type EmailStatus = "SENT" | "FAILED" | "RETRYING";

interface Email {
  id: string;
  to: string;
  subject: string;
  body: string;
}

export class EmailService {
  private providers: EmailProvider[];
  private sentEmails = new Set<string>();
  private rateLimit = new Map<string, number>(); // email -> lastSentTimestamp
  private statusMap = new Map<string, EmailStatus>();

  constructor(providers: EmailProvider[]) {
    this.providers = providers;
  }

  async send(email: Email): Promise<EmailStatus> {
    if (this.sentEmails.has(email.id)) {
      console.log("Duplicate detected, skipping.");
      return "SENT";
    }

    const lastSent = this.rateLimit.get(email.to) || 0;
    const now = Date.now();
    if (now - lastSent < 5000) {
      console.log("Rate limit hit for", email.to);
      return "FAILED";
    }

    for (let i = 0; i < this.providers.length; i++) {
      const provider = this.providers[i];
      try {
        this.statusMap.set(email.id, "RETRYING");
        await this.retry(() =>
          provider.sendEmail(email.to, email.subject, email.body)
        );
        this.sentEmails.add(email.id);
        this.rateLimit.set(email.to, now);
        this.statusMap.set(email.id, "SENT");
        return "SENT";
      } catch (e) {
        console.log(`Provider ${i + 1} failed:`, e);
      }
    }

    this.statusMap.set(email.id, "FAILED");
    return "FAILED";
  }

  private async retry(fn: () => Promise<boolean>, retries = 3): Promise<void> {
    for (let i = 0; i < retries; i++) {
      try {
        const result = await fn();
        if (result) return;
      } catch (e) {
        console.log(`Retry ${i + 1} failed`);
        await new Promise((r) => setTimeout(r, 2 ** i * 1000)); // exponential backoff
      }
    }
    throw new Error("All retries failed");
  }

  getStatus(emailId: string): EmailStatus | undefined {
    return this.statusMap.get(emailId);
  }
}
