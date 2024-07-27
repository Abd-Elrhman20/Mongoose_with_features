import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mana201638@gmail.com',
        pass: 'sxrddcvchhdjgyyv'
    }
})  