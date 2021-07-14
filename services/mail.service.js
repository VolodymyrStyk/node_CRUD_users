const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const { config: { launchConfig: { SERVICE_EMAIL, SERVICE_EMAIL_LOGIN, SERVICE_EMAIL_PASS } } } = require('../config');
const { statusCode, emailTemplates: { FROM_SERVER } } = require('../constants');
const templateInfo = require('../emailTemplates');
const { ErrorHandler, errorMessages: { TEMPLATE_NOT_FOUND } } = require('../errors');

const templateParser = new EmailTemplates({
  views: {
    root: path.join(process.cwd(), 'email-templates'),
  }
});

const transporter = nodemailer.createTransport({
  service: SERVICE_EMAIL,
  auth: {
    user: SERVICE_EMAIL_LOGIN,
    pass: SERVICE_EMAIL_PASS
  }
});

const sendMail = async (userMail, action, context = {}, mailSubject = 'Server Mail') => {
  const sendTemplate = templateInfo[action];

  if (!sendTemplate) {
    throw new ErrorHandler(statusCode.NOT_FOUND, TEMPLATE_NOT_FOUND.message, TEMPLATE_NOT_FOUND.code);
  }

  const html = await templateParser.render(sendTemplate.templateName, context);

  await transporter.sendMail({
    from: FROM_SERVER,
    to: userMail,
    subject: mailSubject,
    html
  });
};

module.exports = { sendMail };
