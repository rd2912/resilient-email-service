export interface EmailProvider {
  sendEmail(to: string, subject: string, body: string): Promise<boolean>;
}

export class ProviderA implements EmailProvider {
  async sendEmail(to: string, subject: string, body: string): Promise<boolean> {
    console.log(`[ProviderA] Sending email to ${to}`);
    if (Math.random() < 0.7) return true; // Simulate success 70% of time
    throw new Error("ProviderA failed");
  }
}

export class ProviderB implements EmailProvider {
  async sendEmail(to: string, subject: string, body: string): Promise<boolean> {
    console.log(`[ProviderB] Sending email to ${to}`);
    if (Math.random() < 0.7) return true; // Simulate success 70% of time
    throw new Error("ProviderB failed");
  }
}
