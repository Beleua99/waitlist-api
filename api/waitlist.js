import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { email, name } = req.body;
  if (!email) return res.status(400).json({ error: 'Email lipsa' });

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Esti pe lista! 🎉',
      html: `<h2>Salut${name ? ' ' + name : ''}!</h2>
<p>Te-ai inscris cu succes pe waitlist.</p>
<p>Vei fi printre primii anuntati la lansare!</p>`
    });
    return res.status(200).json({ ok: true });
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}
