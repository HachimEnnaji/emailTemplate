using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;

namespace emailTemplate.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        [HttpPost]
        [Route("send")]
        public IActionResult SendEmail([FromBody] model.email email)
        {
            var from = new MailAddress("hachimprova@outlook.it", "Hachim Prova");
            var to = new MailAddress(email.to);
            const string fromPassword = "*****"; // password of the email
            string subject = email.subject;
            string body = email.body;

            var smtp = new SmtpClient
            {
                Host = "smtp-mail.outlook.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(from.Address, fromPassword)
            };

            using (var message = new MailMessage(from, to)
            {
                Subject = subject,
                Body = body
            })
            {
                smtp.Send(message);
            }
            return Ok();
        }
    }
}
