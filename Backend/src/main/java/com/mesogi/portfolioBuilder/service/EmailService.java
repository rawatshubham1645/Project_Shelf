package com.mesogi.portfolioBuilder.service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;
    
    @Value("${spring.mail.username}")
	private String email;

    public void sendSignupOtpEmail(String to, String subject, String userName, String otp) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        String htmlContent = "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "<meta charset='UTF-8'>" +
                "<title>OTP Verification</title>" +
                "</head>" +
                "<body style='margin:0; padding:0; background-color:#f9f9f9; font-family:Segoe UI, sans-serif;'>" +
                "<table width='100%' cellpadding='0' cellspacing='0' style='background-color:#f9f9f9; padding:40px 0;'>" +
                "  <tr>" +
                "    <td align='center'>" +
                "      <table width='600' cellpadding='0' cellspacing='0' style='background:#ffffff; border-radius:10px; box-shadow:0 4px 10px rgba(0,0,0,0.1); padding:40px;'>" +
                "        <tr>" +
                "          <td align='center'>" +
                "            <h1 style='color:#333333; margin-bottom:10px;'>Email Verification</h1>" +
                "            <p style='color:#555555; font-size:16px;'>Hi <strong>" + userName + "</strong>,</p>" +
                "            <p style='color:#555555; font-size:16px; margin-bottom:30px;'>Use the OTP below to verify your email address and complete your signup.</p>" +
                "            <div style='font-size:36px; font-weight:bold; background:#eaf4ff; color:#007bff; padding:15px 30px; display:inline-block; border-radius:6px; letter-spacing:6px;'>" + otp + "</div>" +
                "            <p style='color:#999999; font-size:13px; margin-top:30px;'>This OTP is valid for 5 minutes.</p>" +
                "            <hr style='margin:30px 0; border:none; border-top:1px solid #eeeeee;' />" +
                "            <p style='font-size:13px; color:#999999;'>If you didn’t request this, please ignore this email.</p>" +
                "            <p style='font-size:13px; color:#999999;'>Need help? Contact <a href='mailto:support@formbuilder.com' style='color:#007bff;'>support@projectshelf.com</a></p>" +
                "          </td>" +
                "        </tr>" +
                "      </table>" +
                "    </td>" +
                "  </tr>" +
                "</table>" +
                "</body>" +
                "</html>";

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlContent, true); // true = isHtml
        helper.setFrom(email);

        mailSender.send(message);
    }

	public void sendForgotPasswordOtpEmail(String to, String subject, String userName, String otp) throws MessagingException {
		MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        String content = """
                <html>
                    <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
                        <div style="max-width: 600px; margin: auto; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0px 2px 10px rgba(0,0,0,0.1);">
                            <h2 style="color: #333;">Hello %s,</h2>
                            <p style="font-size: 16px; color: #555;">
                                You recently requested to reset your password for your ProjectShelf account.
                                Use the OTP below to proceed with resetting your password:
                            </p>
                            <div style="text-align: center; margin: 30px 0;">
                                <span style="display: inline-block; background-color: #007bff; color: white; padding: 10px 20px; font-size: 24px; border-radius: 6px;">%s</span>
                            </div>
                            <p style="font-size: 14px; color: #999;">This OTP is valid for 5 minutes.</p>
                            <p style="font-size: 14px; color: #999;">If you did not request this, you can safely ignore this email.</p>
                            <hr style="margin: 40px 0;">
                            <p style="font-size: 12px; color: #aaa;">Thank you,<br>The ProjectShelf Team</p>
                        </div>
                    </body>
                </html>
            """.formatted(userName, otp);

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(content, true); // true = isHtml
        helper.setFrom(email);

        mailSender.send(message);	
	}

}