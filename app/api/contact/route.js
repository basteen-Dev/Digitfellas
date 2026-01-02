import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request) {
    try {
        const body = await request.json()
        const { name, email, message } = body

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        // Configure SMTP transporter
        // In production, use real credentials from process.env
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        })

        // Verify connection (optional, good for debugging)
        // await transporter.verify()

        // Send email
        const mailOptions = {
            from: process.env.SMTP_FROM || '"DigitFellas Contact" <no-reply@digitfellas.com>',
            to: process.env.CONTACT_EMAIL || 'info@digitfellas.com', // Where to receive inquiries
            subject: `New Inquiry from ${name}`,
            text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
            html: `
<h3>New Inquiry Received</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<br/>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
      `,
        }

        // If credentials are not set, mock the send (for development without crashing)
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.log('⚠️ SMTP credentials missing. Mocking email send:', mailOptions)
            // Simulate delay
            await new Promise(resolve => setTimeout(resolve, 1000))
        } else {
            await transporter.sendMail(mailOptions)
        }

        return NextResponse.json({ success: true, message: 'Message sent successfully' })

    } catch (error) {
        console.error('Contact API Error:', error)
        return NextResponse.json({ error: 'Failed to send message: ' + error.message }, { status: 500 })
    }
}
