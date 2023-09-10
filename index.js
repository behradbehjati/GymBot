require('dotenv').config()
const express=require('express')
const bodyParser=require('body-parser')
const axios =require('axios')
const {TOKEN,SERVER_URL}=process.env
const TELEGRAM_API='https://api.telegram.org/bot'+TOKEN
const URI='/webhook/'+TOKEN
const WEBHOOK_URL=SERVER_URL+URI
// const app=express()
const { Telegraf } = require('telegraf')
const { message } = require('telegraf/filters')
// const Redis = require('ioredis');
// const redis = new Redis();
const cron = require('node-cron');
//redis configs
// let redisClient;
// (async()=>{
//     redisClient=redis.createClient();
//     redisClient.on("error",(error)=>console.error('ERROR:'+error))
//     await redisClient.connect();
// })();


// app.use(express.json());


// Schedule a task to run on a specific date and time (e.g., September 15, 2023, at 2:30 PM)



const bot = new Telegraf(TOKEN);


// Set up the webhook when the bot starts
// (async () => {
//   try {
//     await bot.telegram.setWebhook(TELEGRAM_API+'/setWebhook?url='+WEBHOOK_URL);
//     console.log('Webhook set up successfully');
//   } catch (error) {
//     console.error('Error setting up webhook:'+ error);
//   }
// })();

// Middleware to process incoming updates

// Command handler for /start
// text="saat harekat bacheha:"
async function start(ctx) {
    let text="Hello my gymbros \n"
    
    // Close the Redis client when done
    // let times=async()=>{
   
    // //     const keys= await redis.keys('*');
    // //     console.log(keys.length)
        
    // //     for (const key of keys){
    // //      const value = await redis.get(key);
    // //          console.log(value);
    // //     text= await text+key+' '+value+'.\n'
    // //     }
    // //    return text
    //  }
    // await times()
    console.log('starting')
   
    bot.telegram.sendMessage(ctx.chat.id,text,{
     reply_markup:{
        inline_keyboard:[
            [
                {text:'انتخاب زمان',callback_data:'start'}
            ]
        ]
    }
  })
  }

bot.command('start', (ctx) => {
    // cron.schedule('30 6 * * *', () => {
    //     redis.flushdb()
    //     start(ctx)
    // });
    
    console.log('x')
  

  start(ctx);
  
  bot.action('start',ctx=>{
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id,'انتخاب کن',{
    reply_markup:{
        inline_keyboard:[[
            {text:6,callback_data:'6'}
        ],
        [
            {text:7,callback_data:'7'}
        ],
        [
            {text:8,callback_data:'8'}
        ],
        [
            {text:9,callback_data:'9'}
        ],[
            {text:10,callback_data:'10'}
        ],[
            {text:11,callback_data:'11'}
        ],[
            {text:12,callback_data:'12'}
        ],[
            {text:13,callback_data:'13'}
        ],[
            {text:14,callback_data:'14'}
        ],[
            {text:15,callback_data:'15'}
        ],[
            {text:16,callback_data:'16'}
        ],[
            {text:17,callback_data:'17'}
        ],[
            {text:18,callback_data:'18'}
        ],[
            {text:19,callback_data:'19'}
        ],[
            {text:20,callback_data:'20'}
        ],[
            {text:21,callback_data:'21'}
        ],
    ]
    }}
  
     )});
    let timeList=['6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21',]
    bot.action(timeList,ctx=>{
    
    let userTime=ctx.match[0]
    console.log(userTime)
    ctx.sendMessage({chat_id:ctx.chat.id,text:'ok,shoma saat'+userTime+'miri'})
    ctx.deleteMessage()
    // redis.set(ctx.callbackQuery.from.username,JSON.stringify(userTime))
    start(ctx)
})

    
    
    
})
    
  

  

  


   

// Handle incoming updates via the webhook
// app.get(URI,(req,res)=>{
//     res.send({text:'fsdfsd'})
// })
// app.post(URI, (req, res) => {
  
//   bot.handleUpdate(req.body, res);
//   console.log('ok')
// });

// app.listen(process.env.PORT, () => {
//   console.log('Bot is listening on port 5000');
// });
bot.launch({
    webhook: {
      // Public domain for webhook; e.g.: example.com
      domain:SERVER_URL ,
  
      // Port to listen on; e.g.: 8080
      port:process.env.PORT ,
  
      // Optional path to listen for.
      // `bot.secretPathComponent()` will be used by default
      hookPath: URI,
  
      // Optional secret to be sent back in a header for security.
      // e.g.: `crypto.randomBytes(64).toString("hex")`
      
    },
  });





















// const init =async() =>{
//     try{

//         const res = await axios.get(TELEGRAM_API+'/setWebhook?url='+WEBHOOK_URL)
//         console.log(res)
//     }catch(error){
//         console.log(error)
//     }
//     }
// app.post(URI,async(req,res)=>{
//     console.log(req.body)
//     const chatId=req.body.message.chat.id  
//     const text=req.body.message.text
//     await axios.post(TELEGRAM_API+'/sendMessage',{
//         chat_id:chatId,
//         text:text,
//     })
//     return res.send()
// })
    

// app.listen(process.env.PORT||5000,async()=>{
//     await init()
//     console.log('app is running')
    
    

// })