// use sendGrid to send email
const  sgmail =  require("@sendgrid/mail")

const SENDGRID_API_KEY  = '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'
sgmail.setApiKey(SENDGRID_API_KEY)

 exports.userWelcomemail=(email,message)=>{
     console.log(email,message)

    try{


        sgmail.send({
            to:email,
            from:'gomemahero@gmail.com',  // this is sendgrid account gmail  ---> send t onother email account
            subject:'reset password from here', 
            text:message
        })
        console.log('email sent')

    } catch(error){


        console.log(error)

    }
  
}