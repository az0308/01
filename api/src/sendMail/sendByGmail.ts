import gmail, {type ILetter} from "./gmail";

//console.log(process.env.MAIL_SENDER)
const myLetter: ILetter = {
    from : process.env.MAIL_SENDER as string,
    to: "a9291929120@gmail.com",
    subject: "NodeMailer 發送HTML 測試郵件",
    html: `<h1>NodeMailer 發送HTML 測試郵件</h1>
    <p>這是一封來自NodeMailer的測試郵件</p>
    <p><a href="https://www.nuu.deu.tw">點擊這裡,訪問聯大首頁。</a></p>
    `
};

const info = await gmail.send(myLetter);
console.log(info);