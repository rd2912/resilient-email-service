import { EmailService } from "./EmailService";
import { ProviderA, ProviderB } from "./providers";

const emailService = new EmailService([new ProviderA(), new ProviderB()]);

const email = {
  id: "email-123",
  to: "test@example.com",
  subject: "Hello",
  body: "This is a test email",
};

emailService.send(email).then((status) => {
  console.log("Final status:", status);
});
