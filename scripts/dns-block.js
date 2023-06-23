var responseVerses = {
    "lust" : 
    [
        {
        "verse": "Matthew 5:28", 
        "isNT": true
        },
        {
            "verse": "Proverbs 6:25-29", 
            "isNT": false
        },
        {
            "verse": "Romans 1:21-27", 
            "isNT": true
        },
        {
            "verse": "2 Timothy 2:22", 
            "isNT": true
        }
    ]
}


findURL = function changeURL(text, category)
{
    var current = window.location.href;
    var response = responseVerses[category][Math.floor(Math.random() * responseVerses[category].length)];
    var isNT = response["isNT"]

    if(current.indexOf(text) !== -1)
        window.location.replace("https://www.biblegateway.com/passage/?search=" + response["verse"] + "&version=" + (isNT ? "HHH" : "NIV"));
   
}


findURL("example.com", "lust");
