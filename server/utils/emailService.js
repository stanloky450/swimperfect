const nodemailer = require('nodemailer');

// Create transporter (using Gmail as example - replace with your email service)
const createTransporter = () => {
  if (process.env.SENDGRID_API_KEY) {
    // SendGrid configuration
    return nodemailer.createTransporter({
      service: 'SendGrid',
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY
      }
    });
  } else {
    // Gmail configuration (for development)
    return nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }
};

const sendConfirmationEmail = async (registration, children) => {
  try {
    const transporter = createTransporter();
    
    const childrenList = children.map(child => `
      <li>
        <strong>${child.firstName} ${child.lastName}</strong> (Age: ${calculateAge(child.dateOfBirth)})
        <ul>
          <li>Sports: ${formatActivity(child.activities.sports)}</li>
          <li>Mind Game: ${formatActivity(child.activities.mind)}</li>
          <li>Creative: ${formatActivity(child.activities.creative)}</li>
          <li>Included: Swimming & Coding</li>
        </ul>
      </li>
    `).join('');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Registration Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #3b82f6; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9fafb; }
          .footer { padding: 20px; text-align: center; color: #666; }
          .highlight { background: #dbeafe; padding: 15px; border-radius: 8px; margin: 15px 0; }
          ul { padding-left: 20px; }
          li { margin: 8px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏕️AQUATECH Summer Camp Registration Confirmed!</h1>
          </div>
          
          <div class="content">
            <h2>Dear ${registration.parentInfo.name},</h2>
            
            <p>Thank you for registering your child(ren) for our Summer Sports & Learning Camp 2025! We're excited to have them join us for an amazing summer experience.</p>
            
            <div class="highlight">
              <h3>Registration Summary:</h3>
              <p><strong>Parent:</strong> ${registration.parentInfo.name}</p>
              <p><strong>Email:</strong> ${registration.parentInfo.email}</p>
              <p><strong>Phone:</strong> ${registration.parentInfo.phone}</p>
              <p><strong>Emergency Contact:</strong> ${registration.parentInfo.emergencyContact}</p>
              <p><strong>Pickup Required:</strong> ${registration.parentInfo.needsPickup ? 'Yes' : 'No'}</p>
              ${registration.referralCode ? `<p><strong>Referral Code Used:</strong> ${registration.referralCode}</p>` : ''}
            </div>
            
            <h3>Registered Children:</h3>
            <ul>
              ${childrenList}
            </ul>
            
            <div class="highlight">
              <h3>Payment Information:</h3>
              <p><strong>Total Amount Paid:</strong> ₦${registration.totalAmount.toLocaleString()}</p>
              ${registration.discountApplied > 0 ? `<p><strong>Family Discount Applied:</strong> ₦${registration.discountApplied.toLocaleString()}</p>` : ''}
              <p><strong>Transaction ID:</strong> ${registration.transactionId}</p>
              <p><strong>Payment Status:</strong> ${registration.paymentStatus.toUpperCase()}</p>
            </div>
            
            <h3>What's Next?</h3>
             <ul>
              <li>📅 Camp starts on <strong>August 4th, 2025</strong> at 9:00 AM</li>
              <li>👕 Please ensure your child brings appropriate sports attire and laptop or any device that would help for the coding class</li>
              <li>🏊‍♂️ Swimming gear will be provided, But If A child have would be an added advantage</li>
              <li>🍽️ Lunch and snacks Should be brought as the session is about 6 hours long</li>
              <li>📞 We'll contact you if we need any additional information</li>
            </ul>
            
            <p>If you have any questions or need to make changes to your registration, please contact us at:</p>
            <ul>
              <li>📧 Email: info@swimperfect.com</li>
              <li>📱 Phone: +234-XXX-XXXX</li>
            </ul>
            
            <p>We look forward to providing your child(ren) with an unforgettable summer experience!</p>
            
            <p>Best regards,<br>
            <strong>Summer Sports & Learning Camp Team</strong></p>
          </div>
          
          <div class="footer">
            <p>&copy; 2025 Summer Sports & Learning Camp. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: process.env.FROM_EMAIL || 'noreply@swimperfect.com',
      to: registration.parentInfo.email,
      subject: 'Registration Confirmed - Summer Sports & Learning Camp 2025',
      html: htmlContent
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw error;
  }
};

const calculateAge = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

const formatActivity = (activity) => {
  const activityMap = {
    'football': 'Football',
    'basketball': 'Basketball',
    'chess': 'Chess',
    'scrabble': 'Scrabble',
    'ballet': 'Ballet',
    'martial-arts': 'Martial Arts'
  };
  
  return activityMap[activity] || activity;
};

module.exports = {
  sendConfirmationEmail
};