import { EmailTemplate } from '../../_components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend('re_FZbzovdd_NT6yH7nSJoZ1Kd8YYB1ExG8B');

export async function POST(req) {
    const response = await req.json();
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <parth@resend.dev>',
      to: ['neenaparth@gmail.com'],
      subject: response?.fullName +  ' shared File with you.',
      react: EmailTemplate({response}),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
