import { config } from "../config.js";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const baseStyle = `
  font-family: 'Ubuntu', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  max-width: 580px;
  margin: 0 auto;
  padding: 40px 24px;
  color: #18181b;
  line-height: 1.7;
`;

const buttonStyle = `
  display: inline-block;
  background: #7c3aed;
  color: #ffffff;
  text-decoration: none;
  padding: 12px 28px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 14px;
`;

const footerStyle = `
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #e4e4e7;
  font-size: 12px;
  color: #71717a;
`;

function unsubLink(token: string) {
  return `${config.apiUrl}/api/newsletter/unsubscribe/${token}`;
}

export function confirmationEmail(confirmToken: string) {
  const link = `${config.apiUrl}/api/newsletter/confirm/${confirmToken}`;

  return {
    subject: "Confirm your subscription to azim.cc",
    html: `
      <div style="${baseStyle}">
        <h2 style="font-size: 24px; margin: 0 0 16px;">One last step</h2>
        <p>Thanks for subscribing. Click the button below to confirm your email and start receiving the weekly digest.</p>
        <p style="margin: 28px 0;">
          <a href="${link}" style="${buttonStyle}">Confirm subscription</a>
        </p>
        <p style="font-size: 13px; color: #71717a;">
          If you did not sign up for this newsletter, you can safely ignore this email.
        </p>
        <div style="${footerStyle}">
          <p>M Azim Abdul Majeed &middot; <a href="${config.frontendUrl}" style="color: #7c3aed;">azim.cc</a></p>
        </div>
      </div>
    `,
  };
}

export function welcomeEmail() {
  return {
    subject: "Welcome to the azim.cc newsletter",
    html: `
      <div style="${baseStyle}">
        <h2 style="font-size: 24px; margin: 0 0 16px;">You are in.</h2>
        <p>Your subscription is confirmed. You will receive one article a week, sent on Friday evening.</p>
        <p>No tracking, no list-sharing. Just writing on economics, finance, and Islamic finance.</p>
        <p style="margin: 28px 0;">
          <a href="${config.frontendUrl}" style="${buttonStyle}">Read the latest</a>
        </p>
        <div style="${footerStyle}">
          <p>M Azim Abdul Majeed &middot; <a href="${config.frontendUrl}" style="color: #7c3aed;">azim.cc</a></p>
        </div>
      </div>
    `,
  };
}

export function newsletterEmail(
  postTitle: string,
  postLede: string,
  postSlug: string,
  unsubToken: string
) {
  const postUrl = `${config.frontendUrl}/blog/${postSlug}`;

  return {
    subject: postTitle.replace(/[\r\n]/g, " "),
    html: `
      <div style="${baseStyle}">
        <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; color: #7c3aed; font-weight: 600; margin: 0 0 12px;">
          New article
        </p>
        <h2 style="font-size: 28px; margin: 0 0 12px; line-height: 1.2;">${escapeHtml(postTitle)}</h2>
        <p style="font-size: 18px; font-style: italic; color: #3f3f46; margin: 0 0 28px;">${escapeHtml(postLede)}</p>
        <p style="margin: 28px 0;">
          <a href="${postUrl}" style="${buttonStyle}">Read the full article</a>
        </p>
        <div style="${footerStyle}">
          <p>M Azim Abdul Majeed &middot; <a href="${config.frontendUrl}" style="color: #7c3aed;">azim.cc</a></p>
          <p style="margin-top: 8px;">
            <a href="${unsubLink(unsubToken)}" style="color: #a1a1aa; text-decoration: underline;">Unsubscribe</a>
          </p>
        </div>
      </div>
    `,
  };
}
