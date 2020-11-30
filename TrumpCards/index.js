const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
const { v4: uuid } = require('uuid');

app.use(methodOverride('_method'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));

let trumpcards = [
    {
        id: uuid() ,
        name: 'Nagisa',
        img: 'https://c4.wallpaperflare.com/wallpaper/913/535/781/clannad-okazaki-tomoya-okazaki-ushio-okazaki-nagisa-wallpaper-preview.jpg',
        info: 'Nagisa is the best! Nagisa is a cute girl with short wavy red hair that reaches a little below her shoulders. She has a frail physique, as noted by Tomoya Okazaki, therefore she is petite for her age, due to her poor health and weak immune system.'
    },
    {
        id: uuid() ,
        name:"TangWan'er",
        img: 'https://c4.wallpaperflare.com/wallpaper/734/546/428/3513x2280-px-action-asian-fantasy-wallpaper-preview.jpg',
        info: 'Her figure was lithe and graceful. She had light dimples whenever she smiled, letting other people feel like they were being cleansed by a spring breeze and as if even their bones would turn limp in her presence.'
    },
    {
        id: uuid() ,
        name: 'MengQi',
        img:'https://c4.wallpaperflare.com/wallpaper/874/478/505/4000x2596-px-action-asian-fantasy-wallpaper-preview.jpg',
        info: 'She had willowy eyebrows over limpid clear eyes, cherry red lips popped over her pale skin, and a cascading waterfall of hair descended all the way to her waist'
    },
    {
        id: uuid() ,
        name: 'Touka',
        img:'https://c4.wallpaperflare.com/wallpaper/417/291/813/anime-girls-tokyo-ghoul-tokyo-ghoul-re-kirishima-touka-wallpaper-preview.jpg',
        info: 'Touka is a slender and attractive teenage girl with bob-length black hair (purple in the anime) that has long bangs that reach her chin covering the right side of her face and blue eyes. She appears to be a cute, normal girl that one would not suspect to be a ghoul. Her facial features and hairstyle bear a strong.'
    },
    {
        id: uuid() ,
        name: 'Zero Two(02)',
        img:'https://c4.wallpaperflare.com/wallpaper/147/282/530/anime-darling-in-the-franxx-pink-hair-smile-zero-two-darling-in-the-franxx-hd-wallpaper-preview.jpg',
        info: "An elite pilot belonging to APE's special forces, Zero Two is a mysterious and rebellious girl often referred to as a monster due to her red horns and klaxosaur blood. She is also known as the 'partner killer' as all partners who pilot Strelizia with her always die after riding three times with her at most, with Hiro being the only exception. She always calls Hiro as her 'darling'. Her true age is unknown but her ultimate wish is to become fully human so she can reunite with an important person from her past, which turned out to be Hiro. Since she was a child, she was inspired by a book called “The Beast and the Prince”, which she notes is similar to the circumstances of her and Hiro. She begins creating her own version of the story but intentionally left the last page blank because of the likelihood she may have to part ways with Hiro."
    },
    
]

app.get('/trumpcards',(req, res) =>{
    res.render('index', { trumpcards });
 });

app.get('/trumpcards/new', (req, res)=>{
     res.render('new')
 });

 app.post('/trumpcards', (req, res)=>{
    const {name, img, info} = req.body;
    trumpcards.push({name, img, info, id: uuid() });
    res.redirect('/trumpcards')
});


app.get('/trumpcards/:id', (req, res)=>{
    const {id} = req.params;
    const trumpcard = trumpcards.find(c => c.id === id);
    res.render('show', { trumpcard })
});

app.get('/trumpcards/:id/edit',(req, res)=>{
    const {id} = req.params;
    const trumpcard = trumpcards.find(c => c.id === id);
    res.render('edit', {trumpcard})
});

app.patch('/trumpcards/:id', (req, res)=>{
    const {id} = req.params;
    const data1 = req.body.name;
    const data2 = req.body.img;
    const data3 = req.body.info;

    const foundTrumpcard = trumpcards.find(c => c.id === id);
    foundTrumpcard.name = data1;
    foundTrumpcard.img = data2;
    foundTrumpcard.info = data3;
    res.redirect('/trumpcards')
});

app.delete('/trumpcards/:id', (req, res) =>{
    const { id } =req.params;
    trumpcards = trumpcards.filter(c => c.id !== id);
    res.redirect('/trumpcards');
})

app.listen(3000,()=>{
    console.log("LISTINING ON PORT 3000");
});