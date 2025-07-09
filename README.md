# Resilient Email Sending Service

This is a TypeScript-based resilient email service that:
- Retries sending emails with exponential backoff
- Switches between two mock email providers on failure
- Prevents duplicate email sends (idempotency)
- Limits how often an email can be sent to the same address (rate limiting)
- Tracks the status of email sending attempts

##  Project Structure

src/
├── providers.ts # Two mock email providers (ProviderA, ProviderB)
├── EmailService.ts # Logic for sending email with retries and fallback
├── main.ts # Sample usage of EmailService


---

##  Features

- Retry with exponential backoff  
- Fallback between providers  
- Email ID–based idempotency  
- Basic rate limiting  
- Status tracking  

---

##  Notes

- All providers are mocked (no real email sending)
- Logic is built for resilience and reliability
- Fully modular and readable code

