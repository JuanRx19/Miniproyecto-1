import nodemailer from 'nodemailer';

export const enviarEmail = (asunto, email) => {
  // Configurar el transporte
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Puedes usar otro servicio como Outlook, Yahoo, etc.
    auth: {
        user: 'sistemaposxyz@gmail.com',
        pass: 'rebs emya gzal gfrd',
    },
  });

  // Configurar el correo
  const mailOptions = {
    from: 'sistemaposxyz@gmail.com',
    to: 'juanrx1904@gmail.com',
    subject: asunto,
    text: email,
  };

  // Enviar el correo
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Correo enviado: ' + info.response);
    }
  });
}
