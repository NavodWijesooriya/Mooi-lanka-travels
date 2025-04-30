import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.EMAIL_API_KEY);

export async function POST(request: Request) {
    try {
        const {
            email, name, tourType, arrivalDate, departureDate, accommodation,
            number, adults, children, country, mealPlane
        } = await request.json();

        if (!email || !name || !tourType || !arrivalDate || !departureDate || !accommodation) {
            throw new Error('Missing required booking details.');
        }

        // Customer Email Template
        const customerEmailHtml = `
        <!DOCTYPE html>
        <html dir="ltr" lang="en">
        <head>
            <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
                body {
                    background-color: #f9f9f9;
                    font-family: 'Arial', sans-serif;
                    margin: 0;
                    padding: 0;
                    line-height: 1.6;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
                .logo {
                    display: block;
                    margin: 0 auto 20px;
                    width: 150px;
                }
                .heading {
                    font-size: 24px;
                    font-weight: bold;
                    color: #000000;
                    text-align: center;
                }
                .text {
                    font-size: 16px;
                    color: #333333;
                    margin: 16px 0;
                }
                .details-container {
                    background-color: #f3f3f3;
                    padding: 15px;
                    border-radius: 5px;
                    margin: 20px 0;
                }
                .detail-item {
                    font-size: 14px;
                    color: #555555;
                    margin: 5px 0;
                }
                .footer {
                    font-size: 12px;
                    color: #777777;
                    text-align: center;
                    margin-top: 20px;
                }
                hr {
                    border: none;
                    border-top: 1px solid #eeeeee;
                    margin: 20px 0;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <img class="logo" src="/assets/mooiLanka-logo.png" alt="Mooi Lanka Travels" />
                <h1 class="heading">Thank You for Your Travel Inquiry</h1>
                <p class="text">Dear <strong>${name}</strong>,</p>
                <p class="text">We are thrilled that you’re considering Mooi Lanka Travels for your vacation! Below are the details of your inquiry:</p>
                <div class="details-container">
                    <p class="detail-item"><strong>Tour Package:</strong> ${tourType}</p>
                    <p class="detail-item"><strong>Travel Dates:</strong> ${arrivalDate} - ${departureDate}</p>
                    <p class="detail-item"><strong>Accommodation:</strong> ${accommodation}</p>
                    <p class="detail-item"><strong>Mobile Number:</strong> ${number}</p>
                    <p class="detail-item"><strong>Adults:</strong> ${adults}</p>
                    <p class="detail-item"><strong>Children:</strong> ${children}</p>
                    <p class="detail-item"><strong>Country:</strong> ${country}</p>
                    <p class="detail-item"><strong>Meal Plane:</strong> ${mealPlane}</p>
                </div>
                <p class="text">Our team is reviewing your request and will get back to you within 24-48 hours with a customized itinerary.</p>
                <hr />
                <p class="footer">If you didn’t make this inquiry, please ignore this email.</p>
            </div>
        </body>
        </html>
        `;

        // Admin Email Template
        const adminEmailHtml = `
        <html lang="en">
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h1 style="color: #00000;">New Travel Booking Inquiry</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Tour Package:</strong> ${tourType}</p>
            <p><strong>Travel Dates:</strong> ${arrivalDate} - ${departureDate}</p>
            <p><strong>Accommodation:</strong> ${accommodation}</p>
            <p><strong>Mobile Number:</strong> ${number}</p>
            <p><strong>Adults:</strong> ${adults}</p>
            <p><strong>Children:</strong> ${children}</p>
            <p><strong>Country:</strong> ${country}</p>
            <p><strong>Meal Plane:</strong> ${mealPlane}</p>
        </body>
        </html>
        `;

        // Send Customer Email
        const customerResponse = await resend.emails.send({
            from: 'Mooi Lanka Travels <noreply@mooilankatravels.com>',
            to: email,
            subject: 'Inquiry Confirmation',
            html: customerEmailHtml,
        });

        if (customerResponse.error) throw new Error(customerResponse.error.message);

        // Send Admin Email
        const adminResponse = await resend.emails.send({
            from: 'Mooi Lanka Travels <noreply@mooilankatravels.com>',
            to: 'mooilankatravels@gmail.com',
            subject: 'New Travel Booking Inquiry',
            html: adminEmailHtml,
        });

        if (adminResponse.error) throw new Error(adminResponse.error.message);

        return NextResponse.json({ message: 'Emails sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Failed to send email:', error);
        return NextResponse.json({ error: 'Failed to send email', details: (error as Error).message }, { status: 500 });
    }
}