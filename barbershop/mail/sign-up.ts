export function setupTemplateEmailSignUp(verificationToken: string) {
  const magicLink = `${process.env.APP_URL}/auth/verify?verification_token=${verificationToken}`;

  return `
    <!DOCTYPE html>
    <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
      <head>
        <meta charset="utf-8" />
        <meta name="x-apple-disable-message-reformatting" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no, date=no, address=no, email=no" />
        <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
        <!--[if mso]>
          <noscript>
            <xml>
              <o:OfficeDocumentSettings xmlns:o="urn:schemas-microsoft-com:office:office">
                <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
            </xml>
          </noscript>
          <style>
            td,
            th,
            div,
            p,
            a,
            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
              font-family: 'Segoe UI', sans-serif;
              mso-line-height-rule: exactly;
            }
          </style>
        <![endif]-->
        <title>Confirm your email address</title>
        <style>
          :root {
            color-scheme: light dark;
            supported-color-schemes: light dark;
          }
        </style>
        <style>
          .hover-bg-blue-600:hover {
            background-color: #2563eb !important;
          }
          .hover-underline:hover {
            text-decoration: underline !important;
          }
          @media (max-width: 600px) {
            .sm-w-full {
              width: 100% !important;
            }
            .sm-py-32 {
              padding-top: 32px !important;
              padding-bottom: 32px !important;
            }
            .sm-px-24 {
              padding-left: 24px !important;
              padding-right: 24px !important;
            }
            .sm-leading-32 {
              line-height: 32px !important;
            }
          }
          @media (prefers-color-scheme: dark) {
            .dark-mode-bg-gray-999 {
              background-color: #1b1c1e !important;
            }
            .dark-mode-bg-gray-989 {
              background-color: #2d2d2d !important;
            }
            .dark-mode-text-gray-979 {
              color: #a9a9a9 !important;
            }
            .dark-mode-text-white {
              color: #ffffff !important;
            }
          }
        </style>
      </head>
      <body
        class="dark-mode-bg-gray-999"
        style="
          margin: 0;
          width: 100%;
          padding: 0;
          word-break: break-word;
          -webkit-font-smoothing: antialiased;
          background-color: #f3f4f6;
        "
      >
        <div style="display: none">
          Confirm your email address to activate your account&#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
          &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
          &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
          &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &zwnj;
          &#160;&#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
          &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
          &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
          &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &zwnj; &#160;&#847; &#847; &#847; &#847;
          &#847;
        </div>
        <div role="article" aria-roledescription="email" aria-label="Confirm your email address" lang="en">
          <table class="sm-w-full" align="center" style="width: 600px" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td class="sm-py-32 sm-px-24" style="padding: 48px; text-align: center">
                <a href="https://mailpace.com">
                  <svg
                    id="logo-14"
                    width="73"
                    height="49"
                    viewBox="0 0 73 49"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M46.8676 24C46.8676 36.4264 36.794 46.5 24.3676 46.5C11.9413 46.5 1.86765 36.4264 1.86765 24C1.86765 11.5736 11.9413 1.5 24.3676 1.5C36.794 1.5 46.8676 11.5736 46.8676 24Z"
                      class="ccustom"
                      fill="#68DBFF"
                    ></path>
                    <path
                      d="M71.1324 24C71.1324 36.4264 61.1574 46.5 48.8529 46.5C36.5484 46.5 26.5735 36.4264 26.5735 24C26.5735 11.5736 36.5484 1.5 48.8529 1.5C61.1574 1.5 71.1324 11.5736 71.1324 24Z"
                      class="ccompli1"
                      fill="#FF7917"
                    ></path>
                    <path
                      d="M36.6705 42.8416C42.8109 38.8239 46.8676 31.8858 46.8676 24C46.8676 16.1144 42.8109 9.17614 36.6705 5.15854C30.5904 9.17614 26.5735 16.1144 26.5735 24C26.5735 31.8858 30.5904 38.8239 36.6705 42.8416Z"
                      class="ccompli2"
                      fill="#5D2C02"
                    ></path>
                  </svg>
                </a>
              </td>
            </tr>
          </table>
          <table
            style="width: 100%; font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
          >
            <tr>
              <td align="center" class="dark-mode-bg-gray-999" style="background-color: #f3f4f6">
                <table class="sm-w-full" style="width: 600px" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td align="center" class="sm-px-24">
                      <table style="margin-bottom: 48px; width: 100%" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                          <td
                            class="dark-mode-bg-gray-989 dark-mode-text-gray-979 sm-px-24"
                            style="
                              background-color: #ffffff;
                              padding: 48px;
                              text-align: left;
                              font-size: 16px;
                              line-height: 24px;
                              color: #1f2937;
                            "
                          >
                            <p
                              class="sm-leading-32 dark-mode-text-white"
                              style="
                                margin: 0;
                                margin-bottom: 36px;
                                font-family: ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif;
                                font-size: 24px;
                                font-weight: 600;
                                color: #000000;
                              "
                            >
                              Welcome. You're almost there.
                            </p>
                            <p style="margin: 0; margin-bottom: 24px">
                              Click the link below to confirm your email address and finish your account setup
                            </p>
                            <a
                              href="${magicLink}"
                              class="hover-bg-blue-600"
                              style="
                                display: inline-block;
                                background-color: #3b82f6;
                                padding-left: 24px;
                                padding-right: 24px;
                                padding-top: 16px;
                                padding-bottom: 16px;
                                text-align: center;
                                font-size: 16px;
                                font-weight: 600;
                                text-transform: uppercase;
                                color: #ffffff;
                                text-decoration: none;
                              "
                            >
                              <!--[if mso
                                ]><i style="letter-spacing: 24px; mso-font-width: -100%; mso-text-raise: 30px">&#8202;</i><!
                              [endif]-->
                              <span style="mso-text-raise: 16px">Confirm Email Address</span>
                              <!--[if mso]><i style="letter-spacing: 24px; mso-font-width: -100%">&#8202;</i><![endif]-->
                            </a>
                            <table style="width: 100%" cellpadding="0" cellspacing="0" role="presentation">
                              <tr>
                                <td style="padding-top: 32px; padding-bottom: 32px">
                                  <hr style="border-bottom-width: 0px; border-color: #f3f4f6" />
                                </td>
                              </tr>
                            </table>
                            <p style="margin: 0; margin-bottom: 16px; color: #6b7280">
                              Button not working? Copy and paste the link below into your web browser
                              <a href="${magicLink}" style="color: #6b7280"
                                >${magicLink}</a
                              >
                            </p>
                            <p style="margin: 0; margin-bottom: 16px; color: #6b7280">
                              If you did not make this request, you can ignore this email
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </body>
    </html>
  `;
}
