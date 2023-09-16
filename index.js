require('dotenv').config()

const bodyParser=require('body-parser')

const {TOKEN,SERVER_URL,REDIS}=process.env
const TELEGRAM_API='https://api.telegram.org/bot'+TOKEN
const URI='/webhook/'+TOKEN
const WEBHOOK_URL=SERVER_URL+URI
const { Telegraf } = require('telegraf')
const { message } = require('telegraf/filters')
//redis configs
const Redis = require('ioredis');
const redis = new Redis(REDIS);
const cron = require('node-cron');
const bot = new Telegraf(TOKEN);
// Middleware to process incoming updates

// Command handler for /start
// text="saat harekat bacheha:"


bot.command('start', (ctx) => {
  async function start(ctx) {
        let text="LETS GO TO  GYM \n"
        // Close the Redis client when done
        console.log('ok')
        let times=async()=>{
       
            const keys= await redis.hgetall(ctx.chat.id);
            
            for (const key in keys){
             const value = await redis.hget(ctx.chat.id,key);
            text= await text+key+' saat '+value+' mire.\n'
            }
           return text
         }
        await times()
       
        await bot.telegram.sendMessage(ctx.chat.id,text,{
         reply_markup:{
            inline_keyboard:[
                [
                    {text:'انتخاب زمان',callback_data:'choose'}
                ]
            ]
        }
      })
      }
  cron.schedule('30 6 * * *', () => {
        redis.flushdb()
        ctx.sendMessage(ctx.chat.id,{text:'روز بخیر بچه ها چه ساعتی میرید باشگاه'})
        start(ctx)
    });
    
  

  start(ctx);
  
  bot.action('choose',ctx=>{
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id,'.ساعت حضورتو انتخاب کن عزیزم',{
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
    ctx.deleteMessage()
    redis.hmset(ctx.chat.id,ctx.callbackQuery.from.username,JSON.stringify(userTime))
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