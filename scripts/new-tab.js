document.getElementById("body").style.backgroundImage = "url('assets/wallpapers/" + (Math.floor(Math.random() * 7) + 1).toString() + ".webp')";


welcome = function welcomeMsg()
{
    var welcomeText = "Welcome back, ";
    if(localStorage.getItem("myName") == undefined)
    {
        let personName = prompt("Howdy! Please enter your name:");
        localStorage.setItem("myName", personName);
        welcomeText = "Welcome, "
    }
    var myName = localStorage.getItem("myName");            
    document.getElementById("welcome-msg").innerHTML = (welcomeText + myName + "!");
}



randomQuery = function setRandomQuery()
{
    var randomQueries = {
        "query" : 
        [
            "Is cereal soup?",
            "Where are my socks from yesterday and why are they gone now?",
            "Where does the sun go at night?",
            "Do zombies eat brains because they’re hungry for knowledge?",
            "Did Adam and Eve have belly buttons?",
            "Is ketchup a smoothie since tomatoes are fruits?",
            "Who was the first person to milk a cow?",
            "Is daydreaming at night possible?",
            "Is the word ‘dictionary’ in the dictionary?",
            "Can I cry underwater?",
            "How fast EXACTLY can ducks run?"
        ]
    }
    var query = randomQueries["query"][Math.floor(Math.random() * randomQueries["query"].length)];
    document.getElementsByName("q")[0].placeholder = query;
}

bibleVerse = function getBibleVerse(file, prompt)
{
    var startsWithNum = !isNaN(parseInt(prompt[0], 10));
    var bookNumber = 0
    if(startsWithNum)
    {
        bookNumber = parseInt(prompt[0],10);
        prompt = prompt.substring(2);
    }
    var chapter = parseInt(prompt.substring(prompt.indexOf(' '),prompt.indexOf(':')),10);
    chapterText = file[(bookNumber === 0 ? "" : bookNumber.toString() + " ") + prompt.substring(0,prompt.indexOf(chapter) - 1)][(chapter - 1).toString()];
    chapterText = Object.values(chapterText)[0];
    var verseRange = prompt.substring(prompt.indexOf(':') + 1);

    var verseText = "";
    if(verseRange.indexOf('-') !== -1)
    {
        var startVerse = parseInt(verseRange.substring(0,verseRange.indexOf('-')));
        var endVerse = parseInt(verseRange.substring(verseRange.indexOf('-') + 1));
        for(startVerse; startVerse <= endVerse; startVerse++)
        {
            verseText += chapterText[startVerse];
        }
    }
    else
    {
        var verseIndex = parseInt(verseRange);
        verseText += chapterText[verseIndex];
    }
    document.getElementById("verse").innerHTML = '"' + verseText+ '"';
}

randomVerse = function printRandomVerse(verses)
{
    var category = Object.keys(verses)[Math.floor(Math.random() * Object.keys(verses).length)];
    var verse = verses[category][Math.floor(Math.random() * verses[category].length)];
    var text = fetch('assets/json/parsed-bible.json').then((response)=>response.json()).then((json)=> bibleVerse(json, verse));
    
    document.getElementById("verse-name").innerHTML = "<h2>" + category + " - "+ verse + "</h2>";
    document.getElementById("verse-name").href = "https://www.biblegateway.com/passage/?search=" + verse + "&version=NIV";
}

welcome();
randomQuery();
fetch('assets/json/bible-verses.json').then((response)=> response.json()).then((json) => randomVerse(json));