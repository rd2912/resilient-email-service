# Resilient Email Sending Service

This is a TypeScript-based resilient email service that:
- Retries sending emails with exponential backoff
- Switches between two mock email providers on failure
- Prevents duplicate email sends (idempotency)
- Limits how often an email can be sent to the same address (rate limiting)
- Tracks the status of email sending attempts

## 📁 Project Structure

src/
├── providers.ts # Two mock email providers (ProviderA, ProviderB)
├── EmailService.ts # Logic for sending email with retries and fallback
├── main.ts # Sample usage of EmailService
