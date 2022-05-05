// var transport = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "5449b83bf19662",
//       pass: "94eb30de2b9eaa"
//     }
//   });

const  { createTransport } =require("nodemailer");

exports.sendMail = async (text,email) => {
  const transporter = createTransport({
   // service: 'Gmail',
  //  host: "smtp.mailtrap.io",
   //  port: 2525,


   host: "smtp.ethereal.email",
   port: 587,
   secure: false,

     auth: {
       user: 'gomemahero@gmail.com',
      //  "5449b83bf19662",
      pass: 'maher93267'
      // "94eb30de2b9eaa"
    },
  });

try{
    console.log(text,email)
    await transporter.sendMail({
        subject: "CONTACT REQUEST FROM PORTFOLIO",
        to: 'maher9911133@gmail.com',
        from:email,
        text,

      });

} catch (error) {
    
    console.log(error);

    }


};