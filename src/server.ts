import express from 'express';
import { EmailService } from './EmailService';
import { ProviderA, ProviderB } from './providers';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const emailService = new EmailService([new ProviderA(), new ProviderB()]);

app.post('/send-email', async (req, res) => {
  const { id, to, subject, body } = req.body;

  if (!id || !to || !subject || !body) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const status = await emailService.send({ id, to, subject, body });
    res.status(200).json({ status });
  } catch (err) {
    res.status(500).json({ error: 'Email failed to send' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
